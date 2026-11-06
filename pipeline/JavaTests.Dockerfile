# syntax=docker/dockerfile:1.7
FROM eclipse-temurin:21-jdk AS test
WORKDIR /workspace
COPY database ./database
COPY account-service ./account-service
COPY position-service ./position-service
COPY trade-service ./trade-service
COPY trade-processor ./trade-processor
RUN --mount=type=cache,target=/root/.gradle,sharing=locked \
    set -eu; for module in database account-service position-service trade-service trade-processor; do \
      (cd "$module" && chmod +x gradlew && ./gradlew --no-daemon test); \
    done
FROM scratch
COPY --from=test /workspace/trade-processor/build/test-results /trade-processor/test-results
COPY --from=test /workspace/trade-processor/build/reports /trade-processor/reports
