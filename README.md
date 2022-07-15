# Alura Geek

> Status do projeto: Em desenvolvimento

Projeto da 3° edição de Front-End do Alura Challenges, baseado numa loja virtual de produtos do universo geek. A minha versão do projeto é desenvolvida em Vue.js na versão 3, com TypeScript e usando recursos como Vuex e Vue-router.

A api front-end da loja Alura Geek não possui um banco de dados real nem uma api back-end, tudo é simulado com a bibilioteca json-server. Há um sistema de cadastro e login de usuários improvisado também com json-server, sem autenticação via Token JWT como seria o ideal por conta dessa limitação.

## Setup

```sh
npm install
npm install -g json-server
```

### Subir servidor de desenvolvimento

```sh
npm run serve
```

### Subir banco de dados simulado

```sh
json-server --watch db.json
```

### Build da aplicação

```sh
npm run build
```
