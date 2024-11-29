"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Leaf,
  Users,
  DollarSign,
  Building2,
  Monitor,
  ChevronDown,
  X,
  Facebook,
  Instagram,
  Send,
  FileText,
  Map,
  ImageIcon,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const galleries = [
  { id: 1, image: "/existing-conditions/Institutional-arr/Set.png" },
  { id: 2, image: "/existing-conditions/Irigations/irigation.png" },
  { id: 3, image: "/existing-conditions/PondCond/map.png" },
  { id: 4, image: "/existing-conditions/Water-Quality/Bacter.png" },
];

const existingConditions = [
  {
    title: "Institutional Arrangement",
    content:
      "The institutional arrangements for managing mangrove areas involve coordination among government agencies with key players Development Planning Agency at Sidoarjo Regency (Bappeda), BPDAS Brantas, Fisheries Service (D. Perikanan) and Environmental Service (DLH), the private sector including local SMEs/UMKM (Small and midsize enterprises), and local communities such as fishermen and pond farmers. These entities work together to balance conservation efforts with sustainable economic benefits. However, challenges remain in ensuring effective collaboration and cohesive strategies among stakeholders to optimize the management and utilization of mangrove resources",
    // images: [
    //   "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5zdGl0dXRpb25hbCUyMGFycmFuZ2VtZW50fGVufDB8fDB8fHww",
    //   "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5zdGl0dXRpb25hbCUyMGFycmFuZ2VtZW50fGVufDB8fDB8fHww",
    // ],
    images: ["/existing-conditions/Institutional-arr/Set.png"],
  },
  {
    title: "Regional Administration",
    content:
      "The regional administration in Sidoarjo consists of various government bodies that oversee the management and development of the area. Administrative divisions encompass sub-districts and villages, with leaders such as camat (sub-district head) and kepala desa (village head) responsible for local governance. Collaboration among these entities ensures the execution of policies and projects aimed at regional development, infrastructure management, and environmental conservation. The location of the silvofishery study in Sidoarjo Regency covers 12 villages situated in the mangrove landscape area of the Porong and Kepitingan Rivers (7,141.7 hectares), consisting of mangrove cover (480 ha), fishponds (4,522 ha), buildings (1,247 ha), and vacant land (893 ha).",
    images: [],
  },
  {
    title: "Population Demographics",
    content:
      "As of 2023, Sidoarjo ranks fourth in terms of population size in East Java, following Surabaya, Malang, and Jember. The population of Sidoarjo is projected to be 2.148 million, reflecting an increase of 1.08% compared to the previous year. The annual population growth rate has remained above 1% from 2021 to 2023, indicating steady growth. In 2021, the growth rate was 1.11%, rising to 1.14% in 2022, and maintaining an overall growth of 2.23% over the 2021-2023 period.",
    images: [],
  },
  {
    title: "Community Education Level",
    content:
      "In 2023, 57.47% of the population aged 15 and above in Sidoarjo had completed senior high school or higher, while 23.04% had a junior high school education, and 15.48% had completed elementary school. A small portion, 4.01%, did not have or had not yet obtained any formal certification. School participation rates (APS) for different age groups show high engagement, with 99.83% of children aged 7-12 attending school, 99.25% for those aged 13-15, and 82.88% for ages 16-18. However, APS values saw a slight decline compared to 2022. Literacy rates for Sidoarjo in 2023 stood at 97.43%, demonstrating significant success in eradicating illiteracy, with male literacy at 98.10% and female literacy at 96.75%, indicating higher educational attainment among men. These statistics reflect a community committed to education and cultural development, contributing to the region's overall progress",
    images: [],
  },
  {
    title: "Agricultural, Plantation, and Fisheries Conditions",
    content:
      "The agricultural sector in Sidoarjo spans 11 types of land use, including home gardens, dry fields, pastures, and ponds. Despite ongoing land conversion to residential and industrial purposes, farmers remain committed to maintaining productivity. Key crops include rice, with a combined production of 2,058,900 quintals, as well as corn, green beans, and soybeans, produced at 11,784, 15,704, and 9,790 quintals, respectively. The highest rice yields come from Wonoayu District, averaging 66.36 quintals per hectare. Plantations primarily grow sugarcane, which supports local sugar factories, with Krembung District as the top producer in 2017. Fisheries in Sidoarjo are mainly centered on coastal ponds spanning 15,513.41 hectares, which support 3,257 pond farmers and 3,246 fish workers. The main fish produced is milkfish, totaling 34,000 tons annually, with shrimp (both tiger and vannamei) also being significant, yielding 3,627 and 6,654 tons, respectively, in 2017",
    images: [
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWdyaWN1bHR1cmFsJTIwY29uZGl0aW9uc3xlbnwwfHwwfHx8MA%3D%3D",
    ],
  },
  {
    title: "Community Culture and Ethnicity",
    content:
      "Sidoarjo's community is diverse in terms of ethnicity, culture, and religious practices. The population is predominantly Javanese, with significant representation from Madurese, Chinese, Arab, and other ethnic groups who have settled in the region. The people of Sidoarjo highly value their traditional and cultural practices and are open to positive influences from outside, making it a conducive environment for development and fostering community harmony. One of the most notable traditions is the Nyadran or petik laut, a ritual rooted in honoring ancestors, involving two stages: the selametan, where offerings such as incense and flowers are presented, and the ziarah, a pilgrimage to ancestral graves. The Nyadran tradition in Dusun Kepetingan, Desa Sawohan, commemorates Dewi Sekardadu, whose story is tied to local folklore involving Sunan Giri. Another significant cultural event is the Lelang Bandeng, an annual milkfish auction organized by the local government to showcase Sidoarjo’s abundant natural resources and motivate farmers to improve aquaculture quality. This unique auction, held every year during the month of Maulud, features milkfish weighing over 4 kg and generates substantial revenue, reflecting the blend of religious and economic values inherent in Sidoarjo’s culture.",
    images: [],
  },
  {
    title: "Topography",
    content:
      "The topography of Sidoarjo Regency varies from 0 to 25 meters above sea level (mdpl) and is divided into three main classes. The 0-3 meter range encompasses the coastal and brackish water pond areas located in the eastern part of the region. The 3-10 meter range forms the central part of Sidoarjo, characterized by freshwater areas. The 10-25 meter range is situated in the western part of the region. This variation in elevation influences the types of activities conducted in each area, with coastal regions supporting aquaculture and the central and western regions being more suitable for agriculture and other land-based economic activities.",
    images: [],
  },
  {
    title: "Climate",
    content:
      "In 2022, Sidoarjo experienced its highest recorded temperature of 36.5°C in September, while the lowest temperature was 21.0°C in July, with an average humidity of 81.6%. Rainfall and the number of rainy days increased compared to the previous year, with an unusual peak in rainfall occurring in May at 461.3 mm over 21 days, surpassing typical rainy season levels from October to March. The lowest rainfall was recorded in August, at 38.9 mm with only four rainy days, but it rose again through September to December, with total monthly rainfall ranging from 151.5 mm to 259.9 mm and 59 rainy days overall. The annual data also shows a pattern of relatively high wind speeds and varying atmospheric pressure, influencing the climate dynamics in the region",
    images: [
      "/existing-conditions/Climate/1.png",
      // "/existing-conditions/Climate/2.png",
      "/existing-conditions/Climate/3.png",
    ],
  },
  {
    title: "Land Cover and Mangrove Density in Sidoarjo",
    content:
      "Land cover in the mangrove landscape area of the Kepitingan River-Porong River (11,683 ha) consists of mangrove vegetation (2,491 ha/21%), fishponds (9,647 ha), and settlements (12 ha). The distribution of mangrove vegetation is located in riverbanks (532 ha), coastal buffer zones (837 ha), canal/stream edges (655 ha), and within fishponds/dike areas (467 ha).",
    images: [
      "/existing-conditions/Land-Cover-and-Mangrove-Dense/peta-kerapatan-2023.jpeg",
      "/existing-conditions/Land-Cover-and-Mangrove-Dense/tabel-kondisi-tutupan-lahan-2023.jpeg",
      // "/existing-conditions/Land-Cover-and-Mangrove-Dense/LandCover.png",
      // "/existing-conditions/Land-Cover-and-Mangrove-Dense/Mangroves-Denses.png",
      // "/existing-conditions/Land-Cover-and-Mangrove-Dense/NewLandCover.png",
      // "/existing-conditions/Land-Cover-and-Mangrove-Dense/NewMangroves-Denses.png",
    ],
  },
  {
    title: "Shoreline Changes",
    content:
      "Shoreline changes in Sidoarjo from 2000 to 2023 were analyzed using the Digital Shoreline Analysis System (DSAS) to calculate the statistical rate of change. The study covered three main villages: Sekardangan, Kupang, and Kedungpandan. Over this period, Sekardangan experienced significant accretion at an average rate of 3.32 m/year, classified as heavy accretion, adding an average of 1.49 hectares of land per year. Kupang showed a lighter accretion rate of 0.22 m/year, contributing to 0.69 hectares of land annually. Conversely, Kedungpandan displayed the most substantial accretion, with an average rate of 6.53 m/year, adding 3.18 hectares per year. The accretion in Sekardangan and Kedungpandan primarily resulted from sediment deposition at the Porong River delta, influenced by mudflow disposal from Lapindo. Abrasion was observed in some areas due to the expansion of fishponds in coastal mangrove zones, driven by the local economic dependence on aquaculture. Minor abrasions were also linked to wave action from the Madura Strait, but their impact was not as significant",
    images: ["/existing-conditions/ShorelinesC/Shorlines.png"],
  },
  {
    title: "Species Composition",
    content:
      "The KLM region of Sidoarjo hosts a diverse range of mangrove species across different areas like coastal zones, riverbanks, and pond regions. The coastal zones are primarily dominated by major mangrove species such as Sonneratia alba, Avicennia alba, Avicennia marina, and Rhizophora apiculata. Riverbanks are populated mainly by Avicennia marina and Nypa fruticans, with additional species such as Terminalia catappa, Mangifera indica, and Tectona grandis serving as accompanying vegetation. In pond areas, major species include Avicennia marina and Rhizophora stylosa, with accompanying species like Samanea saman and Hibiscus tiliaceus. The presence of true mangroves such as Avicennia and Rhizophora indicates areas with salinity levels above 20 ppt, while Nypa fruticans thrives in areas with lower salinity, under 10 ppt.",
    images: [],
  },
  {
    title: "Dominant Mangrove Species",
    content:
      "In the coastal buffer zones of Sidoarjo, Avicennia marina is the most dominant species across all growth levels: trees (IVI 117.44%), saplings (IVI 94.70%), and seedlings (IVI 110.00%), supported by its high density, frequency, and dominance values. In riverbanks, Avicennia marina also leads among tree species (IVI 95.17%), while Albizia chinensis dominates at the sapling (IVI 128.49%) and seedling levels (IVI 133.33%). The understory in riverbanks is mainly populated by Nypa fruticans (IVI 200.00%). In pond areas, Avicennia marina remains the leading species among trees (IVI 131.59%) and saplings (IVI 120.00%), while seedlings are dominated by Rhizophora sp. (IVI 200.00%). The diversity index for trees in coastal, riverbank, and pond areas falls within the moderate range (1<H<3), indicating a balanced composition, whereas the diversity of understory, seedlings, and saplings is considered low. The evenness index suggests stability in areas with higher evenness values, particularly in mature tree and sapling levels, enhancing community resilience.",
    images: ["/existing-conditions/i-overall.png"],
  },
  {
    title: "Faunal Diversity",
    content:
      "The fauna diversity in Sidoarjo's greenbelt, riverbank, and pond areas is rich, comprising various bird and animal species. Notable examples include Amaurornis phoenicurus (Narea padi) from the Rallidae family and Chrysococcyx minutillus (Kedasi laut) from the Cuculidae family. Key bird species include Artamus leucorynchus (Kekep babi), Acridotheres javanicus (Kerak kerbau), and Rhipidura javanica (Kipasan belang), among others, spanning families such as Artamidae, Sturnidae, and Rhipiduridae. The Ardeidae family is well-represented, including Butorides striata (Kokokan laut) and Egretta sacra (Kuntul karang). The ecosystem also supports raptors like Haliaeetus leucogaster (Elang laut dada putih) from the Accipitridae family. These species contribute to the ecological balance by aiding in pest control, seed dispersion, and maintaining food chains. The presence of diverse species reflects the ecological richness and importance of conservation efforts in these zones.",
    images: [],
  },
  {
    title:
      "Biomass, Carbon Storage, and Carbon Dioxide Absorption in the Mangrove Landscape Area",
    content:
      "Biomass and carbon storage levels in the mangrove ecosystems of KLM Sidoarjo vary across coastal, riverbank, and pond areas. The highest biomass is recorded in riverbank areas at 63.04 tons/ha, largely attributed to mature mangrove stands with carbon storage reaching 29.63 tons/ha. Coastal zones follow closely with a biomass of 55.10 tons/ha and carbon storage of 25.90 tons/ha. The pond areas show the lowest biomass (6.73 tons/ha) and carbon storage (3.16 tons/ha). CO2 absorption also reflects these differences, with the highest absorption found in riverbank vegetation (108.73 tons/ha), followed by coastal zones (95.04 tons/ha), and the lowest in pond areas (11.6 tons/ha). These values are influenced by tree diameter, as larger diameters correlate with higher biomass and CO2 absorption. This relationship highlights the role of photosynthesis in converting atmospheric CO2 into organic compounds stored in wood, branches, leaves, and roots, contributing to the overall growth and carbon sequestration capacity of the trees.",
    images: ["existing-conditions/BioMass/Biomass.png"],
  },
  {
    title: "Pond Conditions",
    content:
      "Sidoarjo's traditional ponds cover approximately 15,500 hectares, with most being over 20 years old and featuring large plots exceeding 3 hectares with irregular layouts that rely on tidal irrigation. The infrastructure includes caren channels for drainage and protection during high temperatures, and pelataran, which are shallow central areas where fish and shrimp feed naturally. Surveys indicate variations in embankment dimensions and water quality parameters, with common challenges such as suboptimal water circulation and the need for effective nutrient management to maintain healthy pond conditions.",
    images: ["/existing-conditions/PondCond/map.png"],
  },
  {
    title: "Pond Design & Constructions",
    content:
      "Traditional ponds in Sidoarjo are designed with irregular layouts and rely on tidal irrigation. The infrastructure features caren channels for drainage and fish protection, as well as pelataran shallow areas for feeding. Embankment dimensions vary, with average top widths of 3.1 meters, bottom widths of 5.55 meters, and caren depths reaching up to 1.6 meters. The irrigation system utilizes tidal flows with main and secondary gates, often operating in series between ponds. Additionally, mangroves are planted on inner embankments to enhance stability and improve water quality.",
    images: ["/existing-conditions/PondConstruct/noclue.png"],
  },
  {
    title: "Layout and Irrigation System",
    content:
      "The layout of Sidoarjo's traditional ponds is designed for land efficiency, resulting in irregular shapes with embankments that can only accommodate small vehicles such as motorcycles. The ponds feature a setting pond (petak tandon) for sedimentation and pest control, as well as multiple culture ponds (petak budidaya). The irrigation system relies on tidal flows, with water entering through main gates and distributed to the setting pond before being directed to culture ponds via secondary gates. This system often operates in a series, allowing water to flow sequentially between ponds and return to the setting pond during drainage",
    images: [],
  },
  {
    title: "Water Quality Condition",
    content:
      "The water quality in Sidoarjo's traditional ponds varies but generally meets the standards necessary for aquaculture. Salinity ranges from 21.7‰ to 34.3‰, while temperatures hover between 31.5°C and 34.0°C, slightly exceeding optimal levels in some cases. The dissolved oxygen (DO) levels are typically above the minimum required 4 mg/L. However, pH values often fall below the ideal 7.5–8.5, potentially affecting shrimp growth by causing soft shells. Nutrient levels, such as orthophosphate and ammonia, fluctuate but are mostly within acceptable ranges. Heavy metal contaminants like cadmium and lead are present but have not yet posed significant issues for consumer safety.",
    images: ["https://via.placeholder.com/800x600?text=Water+Quality"],
  },
  {
    title: "Soil Quality Condition",
    content:
      "The soil quality analysis in Sidoarjo's traditional ponds shows that while the general suitability is good, certain elements like nitrogen (N) and phosphorus (P) are below standard and can be supplemented through fertilization. The soil texture varies, with clay content between 41.92% and 65.56%, indicating good water retention properties. The pH levels are within the acceptable range of 7.61 to 8.16, which supports aquaculture. Organic matter content is high, ranging from 11.29% to 67.11%, and calcium levels are notably elevated (up to 37,676.42 mg/kg), contributing to soil fertility.",
    images: ["https://via.placeholder.com/800x600?text=Soil+Quality"],
  },
  {
    title: "Fishery Cultivation",
    content:
      "Farmers in Sidoarjo typically practice polyculture, cultivating a mix of commodities such as black tiger shrimp (P. monodon), vannamei shrimp, milkfish, and seaweed. The primary commodity varies among farmers, with some focusing on shrimp or seaweed as the main crop. Support for shrimp farming often comes from organizations like PT. ATINA, which emphasizes organic shrimp farming without synthetic feeds or chemical additives. Stocking densities range from 25,000 to 105,000 shrimp per hectare for black tiger shrimp and can be higher for vannamei shrimp, between 105,000 and 250,000 per hectare. Milkfish stocking density varies from 5,000 to 100,000 fish per hectare. Challenges include managing water quality and ensuring sustainable practices.",
    images: ["https://via.placeholder.com/800x600?text=Cultivation"],
  },
  {
    title: "Financial Analysis of Silvofishery in KLM Sidoarjo",
    content:
      "The financial analysis of silvofishery ponds in Sidoarjo highlights the importance of investment and cost management. Ponds on inherited land generally show higher NPV values, making them more financially viable compared to non-inherited or leased ponds. For example, the NPV for inherited land ponds in upstream areas is Rp 336,341,373, while non-inherited land ponds often have negative NPVs due to high land purchase costs. The IRR for inherited land ponds can reach 13.82%, indicating better returns than non-inherited ponds, which may show negative IRRs. The Benefit-Cost Ratio (BCR) for successful cases exceeds 1, reflecting a favorable balance of benefits over costs.",
    images: ["https://via.placeholder.com/800x600?text=Financial+Silvofishery"],
  },
  {
    title:
      "Financial Analysis of Tiger Prawn, Whiteleg Shrimp, and Milkfish Farming",
    content:
      "The financial analysis for livestock farming in Sidoarjo includes components such as investment costs, which vary based on land status (non-inherited, inherited, leased). Key profitability indicators show that inherited land generally results in higher NPV values and shorter payback periods compared to non-inherited or leased land, due to lower land acquisition costs. For instance, silvofishery ponds on inherited land in upstream areas have an NPV of Rp 336,341,373 and an IRR of 13.82%, with a payback period of 5.22 years. This contrasts with non-inherited land, which often shows negative NPVs and longer payback periods, signaling lower financial feasibility.",
    images: ["https://via.placeholder.com/800x600?text=Aquaculture+Finance"],
  },
  {
    title: "Financial Analysis of Seaweed Cultivation",
    content:
      "The financial analysis of seaweed cultivation in Sidoarjo shows that profitability varies by land status. For ponds in middle areas, non-inherited land has an NPV of -Rp5,597,797,067, indicating negative returns, while inherited land shows a positive NPV of Rp402,202,933 with an IRR of 16.27% and a payback period of 4.73 years. Leased land also proves viable with an NPV of Rp326,094,423, an IRR of 13.05%, and a payback period of 5.30 years. Downstream ponds on inherited land exhibit higher profitability, with an NPV of Rp1,022,410,744, an IRR of 50.70%, and a payback period of just 2.50 years, reflecting strong financial returns.",
    images: ["https://via.placeholder.com/800x600?text=Seaweed+Finance"],
  },
];

