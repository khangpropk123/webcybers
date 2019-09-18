const UserModel = require('../models/User')

module.exports = {
    addPoint: (id,point)=>{
        return UserModel.findById(id).then(user =>{
            return user.addPoint(point).then(data=>{
                console.log("Add Success!!")
            })
        })
    },
    subPoint: (id,point)=>{
        return UserModel.findById(id).then(user =>{
            return user.subPoint(point).then(data=>{
                console.log("Sub Success!!")
            })
        })
    },
    testJson:(req,res)=>{
        res.sendStatus(401)
    }
}