const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const post = async (req, res, next) => {
  const data = req.body;

  const songs = await prisma.songs.create({
    data,
  });
  res.status(201).json({
    songs,
  });
};

const getAll = async (req, res, next) => {
  const songs = await prisma.songs.findMany({
    include: {
      album: {
        include: {
          author: true,
        },
      },
    },
  });

  res.status(200).json({
    songs,
  });
};
const getSingle = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const songs = await prisma.songs.findUnique({
    include: {
      album: {
        include: {
          author: true,
        },
      },
    },
    where: {
      id,
    },
  });
  res.status(200).json({
    songs,
  });
};
const getSingleAlbumId = async (req, res, next) => {
  const albumId = parseInt(req.params.albumId);
  try {
    const songs = await prisma.songs.findMany({
      where: {
        albumId,
      },
      include: {
        album: {
          select: {
            album_name: true,
            author: true,
          },
        },
      },
    });
    res.json(songs);
  } catch (error) {
    next(error);
  }
};
const getSongAlbum2 = async (req, res, next) => {
  const albumId = parseInt(req.params.albumId);
  const id = parseInt(req.params.id);
  try {
    const song = await prisma.songs.findFirst({
      where: {
        albumId,
        id,
      },
      include: {
        album: {
          select: {
            album_name: true,
            author: true,
          },
        },
      },
    });
    res.status(200).json(song);
  } catch (error) {
    console.error(error);
  }
};

//   const getSingleAlbumId = async(req,res,next)=>{
//     const albumId = parseInt(req.params.id);
// const songs = await prisma.songs.findMany({
//     where: {
//     albumId:albumId
//   },
//     select: {
//         album_name:{
//             select:{
//                 author_name:true
//             }

//         }

//       }
// })
// res.status(200).json({
//   s
// })

// }
const patch = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  const song = await prisma.songs.update({
    where: {
      id,
    },
    data,
  });
  res.status(200).json({
    song,
  });
};
const remove = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const song = await prisma.songs.delete({
    where: {
      id,
    },
  
  });
  res.status(200).json({
    song,
  });
};

module.exports = {
  post,
  getSingle,
  getAll,
  getSingleAlbumId,
  getSongAlbum2,
  patch,
  remove
};
