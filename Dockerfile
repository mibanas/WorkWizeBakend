# specify the parent image
FROM node:18-alpine

# specify the working directory of the image
WORKDIR /BackendWorkWize

# copy package.json and package-lock.json to root directory (which is now /BackendWorkWize)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy the rest of the project files to /BackendWorkWize
COPY . .

# expose the port that the Next.js application will run on
EXPOSE 3002

# start the Next.js application
CMD [ "npm", "start" ]
