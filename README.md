# todoapp

Simple full-stack Todo Management System built with Spring Boot, MySQL, HTML, CSS, and JavaScript.

## Features

- Create, edit, view, and delete tasks
- Track task status with `PENDING`, `IN_PROGRESS`, and `COMPLETED`
- Simple backend structure: controller, service, repository, entity
- Uses the `Task` entity directly to keep the code small and easy to read
- Simple frontend served from Spring Boot static resources

## Run

1. Create a MySQL database, for example `todoapp`.
2. Update the database settings in `src/main/resources/application.properties`.
3. Run the app with `mvn spring-boot:run`.
4. Open `http://localhost:8080`.