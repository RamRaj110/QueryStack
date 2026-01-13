import {
  BadgeQuestionMark,
  BriefcaseBusiness,
  House,
  Star,
  Tag,
  User,
  Users,
} from "lucide-react";

export const sidebarLinks = [
  {
    route: "/",
    label: "Home",
    icon: <House />,
  },
  {
    route: "/community",
    label: "Community",
    icon: <Users />,
  },
  {
    route: "/collection",
    label: "Collection",
    icon: <Star />,
  },
  {
    route: "/jobs",
    label: "Find jobs",
    icon: <BriefcaseBusiness />,
  },
  {
    route: "/tags",
    label: "Tags",
    icon: <Tag />,
  },
  {
    route: "/profile",
    label: "Profile",
    icon: <User />,
  },
  {
    route: "/ask-question",
    label: "Ask a question",
    icon: <BadgeQuestionMark />,
  },
];
