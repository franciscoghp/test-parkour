import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, User, HomeIcon, Notebook } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/personal-info", title: "Personal Info", icon: User },
  { href: "/salary-report", title: "Salary Report", icon: Notebook },
  { href: "/settings", title: "Settings", icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [];
