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
RUN dotnet publish "BlazorApp1.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Выводим содержимое папки с опубликованными файлами
RUN echo "Содержимое папки /app/publish:" && ls -la /app/publish

# Этап финального образа
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BlazorApp1.dll"]
