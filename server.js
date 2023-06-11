const express =  require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const PORT =8080;
const authorRoutes =require('./routes/authors');
const albumRoutes =require('./routes/albums');
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.use(authorRoutes);
//author post
app.use(albumRoutes);

app.patch('/album/:id',async(req,res,next)=>{
const id = parseInt(req.params.id);
        const data = req.body;
        const albums = await prisma.albums.update({
         where:{
            id,
         },
     
         data,
    
        });
        res.status(200).json({
            albums,
    })


})
app.delete('/album/:id',(req,res,next)=>{


})








// //songs
app.post("/songs",async(req,res,next)=>{
  const data = req.body;
  const song = await prisma.songs.create({
      data,
  });
  
  res.status(201).json({
      song,
});
})









app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
});