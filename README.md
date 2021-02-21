## Running the Application
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name todo, and Import file [todo.sql](https://drive.google.com/file/d/1xbiP_tZijJ8m9TOtXGek2V7DHoMQgoSr/view?usp=sharing) to **phpmyadmin**

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :

```
PORT = 1234
DB_HOST = localhost
DB_USER = [your_database_username]
DB_PASSWORD = [your_database_pass]
DB_NAME = todo
SECRET_KEY = [jwt_secret_key]
```
## Related Project

- [`Frontend`](https://github.com/safiratrisa/FrontEnd-React-Todo)