import { FormEvent, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { FormField, TextInput } from "../components/FormField";
import { Icon } from "../components/Icon";
import { useApp } from "../context/AppContext";
import { Role } from "../types";

const roleCopy: Record<Role, { title: string; text: string }> = {
  donor: {
    title: "Donor Portal",
    text: "Create donation entries and track their redistribution status.",
  },
  receiver: {
    title: "Receiver Portal",
    text: "Accept available donations and manage delivery updates.",
  },
  admin: {
    title: "Admin Portal",
    text: "Review and manage food redistribution activity.",
  },
};

export function AuthPage() {
  const params = useParams();
  const role = params.role as Role;
  const navigate = useNavigate();
  const { authenticate, currentUser } = useApp();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const copy = useMemo(() => roleCopy[role], [role]);

  if (!copy) return <Navigate to="/" replace />;
  if (currentUser) return <Navigate to={`/${currentUser.role}`} replace />;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Phone validation for non-admin signup
    if (role !== "admin" && mode === "signup") {
      if (!phone.trim()) {
        setPhoneError("Phone number is required.");
        return;
      }
      if (!/^\d{10}$/.test(phone.trim())) {
        setPhoneError("Please enter a valid 10-digit phone number.");
        return;
      }
    }
    setPhoneError("");

    const result = authenticate({ name, email, password, confirmPassword, role, mode });
    if (!result.ok) {
      setError(result.error ?? "Please complete all required fields.");
      return;
    }
    navigate(role === "donor" ? "/donor/create" : `/${role}`);
  };

  return (
    <main className="min-h-screen bg-field px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-herb">
          <Icon name="arrow-left" size={18} />
          Back to portals
        </Link>
        <div className="mt-8 grid overflow-hidden rounded-[2rem] border border-line bg-white shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
          <section className="bg-ink p-8 text-white sm:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-herb">
              <Icon name="leaf" size={28} />
            </div>
            <h1 className="mt-10 text-4xl font-bold">{copy.title}</h1>
            <p className="mt-4 max-w-md text-base leading-7 text-white/68">{copy.text}</p>
          </section>

          <section className="p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-ink">
              {role === "admin" || mode === "login" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {role === "admin"
                ? "Enter an authorized administrator username to continue."
                : mode === "login"
                  ? `Login to continue into the ${copy.title.toLowerCase()}.`
                  : `Sign up to start using the ${copy.title.toLowerCase()}.`}
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <FormField label={role === "admin" ? "Username" : mode === "signup" ? "Full Name" : "Email or Username"}>
                <div className="relative">
                  <Icon
                    name={mode === "signup" ? "user" : "mail"}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <TextInput value={name} onChange={(event) => setName(event.target.value)} className="pl-11" />
                </div>
              </FormField>
              {role !== "admin" && mode === "signup" ? (
                <FormField label="Email">
                  <div className="relative">
                    <Icon name="mail" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <TextInput
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="pl-11"
                    />
                  </div>
                </FormField>
              ) : null}
              {role !== "admin" && mode === "signup" ? (
                <FormField label="Phone Number" error={phoneError}>
                  <div className="relative">
                    <Icon name="phone" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <TextInput
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10-digit phone number"
                      value={phone}
                      onChange={(event) => {
                        const val = event.target.value.replace(/\D/g, "");
                        setPhone(val);
                        if (phoneError) setPhoneError("");
                      }}
                      className="pl-11"
                    />
                  </div>
                </FormField>
              ) : null}
              <FormField label="Password">
                <div className="relative">
                  <Icon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <TextInput
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="pl-11"
                  />
                </div>
              </FormField>
              {role !== "admin" && mode === "signup" ? (
                <FormField label="Confirm Password">
                  <div className="relative">
                    <Icon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <TextInput
                      type="password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      className="pl-11"
                    />
                  </div>
                </FormField>
              ) : null}
              {error ? <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p> : null}
              <Button className="w-full" type="submit">
                {role === "admin" || mode === "login" ? "Login" : "Sign Up"} to {copy.title}
              </Button>
            </form>
            {role !== "admin" ? (
              <p className="mt-6 text-center text-sm text-slate-500">
                {mode === "login" ? "New user? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === "login" ? "signup" : "login");
                    setError("");
                    setPhone("");
                    setPhoneError("");
                  }}
                  className="focus-ring rounded font-semibold text-herb hover:text-ink"
                >
                  {mode === "login" ? "Sign Up" : "Login"}
                </button>
              </p>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}
