import Navbar from "@/components/Navbar";
import HeroPoster from "@/components/HeroPoster";
import FoodRibbon from "@/components/FoodRibbon";
import IntroSection from "@/components/IntroSection";
import FeaturedDishStack from "@/components/FeaturedDishStack";
import ClaypotTable from "@/components/ClaypotTable";
import CharcoalFishSection from "@/components/CharcoalFishSection";
import MenuSection from "@/components/Menu/MenuSection";
import VolcanoTofuFeature from "@/components/VolcanoTofuFeature";
import FoodPhotoStrip from "@/components/FoodPhotoStrip";
import NoodleSection from "@/components/NoodleSection";
import RedInterlude from "@/components/RedInterlude";
import SharedTableSection from "@/components/SharedTableSection";
import FeedbackWall from "@/components/FeedbackWall";
import HoursSection from "@/components/HoursSection";
import LocationTicket from "@/components/LocationTicket";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <HeroPoster />
        <FoodRibbon />
        <IntroSection />
        <FeaturedDishStack />
        <ClaypotTable />
        <CharcoalFishSection />
        <MenuSection />
        <VolcanoTofuFeature />
        <FoodPhotoStrip />
        <NoodleSection />
        <RedInterlude />
        <SharedTableSection />
        <FeedbackWall />
        <div className="grid lg:grid-cols-2 lg:items-stretch">
          <LocationTicket />
          <HoursSection />
        </div>
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
