#!/bin/sh

# Rebuild architecture based binaries and graphs

npm i -g npm
npm i

# Run the service (HMR)

npx webpack-dev-server
