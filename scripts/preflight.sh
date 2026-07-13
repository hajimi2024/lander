#!/bin/sh
# Read-only conditional preflight for Lander.
set +e

mode=${1:-}

section() { printf '\n== %s ==\n' "$1"; }
has() { command -v "$1" >/dev/null 2>&1; }

usage() {
  printf '%s\n' 'Usage: preflight.sh {basic|docker|ingress|kejilion}'
}

basic() {
  section SYSTEM
  if [ -r /etc/os-release ]; then
    . /etc/os-release
    printf 'OS: %s\n' "${PRETTY_NAME:-${NAME:-unknown}}"
  else
    printf 'OS: %s\n' "$(uname -s 2>/dev/null)"
  fi
  printf 'Architecture: %s\n' "$(uname -m 2>/dev/null)"
  cores=$(getconf _NPROCESSORS_ONLN 2>/dev/null || printf '?')
  load=$(cut -d ' ' -f 1-3 /proc/loadavg 2>/dev/null || uptime 2>/dev/null)
  printf 'CPU cores: %s\nLoad (1/5/15m): %s\n' "$cores" "$load"

  section MEMORY
  if has free; then
    free -h | awk 'NR==1 || /^Mem:/ || /^Swap:/'
  else
    printf '%s\n' 'free command unavailable'
  fi

  section DISK
  df -hP / 2>/dev/null | awk 'NR==1 || NR==2'

  section TOP_USAGE
  if ps -eo pid,comm,%cpu,%mem,rss --sort=-rss >/dev/null 2>&1; then
    ps -eo pid,comm,%cpu,%mem,rss --sort=-rss | sed -n '1,8p'
  else
    ps -eo pid,comm,%cpu,%mem,rss 2>/dev/null | sed -n '1,8p'
  fi
  if has docker; then
    docker stats --no-stream --format 'container={{.Name}} cpu={{.CPUPerc}} memory={{.MemUsage}}' 2>/dev/null | sed -n '1,8p'
  fi

  section MARKERS
  if has docker; then printf '%s\n' 'Docker: present'; else printf '%s\n' 'Docker: absent'; fi
  if [ -e /root/kejilion.sh ] || [ -e /usr/local/bin/k ] || [ -e /home/web/docker-compose.yml ]; then
    printf '%s\n' 'KejiLion: detected'
  else
    printf '%s\n' 'KejiLion: not detected'
  fi
}

docker_check() {
  section DOCKER
  if ! has docker; then
    printf '%s\n' 'Docker: absent'
    return 1
  fi
  rc=0

  if version_output=$(docker version --format 'Client={{.Client.Version}} Server={{.Server.Version}} OS/Arch={{.Server.Os}}/{{.Server.Arch}}' 2>/dev/null); then
    printf '%s\n' "$version_output"
  else
    raw_version=$(docker version 2>/dev/null)
    version_status=$?
    [ -n "$raw_version" ] && printf '%s\n' "$raw_version" | sed -n '1,18p'
    [ "$version_status" -eq 0 ] || rc=1
  fi
  docker compose version 2>/dev/null || rc=1
  if has systemctl; then printf 'Service: %s\n' "$(systemctl is-active docker 2>/dev/null)"; fi
  docker info --format 'Root={{.DockerRootDir}} Driver={{.Driver}}' 2>/dev/null || rc=1

  section CONTAINERS
  docker ps -a --format 'name={{.Names}} status={{.Status}} ports={{.Ports}}' 2>/dev/null || rc=1
  docker stats --no-stream --format 'name={{.Name}} cpu={{.CPUPerc}} memory={{.MemUsage}}' 2>/dev/null || rc=1

  section STORAGE
  docker system df 2>/dev/null || rc=1

  return "$rc"
}

