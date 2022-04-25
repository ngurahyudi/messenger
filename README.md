# Prequisites
1. You must have node installed on your local machine.
2. You must have package manager installed (Yarn or NPM, choose one).
3. You must have MySQL instance running on your local machine or on a container.
4. You must have ngrok installed globally.

    ```bash
    npm install -g ngrok
    ```
5. You must registered as a facebook developer to be able to create an app.
   please folow the instruction carefully here: https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup and get these data :
   - Page ID
   - Page Access Token
   - App Secret
      

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
![Alt Text](https://media.giphy.com/media/559ssOzFUBRRdF3jQf/giphy-downsized-large.gif)
