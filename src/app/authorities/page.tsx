"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, ExternalLink } from "lucide-react";
import Link from "next/link";

type Authority = {
  id: string;
  name: string;
  designation: string;
  image: string;
  profileUrl: string;
  bio: string[];
};

const authorities: Authority[] = [
  {
    id: "manoj-gaur",
    name: "Mr. Manoj Gaur",
    designation: "Executive Chairman, Jaiprakash Associates Limited",
    image: "/assets/authorities/manoj-gaur.png",
    profileUrl: "https://www.jiit.ac.in/message-chancellor",
    bio: [
      "Mr. Manoj Gaur, Executive Chairman of Jaiprakash Associates Limited, the flagship company of Jaypee Group, is a distinguished alumnus from BITS Pilani. After completing his B.E (Hons.) degree in Civil Engineering, he joined the company during the construction of Jaiprakash Associates Ltd.'s first Cement Plant — 1 MTPA at Rewa (Madhya Pradesh). He has closely been associated with the cement business of the company and has the distinction of participating in various capacities over the years and leading this line of business as it grew from 1.0 million tonne per annum (MnTPA) in 1986 to 41.4 MnTPA in 2012.",
      "Mr. Gaur has been associated with setting up of Group's hydropower assets since 2000. He ensured that Jaypee Group emerges as a leader in the construction of multi-purpose river valley and hydropower projects by participating on EPC/CONTRACT/BOO BASIS to add 12,030 MW to the Nation since 2002. The Jaypee Group, a pioneer in creation of hydropower plants in the private sector, is presently in development/operations of 5,940 MW power of hydro/thermal projects in India and Bhutan.",
      "Mr. Gaur has been widely acclaimed for invigorating Group's financials including innovative financing, which had a salutary effect in the growth chalked out in the last decade by the Group in its all verticals viz. Engineering & Construction, Power, Cement, Real Estate, Expressways, Hospitality, Health Care and Education (not-for-profit). Coming from a humble background following footsteps of his illustrious father Sh. Jaiprakash Gaur Ji, he has shown immaculate appetite to imbibe the humane aspects of Founder of the Group and is leading the JAYPEE Group from December 2006.",
      "At Jaypee Greens, Greater Noida, Mr. Manoj Gaur has crafted an exclusive lifestyle for his clients that is at par with the best residential spaces in the world. It is under Mr. Manoj Gaur's leadership that the Group made strides in various fields and executed path-breaking projects such as the ambitious 165 Km long concrete Noida to Agra Yamuna Expressway, 1000 MW Karcham–Wangtoo Hydroelectric project and F1 Indian Grand Prix.",
      "He carries on the philanthropic work undertaken by the Group's 'Not-for-Profit - JAIPRAKASH SEWA SANSTHAN' with as much fervor and passion that he has when he works on his business strategies. In addition to the above, not only does he play a leading role in the business of the Group but has been instrumental in planning and execution of the social responsibility initiatives in the area of education and rural development programs for villages surrounding Group's various project sites. It was his efforts that \"Sardar Patel Uchchatar Madhyamik Vidyalaya\", Rewa, M.P., which has been dedicated to provide quality education to the children of economically deprived sections of the society, was established.",
    ],
  },
  {
    id: "sc-saxena",
    name: "Dr. S C Saxena",
    designation: "Pro-Chancellor",
    image: "/assets/authorities/sc-saxena.jpg",
    profileUrl: "https://www.jiit.ac.in/pro-chancellor",
    bio: [
      "Dr. S C Saxena is the Pro-Chancellor of JIIT Noida wef. 14 June 2021. He is also the Pro-Chancellor, JU-Anoopshahr, Member of GC, EC & AC of JUET-Guna and JUIT-Waknaghat.",
      "Dr. Saxena was the Director I.I.T. Roorkee (June 2006 – June 2011), former Mentor Director I.I.T. Mandi, former Director TIET-Patiala (June 2002 – May 2006), Director TCIRD (January 2004 to May 2006) & Vice-Chancellor of JIIT, Noida (July 2011 - June 2021).",
      "Dr. Saxena has an outstanding academic record and obtained his B.E. Electrical (1970), M.E. Electrical (Meas. & Inst.) (1973), and Ph.D. Electrical (Biomedical Engg.) (1977). He joined on the faculty of Electrical Engg. Deptt. of I.I.T. Roorkee in 1973 and rose upto the level of Professor, Head and Dean. He has guided 28 Ph.D. Theses, 75 ME/M.Tech./M.Phil Dissertations, over 100 U.G. Projects, published over 200 research papers, organized/mentored over 30 conferences, edited 05 conference proceedings, written 06 monographs, organized 26 specialized courses for industry and handled 12 sponsored research schemes. He got planned, developed and made functional Greater Noida Extension Centre, the third campus of IIT Roorkee.",
      "During his tenure as the Director, I.I.T. Roorkee, massive expansion of infrastructure, research facilities, laboratories upgradation/augmentation, ICT facilities and other services and starting of new academic programmes took place.",
      "He has received 19 awards/prizes/honours including Khosla Gold Medal and Cash award (2 times), President of India's Prize, Jawahar Lal Memorial Award, K.F. Antia Memorial Prize, Sir Thomas Ward Memorial Prize, K.S. Krishnan Memorial Award; honoured in Oct. 2006 as 'Outstanding Technologists' by Punjab Technical University; 'Pride of Uttaranchal' in November 2006 by Dehradun Citizen's Council; 'Uttarakhand Ratan' in April 2008 by All India Conference of Intellectuals, received Corps of Engineers Prize in 2008, awarded for \"Outstanding Contribution to Higher Education in India\" in 18th Business School Affaire & Dewang Mehta Business School Awards in Nov. 2010 and honoured as \"Eminent Engineering Personality\" by IE(I) in 25th Indian Engineering Congress at Kochi in Dec. 2010 and Times Business Award North 2025 for Excellence in the field of Education.",
      "He is a life fellow of the IE (India) and IETE; Life Member of BMES of India, NIQR, ISTE and ISCE. He was the Chairman of Water for Welfare: Virtual Centre, Govt. of UK; Chairman of STEPS (IIT Roorkee & TIET Patiala), President Patiala Management Association, President of ISCEE, Vice-Chairman of Governing Body of NIH, Member of the CU, Punjab. He was the Independent Director THDC India Ltd (May 2008 – April 2014) & Chairman of its Audit, Remuneration & Sustainable Development Committees, Chairman, NRC, AICTE (2008-17), Member GC and EC of AICTE, Chairman of BOG of HBTI Kanpur, Member of EC of Dr. APJAKTU, Lucknow, Vice-President of BMESI, President-Patiala Management Association, Chairman and also Secretary-Roorkee Centre of IE(I), Vice-President-ISCE, Chairman-Roorkee Chapter of ISCE, Executive Member-BOG of Punjab Council of TE and ED, member BOG BIT Mesra, MNIT Jaipur, NITTR Chandigarh, Member of GB of GGSIU, Delhi; BOG of UPES, Dehradun; and of several other Board of Governors/Governing Councils/Academic Councils.",
      "He has made two educational films, is a trained motivational trainer, worked as an Expert at Military Technical College Baghdad, Iraq; Advisor at AICTE in 1994 and has widely travelled abroad and in India.",
    ],
  },
  {
    id: "dk-rai",
    name: "Prof. (Dr.) Devendra Kumar Rai",
    designation: "Vice-Chancellor",
    image: "/assets/authorities/dk-rai.png",
    profileUrl: "https://www.juet.ac.in/faculty/profile/prof-d-k-rai",
    bio: [
      "Prof. (Dr.) Devendra Kumar Rai, the 3rd Vice-Chancellor of Jaypee University of Engineering and Technology, Guna, assumed the charge of Vice-Chancellor on 16th August 2023. Prof. Rai is a recognized academician, an uncompromising leader, and, most importantly, a well-loved educationist who has positively impacted the lives of numerous students, their families, and his peers.",
      "Prof. Rai is an alumnus of Banaras Hindu University, Varanasi. He earned his Bachelor's degree in Science with Honours in Physics, a Master's degree in Science specializing in Solid-State Physics, and a Ph.D. in Physics from Banaras Hindu University.",
      "Starting his career as an Assistant Professor in 2001, Prof. Rai rose to the position of full Professor in 2009 in the Department of Physics and Materials Science and Engineering (PMSE) at Jaypee Institute of Information Technology (JIIT), Noida. As a teacher, he has an impressive track record, having developed and taught numerous theoretical and laboratory courses. He also played a key role in establishing Physics and Materials Science and Engineering laboratories for UG, PG, and Ph.D. programs in engineering and sciences.",
      "Prof. Rai has held several senior administrative positions at JIIT Noida, including Director; Dean of Academics & Research; Head, Department of PMSE; and Associate Dean of Students' Welfare. He also served as Vice-Chancellor (Officiating) at Jaypee University, Anupshahr.",
      "His commitment to academic excellence is evident in his leadership in ranking and accreditation processes across various government agencies. He has served as the Nodal Officer for NIRF rankings at JIIT Noida since its inception in 2016, Nodal Officer for AISHE (2015–2023), Coordinator for UGC and AICTE visits (2019), Convener and Nodal Officer for NAAC committees (2015 & 2022), Nodal Officer for the Study in India Program of MHRD, President of the Institution's Innovation Council (2020–2022), Director of RDC (2021–2022), Chairman of the LRC Advisory Committee (2010–2023), and Chairman of the Unfair Means Committee (2018–2023). Additionally, he played a crucial role in implementing stringent and transparent online teaching and examination processes to ensure quality education during the pandemic.",
      "Prof. Rai's research interests lie in ion-conducting solids and electrochemical devices such as fuel cells and batteries. He has also worked on the development of non-linear crystals at the Department of Chemical Engineering, National Taiwan University, Taiwan. Over the years, he has guided numerous Ph.D., M.Tech, and B.Tech students and has published extensively in reputed national and international journals. He has actively participated in a large number of national and international conferences in India and abroad.",
    ],
  },
  {
    id: "dhananjay-mishra",
    name: "Dr. Dhananjay R. Mishra",
    designation: "Coordinator & Incharge",
    image: "/assets/authorities/dhananjay-mishra.png",
    profileUrl: "https://www.juet.ac.in/faculty/profile/dhananjay-r-mishra",
    bio: [
      "Dr. Dhananjay R. Mishra is an Associate Professor in the Mechanical Engineering Department at Jaypee University of Engineering & Technology (JUET) in Guna, where he has been a faculty member since July 2012. His expertise lies in renewable energy, focusing on solar thermal technologies, heat transfer, and solar distillation.",
      "Before joining JUET, he gained valuable experience through both academic and industry roles. His academic career includes positions at Disha Institute of Management & Technology (July 2007 – June 2012), Shri Shankaracharya College of Engineering (March 2006 – July 2007), and Rungta College of Engineering & Technology (September 2005 – March 2006). He also served in the industry as an Assistant Production Manager at Suprabha Industries Pvt. Ltd. from July 2002 to December 2004.",
      "In addition to his teaching and research, Dr. Mishra is actively involved in academic leadership and has received significant recognition for his work. He is a frequent reviewer and editor for international engineering and energy journals and has received the \"Excellence in Applied Research Award\" in Engineering and Mechanical Engineering in 2023. His contributions include numerous well-cited research articles and patents in the field of solar distillation, and he is a dedicated mentor who supervises Ph.D. and M.Tech. students.",
      "He is also coordinator & in-charge of the Centre for Industrial Research and Development. In this capacity, he manages restricted multi-crore consultancy projects undertaken in collaboration with Jaypee Power Ventures Limited, demonstrating his role in bridging academic research with industrial applications.",
    ],
  },
];

