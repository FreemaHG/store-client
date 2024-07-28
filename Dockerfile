# 1 этап сборки
# образ для скачивания, через AS задаем имя 1 этапу этапу сборки
FROM node:13.12.0-alpine as build
# устаналиваем рабочую директорию (в контейнере будет создана папка app)
WORKDIR /app
# добавляем переменную окружения для простоты запуска пакетов в контейнере без указания полного пути
ENV PATH /app/node_modules/.bin:$PATH
# копируем файлы с зависимостями
COPY package.json ./
# устанавливаем зависимости
RUN npm install --only=prod
COPY .env.template .env
# копируем все
COPY . ./
# запускаем сборку прод-версии приложения (создание статических файлов с приложением)
RUN npm run build

# 2 этап сборки
# образ для скачивания nginx (для раздачи статики)
FROM nginx:stable-alpine
# копируем собранные файлы прод-версии приложения из прошлого этапа build
COPY --from=build /app/build /usr/share/nginx/html
# для корректной работы React Router копируем измененный файл с конфигами nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# порт для прослушивания nginx
EXPOSE 80
# запуск nginx
CMD ["nginx", "-g", "daemon off;"]