# Desafio Rentcars
 CRUD criado como parte do desafio da Rentcars. Instruções para o projeto: 
1)Clone o repositório para sua máquina local.
2)Abra o terminal e navegue até o diretório do projeto.
3)Execute o comando npm install para instalar as dependências do projeto.
4)Configure as credenciais do banco de dados no arquivo database.js.
5)Certifique-se de ter um banco de dados MySQL criado com o nome desafio_rentcars ou altere o nome do banco de dados no arquivo database.js conforme necessário.
codigo SQL para criar a tabela : CREATE TABLE Veiculos (
     id VARCHAR(80) PRIMARY KEY,
     locadora VARCHAR(255) NOT NULL,
     modelo VARCHAR(255) NOT NULL,
     marca VARCHAR(255) NOT NULL,
     ano INT NOT NULL,
     motor VARCHAR(255) NOT NULL,
     portas INT NOT NULL,
     cambio VARCHAR(255) NOT NULL,
     ar_condicionado BOOLEAN NOT NULL,
     updatedAt DATETIME,
     createdAt DATETIME DEFAULT NOW()
);
No terminal, execute o comando node index.js para iniciar o servidor. Abra um navegador web e navegue para http://localhost:3000 para acessar a aplicação.


Autor: Leonardo Scapin
