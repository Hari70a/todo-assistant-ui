import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI powered Task Management" },
    {
      name: "description",
      content: "Plan, prioritize, and complete your work with AI powered Task Management.",
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
