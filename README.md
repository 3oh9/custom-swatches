# Swatches Shopify APP

## Short setup

Create and configure .env file or env variables (set database configurations)

```
yarn install
```

```
source .env
cd /src/server/sequelize
../../../node_modules/.bin/sequelize db:migrate
../../../node_modules/.bin/sequelize db:seed:all
```

### .env file (envirounment variables)
```
export NODE_ENV=development

export SHOPIFY_API_KEY=[key]
export SHOPIFY_API_SECRET=[secret]
# AWS DB
export DB_USER=[DB_USER]
export DB_PASSWORD=[DB_PASSWORD]
export DB_DATABASE=[DB_DATABASE]
export DB_HOST=[DB_HOST]
export DB_DIALECT=postgres

export DB_PORT=5432
export DB_DEFINE_TIMESTAMPS=false
export DB_MAX=5
export DB_MIN=0
export DB_IDLE_TIMEOUT=10000
export DB_CONNECTION_TIMEOUT=10000
export DB_CONNECTION_EVICT=10000
export DB_HANDLE_DISCONNECTS=true

# API
export API_PATH="[API_PATH]/api/v1"
```

Application for the integration of Swatches and Shopify
_______________________
## Migrations & seeders

#### Create new migration

```
../../../node_modules/.bin/sequelize migration:generate --name migrationName
```

#### Execute all migrations

```
../../../node_modules/.bin/sequelize db:migrate
```

#### Create new Seed

```
../../../node_modules/.bin/sequelize seed:generate --name SeedName
```

#### Run all seeders

```
../../../node_modules/.bin/sequelize db:seed:all
```

## Start dev

#### Start Client

```
yarn front-dev
```

#### Start Server

```
yarn back-dev
```

## Deploy

* Login to AWS virtual server
* mkdir /var/www/project-name
* cd /var/www/project-name

#### Clone project
```
git clone [repo]
```
```
yarn install
```

#### Install dependencies
```
yarn global add pm2
```
```
sudo apt-get update
sudo apt-get install nginx
```

* > **Nginx must be configured for current project**
* > **Environment variables must be set at this step**

#### Build & start production (AWS)
```
yarn build
```
```
pm2 start ecosystem.config.js --env production
```

#### Main pm2 commands

Stop listed process
```
pm2 stop #processId
```
Start listed process
```
pm2 start #processId
```
Restart listed process
```
pm2 restart #processId
```
Show list of active processes
```
pm2 list
```
