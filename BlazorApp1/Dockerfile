# Используем официальный образ .NET SDK для сборки приложения
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Копируем csproj и восстанавливаем зависимости
COPY BlazorApp1/*.csproj ./BlazorApp1/
RUN dotnet restore ./BlazorApp1/BlazorApp1.csproj

# Копируем остальные файлы проекта
COPY BlazorApp1/. ./BlazorApp1/

WORKDIR "/src/BlazorApp1"
RUN dotnet build "BlazorApp1.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "BlazorApp1.csproj" -c $BUILD_CONFIGURATION -o /app/publish

# Используем официальный образ .NET Runtime для финального контейнера
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final 
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "BlazorApp1.dll"]
