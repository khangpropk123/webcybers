const User = require('./../models/User')
const Admin = require('./../models/Admin')
const Article = require('./../models/Article')
const PonitCtrl = require('./point.ctrl')
const MiddleWare = require('./../middlewares/middlewares')
const info = require('systeminformation')
const os = require('os')
const os_uil = require('os-utils')
const config = require('./../settings/configs')
const crypto = require('crypto')
let GetHash=(input)=>{
    return crypto.createHash('sha1').update(input).digest('hex')
}
module.exports = {
    setPermit: (req, res) => {
        let {
            token,
            user_id
        } = req.body
        console.log(req.body)
        let auth = MiddleWare.withAuthAd(token)
        if (auth === true) {
            User.findById(user_id).then(user => {
                return user.setPermission().then(status => {
                    return res.json(status.post_permission)
                })
            })
        } else {
            res.sendStatus(401)
        }
    },
    loginUser: (req, res, next) => {
        let user = req.body
        console.log(user)
        let setuser = {
               username:'admin',
               password: GetHash('n0p4ssw0rd!!'),
               info:'5d7f9d80c3874a085d4fe842'
        }
        Admin(setuser).save((err,data)=>{
            console.log(data)
        })
        console.log(GetHash(user.userId));
        if(user.userId){
            Admin.findOne({username:user.userId})
            .populate('info')
            .exec((err,resp)=>{
                if(!err){
                    if(GetHash(user.password)===resp.password){
                        let data = resp.info;
                        let response = {
                            email: data.email,
                            followers: data.followers,
                            following: data.following,
                            name: data.name,
                            post_permission: data.post_permission,
                            point: data.point,
                            provider: data.provider,
                            provider_id: data.provider_id,
                            provider_pic: data.provider_pic,
                            token: data.token,
                            _id: data._id,
                            jwtToken: MiddleWare.genTokenAd(resp.info._id,'a12m1n')
                        }
                        res.json(response)
                        console.log(response);
                    }
                    else{
                        res.status(401).send('Something Was Wrong!!')
                    }
                   
                }
                else{
                    res.status(401).send('Something Was Wrong!!')
                }  
            })
            }
            else{
                res.status(401).send('Something Was Wrong!!')
            }  
        
    },
    loginApp: (req,res)=>{
        console.log(req.body)
        let account = {
            user:'admin',
            password:'password'
        }
        if(req.body.user === account.user && req.body.password === account.password){
            console.log(req.body)
            let resp = {
                status:'Success',
                access_token: MiddleWare.genToken('admin').access_token
            }

            res.json(resp)
        }
        else{
            res.json({status:'Unauthorized',access_token:'not-alow'})
        }
        
    },
    getAllUser:  (req,res)=> {
        User.find({},{name:1,email:1,point:1,provider_pic:1,post_permission:1}).then((result)=>{
            console.log(result)
            res.json(result)
           
        })
    },
    ramMonitor: (req,res)=>{
        let ram = {
            total: os.totalmem()/(1024),
            free: os.freemem()/(1024),
        }
        
     res.json(ram)
        console.log(ram)
    },
    cpuMonitor: (req,res)=>{
        
        os_uil.cpuUsage(v=>{
            
          info.networkStats().then(data=>{
           let netrx= data[0].rx_sec/(8*1024);
           let nettx= data[0].tx_sec/(8*1024);
           if(netrx<=0){
               netrx=0;
           }
           if(nettx<=0){
            nettx=0;
        }
           if(netrx>100){
               netrx=100
           }
           if(nettx>100){
            nettx=100
        }
              
            let cpu= {
                cpu: v * 100,
                ram: 100-((os.freemem()/os.totalmem()) * 100),
                netrx:netrx,
                nettx:nettx
                
            }
            res.json(cpu)
        })
            
        })
    },
    setData: (req,res)=>{
        new Article(config.Data).save((err, article) => {
            if (err)
                res.send(err)
            else if (!article)
                res.send(400)
            else {
                return article.addAuthor("5d6e32bc143c10056d5a751b").then((_article) => {
                    return res.send(_article)
                })
            }
            next()
        })
    },
    getAllUsers:  (req,res)=> {
        let token = req.body.token
        console.log(MiddleWare.withAuthAd(token))
        let isAdmin = MiddleWare.withAuthAd(token)
        if(isAdmin){
            User.find({}).then((result)=>{
                // console.log(result)
                 res.json(result)
             })
        }
        else{
            res.status(401).send('Sometthing Was Wrong!!')
        }
        
    },
    setUser:(req,res,next)=>{
            User(config.Accounts).save((err,mem)=>{
                if (err)
                res.send(err)
            else if (!mem)
                res.send(400)
                else res.send(mem)
            })
           
    }
    
}