import { cn } from "@/lib/utils";
import {
  CircleUser,
  FolderKanban,
  House,
  ListTodo,
  LucideProps,
  Shield,
  Users,
} from "lucide-react";
import React from "react";

import { createElement } from "react";

export const sidebarLinks = [
  {
    imgURL: House,
    label: "Anasayfa",
    route: "/",
  },
  {
    imgURL: FolderKanban,
    label: "Projeler",
    route: "/projects",
  },
  {
    imgURL: Users,
    label: "Danışmanlar",
    route: "/team-members",
  },
  {
    imgURL: Shield,
    label: "İdare",
    route: "/executives",
  },
  {
    imgURL: ListTodo,
    label: "Görevler",
    route: "/tasks",
  },

  {
    imgURL: CircleUser,
    label: "Profil",
    route: "/profile",
  },
];
