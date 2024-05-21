#!/bin/bash

if docker ps -a --filter="name=vue-build3" --format='{{.ID}}' ; then
  docker rm -f "vue-build3"
else
  echo "Container vue-build3 does not exist"
fi
