import { Metadata } from "next";
import Domain from "./domain"; 

export const metadata: Metadata = {
  title: "Employees data leak",
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
