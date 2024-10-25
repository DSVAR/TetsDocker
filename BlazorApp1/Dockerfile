# Этап сборки
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копируем файл проекта и восстанавливаем зависимости
COPY ["BlazorApp1.csproj", "./"]
RUN dotnet restore "BlazorApp1.csproj"

COPY . .

# Собираем приложение
RUN dotnet publish "BlazorApp1.csproj" -c Release -o /app/publish

# Этап финал Nginx
FROM nginx:alpine AS final

# Копируем файлы в директорию Nginx
COPY --from=build /app/publish /usr/share/nginx/html

# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 8080

# Запускаем Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
#