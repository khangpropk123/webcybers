/** require dependencies */
const express = require("express")
const routes = require('./routes/')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const path = require('path')
const cloudinary = require('cloudinary')

const app = express()
const router = express.Router()
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/medium"
//const url ="mongodb+srv://medium:123456love@cluster0-byup4.mongodb.net/test?retryWrites=true&w=majority"
const Article = require('./models/Article')
/** configure cloudinary */
cloudinary.config({
    cloud_name: 'uitiititc',
    api_key: '194386728788554',
    api_secret: 'yMzmB3ntSm7R9xBd1M_tjubFUo0'
})

/** connect to MongoDB datastore */
try {
    mongoose.connect(url, {
        //useMongoClient: true
    })    
} catch (error) {
    
}

let port = process.env.PORT || 5000

/** set up routes {API Endpoints} */
routes(router)

/** set up middlewares */
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);
app.get("/", (request, response) => {
    let og = {
               title: "CybersVN Team",
               description: "We share everything about security!!",
               img: "https://cybersvn.team/assets/img/logo-cybers-2.svg"
           }
        response.render('index.html',{og:og})
});
app.get("/admin/*", (request, response) => {
    response.sendFile(path.join(__dirname, 'ad/index.html'));
});
app.get("/login-admin", (request, response) => {
    response.sendFile(path.join(__dirname, 'ad/index.html'));
});
app.use('/static',express.static(path.join(__dirname,'static')))
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/assets',express.static(path.join(__dirname,'assets')))
app.use('/ad',express.static(path.join(__dirname,'ad')))
app.use('/api', router)
app.get('/articleview/:id', async (req,response)=>{
   Article.findById(req.params.id).then(article=>{
       if(article){
           let og = {
               title: article.title,
               description: article.description.replace(/<[^>]+>/g, ''),
               img: article.feature_img
           }
        response.render('index.html',{og:og})
       }
   })

})
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
