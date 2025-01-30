/*
  Warnings:

  - The values [REFRESH,RESET_PASSWORD,VERIFY_EMAIL] on the enum `Token_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- DropIndex
DROP INDEX `Token_token_idx` ON `Token`;

-- AlterTable
ALTER TABLE `Token` MODIFY `token` TEXT NOT NULL,
    MODIFY `type` ENUM('refresh', 'access', 'resetPassword', 'verifyEmail') NOT NULL;
