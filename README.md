# Alura Geek

> Status do projeto: Concluído

Uma loja virtual de produtos geek para praticar desenvolvimento front-end com Vue.

| :placard: Vitrine.Dev |     |
| -------------  | --- |
| :sparkles: Nome        | **Alura Geek**
| :label: Tecnologias | Vue, TypeScript, HTML, CSS
| :fire: Desafio     | <https://www.alura.com.br/challenges/front-end-3>

![Página inicial do projeto](https://github.com/BrenoMorim/alura-geek/blob/main/imagem-projeto.png?raw=true#vitrinedev)

## Detalhes da aplicação

A api front-end da loja Alura Geek não possui um banco de dados real nem uma api back-end, tudo é simulado com a bibilioteca json-server. Há um sistema de cadastro e login de usuários improvisado também com json-server, sem autenticação via Token JWT como seria o ideal por conta dessa limitação.

A aplicação permite que um usuário se cadastre ou faça login, para navegar entre os produtos, fazer pesquisas, adicionar produtos no seu carrinho e realizar pedidos, além de que é possível enviar mensagens para a loja. Se o usuário logado for um admin, novas funcionalidades ficam disponíveis, como adicionar, editar e excluir produtos. Os usuários padrões para acesso são: teste@usuario.com - 1234567 e admin@admin.com - admin123.

Também há um sistema de criptografia de senhas improvisado usando crypto-js e algumas variáveis como a chave privada para criptografia e a url da api back-end simulada são externalizadas por ambiente.

A aplicação conta também com testes automatizados, que testam desde os componentes separados até as views completas. A implementação dos testes foi feita com a biblioteca vitest, que é uma das ferramentas com maior compatibilidade com Vue.

## Features

- Cadastro e login de usuários
- Buscas por produtos por categoria e/ou nome
- Visualização de detalhes dos produtos
- Envio de mensagens para a equipe pelo rodapé das páginas
- Adição de produtos no carrinho
- Finalização de compra
- Criação de novos produtos para usuários administradores

## Páginas

### Login

![Página de Login](./paginas/login.png)

### Cadastro

![Cadastro de usuário](./paginas/cadastro.png)

### Busca

![Busca](./paginas/busca.png)

### Detalhes de produto

![Página de detalhes do produto](./paginas/detalhes-produto.png)

### Carrinho

![Página de carrinho](./paginas/carrinho.png)

### Cadastro de novo produto

![Página de cadastro de novos produtos](./paginas/novo-produto.png)

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

### Executar testes automatizados

```sh
npm test
```

### Build da aplicação

```sh
npm run build
```
