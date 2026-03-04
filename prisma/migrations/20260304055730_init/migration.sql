-- CreateTable
CREATE TABLE "Dynasty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dynasty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poet" (
    "id" SERIAL NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "summary" TEXT,
    "introduction" TEXT,
    "dynastyId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Poet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "content" TEXT NOT NULL,
    "contentHash" TEXT NOT NULL,
    "background" TEXT,
    "comments" TEXT,
    "translation" TEXT,
    "poetId" INTEGER NOT NULL,
    "dynastyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Poem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PoemToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PoemToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dynasty_name_key" ON "Dynasty"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Poet_name_key" ON "Poet"("name");

-- CreateIndex
CREATE INDEX "Poet_dynastyId_idx" ON "Poet"("dynastyId");

-- CreateIndex
CREATE INDEX "Poet_name_idx" ON "Poet"("name");

-- CreateIndex
CREATE INDEX "Poet_stars_idx" ON "Poet"("stars");

-- CreateIndex
CREATE UNIQUE INDEX "Poem_contentHash_key" ON "Poem"("contentHash");

-- CreateIndex
CREATE INDEX "Poem_title_idx" ON "Poem"("title");

-- CreateIndex
CREATE INDEX "Poem_poetId_idx" ON "Poem"("poetId");

-- CreateIndex
CREATE INDEX "Poem_dynastyId_idx" ON "Poem"("dynastyId");

-- CreateIndex
CREATE INDEX "Poem_stars_idx" ON "Poem"("stars");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "_PoemToTag_B_index" ON "_PoemToTag"("B");

-- AddForeignKey
ALTER TABLE "Poet" ADD CONSTRAINT "Poet_dynastyId_fkey" FOREIGN KEY ("dynastyId") REFERENCES "Dynasty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poem" ADD CONSTRAINT "Poem_poetId_fkey" FOREIGN KEY ("poetId") REFERENCES "Poet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poem" ADD CONSTRAINT "Poem_dynastyId_fkey" FOREIGN KEY ("dynastyId") REFERENCES "Dynasty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PoemToTag" ADD CONSTRAINT "_PoemToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Poem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PoemToTag" ADD CONSTRAINT "_PoemToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
