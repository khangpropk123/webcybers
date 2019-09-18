const mongoose = require('mongoose')

let RawPosts = new mongoose.Schema(
    {
        text: String,
        title: String,
        description: String,
        feature_img: String,
        claps: Number,
        series_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Series'
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [
            {
                author: {
                    type:mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                text: String
            }
        ]
    }
);
RawPosts.methods.clap = function() {
    this.claps++
    return this.save()
}
RawPosts.methods.comment = function(c) {
    this.comments.push(c)
    return this.save()
}
RawPosts.methods.addAuthor = function (author_id) {
    this.author = author_id
    return this.save()
}
RawPosts.methods.setSeries = function(series) {
    this.series_id = series
    return this.save()
}
RawPosts.methods.getUserArticle = function (_id) {
    Article.find({'author': _id}).then((article) => {
        return article
    })
}
module.exports = mongoose.model('Article', RawPosts)