FROM node:14

WORKDIR /app

COPY ./backend /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]