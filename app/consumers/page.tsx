import { Metadata } from "next";

import Consumer from './consumer'
export const metadata: Metadata = {
    title: "Consumers",
    description:
        "",
};

export default function ResumePage() {
    return (
        <div className="">
            <Consumer />
        </div>
    );
}