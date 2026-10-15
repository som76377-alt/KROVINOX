import type { Metadata } from "next";
import BagContents from "@/components/cart/bag-contents";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bag",
  description: "Review the contents of the KROVINOX design preview bag. No orders or payments are accepted.",
  robots: { index: false, follow: false },
};

export default function BagPage() {
  return <BagContents />;
}
