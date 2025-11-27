import { Metadata } from "next";
import ProfilePage from "./profile";
import Layout from "@/components/Layout";
export const metadata: Metadata = {
  title: "My profile",
  description:
    "",
};

export default function ResumePage() {
  return (
    <Layout>
      <div className="">
        <ProfilePage />
      </div>
    </Layout>
  );
}