ingress() {
  section INGRESS_OWNERS
  if has ss; then
    ss -lntup 2>/dev/null | awk 'NR==1 || $5 ~ /:80$/ || $5 ~ /:443$/'
  fi
  ps -eo comm 2>/dev/null | grep -Ei '^(nginx|caddy|traefik|apache2?|haproxy)$' | sort -u | sed 's/^/proxy=/'

  section CONFIG_PATHS
  for path in /etc/nginx /etc/caddy /home/web/conf.d; do
    [ -d "$path" ] || continue
    count=$(find "$path" -maxdepth 2 -type f 2>/dev/null | awk 'END {print NR+0}')
    printf 'path=%s files=%s\n' "$path" "$count"
  done

  section FIREWALL
  if has ufw; then
    ufw status 2>/dev/null | awk 'NR==1 {print; next} /^[^[:space:]]/ {count++} END {printf "Rule rows: %d\n", count+0}'
  elif has firewall-cmd; then firewall-cmd --state 2>/dev/null;
  else printf '%s\n' 'No supported firewall frontend detected'; fi

  section CERTIFICATES
  for tool in certbot acme.sh caddy; do
    if has "$tool"; then printf '%s: %s\n' "$tool" "$(command -v "$tool")"; fi
  done
  [ -x /root/.acme.sh/acme.sh ] && printf '%s\n' 'acme.sh: /root/.acme.sh/acme.sh'
  if has systemctl; then systemctl list-timers --all --no-pager 2>/dev/null | grep -Ei 'certbot|acme' | sed -n '1,15p'; fi
  for file in /etc/crontab /etc/cron.d/* /var/spool/cron/crontabs/root; do
    [ -f "$file" ] || continue
    count=$(grep -Eic 'certbot|acme|renew' "$file" 2>/dev/null)
    [ "$count" -gt 0 ] && printf 'renewal_file=%s entries=%s\n' "$file" "$count"
  done
}

kejilion() {
  section KEJILION
  for path in /root/kejilion.sh /usr/local/bin/k /home/web/docker-compose.yml /root/auto_cert_renewal.sh /root/.acme.sh; do
    [ -e "$path" ] && ls -ld "$path"
  done

  section LDNMP
  if has docker && [ -f /home/web/docker-compose.yml ]; then
    docker compose -f /home/web/docker-compose.yml config --services 2>/dev/null
    docker ps -a --filter name=nginx --format 'name={{.Names}} status={{.Status}} ports={{.Ports}}' 2>/dev/null
  fi
  for path in /home/web/html /home/web/certs /home/web/conf.d /home/web/docker-projects; do
    [ -d "$path" ] || continue
    count=$(find "$path" -maxdepth 1 -mindepth 1 -print 2>/dev/null | awk 'END {print NR+0}')
    printf 'path=%s entries=%s\n' "$path" "$count"
  done

  section WORDPRESS
  count=$(find /home/web /var/www /www/wwwroot -xdev -maxdepth 6 \( -type f -name wp-config.php -o -type d -name wp-content \) -print 2>/dev/null | awk 'END {print NR+0}')
  printf 'WordPress markers: %s\n' "$count"

  section RENEWAL
  if [ -x /root/.acme.sh/acme.sh ]; then
    count=$(/root/.acme.sh/acme.sh --list 2>/dev/null | awk 'NR>1 && NF {count++} END {print count+0}')
    printf 'acme.sh managed certificates: %s\n' "$count"
  fi
  for file in /var/spool/cron/crontabs/root /etc/crontab; do
    [ -f "$file" ] || continue
    count=$(grep -Eic 'certbot|acme|renew|auto_cert' "$file" 2>/dev/null)
    [ "$count" -gt 0 ] && printf 'renewal_file=%s entries=%s\n' "$file" "$count"
  done
}

case "$mode" in
  basic) basic ;;
  docker) docker_check ;;
  ingress) ingress ;;
  kejilion) kejilion ;;
  *) usage; exit 2 ;;
esac

status=$?
exit "$status"
