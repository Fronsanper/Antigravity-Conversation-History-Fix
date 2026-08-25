#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
command -v node >/dev/null 2>&1 || { echo "Node.js 16 or newer is required."; exit 1; }
node wizard/server.mjs
