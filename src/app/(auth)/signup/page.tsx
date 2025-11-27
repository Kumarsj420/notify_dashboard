import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | NotifyBreach Admin Panel",
  description: "Create your NotifyBreach Admin Panel account.",
};

export default function SignUp() {
  return <SignUpForm />;
}
