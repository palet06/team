/*
  Warnings:

  - The primary key for the `AssignedTask` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[taskId]` on the table `AssignedTask` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "AssignedTask" DROP CONSTRAINT "AssignedTask_pkey",
ADD CONSTRAINT "AssignedTask_pkey" PRIMARY KEY ("assignedTaskId");

-- CreateIndex
CREATE UNIQUE INDEX "AssignedTask_taskId_key" ON "AssignedTask"("taskId");
