const express = require('express');
const connectMogodb = require('./connection')
const urlRouter = require('./routes/url')
const URL = require('./models/url')


connectMogodb('mongodb://127.0.0.1:27017/urls')
    .then(() => {
        console.log('Mongodb Connected Successfully');
    })
    .catch((err) => {
        console.log('Error ', err);
    })

const app = express();
app.use(express.json())
app.use('/url', urlRouter)

app.get('/:shortId', async (req, res) => {
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
    res.redirect(entry.redirectUrl);
});

app.listen(8001, () => {
    console.log('Server Started Successfully');
})