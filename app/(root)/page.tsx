import { auth } from "@/auth";
import { Chart } from "@/components/cards/Chart";
import { Separator } from "@/components/ui/separator";
//TODO: Brada veri tabanından danışmanlar, atanan görevler ve görevler tablosundan veriler çekilecek
//TODO: Ayrıca hot tasks ve öncelikli görevlerin adetleri vs.  yap gardaş veri tabanaından mı çekiyorsun artık ne yapıyorsun

import { prisma } from "@/prisma/db";

const getAllTasks = async () => {
  const sonuc = await prisma.task.findMany({
    include: {
      assignedTasks: true,
    },
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
export type allAssignedTasksType = Awaited<
  ReturnType<typeof getAllAssignedTasks>
>;
export type allTasksType = Awaited<ReturnType<typeof getAllTasks>>;
const Home = async () => {
  const session = await auth();
  const allTasks = await getAllTasks();
  const allAssignedTasks = await getAllAssignedTasks();

  return (
    <>
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 text-center ">
        <div className="col-span-1">
          <Chart allTasks={allTasks} allAssignedTasks={allAssignedTasks} />
        </div>
      </div>
      <Separator className="mt-4" />
    </>
  );
};
export default Home;
