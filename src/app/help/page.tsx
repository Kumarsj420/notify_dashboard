import { Metadata } from "next";
import HelpSupportPage from "./help";
import Layout from "@/components/Layout";
export const metadata: Metadata = {
  title: "Help & Support",
  description:
    "",
};

export default function ResumePage() {
  return (
    <Layout>
      <div className="">
        <HelpSupportPage />
      </div>
    </Layout>
  );
}
