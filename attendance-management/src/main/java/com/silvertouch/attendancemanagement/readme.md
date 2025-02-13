Steps performed for task 4
1) add the dependencies in pom.xml  <dependency>
   <groupId>org.postgresql</groupId>
   <artifactId>postgresql</artifactId>
   <version>42.7.5</version>
   </dependency> and  <dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-jpa</artifactId>
   </dependency>
2) now add following in application.properties 
3) spring.datasource.username=postgres
   spring.datasource.password=
   spring.datasource.url=jdbc:postgresql://localhost:5432/dbname
   spring.datasource.driver-class-name=org.postgresql.Driver
   spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
4) Test connection ```java
try{
         Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/attendance_management_system","postgres","1234");
         if(conn != null) {
         System.out.println("Connected to PostgreSQL database");
         }
         }catch(Exception e){
         System.out.println("Error when connecting to postgres" + ": " + e.getMessage());
         }```

To create table we need to create entities which are pojo(plain old java objects) that represent structure of a table.
one field means one row in table.
@Table annotation to override the default table name.
@Id
@GeneratedValue(strategy = GenerationType.AUTO) to make it primary key
Hibernate expects entities to have a no-arg constructor,
Spring Data JPA uses reflection and code generation to create a concrete implementation of these interfaces at runtime so that you do not have to write this boilerplate code yourself.









# Steps Performed For Task 5
1) What is a Maven?
-- Maven is a just a tool which helps programmers to manage their project dependencies,and all the things they need to build a project.
-- Maven do dependency management, builds and test also our project 
-- To run that use mvnw [options] [<goal(s)] [<phase(s)>]
-- Maven has 3 phases 1) Clean 2) default 3) Site
-- phases can be as lifecycle it contain one or more goals
-- 1) Clean - Removed the temp directory and files
   -- pre-clean - Hook for before cleaning
   -- clean - Does the actual cleaning 
   -- post-clean - Hook for after cleaning
-- 2) default - Where the most useful goals live if u want to run all this things it will execute in sequnce like lifecycle
   -- compile - Compile your code into bytecode
   -- test - Runs unit tests
   -- package - Creates the jar or war file
   -- verify - Runs check and integration tests
-- 3) site - Where documentation is generated
-- 1) To run project in production using maven use mvn or ./mvnw clean package then java -jar target/attendance-management-system-0.0.1-SNAPSHOT.jar
-- 2) Also we can run directly spring boot application using ./mvnw spring-boot:run


2) Think any type of application in terms of following
-- 1) Persistence layer -> handle interaction with db. used Entities which are basically just a tables 2 methods and both handle crud
   -- 1) Repositories 
   -- 2) DAO (data access object)
-- 2) Service layer -> which can handle business logic or just a bridge between controller and repository. we don't want client to direct talk with persistence layer
-- 3) Presentation layer -> which is basically a controller which handle the http requests from external clients and maps api endpoints to specific methods and talks with service layer to process that external request

3) Declare Beans using @Configuration or @Components
-- @Configuration annotation tells Spring to look in this class for @Bean declarations
-- So when out application starts up, Spring will look for any @Bean methods in this class and execute them to create beans in the Spring application context
-- @Component annotation tells Spring that a class is a bean and should be managed by the Spring IoC container and put inside the application context also if any dependencies i need then just inject it

4) Component Scanning
-- As we mentioned that @Component, @Service, And Bean Declaration and Spring will look for them when appplication starts but how? its called component scanning
-- when app starts spring will look for beans and where beans are needed
-- So if found the bean then it first check for if it needs another dependency if not then it just create instance of class and place it as bean in application context. 
-- so if other class need it look in application context pool of dependencies so it will just use that from application context 
-- Spring Boot automatically enables @Component scanning. This happens because the @SpringBootApplication annotation includes the @ComponentScan annotation under the hood.
5) This process called Dependency injection but can be called as @AutoWired Spring Specific term 

6) @SpringBootApplication 
-- So @Component defined then it start search from there and go down to all the classes and find the beans and put them in application context
-- but @SpringBootApplication is the main class which is the entry point of the application and it also includes @ComponentScan annotation which tells spring to start scanning from this package and its subpackages
-- It has various notations
-- 1) @Configuration - This annotation is used to mark a class as a configuration class. This class will contain bean definitions. and Spring will look for @Bean methods in this class and execute
-- 2) @ComponentScan - Look for Beans and place it where it is needed 
-- 3) @EnableAutoConfiguration - This annotation tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings. For example, if spring-webmvc is on the classpath, this annotation flags the application as a web application and activates key behaviors, such as setting up a DispatcherServlet.
7) JDBC and JPA
-- JDBC(Java Database connectivity) is low level API to interact with database need to write sql queries but need to handle the to and from mappings of java objects
-- JPA (Java Persistance API) allows you to interact with database using java objects handles all the generation of SQL and to and from mappings and built on top of jdbc can easily swap db
-- JPA is a specification, not a framework. actual implementation used by spring is hibernate (ORM - Object relational mapping).
-- Spring Data JPA is built on top of the JPA specification and provides a set of abstractions and helper classes to simplify JPA development 
8) H2 memory Database
-- if h2 found in classpath it will automatically create the beans in order to connect to the h2 database 
-- also no need for username and password it will be already done can specify extenally db in application.properties
-- like spring.datasource.url=jdbc:h2:mem:testdb, spring.datasource.driver-class-name=org.h2.Driver, spring.datasource.username=sa, spring.datasource.password=, spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
9) DAO (Data access object)
-- this class is responsible for handling the interaction with the database
-- it is separate from the service layer and persistence layer
10) DAO Vs DTO
-- DAO is responsible for handling the interaction with the database like getting full database records, updating records, deleting records0
-- DTO is responsible for carrying data between the layers of an application. its like to return only specific response to the client hiding the sensitive fields
-- DAO should not be exposed to the client directly! Instead, use DTOs to filter what gets sent to the client.