/*
  Warnings:

  - Added the required column `imageUrl` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "imageUrl" TEXT NOT NULL;
