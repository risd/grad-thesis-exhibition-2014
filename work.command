#!/usr/bin/env bash

## Change directory to application
ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "$ROOT"

echo "Opening http://localhost:8887"
open http://localhost:8887/

echo "Starting development tools"
node_modules/.bin/nf --procfile Procfile.dev start