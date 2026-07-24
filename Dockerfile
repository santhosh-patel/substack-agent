FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY landing-page/package.json landing-page/package-lock.json ./landing-page/

RUN npm ci && cd landing-page && npm ci && cd ..

COPY . .

RUN npm run build

ENV NODE_ENV=production
EXPOSE 3456

CMD ["npm", "start"]
