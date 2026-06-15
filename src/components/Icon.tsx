export type IconName =
  | "analytics"
  | "arrow-left"
  | "arrow-right"
  | "building"
  | "checklist"
  | "clipboard"
  | "file-chart"
  | "heart"
  | "leaf"
  | "lock"
  | "logout"
  | "mail"
  | "menu"
  | "more"
  | "package"
  | "settings"
  | "shield"
  | "sparkles"
  | "sprout"
  | "truck"
  | "upload"
  | "user"
  | "users"
  | "x";

const paths: Record<IconName, string[]> = {
  analytics: ["M4 19V9", "M10 19V5", "M16 19v-7", "M22 19H2"],
  "arrow-left": ["M19 12H5", "M12 19l-7-7 7-7"],
  "arrow-right": ["M5 12h14", "M12 5l7 7-7 7"],
  building: ["M4 21V7l8-4 8 4v14", "M9 21v-6h6v6", "M8 10h.01", "M16 10h.01", "M8 14h.01", "M16 14h.01"],
  checklist: ["M9 11l2 2 4-4", "M9 17l2 2 4-4", "M5 5h14v16H5z"],
  clipboard: ["M9 3h6l1 2h3v16H5V5h3z", "M9 9h6", "M9 13h6", "M9 17h4"],
  "file-chart": ["M6 2h9l5 5v15H6z", "M14 2v6h6", "M10 18v-4", "M14 18v-7", "M18 18v-5"],
  heart: ["M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"],
  leaf: ["M5 21c8-1 14-7 16-18C10 4 4 10 5 21z", "M5 21c4-6 8-9 13-12"],
  lock: ["M7 11V8a5 5 0 0 1 10 0v3", "M5 11h14v10H5z"],
  logout: ["M10 17l5-5-5-5", "M15 12H3", "M21 3v18h-8"],
  mail: ["M4 6h16v12H4z", "M4 7l8 6 8-6"],
  menu: ["M4 6h16", "M4 12h16", "M4 18h16"],
  more: ["M12 5h.01", "M12 12h.01", "M12 19h.01"],
  package: ["M3 8l9-5 9 5-9 5z", "M3 8v8l9 5 9-5V8", "M12 13v8"],
  settings: ["M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z", "M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a7 7 0 0 0-1.7-1L14.5 3h-5l-.3 3.1a7 7 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .3 0 .7.1 1l-2 1.5 2 3.4 2.4-1a7 7 0 0 0 1.7 1l.3 3.1h5l.3-3.1a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1z"],
  shield: ["M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6z", "M9 12l2 2 4-4"],
  sparkles: ["M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7z", "M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"],
  sprout: ["M12 21V10", "M12 10C8 10 5 7 5 3c4 0 7 3 7 7z", "M12 13c5 0 8-3 8-8-5 0-8 3-8 8z"],
  truck: ["M3 7h11v10H3z", "M14 11h4l3 3v3h-7z", "M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"],
  upload: ["M12 16V4", "M7 9l5-5 5 5", "M4 16v4h16v-4"],
  user: ["M20 21a8 8 0 0 0-16 0", "M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"],
  users: ["M16 21a6 6 0 0 0-12 0", "M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M22 21a5 5 0 0 0-5-5", "M17 3a4 4 0 0 1 0 8"],
  x: ["M18 6L6 18", "M6 6l12 12"],
};

export function Icon({ name, size = 20, className = "" }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
