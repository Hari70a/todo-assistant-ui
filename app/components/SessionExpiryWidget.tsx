import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { clearAccessToken, getAccessToken } from "../lib/api";

const WARNING_WINDOW_MS = 60_000;

function getTokenExpiry(token: string) {
  try {
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
    ) as { exp?: number };

    return payload.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

export default function SessionExpiryWidget() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissedWarning, setHasDismissedWarning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  useEffect(() => {
    const logout = () => {
      clearAccessToken();
      navigate("/login");
    };

    const checkExpiry = () => {
      const token = getAccessToken();

      if (!token) {
        logout();
        return;
      }

      const expiresAt = getTokenExpiry(token);

      if (!expiresAt) return;

      const remaining = expiresAt - Date.now();
      setSecondsRemaining(Math.max(0, Math.ceil(remaining / 1000)));

      if (remaining <= 0) {
        logout();
      } else if (remaining <= WARNING_WINDOW_MS && !hasDismissedWarning) {
        setIsOpen(true);
      }
    };

    checkExpiry();
    const expiryCheck = window.setInterval(checkExpiry, 1000);

    return () => window.clearInterval(expiryCheck);
  }, [hasDismissedWarning, navigate]);

  function handleContinue() {
    const token = getAccessToken();
    const expiresAt = token ? getTokenExpiry(token) : null;

    if (!expiresAt || expiresAt <= Date.now()) {
      clearAccessToken();
      navigate("/login");
      return;
    }

    setIsOpen(false);
    setHasDismissedWarning(true);
  }

  function handleLogout() {
    clearAccessToken();
    navigate("/login");
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="session-expiry-title"
        className="w-full max-w-md space-y-4 rounded-xl bg-white p-5 shadow-xl dark:bg-gray-900 sm:p-6"
      >
        <div>
          <h2 id="session-expiry-title" className="text-xl font-semibold">
            Your session is about to expire
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Your session will expire in {secondsRemaining} seconds.
          </p>
        </div>

        <div className="flex justify-end gap-3 flex-col-reverse sm:flex-row">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-gray-300 px-4 py-2 font-medium dark:border-gray-600"
          >
            Logout
          </button>
          <button
            type="button"
            onClick={handleContinue}
            className="rounded-lg bg-purple-600 px-4 py-2 font-medium text-white"
          >
            Continue Session
          </button>
        </div>
      </section>
    </div>
  );
}
