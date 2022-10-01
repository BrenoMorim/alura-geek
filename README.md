# Alura Geek

> Status do projeto: Concluído

Projeto da 3° edição de Front-End do Alura Challenges, baseado numa loja virtual de produtos do universo geek. A minha versão do projeto é desenvolvida em Vue.js na versão 3, com TypeScript e usando recursos como Vuex, Vue-router e axios.

A api front-end da loja Alura Geek não possui um banco de dados real nem uma api back-end, tudo é simulado com a bibilioteca json-server. Há um sistema de cadastro e login de usuários improvisado também com json-server, sem autenticação via Token JWT como seria o ideal por conta dessa limitação.

## Detalhes da aplicação

A aplicação permite que um usuário se cadastre ou faça login, para navegar entre os produtos e inclusive fazer pesquisas, além de que é possível enviar mensagens para a loja. Se o usuário logado for um admin, novas funcionalidades ficam disponíveis, como adicionar, editar e excluir produtos.

## [Site da Alura](https://www.alura.com.br)

## Setup

```sh
git clone https://github.com/BrenoMorim/alura-geek.git alura-geek
cd alura-geek
npm install
npm install -g json-server
```

### Subir servidor de desenvolvimento

```sh
npm run serve
```

### Subir banco de dados simulado

```sh
npm run api
```

### Build da aplicação

```sh
npm run build
```
