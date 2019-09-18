/** */
const User = require('./../models/User')
const Article = require('./../models/Article')
const jwt = require('jsonwebtoken')
const secret = "my_fucking_secret_string"

function Authenticate(id) {
    var payload = {
        _id: id
    }
    var jwtToken = jwt.sign(payload, "my_fucking_secret_string", {
        expiresIn: '30 days'
    });
    var jsonResponse = {
        'access_token': jwtToken
    }
    return jsonResponse
};

function isAuth(token) {
    return jwt.verify(token, secret, (err, decoded) => {
        if (err)
            return false
        else
            return decoded._id
    })
}

module.exports = {
    getAll: (req, res) => {
        User.find({}).then(users => {
            res.json(users)
        })
    },
    addUser: (req, res, next) => {
        User.findOne({
                email: req.body.email
            }).then((u) => {
                if (u) {
                    console.log(isAuth(Authenticate(u._id).access_token))
                    u.token = req.body.token,
                        u.name = req.body.name,
                        u.save((err, newUser) => {
                            let response = {
                                email: newUser.email,
                                followers: newUser.followers,
                                following: newUser.following,
                                name: newUser.name,
                                post_permission: false,
                                point: 0,
                                provider: newUser.provider,
                                provider_id: newUser.provider_id,
                                provider_pic: newUser.provider_pic,
                                token: newUser.token,
                                _id: newUser._id,
                                jwtToken: Authenticate(newUser._id)
                            }
                            res.send(response)
                        })
                } else {
                    let user = {
                        name: req.body.name,
                        provider: req.body.provider,
                        email: req.body.email,
                        provider_id: req.body.provider_id,
                        token: req.body.token,
                        provider_pic: req.body.provider_pic,
                        point: 0,
                        post_permission: false,
                    }
                    new User(user).save((err, newUser) => {
                        if (err)
                            res.send(err)
                        else if (!newUser)
                            res.send(400)
                        else {
                            let point = 0;
                            let response = {
                                email: newUser.email,
                                followers: newUser.followers,
                                following: newUser.following,
                                name: newUser.name,
                                provider: newUser.provider,
                                post_permission: newUser.post_permission,
                                provider_id: newUser.provider_id,
                                provider_pic: newUser.provider_pic,
                                token: newUser.token,
                                point: newUser.point || point,
                                _id: newUser._id,
                                jwtToken: Authenticate(newUser._id)
                            }
                            res.send(response)
                            next()
                        }
                    });
                }
            })
            .catch((err) => {

            })
    },
    getUser: (req, res, next) => {
        User.findById(req.params.id).then
        /*populate('following').exec*/
        ((err, user) => {
            if (err)
                res.send(err)
            else if (!user)
                res.send(404)
            else {
                res.send(user)
            }

        })
    },
    /**
     * user_to_follow_id, user_id
     */
    followUser: (req, res, next) => {
        User.findById(req.body.id).then((user) => {
            return user.follow(req.body.user_id).then(() => {
                return res.json({
                    msg: "followed"
                })
            })
        }).catch(next)
    },
    getUserProfile: (req, res, next) => {
        User.findById(req.params.id).then((_user) => {
            return User.find({
                'following': req.params.id
            }).then((_users) => {
                _users.forEach((user_) => {
                    _user.addFollower(user_)
                })
                return Article.find({
                    'author': req.params.id
                }).then((_articles) => {
                    return res.json({
                        user: _user,
                        articles: _articles
                    })
                })
            })
        }).catch((err) => console.log(err))
    }
}