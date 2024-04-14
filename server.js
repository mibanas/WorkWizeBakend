const app = require('./app')
require('dotenv').config()
require('./api/config/dataBaseConfig')

const port = process.env.PORT || 3010

app.listen(port, () => {
    console.log(`Port is running in ${port} port`);
})