const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const create = async (req, res, next) => {
  const data = req.body;
  const author = await prisma.author.create({
    data,
  });
  res.status(201).json({
    author,
  });
};
//Local instance MySQL80
// // //getting  all the authours
const getall = async (req, res, next) => {
  const authors = await prisma.author.findMany({
    include: {
      albums: {
        include: {
          songs: true,
        },
      },
    },
  });
  res.status(200).json({
    authors,
  });
};

// // getting an author
const getSingle = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const author = await prisma.author.findUnique({
    include: {
      albums: {
        include: {
          songs: true,
        },
      },
    },
    where: {
      id,
    },
  });
  res.status(200).json({
    author,
  });
};
// // //patch
const patch = async (req, res, next) => {
  const id = parseInt(req.params.id);
  
  const data = req.body;
  const author = await prisma.author.update({
    where: {
      id,
      
    },

    data,
  });
  res.status(200).json({
    author,
  });
};

// // // delete
const remove = async (req, res, next) => {
  const id = parseInt(req.params.id);

  const author = await prisma.author.findUnique({
    where: {
      id,
    },
    include: {
      albums: {
        include: {
          songs: true,
        },
      },
    },
  });

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  await prisma.songs.deleteMany({
    where: {
      album: {
        authorId: id,
      },
    },
  });

  await prisma.albums.deleteMany({
     where:
      { 
        authorId: id 
      }
     });

  await prisma.author.delete({
    where:{ id },
  });

  res.status(500).json({ error: "Failed to delete author and its constraints" });
};

module.exports = {
  create,
  getSingle,
  getall,
  patch,
  remove,
};
