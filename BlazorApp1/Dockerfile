# Используем образ ASP.NET Core для выполнения приложения.
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5082   
# HTTP порт
EXPOSE 7200
 # HTTPS порт

# Используем образ SDK для сборки приложения.
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release

# Устанавливаем рабочую директорию для сборки.
WORKDIR /src

# Копируем только csproj и восстанавливаем зависимости.
COPY ["BlazorApp1/BlazorApp1.csproj", "BlazorApp1/"]
RUN dotnet restore "BlazorApp1/BlazorApp1.csproj"

# Копируем остальные файлы проекта в рабочую директорию.
COPY BlazorApp1/. BlazorApp1/

# Переходим в папку с проектом перед публикацией.
WORKDIR "/src/BlazorApp1"
RUN dotnet publish "BlazorApp1.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app

# Копируем опубликованные файлы из предыдущего этапа.
COPY --from=build /app/publish .

# Указываем точку входа приложения.
ENTRYPOINT ["dotnet", "BlazorApp1.dll"]
