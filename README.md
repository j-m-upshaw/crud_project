# crud_project

# Notes while working on this project

- 'npm start' command doesn't work and is outdated. Instead used the command 'docker-compose up --build' command to run the docker and database side-by-side

- create a new terminal to test routes since the first terminal is running the docker and database

- to check if done properly
    1. docker exec -it <container-name> mongosh
    2. use docker-node-mongo
    3. db.users.find().pretty()

- to use with React use "http://localhost:3000/" after running the 'docker-compose up --build'

## User Commands

### User Creation:
```
Invoke-WebRequest -Uri "http://localhost:8082/auth/register" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body (@{
    userName = "johndoe"
    email    = "johndoe@example.com"
    password = "securePassword123"
  } | ConvertTo-Json -Depth 2) | Select-Object -ExpandProperty Content

```

### User Log In:
```
Invoke-WebRequest -Uri "http://localhost:8082/auth/login" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body (@{
    email    = "johndoe@example.com"
    password = "securePassword123"
  } | ConvertTo-Json -Depth 2) | Select-Object -ExpandProperty Content
```

### Temp Admin Shortcut Log In:
```
Invoke-WebRequest -Uri "http://localhost:8082/auth/login" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body (@{
    email    = "admin"
    password = "admin"
  } | ConvertTo-Json -Depth 2) | Select-Object -ExpandProperty Content
```

## Department Commands

### Department Creation:
```
Invoke-RestMethod -Uri "http://localhost:8082/department/newDep" `
  >> -Method POST `
  >> -Headers @{ "Content-Type" = "application/json" } `
  >> -Body (@{ name = "Surgery" } | ConvertTo-Json)
```

### Retrieve all Departments:
`
Invoke-RestMethod -Uri "http://localhost:8082/department/allDep" -Method GET
`

### Get all employees in a Department:
`
Invoke-RestMethod -Uri "http://localhost:8082/department/getDep/Surgery" -Method GET
`

### Delete Department
`
Invoke-RestMethod -Uri "http://localhost:8082/department/deleteDep/Apples" -Method DELETE
`

## Employee Commands

### Employee Creation:
```
Invoke-RestMethod -Uri "http://localhost:8082/employee/newEmp" `
>> -Method POST `
>> -Headers @{ "Content-Type" = "application/json" } `
>> -Body (@{
>> firstName = "Lisa"
>> lastName = "Harris"
>> department = "Orthodontics"
>> } | ConvertTo-Json)
```

### Get all employees:
`
Invoke-RestMethod -Uri "http://localhost:8082/employee/allEmp" -Method GET
`

### Get info of a employee
`
Invoke-RestMethod -Uri "http://localhost:8082/employee/getEmp/Tom" -Method GET
`

### Delete a employee
```
Invoke-RestMethod -Uri "http://localhost:8082/employee/deleteEmp/Tom/Jerry" `
>> -Method DELETE
```

### Update employee department
```
Invoke-RestMethod -Uri "http://localhost:8082/employee/updateEmp/Tom/Jerry/Surgery" `
>> -Method PATCH
```
