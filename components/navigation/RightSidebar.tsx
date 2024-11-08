import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PriorCard from "../cards/PriorCard";

const hotTasks = [
  {
    id: "1",
    title: "NVİ sorgu ekranı çalışmıyor.",
  },
  {
    id: "2",
    title: "NVİ sorgu ekranı çalışmıyor.",
  },
  {
    id: "3",
    title: "NVİ sorgu ekranı çalışmıyor.",
  },
];

const popularPriors = [
  {
    _id: "1",
    name: "Acil",
    tasks: 20,
  },
  {
    _id: "2",
    name: "Yüksek",
    tasks: 12,
  },
  {
    _id: "3",
    name: "Orta",
    tasks: 21,
  },
  {
    _id: "4",
    name: "Düşük",
    tasks: 32,
  },
];

const RightSidebar = () => {
  return (
    <section className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark-200_light900">Son Atanan Görevler</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotTasks.map(({ id, title }) => (
            <Link
              className="flex cursor-pointer items-center justify-between gap-7"
              key={id}
              href={`/assigned-tasks/${id}`}
            >
              <p className="body-medium text-dark500_light700">{title}</p>
              <ChevronRight className="!invert-colors" />
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
