import { Link } from "react-router";
import logo from "../../welcome/task-logo.svg";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center border-b border-gray-200 bg-white/95 px-4 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95 sm:h-20">
      <Link to="/" aria-label="AI powered Task Management home" className="inline-flex min-w-0">
        <img src={logo} alt="AI powered Task Management" className="h-9 w-auto max-w-full sm:h-14" />
      </Link>
    </header>
  );
}
