FROM node:carbon-alpine as dist
WORKDIR /tmp/
ENV .env /
COPY package*.json ./ 
COPY public/ public/
COPY src/ src/
RUN npm install
RUN npm run build
RUN npm install

# Bundle app source
COPY . .

EXPOSE 80
CMD [ "npm", "start" ]