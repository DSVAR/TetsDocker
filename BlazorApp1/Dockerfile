FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
EXPOSE 5082
EXPOSE 7200

WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Копируем файл проекта в папку /src/BlazorApp1/
COPY ["blazorapp1/Blazorapp.csproj", "blazorapp1/"]

# Выполняем восстановление зависимостей для проекта
RUN dotnet restore "blazorapp1/Blazorapp.csproj"

# Копируем остальные файлы проекта в контейнер
COPY blazorapp1/. blazorapp1/

WORKDIR "/src/blazorapp1"
RUN dotnet build "Blazorapp.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Blazorapp.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Blazorapp.dll"]
