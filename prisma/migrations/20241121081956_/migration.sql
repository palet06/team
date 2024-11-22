/*
  Warnings:

  - The primary key for the `AssignedTask` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "AssignedTask" DROP CONSTRAINT "AssignedTask_pkey",
ADD CONSTRAINT "AssignedTask_pkey" PRIMARY KEY ("assignedTaskId", "taskId");
