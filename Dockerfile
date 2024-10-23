# Step 2: Build Spring Boot Application with Maven and Java 21
FROM maven:3.9.4-eclipse-temurin-21 AS backend-build

# Set working directory inside the container for the backend app
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Package the Spring Boot app, including React static files
RUN mvn clean package -DskipTests

# Step 3: Run the packaged Spring Boot application in a lightweight Java 21 image
FROM eclipse-temurin:21-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=backend-build /app/target/*.jar app.jar

# Expose the port that Spring Boot runs on
EXPOSE 81

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
