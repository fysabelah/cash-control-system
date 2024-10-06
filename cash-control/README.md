# Sistema de Controle de Caixa - API

Um sistema de controle de caixa com controle de autenção e relatório de movimentação.

## Decisões / Conselhos / Possíveis Melhorias

* Este projeto faz uso de armazenamento das chaves responsáveis pela geração do token JWT. Está pode não ser a melhor
  abordagem, inclusive devido ao ambiente onde este poderia está executando. Talvez seria mais interessante salvar em
  algum provedor de nuvem, por exemplo, e recuperar as chaves.
* A consulta que gerar basicamente um relatório de movimentações, dependendo da quantidade, pode se tornar bastante
  onerosa, o que torna interessante setar um range máximo para consulta.
* Justamente pelo ponto anterior comentando, durante uma consulta para algo similiar a um relatório de movimentação,
  está sendo recuperado todas informações de uma única vez, dependo da quantidde isto poderia ter um retorno bem
  demorado, inclusive levando a timeout. Talvez uma abordagem mais interessante seria particionar a recuperação das
  informações conforme a tela, considerando a utilização de front, está sendo rederizada.
* As decisões foram tomadas considerando um escopo menor, porém neste consulta de relatório, mesmo assim, foi setado
  limite para tamanho da página. Entranto, a consulta que varifica a quantidade total não é paginada, o que poderia
  resultar em problemas.

## Tecnologias

- Spring Security
- Spring Data
- PostgreSQL
- Docker

## Como executar

1. Primeiro passo para execução é clonar o projeto, o mesmo pode ser feito através do comando abaixo.

```
git clone git@github.com:fysabelah/cash-control-system.git
```

Após, temos duas opções, abrir o projeto em alguma IDE e utilizar o terminal integrado ou abrir a pasta inicial do
projeto em um terminal. Se você tiver executando a partir do diretório deste projeto, remova o 'cash-control' do
comando.

O comando irá criar um par de chaves, pública e privada, para geração do token JWT. Durante o processo será solicitado
uma senha, guarde o valor, pois será utilizado posteriomente. Considerando que esteja na pasta principal,
cash-control-system/, digite o comando abaixo.

```
keytool -genkeypair -alias jwt-key -keyalg RSA -keysize 2048 -keystore cash-control/src/main/resources/jwt.jks -validity 3650
```

2. Para uma maior praticidade, foi criado o arquivo compose. O mesmo pode ser encontrado com o nome
   *docker-compose.yaml*. São utilizadas algumas vaviráveis de ambiente e por isso devemos criar o arquivo como nome
   _.env_ também no diretório princial.

**Obs.**: Para desenvolvimento, também crie o arquivo no diretório deste projeto. Com exceção das chaves sobre
_PgAdmin_, elas serão necessárias.

**Obs**: Deixarei os valores utilizados por mim para praticidade em execução, porém sinta-se a vontade para alterar.
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