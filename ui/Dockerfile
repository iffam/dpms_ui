FROM node:22.12.0 AS build

WORKDIR /src
RUN npm install -g @angular/cli

COPY package*.json ./
RUN npm ci

COPY . ./
RUN ng build --configuration=production

FROM nginx:stable AS final
EXPOSE 80
COPY --from=build /src/dist/dpms/browser /usr/share/nginx/html