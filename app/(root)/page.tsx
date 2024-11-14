import { auth } from "@/auth";
import { Chart } from "@/components/cards/Chart";
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

const getAllAssignedTasks = async () => {
  const sonuc = await prisma.assignedTask.findMany({
    include: {
      task: true,
    },
  });
  return sonuc;
};

const getAllTasks = async () => {
  const sonuc = await prisma.task.findMany();
  return sonuc;
};

export type allTasksType = Awaited<ReturnType<typeof getAllTasks>>;
export type allAssignedTasksType = Awaited<
  ReturnType<typeof getAllAssignedTasks>
>;

const Home = async () => {
  const session = await auth();
  const allTasks = await getAllTasks();
  const allAssignedTasks = await getAllAssignedTasks();
  return (
    <>
      <div className="flex flex-col gap-4">
        <Chart allTasks={allTasks} allAssignedTasks={allAssignedTasks} />
        <Separator />
      </div>
    </>
  );
};
export default Home;
