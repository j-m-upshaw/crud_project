# crud_project

# Notes while working on this project

- 'npm start' command doesn't work and is outdated. Instead used the command 'docker-compose up --build' command to run the docker and database side-by-side

- create a new terminal to test routes since the first terminal is running the docker and database

- example of creating a employee using a curl POST command
  - Invoke-RestMethod -Uri <http://localhost:8082/post> `
    -Method POST `
    -Headers @{ "Content-Type" = "application/json" } `
    -Body (@{ userName = "Apple Bees"; password = "admin9876" } | ConvertTo-Json)


- to check if done properly
    1. docker exec -it <container-name> mongosh
    2. use docker-node-mongo
    3. db.users.find().pretty()