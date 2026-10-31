import { Banner } from "@/components/banner";
import { CTA } from "@/components/cta";
import Featurection from "@/components/Featurection";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <>

      <Banner />
      <Featurection />
      <Features />

      <Testimonials />
      <CTA />
    </>
  );
}
