# Mongoose-express with client app (React)
A simple express server with mongoose and dotenv with typescript and a client app (React) to manage the data.


## Pre-requisites
> ### Database: MongoDB
> Check the [mongodb](./mongo/README.md) README for more information.

> ### Client & Server
> Check the [client](./client/README.md) and [server](./server/README.md) READMEs for more information.

## Development
```shell
yarn dev
```

> [!NOTE]
> Mount the `mongo` container before running the server.


## Roadmap
- [x] MongoDB (Docker)
- [ ] Authentication (server) -> JWT, bcrypt, middleware (Oauth?) ⏳
- [ ] Add users ⏳
- [ ] Add roles ⏳
- [ ] Add posts (auth) ⏳
  - [ ] create post
  - [ ] update post
  - [ ] delete post
  - [ ] find post by id, title, author or tag
  - [ ] find all posts
  - [ ] paginate posts
  - [ ] add default sort
- [ ] Add tags ⏳
  - [ ] find posts by tag
  - [ ] create tag
  - [ ] delete tag
  - [ ] add tag to post
  - [ ] remove tag from post

## Client
- [x] Add Redux-Toolkit
  - [x] Add endpoints
    - [x] auth
      - [ ] move session from localstorage to redux -> setup persist
    - [x] user
    - [ ] posts
      - [ ] create post view with editor (markdown)
    - [ ] tags 
      - [ ] find posts by tag
      - [ ] create tag
      - [ ] delete tag
      - [ ] add tag to post
      - [ ] remove tag from post
- [ ] Upd BaseQueryFn ⏳
- [x] Add TailwindCSS & ShadCN components
- [ ] Create Router ⏳
- [ ] Add Views ⏳
  - [x] login
  - [x] register
  - [ ] posts 
  - [ ] posts 
  - [ ] tags
