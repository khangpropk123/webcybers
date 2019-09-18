/** */
const Article = require('./../models/Article')
const User = require('./../models/User')
const Series = require('./../models/Series')
const fs = require('fs')
const cloudinary = require('cloudinary')
const config = require('../settings/configs')
const jwt = require('jsonwebtoken')
const secret = config.secret
const PointCtrl = require('./point.ctrl')

function isAuth(token) {
    let result

}

module.exports = {
    addArticle: (req, res, next) => {
        // console.log(req.body.token)
        jwt.verify(req.body.token, secret, (err, decoded) => {
            if (!err) {
                let id = decoded._id
                User.findById(id).then(user => {
                    if (user.post_permission) {
                        let {
                            text,
                            title,
                            claps,
                            description
                        } = req.body
                        //let obj = { text, title, claps, description, feature_img: _feature_img != null ? `/uploads/${_filename}` : '' }
                        if (req.files.image) {
                            cloudinary.uploader.upload(req.files.image.path, (result) => {
                                let obj = {
                                    text,
                                    title,
                                    claps,
                                    description,
                                    feature_img: result.url != null ? result.url : ''
                                }
                                saveArticle(obj)
                                PointCtrl.addPoint(id, config.Point.Post)
                            }, {
                                resource_type: 'image',
                                eager: [{
                                    effect: 'sepia'
                                }]
                            })
                        } else {
                            saveArticle({
                                text,
                                title,
                                claps,
                                description,
                                feature_img: ''
                            })
                            PointCtrl.addPoint(id, config.Point.Post)
                        }

                    } else {
                        res.sendStatus(401)
                    }
                })
            } else {
                res.send(401)
            }
        })

        function saveArticle(obj) {
            new Article(obj).save((err, article) => {
                if (err)
                    res.send(err)
                else if (!article)
                    res.send(400)
                else {
                    return article.addAuthor(req.body.author_id).then((_article) => {
                        return res.send(_article)
                    })
                }
                next()
            })
        }
        /*let base64Data = null
        const _feature_img = req.body.feature_img
        _feature_img != null ? base64Data = _feature_img.replace(/^data:image\/png;base64,/, "") : null
        const _filename = `medium-clone-${Date.now()}.png`;

        let { text, title, claps, description } = req.body
        let obj = { text, title, claps, description, feature_img: _feature_img != null ? `/uploads/${_filename}` : '' }

        fs.writeFile(`/uploads/${_filename}`, base64Data, 'base64', function(err) {
            if(err)
                console.log(err)
            new Article(obj).save((err, article) => {
                if (err)
                    res.send(err)
                else if (!article)
                    res.send(400)
                else {
                    return article.addAuthor(req.body.author_id).then((_article) => {
                        return res.send(_article)
                    })
                }
                next()
            })
        })*/
        /*new Article(obj).save((err, article) => {
            if (err)
                res.send(err)
            else if (!article)
                res.send(400)
            else {
                return article.addAuthor(req.body.author_id).then((_article) => {
                    return res.send(_article)
                })
            }
            next()
        })*/

        /*var storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, './uploads')
            },
            filename: function () {
                callback(null, )
            }
        })
        var upload = multer({
            storage: storage
        }).single('userFile')
        upload(req, res, function(err) {
        })*/
    },
    getAll: (req, res, next) => {
        Article.find(req.params.id)
            .populate('author')
            .populate('comments.author').exec((err, article) => {
                if (err)
                    res.send(err)
                else if (!article)
                    res.send(404)
                else
                    res.send(article)
                next()
            })
    },

    /**
     * article_id
     */
    clapArticle: (req, res, next) => {
        Article.findById(req.body.article_id).then((article) => {
            return article.clap().then(() => {
                PointCtrl.addPoint(article.author, config.Point.Clap)
                return res.json({
                    msg: "Done"
                })
            })
        }).catch(next)
    },

    /**
     * comment, author_id, article_id
     */
    commentArticle: (req, res, next) => {
        console.log(req.body)
        Article.findById(req.body.article_id).then((article) => {
            return article.comment({
                author: req.body.name,
                text: req.body.comment
            }).then(() => {
                return res.json({
                    msg: "Done"
                })
            })
        }).catch(console.log)
    },

    /**
     * article_id
     */
    getArticle: (req, res, next) => {
        Article.findById(req.params.id)
            .populate('author')
            .populate('comments.author').exec((err, article) => {
                if (err)
                    res.send(err)
                else if (!article)
                    res.send(404)
                else
                    res.send(article)
                next()
            })

    },
    deleteArticle: (req, res, next) => {
        console.log((req.params.token))
        jwt.verify(req.params.token, secret, (err, decoded) => {
            if (err)
                res.send(401)
            else {
                console.log(decoded)
                Article.findOneAndDelete({
                        _id: req.params.id,
                        author: decoded._id
                    }).then((status) => {
                        Series.findById(status.series_id).then(series => {
                            if (series) {
                                return series.removeArticle(status._id).then(result => {
                                    console.log(result)
                                })
                            } else return status
                        })
                        res.send(status)
                    })
                    .catch(next)
            }
        })

    },
    updateArticle: (req, res, next) => {
        console.log(req.body.token || "Nothing")
        jwt.verify(req.body.token, secret, (err, decoded) => {
            if (!err) {
                let img = ''
                let article = req.body
                console.log(article.id)
                if (req.files.image) {
                    cloudinary.uploader.upload(req.files.image.path, (result) => {
                        img = result.url
                        Article.findOneAndUpdate({
                                _id: article.id,
                                author: decoded._id
                            }, {
                                text: article.text,
                                title: article.title,
                                description: article.decription,
                                feature_img: img
                            }).then((status) => {
                                console.log(status)
                                res.send(status)
                            })
                            .catch(next)
                    }, {
                        resource_type: 'image',
                        eager: [{
                            effect: 'sepia'
                        }]
                    })
                } else {
                    img = article.image_link
                    Article.findOneAndUpdate({
                            _id: article.id,
                            author: decoded._id
                        }, {
                            text: article.text,
                            title: article.title,
                            description: article.decription,
                            feature_img: img
                        }).then((status) => {
                            console.log(status)
                            res.send(status)
                        })
                        .catch(next)
                }
            } else {
                res.send(401)
            }
        })



    }

}