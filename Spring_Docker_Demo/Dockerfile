FROM java:8-jre
WORKDIR usr/src
ENV MONGO_DATABASE=notedb
ENV MONGO_URL=mongodb://mongo-container:27017/notedb
ADD ./target/Spring_Docker_Demo-0.0.1-SNAPSHOT.jar /usr/src/Spring_Docker_Demo-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-Dspring.data.mongodb.uri=mongodb://mongo-container/notedb","-jar","Spring_Docker_Demo-0.0.1-SNAPSHOT.jar"]