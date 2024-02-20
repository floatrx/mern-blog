### Environment
`cp .env.example .env` # Copy the environment file
```shell
PORT=3000 # Port to run the server (default 3000)
MONGO_URI=mongodb://user:user@localhost:27017 # MongoDB URI
```

### Express
`yarn install` # Install the dependencies

`yarn start` # Start the server

`yarn dev` # Start the server in development mode

### Dependencies
- express - Web framework
- mongoose - MongoDB ORM
- dotenv - Environment variables
- tsconfig-paths - Resolve aliases in ts-node
- ts-node - Run typescript files

### TODO
- [x] MongoDB (Docker)
- [ ] Authentication
- [ ] UI (Client App)
- [ ] Editor
- [ ] Add tags
