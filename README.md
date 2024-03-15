# Mongoose-express with client app (React)

A simple express server with mongoose (ODM) with typescript and a client app (Vite/React) to manage the blog posts and other data.
Demo https://blog.floatrx.net/

> [!NOTE]
> The main goal is to demonstrate how MongoDB works with Express server in Node.js, using the Mongoose ODM. 
> I created a simple client-side part for demonstration purposes. 
> For a search engine-friendly blog, it's best to go with Next.js. 

![blog](./client/public/post-view.png)

### MdxEditor (client)
![blog](./client/public/post-editor.png)

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
- [ ] OAuth2 (GitHub)
- [ ] find post by author tag
- [ ] paginate posts
- [ ] find posts by tag

## Deployment
1. Setup mongo with docker or use a cloud service
2. Setup server with pm2 and nginx (check ecosystem.config.js for more information)
3. Setup client with nginx
### Nginx (example configuration)
```nginx configuration
# API
server {
    server_name blog-api.floatrx.net;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    error_log /var/log/nginx/blog-api-error.log;
}
# CLIENT
server {
    server_name blog.floatrx.net;
    root /var/www/blog;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

> [!NOTE]
> Use certbot to generate SSL certificates.

Happy coding! 🚀
