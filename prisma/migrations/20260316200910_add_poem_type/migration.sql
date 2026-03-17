-- CreateEnum
CREATE TYPE "PoemType" AS ENUM ('shi', 'ci', 'wen');

-- AlterTable
ALTER TABLE "Poem" ADD COLUMN     "type" "PoemType" NOT NULL DEFAULT 'shi';

-- CreateIndex
CREATE INDEX "Poem_type_idx" ON "Poem"("type");
