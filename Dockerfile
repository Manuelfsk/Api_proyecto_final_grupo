FROM node:20.12.2
WORKDIR /app
COPY package*.json ./
RUN yarn install --production
COPY . .
CMD ["node", "app.js"]
EXPOSE 3000


