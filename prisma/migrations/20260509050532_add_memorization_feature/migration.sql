-- CreateEnum
CREATE TYPE "MasteryLevel" AS ENUM ('NEW', 'LEARNING', 'YOUNG', 'MATURE', 'MASTERED');

-- CreateTable
CREATE TABLE "UserMemorization" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "poemId" INTEGER NOT NULL,
    "masteryLevel" "MasteryLevel" NOT NULL DEFAULT 'NEW',
    "easeFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "interval" INTEGER NOT NULL DEFAULT 0,
    "repetitions" INTEGER NOT NULL DEFAULT 0,
    "lastReviewedAt" TIMESTAMP(3),
    "nextReviewAt" TIMESTAMP(3),
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "correctReviews" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMemorization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserMemorization_userId_idx" ON "UserMemorization"("userId");

-- CreateIndex
CREATE INDEX "UserMemorization_poemId_idx" ON "UserMemorization"("poemId");

-- CreateIndex
CREATE INDEX "UserMemorization_nextReviewAt_idx" ON "UserMemorization"("nextReviewAt");

-- CreateIndex
CREATE INDEX "UserMemorization_masteryLevel_idx" ON "UserMemorization"("masteryLevel");

-- CreateIndex
CREATE UNIQUE INDEX "UserMemorization_userId_poemId_key" ON "UserMemorization"("userId", "poemId");

-- AddForeignKey
ALTER TABLE "UserMemorization" ADD CONSTRAINT "UserMemorization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMemorization" ADD CONSTRAINT "UserMemorization_poemId_fkey" FOREIGN KEY ("poemId") REFERENCES "Poem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
