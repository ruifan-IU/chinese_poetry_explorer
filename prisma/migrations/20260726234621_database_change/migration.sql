/*
  Warnings:

  - You are about to drop the column `background` on the `Poem` table. All the data in the column will be lost.
  - You are about to drop the column `comments` on the `Poem` table. All the data in the column will be lost.
  - You are about to drop the column `translation` on the `Poem` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Poet` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AnnotationType" AS ENUM ('TRANSLATION', 'COMMENTARY', 'BACKGROUND');

-- CreateEnum
CREATE TYPE "AnnotationOrigin" AS ENUM ('IMPORTED', 'HUMAN', 'GENERATED');

-- AlterTable
ALTER TABLE "Poem" DROP COLUMN "background",
DROP COLUMN "comments",
DROP COLUMN "translation";

-- AlterTable
ALTER TABLE "Poet" DROP COLUMN "summary";

-- CreateTable
CREATE TABLE "PoemAnnotation" (
    "id" SERIAL NOT NULL,
    "poemId" INTEGER NOT NULL,
    "type" "AnnotationType" NOT NULL,
    "content" TEXT NOT NULL,
    "origin" "AnnotationOrigin" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PoemAnnotation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PoemAnnotation_poemId_type_idx" ON "PoemAnnotation"("poemId", "type");

-- AddForeignKey
ALTER TABLE "PoemAnnotation" ADD CONSTRAINT "PoemAnnotation_poemId_fkey" FOREIGN KEY ("poemId") REFERENCES "Poem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
