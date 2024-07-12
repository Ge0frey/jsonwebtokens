import express, { urlencoded } from 'express';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;

app.use(express.json());
app.use(urlencoded({extended:false}));

app.get ('/api', (req, res) => {
    res.json({message:'Welcome to this api service.'})
});

app.post('/api/posts', verifyToken, (req,res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            res.json({
                message:"posts created ...",
                authData,
            });
        }
    })
})

app.post ('/api/login', (req,res) => {
    const user = {
        id: 1,
        username: "Jonathan",
        email: "mar@retolaw.ke"
    }

    jwt.sign ({user: user}, 'secretkey', (err, token) => {
        res.json ({
             token,
        })})
})

function verifyToken (req,res,next ) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split (' ') [1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}

app.listen(port, () => {
    console.log(`This app is listening on port: ${port}`)
})