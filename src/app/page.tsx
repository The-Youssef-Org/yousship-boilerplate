import { Suspense } from "react";
import { renderSchemaTags } from "@/libs/seo";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import WithWithout from "@/components/WithWithout";
import FeaturesListicle from "@/components/FeaturesListicle";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import FeaturesGrid from "@/components/FeaturesGrid";
import Pricing from "@/components/Pricing";
import TestimonialRollercoaster from "@/components/TestimonialRollercoaster";
import Testimonial1 from "@/components/Testimonial1";
import Testimonial3 from "@/components/Testimonial3";
import Testimonial11 from "@/components/Testimonial11";
import FAQ from "@/components/FAQ";
import Blog from "@/components/Blog";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {renderSchemaTags()}
      <Suspense>
        <Header />
      </Suspense>
      <main className="flex-1">
        {/* ----------------------------------------------------------------
          LANDING PAGE SECTIONS
          Add, remove, or reorder sections to match your product.
          Each section is a self-contained component in src/components/.
          Edit copy, images, and data directly inside each component file.
        ---------------------------------------------------------------- */}
        <Hero />
        <Problem />
        <WithWithout />
        <FeaturesListicle />
        <FeaturesAccordion />
        <FeaturesGrid />
        <CTA />
        <Pricing />
        <Blog />
        <Testimonial1 />
        <TestimonialRollercoaster />
        <Testimonial3 />
        <Testimonial11 />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
