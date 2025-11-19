import { Metadata } from "next";
import Ransomware from "./ransomware";
import Layout from "../components/Layout";

export const metadata: Metadata = {
  title: "Ransomware",
  description:
    "",
};

export default function ResumePage() {
  return (
    <Layout>
      <div className="">
        <Ransomware />
      </div>
    </Layout>
  );
}
