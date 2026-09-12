# Mongo, express

### Test credentials
`admin@test.com` / `123456` — see [Test credentials](../README.md#test-credentials)
in the root README for the full list and how they are seeded.

### MongoDB
`docker compose up -d` # Start the mongodb (or `pnpm mongo` from the repo root)

`docker compose down` # Stop the mongodb

Data is bind-mounted to `./mongo/data`, so it survives restarts — delete that
directory for a clean slate. The container is pinned to `mongo:7`; see the note in
[docker-compose.yml](../docker-compose.yml).

OR use [CloudMongoDB](https://cloud.mongodb.com/).
💻🌐 #FullStack #Express #MongoDB #React #Vite #TailwindCSS #ModernDevelopment #WebDevelopment
