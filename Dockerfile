FROM vue-page
COPY ./ /home/build
WORKDIR /home/build
Run pnpm install
RUN pnpm run build


FROM nginx
COPY default.conf /etc/nginx/conf.d/
COPY --from=0 /home/build/dist/ /usr/share/nginx/html/
EXPOSE 80

