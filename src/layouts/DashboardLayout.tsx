import { ReactNode, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Icon, IconName } from "../components/Icon";
import { useApp } from "../context/AppContext";
import { Role } from "../types";

type NavItem = {
  label: string;
  path: string;
  icon: IconName;
};

const roleLabels: Record<Role, string> = {
  donor: "Donor Portal",
  receiver: "Receiver Portal",
  admin: "Admin Portal",
};

export function DashboardLayout({ role, navItems, children }: { role: Role; navItems: NavItem[]; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sidebar = (
    <aside className="flex h-full flex-col bg-ink text-white">
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-herb">
          <Icon name="sprout" size={24} />
        </div>
        <div>
          <p className="font-bold">AI Food</p>
          <p className="text-xs text-white/60">{roleLabels[role]}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-5">
        {navItems.map((item) => {
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === `/${role}`}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  isActive ? "bg-white text-ink" : "text-white/72 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="mb-4 rounded-xl bg-white/8 p-3">
          <p className="truncate text-sm font-semibold">{currentUser?.name}</p>
          <p className="truncate text-xs text-white/55">{currentUser?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="focus-ring flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/72 hover:bg-white/10 hover:text-white"
        >
          <Icon name="logout" size={18} />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-field">
      <div className="hidden fixed inset-y-0 left-0 z-20 w-72 lg:block">{sidebar}</div>

      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-white/95 px-4 py-4 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3 font-bold text-ink">
          <Icon name="sprout" className="text-herb" />
          {roleLabels[role]}
        </div>
        <button className="focus-ring rounded-lg border border-line p-2" onClick={() => setOpen(true)} aria-label="Open menu">
          <Icon name="menu" size={20} />
        </button>
      </header>

      {open ? (
        <div className="fixed inset-0 z-30 lg:hidden">
          <button className="absolute inset-0 bg-ink/45" onClick={() => setOpen(false)} aria-label="Close menu" />
          <div className="absolute inset-y-0 left-0 w-72 shadow-soft">
            <button className="absolute right-4 top-4 z-10 rounded-lg bg-white/10 p-2 text-white" onClick={() => setOpen(false)}>
              <Icon name="x" size={18} />
            </button>
            {sidebar}
          </div>
        </div>
      ) : null}

      <main className="px-4 py-8 sm:px-6 lg:ml-72 lg:px-10">{children}</main>
    </div>
  );
}
