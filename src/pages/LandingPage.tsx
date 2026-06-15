import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon, IconName } from "../components/Icon";

const portals = [
  {
    title: "Donor Portal",
    description: "Create and track surplus food donations from restaurants, events, and community kitchens.",
    path: "/auth/donor",
    icon: "heart" as IconName,
  },
  {
    title: "Receiver Portal",
    description: "Review available donations, accept suitable food entries, and coordinate distribution and delivery.",
    path: "/auth/receiver",
    icon: "building" as IconName,
  },
];

export function LandingPage() {
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-field">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-herb text-white shadow-soft">
              <Icon name="sprout" size={24} />
            </div>
            <div>
              <p className="font-bold text-ink">AI Food</p>
              <p className="text-xs font-semibold uppercase text-slate-500">Redistribution System</p>
            </div>
          </div>
          <div className="relative">
            <button
              type="button"
              aria-label="Open portal menu"
              aria-expanded={adminMenuOpen}
              onClick={() => setAdminMenuOpen((open) => !open)}
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-slate-600 shadow-sm transition hover:border-herb hover:text-herb"
            >
              <Icon name="more" size={22} />
            </button>
            {adminMenuOpen ? (
              <div className="absolute right-0 top-14 z-20 w-56 rounded-xl border border-line bg-white p-2 shadow-soft">
                <Link
                  to="/auth/admin"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-ink transition hover:bg-mint hover:text-herb"
                >
                  <Icon name="shield" size={18} />
                  Admin Portal
                </Link>
              </div>
            ) : null}
          </div>
        </nav>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <h1 className="max-w-4xl text-5xl font-bold leading-tight text-ink sm:text-6xl">
              AI Food Redistribution System
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              This is an AI-based food redistribution platform that connects food donors, NGOs, volunteers, and
              administrators to reduce food wastage and ensure surplus food reaches people in need efficiently.
            </p>
          </div>

          <div className="grid gap-4">
            {portals.map((portal) => {
              return (
                <Link
                  key={portal.title}
                  to={portal.path}
                  className="group rounded-3xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-mint text-herb">
                      <Icon name={portal.icon} size={25} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h2 className="text-xl font-bold text-ink">{portal.title}</h2>
                        <Icon name="arrow-right" className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-herb" />
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{portal.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
