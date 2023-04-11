# FROM node

# WORKDIR /app
# COPY ./ /app
# # RUN npm install && npm run build
# RUN npm install

# # FROM nginx

# # RUN mkdir /app
# # --from=0获取第一阶段构建完成的目录
# # COPY --from=0 /app/dist /app
# COPY --from=0 /app /app
# # COPY /app/dist /usr/share/nginx/html
# # COPY nginx.conf /etc/nginx/nginx.conf
# CMD npm run dev

FROM node:14
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .