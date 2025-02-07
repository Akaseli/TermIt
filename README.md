## TermIt
A website created to help learn and practice vocabulary effectively.

### Features
- Authentication
- UI translations
- Basic mobile support
- Two learning modes (flashcards and write)
- Statistics (% of getting the term right)

  
### Stack
- Frontend using React
- Backend Express.js with passport.js for auth
- Database PostgreSQL

### Screenshots
<img src="https://github.com/Akaseli/TermIt/blob/main/screenshots/createPage.png" width="500">

<img src="https://github.com/Akaseli/TermIt/blob/main/screenshots/setPage.png" width="500">

<img src="https://github.com/Akaseli/TermIt/blob/main/screenshots/setsPage.png" width="500">

<img src="https://github.com/Akaseli/TermIt/blob/main/screenshots/writeMode.png" width="500">

### Running
PostreSQL with a database initialized with [these commands.](https://github.com/Akaseli/TermIt/blob/main/backend/setup.sql)

Run `npm install` and create a `.env` file in `backend` folder. 

Required:
- `SECRET` - Pretty much anything, used to sign and encrypt thigns.
- `PGUSER` - Database account
- `PGPASSWORD` - Database account password
- `PGHOST` - Database address
- `PGPORT` - Database port
- `PGDATABASE` - Database name

Then `npm run dev` opens the project on `localhost:8080`
