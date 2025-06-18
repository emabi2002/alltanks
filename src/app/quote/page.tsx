import { generateMetadata } from "@/lib/seo";
import QuotePageComponent from "./QuotePageComponent";

export const metadata = generateMetadata('quote');

export default function QuotePage() {
  return <QuotePageComponent />;
}
