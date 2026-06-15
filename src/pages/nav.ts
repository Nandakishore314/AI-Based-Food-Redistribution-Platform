import { IconName } from "../components/Icon";

type NavItem = {
  label: string;
  path: string;
  icon: IconName;
};

export const donorNav: NavItem[] = [
  { label: "Create Donation", path: "/donor/create", icon: "package" },
  { label: "My Donations", path: "/donor/donations", icon: "clipboard" },
  { label: "Profile", path: "/donor/profile", icon: "user" },
];

export const receiverNav: NavItem[] = [
  { label: "Dashboard", path: "/receiver", icon: "analytics" },
  { label: "Available Donations", path: "/receiver/available", icon: "clipboard" },
  { label: "Accepted Donations", path: "/receiver/accepted", icon: "checklist" },
  { label: "Delivery Management", path: "/receiver/delivery", icon: "truck" },
  { label: "Profile", path: "/receiver/profile", icon: "user" },
];

export const adminNav: NavItem[] = [
  { label: "Dashboard", path: "/admin", icon: "analytics" },
];
