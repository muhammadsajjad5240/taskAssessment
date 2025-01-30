/*
  Warnings:

  - The values [resetPassword,verifyEmail] on the enum `Token_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Token` MODIFY `type` ENUM('refresh', 'access') NOT NULL;
