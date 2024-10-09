# Sistema de Controle de Caixa

Um sistema de controle de caixa com controle de autenticação e relatório de movimentação.

Neste documento, você encontrará informações para execução completa do projeto, caso esteja em dúvida sobre algo,
verifique o README.md de cada projeto.

## Tecnologias

- Spring Security
- Spring Data
- PostgreSQL
- Docker
- React

## Funcionamento

O front foi desenvolvido para melhor apresentação do backend. É possível fazer login, cadastrar usuário, realizar
operações com caixa e cadastrar movimentação. As funções referentes a deletar e editar movimentação, não foi
implementada
via frontend, porém os métodos existem e por via de facilidade podem ser visualizados/testados via Swagger.

### As telas

Abaixo é possível ver o funcionamento de forma geral.

<p align="center">
  <img src="./uso_sistem_controle_caixa.gif" />
</p>

## Como executar

1. Primeiro passo para execução é clonar o projeto, o mesmo pode ser feito através do comando abaixo.

```
git clone git@github.com:fysabelah/cash-control-system.git
```

Após, temos duas opções, abrir o projeto em alguma IDE e utilizar o terminal integrado ou abrir a pasta inicial do
projeto em um terminal.

O comando irá criar um par de chaves, pública e privada, para geração do token JWT. Durante o processo será solicitado
uma senha, guarde o valor, pois será utilizado posteriomente. Considerando que esteja na pasta principal,
cash-control-system/, digite o comando abaixo.

```
 keytool -genkeypair -alias jwt-key -keyalg RSA -keysize 2048 -keystore cash-control/src/main/resources/jwt.jks -validity 3650
```

2. Para uma maior praticidade, foi criado o arquivo compose. O mesmo pode ser encontrado com o nome
   *docker-compose.yaml*. São utilizadas algumas vaviráveis de ambiente e por isso devemos criar o arquivo como nome
   _.env_ também no diretório princial.

Obs: Deixarei os valores utilizados por mim para praticidade em execução, porém sinta-se a vontade para alterar.
Apenas atente-se que campos como, por exemplo, referente ao banco de dados está sendo utilizado em outros lugares. A
chave JWT_DECODE deve ser alterada pelo BASE64 do valor digitado ao executar o comando **keytool**.

```
# PostreSQL
POSTGRES_DATABASE_PASSWORD=GR00T
POSTGRES_DATABASE_USERNAME=postgres
DATABASE_NAME=controlecaixa
DATABASE_HOST=localhost:6062

# Authentication
USERNAME_SYSTEM=admin
PASSWORD_SYSTEM=YWRtaW4xMjM=
JWT_DECODE=Y0BzaCNjb250cm9s

# PgAdmin
PGADMIN_DEFAULT_EMAIL=cash-control-system@gmail.com
PGADMIN_DEFAULT_PASSWORD=@dmin
```

2.1 Observações sobre as chaves:

* POSTGRES_DATABASE_PASSWORD: senha para o PG
* POSTGRES_DATABASE_USERNAME: usuário para o PG. A alteração deste campo implicará na geração do servidor para o
  PgAdmin.
* DATABASE_NAME: nome do banco. Mesmo utilizado no script, sql-initialize.sql, de geração do banco.
* DATABASE_HOST: se a api estiver rodando localmente, utilizar _localhost:6062_. Ambos em docker, alterar para
  _postgres_, nome do serviço no compose.
* USERNAME_SYSTEM: pode ser alterado como preferir. É considerado o primeiro usuário a ser criado.
* PASSWORD_SYSTEM: pode ser alterado como preferir. É a senha do primeiro usuário, porém deve ser cadastrada em BASE64.
* JWT_DECODE: lembra da senha digitada no comando keytool? Ela deve ser posta aqui em formado BASE64.
* PGADMIN_DEFAULT_EMAIL: email para PgAdmin
* PGADMIN_DEFAULT_PASSWORD: senha para PgAdmin

3. Agora estando tudo configurado, execute o comando abaixo.

```
docker compose up
```

Considerando tudo configurado como esperado, deve ser possível acessar os endpoint abaixos.

* [Swagger](http://localhost:8080/doc/api.html)
* [Documentação](http://localhost:8080/documentation)

4. Considerando tudo cert com a execução dos containers, agora subiremos o front. Entre no diretório do projeto e
   execute os dois comandos abaixo na ordem apresentada.

```
npm install
```

```
npm start
```

## O que é possível acessar

Após a configuração será possível acessas as documentações sobre os endpoints, elas precisam apenas do backend, e também
o frontend da aplicação, caso esteja executando o projeto por completo. Segue os links.

* [Swagger](http://localhost:8080/doc/api.html)
* [Documentação](http://localhost:8080/documentation)
* [Frontend](http://localhost:3000)