import { Metadata } from "next";
import CompanyInfoPage from "./company";
import Layout from "../components/Layout";
export const metadata: Metadata = {
  title: "Company info",
  description:
    "",
};

export default function ResumePage() {
  return (
    <Layout>
      <div className="">
        <CompanyInfoPage />
      </div>
    </Layout>
  );
}
