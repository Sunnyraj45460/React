const express=require('express')
const app=express()

var cors = require('cors');
app.use(cors());

// app.use(cors({
//     origin: 'http://localhost:3000'
//   }));

app.get('/',(req,res)=>{
    // res.writeHead({'Access-Control-Allow-Origin':'*'}).send('HOLA !!!')
    // res.setHeader(["{'Access-Control-Allow-Origin':'*'}"]).send('HOLA !!!')
//    res.send(JSON.stringify("HOLA !!!"))
    res.set({
        'Content-Type': 'text/plain',
        'Content-Length': '123',
        'Access-Control-Allow-Origin':'*',
        'ETag': '12385'
      }).send(JSON.stringify("HOLA !!!"))
    //   res.send(JSON.stringify("HOLA !!!"))
})

app.listen(4000)