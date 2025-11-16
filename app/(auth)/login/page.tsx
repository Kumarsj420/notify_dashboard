import SignInForm from "../../components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | NotifyBreach Admin Panel",
  description: "Sign in to your NotifyBreach Admin Panel account.",
};

export default function SignIn() {
  return <SignInForm />;
}
