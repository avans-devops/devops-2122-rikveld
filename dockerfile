FROM node:14

WORKDIR /app

COPY ./backend /app

ENV PORT 12345
ENV DB_PORT 27017
ENV MONGO_URL mongodb://mongo-devops:27017
ENV DB_NAME mongo-devops

RUN npm install
RUN npm install nodemon -g

EXPOSE 12345

CMD ["npm", "run", "dev"]