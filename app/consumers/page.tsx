import { Metadata } from "next";
import Consumer from './consumer'
import Layout from "../components/Layout";

export const metadata: Metadata = {
    title: "Consumers",
    description:
        "",
};

export default function ResumePage() {
    return (
        <Layout>
            <div className="">
                <Consumer />
            </div>
        </Layout>
    );
}