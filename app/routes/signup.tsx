import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { AuthShell } from "../components/auth/AuthShell";
import { FormField, inputClass } from "../components/auth/FormField";
import { API_URL } from "../lib/api";

type SignupFormValues = {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  role: string;
  phone_number: string;
};

export default function Signup() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({ defaultValues: { role: "admin" } });

  async function onSubmit(values: SignupFormValues) {
    setServerError("");
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/auth/sign-up`, values);
      navigate("/login", { replace: true, state: { message: "Account created. Sign in to continue." } });
    } catch (error) {
      const detail = axios.isAxiosError(error) ? error.response?.data?.detail : null;
      setServerError(typeof detail === "string" ? detail : "We could not create your account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell variant="signup">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full space-y-6 px-5 pb-5 pt-3 sm:px-10 sm:pb-10 sm:pt-4">
        <div>
          <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">GET STARTED</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-3xl">Create your account</h1>
          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">A few details now, a more organized day next.</p>
        </div>
        <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
          <FormField id="email" label="Email" error={errors.email?.message}><input {...register("email", { required: "Email is required.", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address." } })} id="email" type="email" autoComplete="email" className={inputClass} placeholder="you@example.com" /></FormField>
          <FormField id="username" label="Username" error={errors.username?.message}><input {...register("username", { required: "Username is required." })} id="username" type="text" autoComplete="username" className={inputClass} placeholder="Choose a username" /></FormField>
          <FormField id="first_name" label="First name" error={errors.first_name?.message}><input {...register("first_name", { required: "First name is required." })} id="first_name" type="text" autoComplete="given-name" className={inputClass} placeholder="First name" /></FormField>
          <FormField id="last_name" label="Last name" error={errors.last_name?.message}><input {...register("last_name", { required: "Last name is required." })} id="last_name" type="text" autoComplete="family-name" className={inputClass} placeholder="Last name" /></FormField>
          <FormField id="password" label="Password" error={errors.password?.message}><input {...register("password", { required: "Password is required.", minLength: { value: 6, message: "Password must be at least 6 characters." } })} id="password" type="password" autoComplete="new-password" className={inputClass} placeholder="At least 6 characters" /></FormField>
          <FormField id="phone_number" label="Phone number" error={errors.phone_number?.message}><input {...register("phone_number", { required: "Phone number is required.", minLength: { value: 7, message: "Enter a valid phone number." }, maxLength: { value: 10, message: "Enter a valid phone number." } })} id="phone_number" type="tel" autoComplete="tel" maxLength={10} className={inputClass} placeholder="Your phone number" /></FormField>
        </div>
        {serverError && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">{serverError}</p>}
        <div className="space-y-4">
          <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-violet-700 px-4 py-3 font-semibold text-white shadow-lg shadow-violet-700/20 transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-violet-500 dark:hover:bg-violet-400">{isSubmitting ? "Creating account..." : "Create account"}</button>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">Already have an account? <Link to="/login" className="font-semibold text-violet-700 dark:text-violet-300">Sign in</Link></p>
        </div>
      </form>
    </AuthShell>
  );
}
