import Link from "next/link";
import React from "react";
import PriorCard from "../cards/PriorCard";
import { prisma } from "@/prisma/db";

const getAllAssignedTasks = async () => {
  const sonuc = await prisma.assignedTask.findMany({
    include: {
      task: true,
    },
    orderBy: {
      createdDate: "desc",
    },
    take: 5,
  });
  return sonuc;
};

const getAllAssignedTasks2 = async () => {
  const sonuc = await prisma.assignedTask.findMany({
    include: {
      task: true,
    },
  });
  return sonuc;
};
export type allTasksType2 = Awaited<ReturnType<typeof getAllAssignedTasks2>>;

export type allTasksType = Awaited<ReturnType<typeof getAllAssignedTasks>>;

const RightSidebar = async () => {
  const hotTasks = await getAllAssignedTasks();
  const priorTasksAll = await getAllAssignedTasks2();

  const popularPriors = [
    {
      _id: "1",
      name: "Acil",
      tasks: priorTasksAll.filter(
        (a) => a.task.priority == "Acil" && a.task.isCompleted == false
      ).length,
    },
    {
      _id: "2",
      name: "Yüksek",
      tasks: priorTasksAll.filter(
        (a) => a.task.priority == "Yüksek" && a.task.isCompleted == false
      ).length,
    },
    {
      _id: "3",
      name: "Orta",
      tasks: priorTasksAll.filter(
        (a) => a.task.priority == "Orta" && a.task.isCompleted == false
      ).length,
    },
    {
      _id: "4",
      name: "Düşük",
      tasks: priorTasksAll.filter(
        (a) => a.task.priority == "Düşük" && a.task.isCompleted == false
      ).length,
    },
  ];

  return (
    <section className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark-200_light900">Son Atanan Görevler</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotTasks.map(({ assignedTaskId, task }) => (
            <Link
              className="flex flex-row cursor-pointer items-center justify-between  gap-7"
              key={assignedTaskId}
              href={`/assigned-tasks/${assignedTaskId}`}
            >
              <>
                <p className="body-medium text-dark500_light700 ">
                  {task.title.toUpperCase()}
                </p>
                <p>{">"}</p>
              </>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Öncelikli İşler</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularPriors.map(({ _id, name, tasks }) => (
            <PriorCard
              key={_id}
              _id={_id}
              name={name}
              tasks={tasks}
              showCount
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
