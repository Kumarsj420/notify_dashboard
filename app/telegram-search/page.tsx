import { Metadata } from "next";
import Telegram from "./telegram";
import Layout from "../components/Layout";
export const metadata: Metadata = {
  title: "Employees data leak",
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
