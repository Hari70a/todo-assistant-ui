import { Link } from "react-router";
import logoLight from "../../welcome/task-logo-light.svg";
import logoDark from "../../welcome/task-logo-dark.svg";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center border-b border-gray-200 bg-white/95 px-4 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95 sm:h-20">
      <Link to="/" aria-label="AI powered Task Management home" className="inline-flex min-w-0 dark:hidden">
        <img src={logoLight} alt="AI powered Task Management" className="h-9 w-auto max-w-full md:h-14" />
      </Link>
      <Link to="/" aria-label="AI powered Task Management home" className="min-w-0 hidden dark:inline-flex">
        <img src={logoDark} alt="AI powered Task Management" className="h-9 w-auto max-w-full md:h-14" />
      </Link>
    </header>
  );
}
