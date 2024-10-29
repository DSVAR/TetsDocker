FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

EXPOSE 80

COPY *.csproj ./
RUN dotnet restore "BlazorApp1.csproj"

RUN echo "Содержимое каталога ./:" && ls -l ./

COPY . ./
RUN dotnet publish Client -c Release -o /app/publish

RUN echo "Содержимое каталога publish:" && ls -l /app/publish

FROM nginx:alpine
#копируем все с build
COPY --from=build /app/publish/wwwroot /usr/share/nginx/html
RUN echo "Содержимое каталога usr:" && ls -l /usr
RUN echo "Содержимое каталога usr/share:" && ls -l /usr/share
RUN echo "Содержимое каталога usr/shre/nginx:" && ls -l /usr/share/nginx
RUN echo "Содержимое каталога /usr/share/nginx/html:" && ls -l /usr/share/nginx/html
# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf  


CMD ["nginx", "-g", "daemon off;"]
