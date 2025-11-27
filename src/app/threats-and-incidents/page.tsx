import { Metadata } from "next";
import ThreatsIncidentsPage from "./threats";
import Layout from "@/components/Layout";
export const metadata: Metadata = {
  title: "Threats & incidents",
  description:
    "",
};

export default function ResumePage() {
  return (
    <Layout>
      <div className="">
        <ThreatsIncidentsPage />
      </div>
    </Layout>
  );
}
