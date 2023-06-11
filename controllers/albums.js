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

module.exports={
post

}