const dimensions = [
  { name: "Ecology", icon: Leaf, color: "#2E7D32", score: 75 },
  { name: "Social", icon: Users, color: "#1565C0", score: 68 },
  { name: "Economy", icon: DollarSign, color: "#EF6C00", score: 82 },
  { name: "Institutional", icon: Building2, color: "#5E35B1", score: 70 },
  { name: "Technology", icon: Monitor, color: "#D32F2F", score: 88 },
];

const ShareButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex space-x-2 sticky top-0 z-20 mb-6"
    >
      <Button
        className="bg-[#1877F2] hover:bg-[#166FE5] text-white"
        onClick={() =>
          window.open(
            "https://www.facebook.com/sharer/sharer.php?u=" +
              encodeURIComponent(window.location.href),
            "_blank"
          )
        }
      >
        <Facebook className="h-4 w-4 mr-2" />
        Share
      </Button>
      <Button
        className="bg-[#25D366] hover:bg-[#128C7E] text-white"
        onClick={() =>
          window.open(
            "https://wa.me/?text=" + encodeURIComponent(window.location.href),
            "_blank"
          )
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="mr-2"
        >
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
        </svg>
        Share
      </Button>
      <Button
        className="bg-[#E4405F] hover:bg-[#D93C50] text-white"
        onClick={() => window.open("https://www.instagram.com/", "_blank")}
      >
        <Instagram className="h-4 w-4 mr-2" />
        Share
      </Button>
      <Button
        className="bg-[#000000] hover:bg-[#333333] text-white"
        onClick={() => window.open("https://www.tiktok.com/", "_blank")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="mr-2"
        >
          <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
        </svg>
        Share
      </Button>
      <Button
        className="bg-[#1DA1F2] hover:bg-[#1A91DA] text-white"
        onClick={() =>
          window.open(
            "https://twitter.com/intent/tweet?url=" +
              encodeURIComponent(window.location.href),
            "_blank"
          )
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="mr-2"
        >
          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
        </svg>
        Share
      </Button>
      <Button
        className="bg-[#0088cc] hover:bg-[#0077b5] text-white"
        onClick={() =>
          window.open(
            "https://t.me/share/url?url=" +
              encodeURIComponent(window.location.href),
            "_blank"
          )
        }
      >
        <Send className="h-4 w-4 mr-2" />
        Share
      </Button>
    </motion.div>
  );
};

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="leaf-pattern"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M25,2 Q40,25 25,48 Q10,25 25,2 Z"
              fill="none"
              stroke="rgba(74, 222, 128, 0.1)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
      </svg>
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-green-200 opacity-20"
          style={{
            width: Math.random() * 20 + 10,
            height: Math.random() * 20 + 10,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            scale: [1, Math.random() + 0.5],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

const ExistingConditionAccordion = ({
  scrollToGallery,
}: {
  scrollToGallery: () => void;
}) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    setOpenItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <Accordion
      type="multiple"
      value={openItems}
      onValueChange={setOpenItems}
      className="w-full space-y-4"
    >
      {existingConditions.map((condition, index) => (
        <AccordionItem
          value={`item-${index}`}
          key={index}
          className="border border-green-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <AccordionTrigger
            onClick={() => toggleItem(`item-${index}`)}
            className="px-6 py-4 bg-green-50 hover:bg-green-100 transition-colors duration-300"
          >
            <div className="flex items-center justify-between w-full">
              <h3 className="text-xl font-semibold text-green-800">
                {condition.title}
              </h3>
              <ChevronDown
                className={`w-6 h-6 text-green-600 transition-transform duration-300 ${
                  openItems.includes(`item-${index}`)
                    ? "transform rotate-180"
                    : ""
                }`}
              />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <AnimatePresence>
              {openItems.includes(`item-${index}`) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {condition.images && condition.images.length > 0 && (
                      <div className="w-full md:w-1/3 space-y-4">
                        {condition.images.map((image, imgIndex) => (
                          <motion.img
                            key={imgIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.5,
                              delay: imgIndex * 0.1,
                            }}
                            src={image}
                            alt={`${condition.title} Image ${imgIndex + 1}`}
                            className="w-full h-64 object-cover rounded-lg shadow-md cursor-pointer"
                            onClick={scrollToGallery}
                            role="button"
                            aria-label={`View ${condition.title} image ${
                              imgIndex + 1
                            } in gallery`}
                          />
                        ))}
                      </div>
                    )}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className={`text-gray-700 text-lg leading-relaxed ${
                        condition.images && condition.images.length > 0
                          ? "md:w-2/3"
                          : "w-full"
                      }`}
                    >
                      <p>{condition.content}</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const CircularScore = ({ score, color }: { score: number; color: string }) => (
  <motion.div
    className="relative w-40 h-40"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
  >
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <motion.circle
        className="text-gray-200 stroke-current"
        strokeWidth="10"
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.circle
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: score / 100 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </svg>
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <span className="text-4xl font-bold">{score}%</span>
      <span className="text-sm font-medium">Sustainability Score</span>
    </motion.div>
  </motion.div>
);

const DimensionCard = ({
  dimension,
  isActive,
  onClick,
  onClose,
}: {
  dimension: {
    name: string;
    icon: React.ElementType;
    color: string;
    score: number;
  };
  isActive: boolean;
  onClick: () => void;
  onClose: () => void;
}) => {
  return (
    <motion.div
      layout
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 ${
        isActive
          ? "fixed inset-4 z-50 max-w-4xl mx-auto"
          : "cursor-pointer hover:shadow-xl"
      }`}
      onClick={!isActive ? onClick : undefined}
    >
      <div
        className={`p-6 ${isActive ? "pb-4" : ""}`}
        style={{ backgroundColor: `${dimension.color}15` }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <dimension.icon
              style={{ color: dimension.color }}
              className="w-10 h-10"
            />
            <h2
              style={{ color: dimension.color }}
              className="text-3xl font-bold font-serif"
            >
              {dimension.name} Dimension
            </h2>
          </div>
          {isActive && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="cursor-pointer p-3 rounded-full bg-white shadow-md hover:bg-red-400 transition-colors z-50"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
      {isActive && (
        <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="flex justify-center">
            <CircularScore score={dimension.score} color={dimension.color} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Method</h3>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Most Significant Aspects
            </h3>
            <ul className="space-y-2">
              {[1, 2, 3].map((_, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-gray-600">
                    Significant aspect {index + 1}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const ParallaxSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <motion.div ref={ref} className="relative">
      {children}
    </motion.div>
  );
};

export default function ArticleDetail() {
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [activeDimension, setActiveDimension] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("documents");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollToGallery = () => {
    setActiveTab("gallery");
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit the comment
    console.log("Comment submitted:", {
      commentName,
      commentEmail,
      commentText,
    });
    setCommentText("");
    setCommentName("");
    setCommentEmail("");
  };

  // Dummy data for supporting documents, maps, galleries, and videos
  const supportingDocs = [
    { id: 1, file: new ArrayBuffer(0) },
    { id: 2, file: new ArrayBuffer(0) },
  ];

  const maps = [
    { id: 1, image: "/existing-conditions/BioMass/Biomass.png" },
    { id: 2, image: "/existing-conditions/Cultivation/c6.png" },
  ];

  // const maps = [
  //   { mapFile: new ArrayBuffer(0) },
  //   { mapFile: new ArrayBuffer(0) },
  //   { mapFile: new ArrayBuffer(0) },
  // ];
  // const galleries = [
  //   { image: new ArrayBuffer(0) },
  //   { image: new ArrayBuffer(0) },
  //   { image: new ArrayBuffer(0) },
  //   { image: new ArrayBuffer(0) },
  // ];
  const videoLinks = [
    { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen relative overflow-hidden">
      <BackgroundAnimation />
      <div className="relative z-10">
        <ParallaxSection>
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold mb-8 text-center text-green-800 font-serif"
            >
              Sustainable Mangrove Ecosystem
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center items-center text-gray-600 mb-8 gap-6"
            >
              <p className="text-lg">Author : Mas Fadil</p>
              <p className="text-lg">From : IPB University</p>
              <p className="text-lg">Published on : May 15, 2024</p>
              <p className="text-lg text-gray-500">
                Contact: masfadil@mnet.com
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full mb-8 flex items-center justify-center sticky top-0 z-10"
            >
              <Image
                src="/carousel/2.png"
                alt="Mangrove Ecosystem"
                width={1000}
                height={600}
                className="object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>

            <ShareButtons />
          </section>
        </ParallaxSection>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-green-800 mb-16 z-10"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center font-serif">
              Summary
            </h2>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-lg leading-relaxed mb-8 text-justify">
              This study explores the sustainable management of mangrove
              ecosystems, focusing on their ecological, social, and economic
              impacts. Our findings highlight the importance of community
              involvement and innovative conservation techniques in preserving
              these vital coastal habitats.
            </p>
            <p className="text-lg font-semibold">
              Keywords: Mangroves, Sustainability, Ecosystem Management, Coastal
              Conservation
            </p>
          </div>
        </motion.section>

        <section className="mb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl text-green-800 font-bold mb-8 text-center font-serif"
            >
              Existing Condition
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-1 bg-green-800 mx-auto mb-12"
            ></motion.div>
            <ExistingConditionAccordion scrollToGallery={scrollToGallery} />
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 bg-white py-16 shadow-inner"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-green-800 mb-12 font-serif">
              Sustainability Analysis Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {dimensions.map((dimension) => (
                  <DimensionCard
                    key={dimension.name}
                    dimension={dimension}
                    isActive={activeDimension === dimension.name}
                    onClick={() =>
                      setActiveDimension(
                        activeDimension === dimension.name
                          ? null
                          : dimension.name
                      )
                    }
                    onClose={() => setActiveDimension(null)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 bg-green-800"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center font-serif">
              Sustainability
            </h2>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-lg leading-relaxed">
              Our analysis reveals that the mangrove ecosystem in the study area
              demonstrates a moderate level of sustainability. While there are
              strong ecological preservation efforts in place, there's room for
              improvement in economic utilization and social engagement.
              Implementing integrated coastal management strategies and
              promoting eco-tourism could significantly enhance the overall
              sustainability of this vital ecosystem.
            </p>
          </div>
        </motion.section>

        <section className="mb-16" ref={galleryRef}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-8 text-center text-green-800 font-serif"
            >
              Additional Resources
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-1 bg-green-800 mx-auto mb-12"
            ></motion.div>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="documents">
                  <FileText className="w-5 h-5 mr-2" />
                  Documents
                </TabsTrigger>
                <TabsTrigger value="maps">
                  <Map className="w-5 h-5 mr-2" />
                  Maps
                </TabsTrigger>
                <TabsTrigger value="gallery">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Gallery
                </TabsTrigger>
                <TabsTrigger value="videos">
                  <Video className="w-5 h-5 mr-2" />
                  Videos
                </TabsTrigger>
              </TabsList>
              <TabsContent value="documents" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {supportingDocs.map((doc, index) => (
                    <div
                      key={doc.id}
                      className="bg-white p-4 rounded-lg shadow-md"
                    >
                      <h3 className="text-lg font-semibold mb-2">
                        Supporting Document {index + 1}
                      </h3>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Download PDF {index + 1}
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="maps" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {maps.map((map, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-md"
                    >
                      {/* <div className="aspect-video bg-gray-200 rounded-md mb-2"></div> */}
                      <img
                        src={map.image}
                        alt={`map image ${map.id}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <p className="text-center">Map {index + 1}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="gallery" className="mt-8" ref={galleryRef}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleries.map((gallery) => (
                    <div
                      key={gallery.id}
                      className="bg-white p-2 rounded-lg shadow-md cursor-pointer"
                      onClick={() => openModal(gallery.image)} // Tambahkan event onClick
                    >
                      <div className="aspect-auto bg-gray-200 rounded-md">
                        <img
                          src={gallery.image}
                          alt={`Gallery image ${gallery.id}`}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Modal Popup */}
                {isModalOpen && selectedImage && (
                  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative max-w-5xl w-full mx-4">
                      <button
                        className="absolute top-2 right-2 text-white text-2xl"
                        onClick={closeModal}
                      >
                        &times;
                      </button>
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="w-full h-auto max-h-[90vh] rounded-lg shadow-lg object-contain"
                      />
                    </div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="videos" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videoLinks.map((video, index) => {
                    const videoId = video.url.split("v=")[1];
                    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    return (
                      <div key={index} className="aspect-video">
                        <iframe
                          src={embedUrl}
                          title={`Video ${index + 1}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full rounded-lg"
                        ></iframe>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="mb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-8 text-center text-green-800 font-serif"
            >
              Comments
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-1 bg-green-800 mx-auto mb-12"
            ></motion.div>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-lg">Jane Smith</span>
                  <span className="text-gray-500">May 20, 2024</span>
                </div>
                <p className="text-gray-700">
                  This research provides valuable insights into mangrove
                  ecosystem management. I'm particularly interested in the
                  economic dimension and how we can balance conservation with
                  sustainable resource utilization.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-lg">Alex Johnson</span>
                  <span className="text-gray-500">May 22, 2024</span>
                </div>
                <p className="text-gray-700">
                  Great work on highlighting the social aspects of mangrove
                  conservation. Community involvement is indeed crucial for
                  long-term sustainability. I'd love to see more details on
                  successful community engagement strategies in future studies.
                </p>
              </motion.div>
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-md space-y-4"
                onSubmit={handleCommentSubmit}
              >
                <input
                  type="text"
                  placeholder="Your Name (optional)"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Your Email (optional)"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                />
                <Textarea
                  placeholder="Add a comment..."
                  className="min-h-[120px] focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition-colors duration-300"
                >
                  Post Comment
                </Button>
              </motion.form>
            </div>
          </div>
        </section>
      </div>

      {activeDimension && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40"
          onClick={() => setActiveDimension(null)}
        />
      )}
    </div>
  );
}
