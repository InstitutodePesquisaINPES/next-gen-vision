# Etapa 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# Argumentos para o Vite (Supabase)
ARG VITE_SUPABASE_PROJECT_ID
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ARG VITE_SUPABASE_URL

# Passando argumentos para variáveis de ambiente do build
ENV VITE_SUPABASE_PROJECT_ID=$VITE_SUPABASE_PROJECT_ID
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Produção com Nginx
FROM nginx:stable-alpine
# Vite gera os arquivos na pasta 'dist'
COPY --from=build /app/dist /usr/share/nginx/html

# Configura o Nginx para rodar na porta 8080
RUN sed -i 's/80/8080/g' /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
