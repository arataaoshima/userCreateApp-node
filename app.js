const express = require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')
const port = process.env.PORT ||3000

require('./mogoose')
const User = require('./user')

const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')
const cssPath = path.join(__dirname, './src')
app.use(express.urlencoded({ extended: true }));

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.json())
app.use(express.static(cssPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: "Header"
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: "About"
    })
})

app.get('/users', (req,res)=> {
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((e)=> {
        res.status(500).send(e)
    })
    
})



app.post('/users', (req, res)=> {
    
    const user = new User({
        name:req.body.name,
        age: req.body.age
    })
    user.save().then(()=> {
        res.send('User: ' + req.body.name+ ' Age: '+ req.body.age)
    }).catch((e)=>{
        req.send()
    })

    //console.log(req.body.name)
    //console.log(req.body.age)
})

app.listen(port, ()=>{
    console.log("App is working on "+ port)
})
