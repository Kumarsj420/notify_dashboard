import { Metadata } from "next";
import Domain from "./domain"; 

export const metadata: Metadata = {
  title: "Domain exposore",
  description:
    "",
};

export default function ResumePage() {
  return (
    <div className="">
      <Domain />
    </div>
  );
}
