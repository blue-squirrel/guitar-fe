FROM node:14

WORKDIR /app
COPY ./ /app
RUN npm install && npm run build
COPY /app/dist /usr/share/nginx/html

# FROM nginx

# RUN mkdir /app
# # --from=0获取第一阶段构建完成的目录
# COPY --from=0 /app /app
# # COPY /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf

# FROM node:14