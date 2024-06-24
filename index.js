const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser')

const connectMogodb = require('./connection')
const URL = require('./models/url')
const { restrictToLoggedinUserOnly ,checkAuth } =require('./middlewares/auth')

const staticRouter = require('./routes/static')
const urlRouter = require('./routes/url')
const userRouter = require('./routes/user')


connectMogodb('mongodb://127.0.0.1:27017/urls')
    .then(() => {
        console.log('Mongodb Connected Successfully');
    })
    .catch((err) => {
        console.log('Error ', err);
    })

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser());

app.set('view engine','ejs')
app.set('views',path.resolve('./views'));


app.use('/url', restrictToLoggedinUserOnly ,urlRouter)
app.use('/user',checkAuth, userRouter)
app.use('/',staticRouter)


app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
    {
        $push: {
            visitHistory:{
                timestamp : Date.now()
            }
        }
    });
    return res.redirect(entry.redirectUrl);
});

const PORT = 8001
app.listen(PORT, () => {
    console.log(`Server Started Successfully http://localhost:${PORT}`);
})