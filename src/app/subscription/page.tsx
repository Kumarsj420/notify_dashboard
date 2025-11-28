import { Metadata } from "next";
import SubscriptionPage from "./subsciption";
import Layout from "@/components/Layout";
export const metadata: Metadata = {
  title: "Subscription",
  description:
    "",
};

export default function ResumePage() {
  return (
    <Layout>
      <div className="">
        <SubscriptionPage />
      </div>
    </Layout>
  );
}
