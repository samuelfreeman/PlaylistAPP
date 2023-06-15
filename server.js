const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const PORT = 8080;
const authorRoutes = require("./routes/authors");
const albumRoutes = require("./routes/albums");
const songRoutes = require("./routes/songs");
const prisma = new PrismaClient();

app.use(bodyParser.json());
// author routes
app.use(authorRoutes);
// album routes
app.use(albumRoutes);
//song routes
app.use(songRoutes);

app.patch("/album/:id", async (req, res, next) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  const albums = await prisma.albums.update({
    where: {
      id,
    },

    data,
  });
  res.status(200).json({
    albums,
  });
});
app.get("/albums", async (req, res, next) => {
  const albums = await prisma.albums.findMany({
    include: {
      author: {
        include: {
          albums: {
            include: {
              songs: true,
            },
          },
        },
      },
    },
  });
  res.status(200).json({
    albums,
  });
});

app.delete("/album/:id", async (req, res, next) => {
  const id = parseInt(req.params.id);
  const albums = await prisma.albums.findMany({
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
  res.status(200).json({
    albums,
  });
});

// //songs
app.post("/songs", async (req, res, next) => {
  const data = req.body;
  const song = await prisma.songs.create({
    data,
  });

  res.status(201).json({
    song,
  });
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
