# Base image
FROM node:21-alpine
# Create app directory
WORKDIR /usr/src/app
# Copy Package json
COPY package.json ./
# Install app dependencies
RUN yarn

RUN yarn add bcrypt
# Bundle app source
COPY . .
# Copy the .env
COPY .env ./
# Creates a "dist" folder with the production build
RUN yarn build
# Start the server using the production build
CMD ["yarn", "start:prod"]
