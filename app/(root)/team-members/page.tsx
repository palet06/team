import { auth } from "@/auth";
import TeamMemberCard from "@/components/cards/TeamMemberCard";
import { prisma } from "@/prisma/db";
import React from "react";

const getAllProjectToUser = async () => {
  const sonuc = await prisma.projectToUser.findMany();
  return sonuc;
};

const getAllAssignees = async () => {
  const sonuc = await prisma.user.findMany({
    include: {
      assignedTasks: {
        include: {
          task: true,
        },
      },
      projectTousers: {
        distinct: ["projectId", "userId"], //????
      },
    },
    where: { isTeamMember: true },
  });
  return sonuc;
};

const getAllAssignedTasks = async () => {
  const sonuc = await prisma.assignedTask.findMany({
    include: {
      task: true,
    },
  });
  return sonuc;
};

const getAllTasks = async () => {
  const sonuc = await prisma.task.findMany({
    include: {
      assignedTasks: true,
    },
  });
  return sonuc;
};

export type allTasksType = Awaited<ReturnType<typeof getAllTasks>>;
export type allAssignedTasksType = Awaited<
  ReturnType<typeof getAllAssignedTasks>
>;
export type allAsigneeType = Awaited<ReturnType<typeof getAllAssignees>>;

const TeamMembers = async () => {
  //const ddd = await getAllProjectToUser();
  //console.log(ddd);
  const session = await auth();
  const allTasks = await getAllTasks();
  const allAssignedTasks = await getAllAssignedTasks();
  const allAssignee = await getAllAssignees();
  console.log(allAssignee);
  return (
    <div className="grid grid-cols-1 place-items-stretch  md:grid-cols-2 2xl:grid-cols-3 gap-4  ">
      {allAssignee?.map((a, i) => (
        <TeamMemberCard
          key={i}
          _Id={a.userId}
          asigneeName={`${
            a.name.slice(0, 1).toUpperCase() + a.name.slice(1, a.name.length)
          } ${a.surname.toUpperCase()}`}
          asigneeUsername={a.username!}
          asigneeEmail={a.email}
          asigneePic={a.profilePictureUrl!}
          createdDate={a.createdDate}
          tasks={allTasks}
          assignedTasks={allAssignedTasks}
          allAsignees={allAssignee}
        />
      ))}
    </div>
  );
};

export default TeamMembers;
