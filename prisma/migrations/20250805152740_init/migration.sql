-- CreateTable
CREATE TABLE "public"."SongMetadata" (
    "id" SERIAL NOT NULL,
    "artistSlug" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "playCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "waveform" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SongMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SongMetadata_artistSlug_slug_key" ON "public"."SongMetadata"("artistSlug", "slug");
