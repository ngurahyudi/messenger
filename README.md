## Installation

```bash
$ git clone git@github.com:ngurahyudi/messenger.git my-app
$ cd my-app/
$ yarn install

$ cp env-copy .env
# Fill environment variables inside .env according to yours
# Create database on mysql (same name as .env)

$ yarn migration:run
$ yarn seed:run

# Start ngrok
$ ngrok http -bind-tls=true --host-header="localhost:80" <APP_PORT>
# <APP_PORT> <-- same as .env
# Copy and paste address from ngrok into your messenger app webhook address

# Running the app
$ yarn start:dev
```
![myfile](https://media.giphy.com/media/559ssOzFUBRRdF3jQf/giphy-downsized-large.gif)
