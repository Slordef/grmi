#!/usr/bin/env sh

/usr/local/bin/dockerd-entrypoint.sh &

exec "$@"