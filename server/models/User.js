const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        provider: String,
        provider_id: String,
        token: String,
        provider_pic: String,
        post_permission: Boolean,
        point: Number,
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
)
UserSchema.methods.follow = function (user_id) {
    if (this.following.indexOf(user_id) === -1) {
        this.following.push(user_id)        
    }
    return this.save()
}
UserSchema.methods.addPoint = function (point){
    this.point = this.point + point
    return this.save()
}
UserSchema.methods.subPoint = function (point){
    this.point = this.point - point
    return this.save()
}
UserSchema.methods.setPermission = function (){
    let permit = false
    if(!this.post_permission){
        permit=true
    }
    this.post_permission=permit
    return this.save()

}
UserSchema.methods.addFollower = function (fs) {
    this.followers.push(fs)        
}
module.exports = mongoose.model('User', UserSchema)