# Используем официальный образ .NET 8 SDK для сборки приложения
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Копируем csproj и восстанавливаем зависимости
COPY *.csproj ./
RUN dotnet restore

# Копируем все файлы и собираем приложение
COPY . ./
RUN dotnet publish -c Release -o out

# Проверяем содержимое каталога out
RUN echo "Содержимое каталога out:" && ls -l /app/out

# Используем официальный образ .NET 8 для запуска приложения
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out ./

# Указываем команду для запуска приложения
ENTRYPOINT ["dotnet", "BlazorApp1.dll"]  
# Замените на ваше имя сборки
