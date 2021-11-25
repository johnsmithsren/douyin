#!/bin/bash
echo "run douyin docker"

docker build -t joyorigin-platform-douyin -f ./Dockerfile .
docker login office.joyorigin.com:11080/
docker tag joyorigin-platform-douyin:latest office.joyorigin.com:11080/ops/joyorigin-platform-douyin:latest
docker push office.joyorigin.com:11080/ops/joyorigin-platform-douyin:latest