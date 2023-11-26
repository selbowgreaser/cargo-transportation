FROM node:16-alpine
WORKDIR /app
ADD *.json ./
RUN npm install
ADD . .
RUN npm run build
ENV NODE_ENV production
EXPOSE 3000
CMD ["npm", "start"]
