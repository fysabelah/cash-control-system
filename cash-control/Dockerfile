#
# Build stage
#
FROM maven:3.9.6-amazoncorretto-21 AS build

WORKDIR /cash-control-api

COPY pom.xml .
RUN mvn -B dependency:go-offline

COPY src ./src
RUN mvn -B package -DskipTests

#
# Package stage
#
FROM amazoncorretto:21-alpine-jdk

WORKDIR /cash-control-api

COPY --from=build /cash-control-api/target/*.jar ./cash-control-api.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","cash-control-api.jar"]