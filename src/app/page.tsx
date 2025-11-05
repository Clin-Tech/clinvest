import SelectionTab from "@/customer/components/SelectionTab";
import Layout from "@/layout";
import AnimatedTextLine from "@/shared/AnimatedTextLine";
import { HomePageImg, HomePageImg2 } from "../../public/assets/images/index";
import Image from "next/image";
import React from "react";
import AdsCarousel from "@/customer/components/AdsCarousel";
import FeaturedPropertiesSection from "@/customer/components/FeaturedPropertiesSection";
import OurServicesSection from "@/customer/components/OurServicesSection";
import { TestimonialSection } from "@/customer/components/TestimonialSection";
import { StepsSection } from "@/customer/components/StepsSection";

function HomePage() {
  return (
    <Layout>
      <div className="w-full flex flex-col items-center">
        <div className="w-full relative h-[100vh] lg:h-[400px] flex flex-col items-center justify-center gap-6 bg-[#090040]">
          <div className="w-full flex items-start justify-center lg:mb-[70px]">
            <AnimatedTextLine
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center w-[90%] sm:w-[60%] lg:w-[600px] leading-[60px]"
              textLine="Explore, Choose, Live. It’s That Simple."
              colorMap={[
                { range: [0, 15], class: "text-white" },
                { range: [16, 42], class: "text-[#A02AD7]" },
              ]}
            />
          </div>

          <div className="w-full flex items-center justify-center relative lg:absolute bottom-0 lg:bottom-[-130px] xl:bottom-[-50px]">
            <SelectionTab />
          </div>
        </div>
        <div className="w-full hidden lg:flex items-center justify-center">
          <Image
            // src={HomePageImg}
            src={HomePageImg2}
            alt="family-moving-in"
            className="h-[35em]"
          />
        </div>
        <div className="w-full flex items-center justify-center my-10 lg:mt-20">
          <AdsCarousel />
        </div>
      </div>
      <div>
        <FeaturedPropertiesSection />
      </div>
      <div>
        <OurServicesSection />
        <StepsSection />
        <TestimonialSection />
      </div>
    </Layout>
  );
}

export default HomePage;
