import { Metadata } from "next";
import Telegram from "./telegram";
import Layout from "@/components/Layout";
export const metadata: Metadata = {
  title: "Telegram search data",
  description:
    "",
};

export default function ResumePage() {
  return (
    <Layout>
      <div className="">
        <Telegram />
      </div>
    </Layout>
  );
}
