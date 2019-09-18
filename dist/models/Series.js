const mongoose = require('mongoose')
let ArticleSeriesSchema = new mongoose.Schema(
    {
        name: String,
        title: String,
        hashtag:String,
        description:String,
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        series: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Article'
            }
        ]
    }
)

ArticleSeriesSchema.methods.add = function(article){
    let isExist = this.series.indexOf(article)
    if(isExist === -1){
        this.series.push(article)
    }
        return this.save()
    
    
}
ArticleSeriesSchema.methods.removeArticle = function (article){
    let index = this.series.indexOf(article)
    if(index){
        this.series.splice(index,1)
    }
    return this.save()
}
ArticleSeriesSchema.methods.getSeries = function(_id){
    ArticleSeries.find({_id:_id},(result)=>{
        return result
    })
}
ArticleSeriesSchema.method.getAllSeries = function(){
    ArticleSeries.find({}).then((result)=>{return result})
}
module.exports = mongoose.model('ArticleSeries',ArticleSeriesSchema)
