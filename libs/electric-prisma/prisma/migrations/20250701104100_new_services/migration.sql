/*
  Warnings:

  - You are about to drop the column `price` on the `Service` table. All the data in the column will be lost.
  - Added the required column `basePrice` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceRange` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeDuration` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "price",
ADD COLUMN     "basePrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceRange" TEXT NOT NULL,
ADD COLUMN     "timeDuration" TEXT NOT NULL;
