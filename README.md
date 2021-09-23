# ADF-CD -
## Archiv der Flucht - Chat Dokumentation

### Dev setup

Have [MongoDB](https://www.mongodb.com/) installed and running. I also recomment [Compass](https://www.mongodb.com/products/compass) for debugging the database.

In `server` rename and adjust the `env.sample` to `.env`. If you're running Mongo on default settings, just change MONGO_DB. Then run `yarn start`.

In `cd-client` rename adjust the `env.sample` to `.env`. Then run `yarn serve`.

### Docker setup

In `cd-client` rename adjust the `env.sample` to `.env` and enter the right API_URL. It's important to do this step before running `docker-compose up` since docker sets env variables only after the images (in this case the vue app) is built.

Copy and adjust the `docker-compose.yml.sample`, this is mostly the ports.

Then run `docker-compose up` and :sparkles:!
