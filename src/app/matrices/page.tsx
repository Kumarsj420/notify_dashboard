import { Metadata } from "next";
import Domain from "./domain";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "Matrices",
  description:
    "",
};

export default function ResumePage() {
  return (
    <Layout>
      <div className="">
        <Domain />
      </div>
    </Layout>
  );
}
