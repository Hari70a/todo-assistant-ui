import { useNavigate } from "react-router";

export function BackButton() {
  const navigate = useNavigate();

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-violet-300"
    >
      <span aria-hidden="true">←</span>
      Back
    </button>
  );
}
