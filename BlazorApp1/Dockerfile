# Используем официальный образ .NET SDK для сборки приложения
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app


FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Копируем csproj и восстанавливаем зависимости
COPY *.csproj ./
RUN dotnet restore
COPY . .
WORKDIR "/src/BlazorApp1"
RUN dotnet build "BlazorApp1.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "BlazorApp1.csproj"  -c $$BUILD_CONFIGURATION -o /app/publish

FROM base AS final 
WORKDIR /app
COPY --from=publish /app/publish .
    
# Копируем все файлы и собираем проект
#COPY . ./
#RUN dotnet publish -c Release -o out
#
## Используем официальный образ .NET Runtime для запуска приложения
#FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
#WORKDIR /app
#
#
#COPY --from=build-env /app/out .

# Указываем команду для запуска приложения при старте контейнера 
ENTRYPOINT ["dotnet", "BlazorApp1.dll"]
#ENTRYPOINT ["/bin/sh"]
