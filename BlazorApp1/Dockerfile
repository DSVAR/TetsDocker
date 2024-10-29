FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 5082
EXPOSE 7200

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["BlazorApp1.csproj", "./"]
RUN dotnet restore "BlazorApp1.csproj"


RUN echo "Содержимое каталога ./:" && ls -l ./
COPY . .
WORKDIR "/src/"
RUN dotnet build "BlazorApp1.csproj" -c $BUILD_CONFIGURATION -o /app/

RUN echo "Содержимое каталога build:" && ls -l /app/

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "BlazorApp1.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Проверяем содержимое каталога out
RUN echo "Содержимое каталога publish:" && ls -l /app/publish
RUN echo "Содержимое каталога build:" && ls -l /app/


FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .



ENTRYPOINT ["dotnet", "BlazorApp1.dll"]
