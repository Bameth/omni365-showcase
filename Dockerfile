# --- PHASE 1 : Build Angular application ---
FROM node:20.19.0 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build Angular application
RUN npm run build --configuration production


# --- PHASE 2 : Serve Angular app with NGINX (OpenShift-compatible) ---
FROM nginxinc/nginx-unprivileged:1.27-alpine

# OpenShift will assign a random non-root UID,
# but this ensures directories are writable by non-root users
USER 101

# Copy Angular compiled output
COPY --from=builder /app/dist/* /usr/share/nginx/html/

# Copy custom NGINX config (SPA routing, port 8080)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose unprivileged port
EXPOSE 8080
