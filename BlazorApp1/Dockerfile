# Этап базового образа
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app

# Этап сборки
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Копируем файл проекта и восстанавливаем зависимости
COPY ["BlazorApp1.csproj", "./"]
RUN dotnet restore "BlazorApp1.csproj"

# Копируем остальные файлы
COPY . .

# Собираем приложение
RUN dotnet build "BlazorApp1.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Выводим содержимое папки с собранными файлами
RUN ls -la /app/build

# Этап публикации
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "BlazorApp1.csproj" -c $BUILD_CONFIGURATION -o /app /p:UseAppHost=false || { echo 'Ошибка публикации'; exit 1; }

# Проверяем и выводим содержимое папки с опубликованными файлами
RUN if [ -d /app ]; then echo "Директория существует"; ls -la /app; else echo "Директория не найдена"; fi

# Этап финального образа
FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "BlazorApp1.dll"]
