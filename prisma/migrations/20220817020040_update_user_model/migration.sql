/*
  Warnings:

  - You are about to drop the column `nom` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "nom",
DROP COLUMN "prenom",
ADD COLUMN     "firstname" TEXT,
ADD COLUMN     "lastname" TEXT;
