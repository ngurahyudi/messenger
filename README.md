## Installation

```bash
$ git clone --depth 1 git@github.com:ngurahyudi/messenger.git my-app
$ cd my-app/
$ yarn install

$ cp env-copy .env
# Fill environment variables inside .env according to yours
# Create database on mysql (same name as .env)

$ yarn migration:run
$ yarn seed:run

# Running the app
$ yarn start:dev
```
