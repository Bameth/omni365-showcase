# --- PHASE 1 : Build Angular application ---
FROM node:20.19.0 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm install

COPY . .

#RUN npm run build --configuration production
RUN npm run build

# --- PHASE 2 : Serve Angular app with NGINX (OpenShift-compatible) ---
FROM nginxinc/nginx-unprivileged:1.27-alpine

USER 101

COPY --from=builder /app/dist/* /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
