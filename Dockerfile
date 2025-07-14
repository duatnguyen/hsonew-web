# Stage 1: Build with Gradle
FROM gradle:7.6.3-jdk17-alpine AS build
WORKDIR /app

# Copy only gradle wrapper and build files first (to cache dependencies)
COPY gradlew ./
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Give permission if needed
RUN chmod +x gradlew

# Download dependencies (for better build caching)
RUN ./gradlew build -x test --no-daemon || return 0

# Now copy the source code
COPY . .

# Build project
RUN ./gradlew clean build -x test --no-daemon

# Stage 2: Create runtime image
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
