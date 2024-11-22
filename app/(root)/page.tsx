import { format } from "date-fns";
import { auth } from "@/auth";
import { Chart } from "@/components/cards/Chart";
import TeamMemberCard from "@/components/cards/TeamMemberCard";
import { TeamMemberPerformanceCard } from "@/components/cards/TeamMemberPerformanceCard";
import { Separator } from "@/components/ui/separator";
//TODO: Brada veri tabanından danışmanlar, atanan görevler ve görevler tablosundan veriler çekilecek
//TODO: Ayrıca hot tasks ve öncelikli görevlerin adetleri vs.  yap gardaş veri tabanaından mı çekiyorsun artık ne yapıyorsun

import { prisma } from "@/prisma/db";

// const getAllUsers = async () => {
//   const sonuc = await prisma.user.findMany({
//     include: {
//       assignedTasks: { select: { task: true } },
//     },
//   });
//   return sonuc;
// };

const getAllAssignees = async () => {
  const sonuc = await prisma.user.findMany({
    include: {
      assignedTasks: {
        include: {
          task: true,
        },
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

const Home = async () => {
  const session = await auth();
  const allTasks = await getAllTasks();
  const allAssignedTasks = await getAllAssignedTasks();
  const allAssignee = await getAllAssignees();

  return (
    <>
      <div className="grid xs:grid-cols-1 lg:grid-cols-2 gap-4 text-center items-center">
        <div className="col-span-1">
          <Chart allTasks={allTasks} allAssignedTasks={allAssignedTasks} />
        </div>
        <div className="col-span-1">
          {allAssignee?.map((a, i) => (
            <TeamMemberCard
              key={i}
              _Id={a.userId}
              asigneeName={`${
                a.name.slice(0, 1).toUpperCase() +
                a.name.slice(1, a.name.length)
              } ${a.surname.toUpperCase()}`}
              asigneeUsername={a.username!}
              asigneeEmail={a.email}
              asigneePic={a.profilePictureUrl!}
              createdDate={a.createdDate}
              tasks={allTasks}
              assignedTasks={allAssignedTasks}
            />
          ))}
        </div>
      </div>
      <Separator className="mt-4" />
    </>
  );
};
export default Home;
