FROM node:latest AS base

FROM base AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# ENV PORT=3040
# ENV NODE_ENV=development
EXPOSE 3040

CMD ["npm", "run", "dev"]


FROM base AS production

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 3040

CMD ["npm", "start"]


