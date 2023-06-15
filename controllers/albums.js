const { PrismaClient } = require("@prisma/client");
// const { patch } = require("../routes/songs");

const prisma = new PrismaClient();

const post = async (req, res, next) => {
  const data = req.body;

  const album = await prisma.albums.create({
    data,
  });
  res.status(201).json({
    album,
  });
};

const getsingle = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const albums = await prisma.albums.findUnique({
    include: {
      author: true,

      songs: true,
    },

    where: {
      id,
    },
  });
  res.status(200).json({
    albums,
  });
};
const getAll = async (req, res, next) => {
  const albums = await prisma.albums.findMany({
    include: {
      author: true,
      songs: true,
    },
  });

  res.status(200).json({
    albums,
  });
};
const getSingleAlbumId = async (req, res, next) => {
  const authorId = parseInt(req.params.authorId);
  try {
    const albums = await prisma.albums.findMany({
      where: {
        authorId,
      },
      include: {
        author: true,
        songs: true,
      },
    });

    res.json(albums);
  } catch (error) {
    console.log(error);
  }
};
const getAlbumAuthor2 = async (req, res, next) => {
  const authorId = parseInt(req.params.authorId);
  const id = parseInt(req.params.id);
  try {
    const albums = await prisma.albums.findFirst({
      where: {
        authorId,
        id,
      },
      include: {
        author: true,
        songs: true,
      },
    });
    res.status(200).json(albums);
  } catch (error) {
    console.error(error);
  }
};
const patch = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const albumId = parseInt(req.params.albumId);
  const data = req.body;
  const album = await prisma.albums.update({
    where: {
      id,
    },
    where: {
      albumId,
    },
    data,
  });
  res.status(200).json({
    album,
  });
};
const remove = async (req, res, next) => {
  const id = parseInt(req.params.id);
  
  await prisma.songs.deleteMany({
    where: {
      album: {
        authorId: id,
      },
    },

  });
  const album = await prisma.albums.delete({
    where: {
      id : id
    },
  });
  
  res.status(200).json({
    album,
  });
};

module.exports = {
  post,
  getsingle,
  getAll,
  getSingleAlbumId,
  getAlbumAuthor2,
  patch,
  remove,
};
