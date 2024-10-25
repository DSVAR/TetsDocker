# Используем официальный образ .NET SDK для сборки приложения
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Копируем csproj и восстанавливаем зависимости
COPY *.csproj ./
RUN dotnet restore

# Копируем все файлы и собираем проект
COPY . ./
RUN dotnet publish -c Release -o out

# Используем официальный образ .NET Runtime для запуска приложения
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Копируем собранные файлы из предыдущего этапа сборки
COPY --from=build-env /app/out .

# Указываем команду для запуска приложения при старте контейнера 
#ENTRYPOINT ["dotnet", "BlazorApp1.dll"]
ENTRYPOINT ["/bin/sh"]
