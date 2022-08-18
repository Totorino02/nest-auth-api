/*
  Warnings:

  - The primary key for the `userConfirmations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `userConfirmations` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `userId` on the `userConfirmations` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "userConfirmations" DROP CONSTRAINT "userConfirmations_userId_fkey";

-- AlterTable
ALTER TABLE "userConfirmations" DROP CONSTRAINT "userConfirmations_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "userId" SET DATA TYPE INTEGER,
ADD CONSTRAINT "userConfirmations_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "userConfirmations" ADD CONSTRAINT "userConfirmations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