export default function AuthoritiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero — professional navy */}
      <section className="pt-36 sm:pt-40 pb-16 sm:pb-20 bg-[#1e3a5f] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA2KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-80" />
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Authorities
            </h1>
            <div className="mt-6 mx-auto w-16 h-1 rounded-full bg-[#FF9800]" />
          </motion.div>
        </div>
      </section>

      {/* Profiles */}
      <section className="py-14 sm:py-18 border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          {authorities.map((person, index) => (
            <motion.article
              key={person.id}
              id={person.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-80px" }}
              className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-12 items-start mb-16 lg:mb-24 last:mb-0`}
            >
              {/* Photo */}
              <div className="w-full lg:w-[340px] xl:w-[380px] flex-shrink-0">
                <div className="relative aspect-[3/4] max-w-[280px] mx-auto lg:max-w-none rounded-2xl overflow-hidden bg-slate-100 shadow-xl border border-slate-200">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 280px, 380px"
                    priority={index === 0}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-[#FF9800] flex-shrink-0" />
                  <span className="text-xs font-semibold text-[#FF9800] uppercase tracking-widest">
                    Profile
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1A237E] mb-2">
                  {person.name}
                </h2>
                <div className="w-14 h-0.5 bg-[#FF9800] rounded-full mb-4" />
                <p className="text-lg font-semibold text-[#37474F] mb-6">
                  {person.designation}
                </p>
                <div className="space-y-4 text-[#37474F] text-sm sm:text-base leading-relaxed text-justify">
                  {person.bio.map((para, i) => (
                    <p key={i} className="text-justify">{para}</p>
                  ))}
                </div>
                <Link
                  href={person.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-[#FF9800] hover:bg-[#F57C00] text-white font-semibold text-sm transition-colors"
                >
                  View full profile
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

    </div>
  );
}
