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
