import {
  LucideIcon,
  Satellite,
  Thermometer,
  Wind,
  Droplet,
  TentTree,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Agricultura",
      menus: [
        {
          href: "/satellite-data-and-statistics",
          label: "Datos y estadísticas satelitales",
          active: pathname.includes("/satellite-data-and-statistics"),
          icon: Satellite,
          submenus: [],
        },
        {
          href: "/weather",
          label: "Tiempo",
          active: pathname.includes("/weather"),
          icon: Thermometer,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contaminación",
      menus: [
        {
          href: "/air-pollution",
          label: "Aire",
          active: pathname.includes("/air-pollution"),
          icon: Wind,
          submenus: [],
        },
        {
          href: "/water-pollution",
          label: "Agua",
          active: pathname.includes("/water-pollution"),
          icon: Droplet,
          submenus: [],
        },
        {
          href: "/soil-contamination",
          label: "Suelo",
          active: pathname.includes("/soil-contamination"),
          icon: TentTree,
          submenus: [],
        },
      ],
    },
  ];
}
