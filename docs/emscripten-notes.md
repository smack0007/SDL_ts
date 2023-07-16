# Start Emscripten in Docker in Git Bash

MSYS_NO_PATHCONV=1 docker run --rm -it -v "$(pwd):/app" -w /app emscripten/emsdk /bin/bash
