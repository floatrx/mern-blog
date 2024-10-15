# Use the official MongoDB image as the base image
FROM mongo:latest

# Install wget, gnupg, and lsb-release
RUN apt-get update && apt-get install -y wget gnupg lsb-release

# Add the MongoDB official repository
RUN wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add - && \
    echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list && \
    apt-get update

# Install the MongoDB shell
RUN apt-get install -y mongodb-org-shell

# Expose the default MongoDB port
EXPOSE 27017

# Set the default command to run MongoDB
CMD ["mongod"]
