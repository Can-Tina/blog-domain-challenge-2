const express = require('express')
const app = express()
const port = 4000

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routers/user');
app.use('/user', userRouter)

const postRouter = require('./routers/post');
app.use('/post', postRouter)

app.get('*', (req, res) => {
    res.json({ ok: true });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})