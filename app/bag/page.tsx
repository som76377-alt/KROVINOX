import type { Metadata } from "next";
import PreviewBagPage from "@/components/preview-bag-page";

export const metadata: Metadata = {
  title: "Preview Bag",
  description: "Review the KROVINOX apparel concepts you saved. This preview is not open for orders.",
  robots: { index: false, follow: false },
};

export default function BagPage() {
  return <PreviewBagPage />;
}
