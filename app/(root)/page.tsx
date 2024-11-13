import { auth } from "@/auth";
//TODO: Brada veri tabanından danışmanlar, atanan görevler ve görevler tablosundan veriler çekilecek
//TODO: Ayrıca hot tasks ve öncelikli görevlerin adetleri vs.  yap gardaş veri tabanaından mı çekiyorsun artık ne yapıyorsun

import { prisma } from "@/prisma/db";

const getAllUsers = async () => {
  const sonuc = await prisma.user.findMany({
    include: {
      assignedTasks: { select: { task: true } },
    },
  });
  return sonuc;
};

const Home = async () => {
  const session = await auth();
  const users = await getAllUsers();
  users.map((s) => s.assignedTasks?.map((a) => console.log(a.task.title)));
  console.log(session);
  return (
    <>
      <h1 className="">Hayır</h1>
      <h1 className="font-space-grotesk">Hayır</h1>
    </>
  );
};
export default Home;
