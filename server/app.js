/** require dependencies */
const express = require("express")
const routes = require('./routes/')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cloudinary = require('cloudinary')
const app = express()
const router = express.Router()
const url = "mongodb://127.0.0.1:27017/medium"
//const url ="mongodb+srv://dbmedium:dbPassword@cluster0-byup4.mongodb.net/test?retryWrites=true&w=majority"
//const url ="mongodb+srv://medium:123456love@cluster0-byup4.mongodb.net/test?retryWrites=true&w=majority"

/** configure cloudinary */
cloudinary.config({
    cloud_name: 'uitiititc',
    api_key: '194386728788554',
    api_secret: 'yMzmB3ntSm7R9xBd1M_tjubFUo0'
})

/** connect to MongoDB datastore */
try {
    mongoose.connect(url, {useNewUrlParser: true})
            .then(() => {
                console.log("Database connect successful")
            })
            .catch((err) => {
                console.error('Database connect fail')
            })
} catch (error) {
    
}

let port = 5000 || process.env.PORT

/** set up routes {API Endpoints} */
routes(router)

/** set up middlewares */
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
//app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/api', router)

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
