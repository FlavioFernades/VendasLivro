Projeto Final - Plataforma de Venda de Livros

Objetivo:

Consolidar os conhecimentos aprendidos ao longo do curso em um único projeto prático. Ao final, você terá implementado uma API completa com autenticação, deploy, integração e documentação.


Pré-requisitos:

Node.js (versão 14 ou superior)

NPM ou Yarn

Git


Como Instalar a Base do Projeto:

1. Clone o repositório

git clone https://github.com/RParadeda/projeto-final-venda-livros.git

cd projeto-final-venda-livros

2. Instale as dependências

npm install

3. Configure o ambiente

Crie um arquivo .env na raiz do projeto baseado no .env.example:

PORT=3000

JWT_SECRET=segredoDoJWT

DATABASE_URL=sqlite::memory:

4. Inicie o servidor

npm start

5. Teste a aplicação

Acesse http://localhost:3000/livros para verificar se a API está funcionando.


Rotas Disponíveis


Autenticação

POST /auth/login - Login de usuário

POST /auth/register - Registro de novo usuário


Livros

GET /livros - Lista todos os livros

GET /livros/:id - Busca um livro específico

POST /livros - Adiciona novo livro

PUT /livros/:id - Atualiza um livro

DELETE /livros/:id - Remove um livro


Contribuição

Faça um Fork do projeto

Crie uma Branch para sua Feature (git checkout -b feature/AmazingFeature)

Faça o Commit das suas mudanças (git commit -m 'Add some AmazingFeature')

Faça o Push da Branch (git push origin feature/AmazingFeature)

Abra um Pull Request



Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

Contato
Raul Paradeda - @paradeda - raulparadeda@uern.br
Link do Projeto: https://github.com/RParadeda/projeto-final-venda-livros
