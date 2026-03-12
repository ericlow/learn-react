#!/usr/bin/env bash
# Count lines of code changed (added + deleted) per day from git log.
# Usage: ./loc-per-day.sh [--since <date>] [--author <name>]
# Example: ./loc-per-day.sh --since "2 weeks ago" --author "eric"

set -euo pipefail

GIT_ARGS=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    --since) GIT_ARGS+=(--since="$2"); shift 2 ;;
    --author) GIT_ARGS+=(--author="$2"); shift 2 ;;
    *) echo "Unknown arg: $1"; exit 1 ;;
  esac
done

git log --format="%ad" --date=short --numstat "${GIT_ARGS[@]}" | awk '
/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/ { date = $0 }
/^[0-9]/ && date != "" { add[date] += $1; del[date] += $2; total[date] += $1 + $2 }
END {
  for (d in total) print d, add[d], del[d], total[d]
}' | sort | awk 'BEGIN {
  printf "%-12s %8s %8s %8s\n", "DATE", "ADDED", "DELETED", "TOTAL"
  printf "%-12s %8s %8s %8s\n", "----", "-----", "-------", "-----"
} {
  printf "%-12s %8d %8d %8d\n", $1, $2, $3, $4
}'
