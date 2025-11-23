import { Metadata } from "next";
import User from "./User";
import Layout from "../components/Layout";
export const metadata: Metadata = {
  title: "User roles",
  description:
    "",
};

export default function ResumePage() {
  return (
    <Layout>
      <div className="">
        <User />
      </div>
    </Layout>
  );
}
