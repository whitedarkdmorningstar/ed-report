import Result from "@/components/result";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ED Report Result",
  description:
    "ED Report calculator developed by Chammyae Kyawzin, powered by Nextjs, Shadcn",
};

export default function Page() {
  return (
    <>
      <Result />
    </>
  );
}
