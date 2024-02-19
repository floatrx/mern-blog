# Mongo, express

### MongoDB
`docker-compose up -d` # Start the mongodb

`docker-compose down` # Stop the mongodb

### Environment
`cp .env.example .env` # Copy the environment file

### Express
`yarn install` # Install the dependencies

`yarn start` # Start the server

`yarn dev` # Start the server in development mode

## Test in Postman
Use the random data generator to test the API in postman
```json
{
  "name": "{{$randomFirstName}} {{$randomLastName}}",
  "email": "{{$randomBsBuzz}}@{{$randomDomainName}}",
  "password": "test"
}
```
Pre-request script
```javascript
pm.variables.replaceIn('{{$randomFirstName}} {{$randomLastName}}');
pm.variables.replaceIn('{{$randomDomainName}}');
pm.variables.replaceIn('{{$randomBsBuzz}}');
```
