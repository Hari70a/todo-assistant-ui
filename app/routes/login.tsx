import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { AuthShell } from "../components/auth/AuthShell";
import { API_URL, setAccessToken } from "../lib/api";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const cleanUsername = username.trim();
    if (!cleanUsername) return setError("Username is required.");
    if (!password) return setError("Password is required.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");

    try {
      setLoading(true);
      const formData = new URLSearchParams({ username: cleanUsername, password });
      const response = await axios.post(`${API_URL}/auth/login`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      const token = response.data.access_token ?? response.data.token;
      if (!token) throw new Error("The API did not return a token.");
      setAccessToken(token);
      navigate("/chatbot", { replace: true });
    } catch {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell variant="login">
      <form onSubmit={handleSubmit} noValidate className="w-full space-y-6 px-5 pb-5 pt-3 sm:px-10 sm:pb-10 sm:pt-4">
        <div>
          <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">WELCOME BACK</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-3xl">Log in to your account</h1>
          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">Your tasks are waiting right where you left them.</p>
        </div>
        <div className="space-y-5">
          <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
            Username
            <input id="username" type="text" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} className="mt-1.5 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-normal text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-gray-700 dark:bg-gray-950 dark:text-white" placeholder="Enter your username" />
          </label>
          <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
            Password
            <input id="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-normal text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-gray-700 dark:bg-gray-950 dark:text-white" placeholder="Enter your password" />
          </label>
        </div>
        {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
        <button type="submit" disabled={loading} className="w-full rounded-xl bg-violet-700 px-4 py-3 font-semibold text-white shadow-lg shadow-violet-700/20 transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-violet-500 dark:hover:bg-violet-400">{loading ? "Signing in..." : "Sign in"}</button>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">New here? <Link to="/signup" className="font-semibold text-violet-700 dark:text-violet-300">Create an account</Link></p>
      </form>
    </AuthShell>
  );
}
