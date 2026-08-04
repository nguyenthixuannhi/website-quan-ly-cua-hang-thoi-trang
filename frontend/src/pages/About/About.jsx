import "./About.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import StorySection  from "../../components/StorySection/StorySection";
import MissionVision from "../../components/MissionVision/MissionVision";
import CoreValues from "../../components/CoreValues/CoreValues";
import Statistics from "../../components/Statistics/Statistics";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import CtaBanner from "../../components/CtaBanner/CtaBanner";
import AboutHero from "../../components/AboutHero/AboutHero";

function About() {
  return (
    <>
      <Header />

      <main className="about-page">

        <AboutHero />
        <StorySection />
        <MissionVision />
        <CoreValues />
         <Statistics />
         <WhyChooseUs />
         <CtaBanner />



      

      </main>

      <Footer />
    </>
  );
}

export default About;