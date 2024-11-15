import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import {
  BetweenHorizonalStart,
  ChevronsDown,
  ShieldAlert,
  SignalHigh,
} from "lucide-react";

interface Props {
  _id: string;
  name: string;
  tasks: number;
  showCount?: boolean;
  compact?: boolean;
}

const PriorCard = ({ _id, name, tasks, showCount, compact }: Props) => {
  return (
    <Link href={ROUTES.TASKS(_id)} className="flex justify-between gap-2">
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 ">
        <div className="flex items-center space-x-2 w-16">
          {name == "Acil" && (
            <ShieldAlert className="text-red-600 dark:text-red-500 " />
          )}
          {name == "Yüksek" && <SignalHigh className="text-orange-400" />}
          {name == "Orta" && (
            <BetweenHorizonalStart className="text-yellow-400" />
          )}
          {name == "Düşük" && <ChevronsDown className="text-green-500" />}

          <span>{name}</span>
        </div>
      </Badge>
      {showCount && (
        <p className="flex items-center small-medium text-dark500_light700">
          {tasks}
        </p>
      )}
    </Link>
  );
};

export default PriorCard;
