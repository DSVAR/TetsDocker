## Этап сборки
#FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
#WORKDIR /src
#
## Копируем файл проекта и восстанавливаем зависимости
#COPY ["BlazorApp1.csproj", "./"]
#RUN dotnet restore "BlazorApp1.csproj"
#
#COPY . .
#
## Собираем приложение
#RUN dotnet publish "BlazorApp1.csproj" -c Release -o /app/publish
#
## Этап финал Nginx
#FROM nginx:alpine AS final
#
## Копируем файлы в директорию Nginx
#COPY --from=build /app/publish /usr/share/nginx/html
#
## Копируем конфигурацию Nginx
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#
## Открываем порт 80
#EXPOSE 80
#
## Запускаем Nginx
#ENTRYPOINT ["nginx", "-g", "daemon off;"]


# Используем официальный образ .NET SDK для сборки приложения
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Копируем csproj и восстанавливаем зависимости
COPY *.csproj ./
RUN dotnet restore

# Копируем остальные файлы и собираем приложение
COPY . ./
RUN dotnet publish -c Release -o out

# Используем официальный образ Nginx для развертывания
FROM nginx:alpine
COPY --from=build /app/out/wwwroot /usr/share/nginx/html
COPY --from=build /app /app 
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
