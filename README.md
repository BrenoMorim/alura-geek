# Alura Geek

> Status do projeto: Concluído

Uma loja virtual de produtos geek para praticar desenvolvimento front-end com Vue.

| :placard: Vitrine.Dev |     |
| -------------  | --- |
| :sparkles: Nome        | **Alura Geek**
| :label: Tecnologias | Vue, TypeScript, HTML, CSS
| :fire: Desafio     | https://www.alura.com.br/challenges/front-end-3

![](https://github.com/BrenoMorim/alura-geek/blob/main/imagem-projeto.png#vitrinedev)

## Detalhes da aplicação

A api front-end da loja Alura Geek não possui um banco de dados real nem uma api back-end, tudo é simulado com a bibilioteca json-server. Há um sistema de cadastro e login de usuários improvisado também com json-server, sem autenticação via Token JWT como seria o ideal por conta dessa limitação.

A aplicação permite que um usuário se cadastre ou faça login, para navegar entre os produtos e inclusive fazer pesquisas, além de que é possível enviar mensagens para a loja. Se o usuário logado for um admin, novas funcionalidades ficam disponíveis, como adicionar, editar e excluir produtos.

### [Site da Alura](https://www.alura.com.br)

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
