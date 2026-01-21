#!/bin/bash
# Spring Boot API 起動スクリプト

cd "$(dirname "$0")"

echo "Starting Spring Boot API..."
mvn spring-boot:run
