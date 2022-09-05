# Getting Started

API de universidades desenvolvida para teste da Integrado - Bis2Bis

## Installation

Recomendado usar node na versão 16.17.0

```bash
nvm install 16.17.0
```
Instale o yarn
```bash
npm i -g yarn
```
Baixe todas a dependências
```bash
yarn
```
### Opicional
Logo após instalar o [docker](https://docs.docker.com/engine/install/ubuntu/), inicie o container do mongodb
```bash
docker-compose up -d
```
## Configuration
Abaixo estão as configurações padrões da aplicação, caso precise mudar alguma delas crie um arquivo `.env` copiando as informações abaixo e alterando conforme o desejado.
```bash
DB_PORT=3000
DB_HOST=localhost
DB_NAME=universities
DB_USER=root
DB_PASSWORD=root
DB_PORT=27017
```
### Opicional
Caso esteja usando docker e deseje usar novas configuracoes de acesso ao mongo altera o aquivo `docker-compose.yml`
```bash
...
MONGO_INITDB_ROOT_USERNAME: root
MONGO_INITDB_ROOT_PASSWORD: root
MONGO_INITDB_DATABASE: universities
...
```
No diretório `docs` está a configuração `.json` da API exportada via Postman. Para usa-lá basta importar no Postman.
```bash
docs/Integrado Challenge.postman_collection.json
```
## Running
Para iniciar o servidor execute o comando:
```base
yarn start
```
Para executar a busca de dados na API `http://universities.hipolabs.com/` execute o comando a baixo logo após o anterior.
```
yarn start:crowler
```
#### Atenção! A inserção dos dados encontrados na API citada requer que essa aplicação esteja executando. De preferencias nas configurações padrões do server.
