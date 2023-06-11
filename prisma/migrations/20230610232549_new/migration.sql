/*
  Warnings:

  - You are about to drop the column `album_name` on the `songs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[song_name]` on the table `songs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `song_name` to the `songs` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `songs_album_name_key` ON `songs`;

-- AlterTable
ALTER TABLE `songs` DROP COLUMN `album_name`,
    ADD COLUMN `song_name` VARCHAR(225) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `songs_song_name_key` ON `songs`(`song_name`);
