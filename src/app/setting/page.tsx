import { Metadata } from "next";
import SettingPage from "./setting";
import Layout from "@/components/Layout";
export const metadata: Metadata = {
  title: "Settings",
  description:
    "",
};

export default function ResumePage() {
  return (
    <Layout>
      <div className="">
        <SettingPage />
      </div>
    </Layout>
  );
}
