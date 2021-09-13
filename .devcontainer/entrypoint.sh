#!/bin/sh

sed -i "s#___API_URL___#"$API_URL"#g" /usr/share/nginx/html/main-*

exec "$@"

tail -f /dev/null