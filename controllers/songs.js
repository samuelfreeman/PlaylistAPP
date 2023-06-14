const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


const post = (async(req,res,next)=>{
    
    const data = req.body;

    const songs = await prisma.songs.create({
        data,
    });
    res.status(201).json({
        songs,
});




})

const getAll = async(req,res,next)=>{
const songs = await prisma.songs.findMany({
include:{
album:{
    include:{
author:true
    }
}
}
});

res.status(200).json({
    songs
})
}
const getSingle = async(req,res,next)=>{
    const id = parseInt(req.params.id);
const songs = await prisma.songs.findUnique({
      include: {
        album:{
            include:{
                author:true
            }
        }
      }
    
  ,
  where: {
    id,
  }
});
res.status(200).json({
   songs,
})
}
  const getSingleAlbumId = async(req,res,next)=>{
    const albumId = parseInt(req.params.id);
const songs = await prisma.songs.findMany({
    where: {
    albumId:albumId
  },
    include: {
        album:{
            include:{
                author:true
            }

        }
        
         
        
      }
});
res.status(200).json({
   songs,
})
}
module.exports= {
    post,
    getSingle,
    getAll,
    getSingleAlbumId
    }