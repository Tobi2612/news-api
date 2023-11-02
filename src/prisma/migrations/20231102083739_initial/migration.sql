/*
  Warnings:

  - Made the column `userId` on table `Comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `newsId` on table `Comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `News` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_newsId_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_userId_fkey";

-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "newsId" SET NOT NULL;

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Comments_id_idx" ON "Comments" USING HASH ("id");

-- CreateIndex
CREATE INDEX "News_id_idx" ON "News" USING HASH ("id");

-- CreateIndex
CREATE INDEX "Users_id_idx" ON "Users" USING HASH ("id");

-- CreateIndex
CREATE INDEX "Users_email_idx" ON "Users" USING HASH ("email");

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;
