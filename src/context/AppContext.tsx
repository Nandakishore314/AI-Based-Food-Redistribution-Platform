import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { Donation, DonationInput, DonationStatus, Role, User } from "../types";

type AuthPayload = {
  name: string;
  email?: string;
  password: string;
  confirmPassword?: string;
  role: Role;
  mode: "login" | "signup";
};

type AppContextValue = {
  currentUser: User | null;
  users: User[];
  donations: Donation[];
  authenticate: (payload: AuthPayload) => { ok: boolean; error?: string };
  logout: () => void;
  createDonation: (input: DonationInput) => void;
  acceptDonation: (donationId: string) => void;
  updateDonationStatus: (donationId: string, status: DonationStatus) => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

const makeId = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const allowedAdmins = ["Nanda", "Harshith", "Suhas", "Sumithran"];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);

  const authenticate = ({ name, email = "", password, confirmPassword = "", role, mode }: AuthPayload) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (role === "admin") {
      if (!cleanName || !password.trim()) {
        return { ok: false, error: "Username and password are required." };
      }
      if (!allowedAdmins.includes(cleanName)) {
        return { ok: false, error: "Access Denied. You are not authorized to access the Admin Portal." };
      }
    } else if (mode === "signup") {
      if (!cleanName || !cleanEmail || !password.trim() || !confirmPassword.trim()) {
        return { ok: false, error: "Please complete all sign up fields." };
      }
      if (password !== confirmPassword) {
        return { ok: false, error: "Passwords do not match." };
      }
    } else if (!cleanName || !password.trim()) {
      return { ok: false, error: "Email or username and password are required." };
    }

    const sessionUser: User = {
      id: makeId("user"),
      name: cleanName,
      email:
        mode === "signup"
          ? cleanEmail
          : cleanName.includes("@")
            ? cleanName
            : `${cleanName.replace(/\s+/g, ".").toLowerCase()}@session.local`,
      role,
      createdAt: new Date().toISOString(),
    };

    if (mode === "signup") {
      setUsers((existing) => [sessionUser, ...existing]);
    }

    setCurrentUser(sessionUser);
    return { ok: true };
  };

  const logout = () => setCurrentUser(null);

  const createDonation = (input: DonationInput) => {
    if (!currentUser || currentUser.role !== "donor") return;

    const donation: Donation = {
      ...input,
      id: makeId("donation"),
      donorId: currentUser.id,
      donorName: currentUser.name,
      status: "available",
      createdAt: new Date().toISOString(),
    };

    setDonations((existing) => [donation, ...existing]);
  };

  const acceptDonation = (donationId: string) => {
    if (!currentUser || currentUser.role !== "receiver") return;
    setDonations((existing) =>
      existing.map((donation) =>
        donation.id === donationId && donation.status === "available"
          ? { ...donation, status: "accepted", acceptedBy: currentUser.id }
          : donation,
      ),
    );
  };

  const updateDonationStatus = (donationId: string, status: DonationStatus) => {
    if (!currentUser || currentUser.role !== "receiver") return;
    setDonations((existing) =>
      existing.map((donation) =>
        donation.id === donationId && donation.acceptedBy === currentUser.id ? { ...donation, status } : donation,
      ),
    );
  };

  const value = useMemo(
    () => ({
      currentUser,
      users,
      donations,
      authenticate,
      logout,
      createDonation,
      acceptDonation,
      updateDonationStatus,
    }),
    [currentUser, users, donations],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
