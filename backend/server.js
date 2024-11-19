const bodyParser = require('body-parser')
const express = require('express')
const HttpError = require('./models/https-error')
const app = express()


const UserRoutes = require('./routes/user-routes')
app.use(bodyParser.json())

app.use('/api/users', UserRoutes)// даем адрес по которому можно найти
app.use((req,res,next)=>
{
    const err = new HttpError('could not found ', 404)
    throw err;
});
    
app.use((error,req,res, next)=>
{
    if(res.headersSent)
    {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({
        message:error.message || 'Anknown error occured!'
    })
})
app.listen(5000)