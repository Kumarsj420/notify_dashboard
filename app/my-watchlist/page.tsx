import { Metadata } from "next";
import Watchlist from "./watchlist"; 
import Layout from "../components/Layout";
export const metadata: Metadata = {
  title: "My watchlist",
  description:
    "",
};

export default function ResumePage() {
  return (
    <Layout>
      <div className="">
        <Watchlist />
      </div>
    </Layout>
  );
}
