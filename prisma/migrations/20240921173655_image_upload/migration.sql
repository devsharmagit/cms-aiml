/*
  Warnings:

  - You are about to drop the column `slug` on the `Document` table. All the data in the column will be lost.
  - Added the required column `publicId` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Document_slug_key";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "slug",
ADD COLUMN     "publicId" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
