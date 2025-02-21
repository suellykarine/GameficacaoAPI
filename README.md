# EngageAPI

Este é um backend desenvolvido para gerenciar a pontuação (streak) de usuários com base nas leituras de newsletters. Ele permite registrar leituras de newsletters, acompanhar o streak de cada usuário e obter métricas gerais de engajamento, como o ranking de leitores mais engajados.

## Funcionalidades

- Registrar leituras: Processa um webhook para registrar as leituras de newsletters e atualizar o streak do usuário.
- Consultar estatísticas do usuário: Obtém informações sobre o usuário, como o streak e o histórico de leituras.
- Métricas gerais de engajamento: Obtém métricas como o total de usuários e leituras realizadas.
- Ranking dos usuários: Recupera os 10 usuários com maior streak.

## Tecnologias utilizadas

- Node.js: Plataforma para a execução do servidor.
- Express: Framework para criação das rotas e manipulação das requisições.
- Drizzle ORM: ORM para interagir com o banco de dados SQLite.
- SQLite: Banco de dados relacional leve para armazenar dados de usuários e leituras.

## Como rodar o projeto EngageAPI

Antes de rodar o projeto, verifique se tem as seguintes ferramentas instaladas:

Node.js (versão 14 ou superior)
npm (gerenciador de pacotes do Node.js).

#### Passos para rodar o projeto

- Clone do repositório : git clone <url-do-repositorio>
- Instale as dependencias: npm install
- Inicie o servidor: npm start: A API ficará acessível na URL http://localhost:3001 (ou na porta configurada no seu projeto).
