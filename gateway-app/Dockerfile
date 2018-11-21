FROM openjdk:8-jdk-alpine
RUN  apk update && apk upgrade && apk add netcat-openbsd
RUN ./gradlew bootWar -Pprod jibDockerBuild 
