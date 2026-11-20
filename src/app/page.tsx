import Counter from "@/components/counter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ED Report",
  description:
    "ED Report calculator developed by Chammyae Kyawzin, powered by Nextjs, Shadcn",
};

export default function Home() {
  return <Counter />;
}
