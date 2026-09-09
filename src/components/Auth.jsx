import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Auth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { user, login, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  if (user) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (isRegistering && !form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!form.email.trim() || !form.password) {
      setError("Email and password are required.");
      return;
    }

    const authError = isRegistering
      ? register(form.name, form.email, form.password)
      : login(form.email, form.password);

    if (authError) {
      setError(authError);
      return;
    }

    navigate("/");
  };

  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-[#111] px-4 py-10 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-neutral-800 bg-[#181818] p-8 shadow-xl"
      >
        <h1 className="text-2xl font-bold">
          {isRegistering ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          {isRegistering
            ? "Save your watchlist with a demo account."
            : "Sign in to access your watchlist."}
        </p>

        {isRegistering && (
          <input
            value={form.name}
            onChange={(event) =>
              setForm({ ...form, name: event.target.value })
            }
            placeholder="Name"
            className="mt-6 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-emerald-400"
          />
        )}
        <input
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          placeholder="Email"
          className="mt-4 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-emerald-400"
        />
        <input
          type="password"
          value={form.password}
          onChange={(event) =>
            setForm({ ...form, password: event.target.value })
          }
          placeholder="Password"
          className="mt-4 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-emerald-400"
        />

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-emerald-300 px-4 py-3 font-semibold text-black transition hover:bg-emerald-200"
        >
          {isRegistering ? "Create account" : "Login"}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError("");
          }}
          className="mt-4 w-full text-sm text-neutral-400 hover:text-white"
        >
          {isRegistering
            ? "Already have an account? Login"
            : "New here? Create an account"}
        </button>
        <Link to="/" className="mt-4 block text-center text-sm text-neutral-500 hover:text-white">
          Continue browsing
        </Link>
      </form>
    </div>
  );
};

export default Auth;
