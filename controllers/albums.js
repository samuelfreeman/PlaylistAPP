const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


const post = (async(req,res,next)=>{
    
    const data = req.body;

    const album = await prisma.albums.create({
        data,
    });
    res.status(201).json({
        album,
});

})

const getsingle =(async(req,res,next)=>{
    const id = parseInt(req.params.id);
const albums = await prisma.albums.findUnique({
       include:{
                author:true,
                    
                        songs:true    
                    }
    
  ,
  where: {
    id,
  }
});
res.status(200).json({
   albums,
})
})
const getAll = async(req,res,next)=>{
    const albums = await prisma.albums.findMany({
    include:{
    author: true,
    songs:true
        
    
    }
    });
    
    res.status(200).json({
        albums
    })
    }

module.exports={
post,
getsingle,
getAll

}