-- CreateEnum
CREATE TYPE "USER_STATUS" AS ENUM ('REGISTERED', 'ACTIVE', 'INACTIVE', 'DELETED', 'BANNED', 'SUSPENDED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "status" "USER_STATUS" NOT NULL DEFAULT 'REGISTERED',
    "image" TEXT,
    "deviceId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_phone_key" ON "users"("email", "phone");
