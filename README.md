Projeto Final - Plataforma de Venda de Livros
Objetivo
Consolidar os conhecimentos aprendidos ao longo do curso em um único projeto prático. Ao final, você terá implementado uma API completa com autenticação, deploy, integração e documentação.

Como Instalar a Base do Projeto
Clone o repositório:
bash
Copy

   git clone https://github.com/RParadeda/projeto-final-venda-livros.git
   cd projeto-final-venda-livros
Instale as dependências:
bash
Copy

   npm install
Configure o arquivo .env (baseado no modelo .env.example):
Exemplo:
plaintext
Copy

   PORT=3000
   JWT_SECRET=segredoDoJWT
   DATABASE_URL=sqlite::memory:
Rode o servidor:
bash
Copy

   npm start
Teste a rota inicial:
Acesse http://localhost:3000/livros.
