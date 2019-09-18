const multipart = require('connect-multiparty')
const SeriesArticle = require('./../models/Series')
const Article = require('./../models/Article')
const config = require('../settings/configs')
const jwt = require('jsonwebtoken')
const secret = config.secret


module.exports = {
    addSerie: (req, res, next) => {
        //console.log(req.body)
        jwt.verify(req.body.token, config.secret, (err, decoded) => {
            if (!err) {
                let serie = {
                    name: req.body.name,
                    title: req.body.title,
                    hashtag: req.body.hashtag,
                    author: decoded._id,
                    description:req.body.description,
                    series:[]
                }
                SeriesArticle(serie).save((err, result) => {
                    if (!err)
                        res.json(result)
                    console.log(result)
                })
            } else {
                res.statusCode = 401
            }
        })

    },
    addArticle: (req, res, next) => {
        console.log(req.params)
        jwt.verify(req.params.token, config.secret, (err, decoded) => {
            if (!err) {
                SeriesArticle.findById(req.params.id)
                    .then((serie) => {
                            return serie.add(req.params.article_id).then((serie) => {
                               return Article.findById(req.params.article_id).then((article)=>{
                                    return article.setSeries(serie._id).then(result => {
                                        res.json(serie)
                                        console.log(result)
                                    })
                                })
                                })
                    })
            } else {
                res.statusCode = 401
            }
        })

    },
    getAuthorSerie: (req, res, next) => {
        jwt.verify(req.params.token, config.secret, (err, decoded) => {
            if (!err) {
                SeriesArticle.find({
                        author: decoded._id
                    })
                    .then((series) => {
                        res.json(series)
                        next()
                    })
            } else
                res.statusCode = 401;
        })

    },
    getFull: async (req, res, next) => {
        await SeriesArticle.findById(req.params.id)
            .populate('author')
            .populate('series')
            .exec((err, series) => {
                res.json(series)
                //console.log(series)
            })
    },
    getAll: async (req,res,next)=>{
        await SeriesArticle.find({})
        .populate('author')
        .exec((err, series) => {
            res.json(series)
           // console.log(series)
        })
    }
}