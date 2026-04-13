FROM php:8.2-fpm-alpine

RUN docker-php-ext-install pdo pdo_mysql

WORKDIR /app
COPY . .

RUN composer install --no-dev --optimize-autoloader

CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=$PORT