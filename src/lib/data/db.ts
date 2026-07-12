// Official Central Data Store for JIT NSS Unit

export interface Statistic {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export interface Benefit {
  id: string;
  text: string;
}

export interface Activity {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

export interface CampTimelineItem {
  id: string;
  title: string;
  description: string;
}

export interface AdoptedVillage {
  id: string;
  name: string;
  initiatives: string[];
}

export interface DownloadItem {
  id: string;
  title: string;
  category: "Forms" | "Manuals" | "Reports" | "Certificates" | "Notices";
  fileSize: string;
  fileType: string;
  url: string;
}

export interface FacultyLeader {
  id: string;
  name: string;
  position: string;
  email?: string;
  bio?: string;
  photo?: string;
}

export interface PastEvent {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  time?: string;
  participants?: number;
  hoursServed?: number;
  isUpcoming?: boolean;
  status?: string;
}

export interface UpcomingObservance {
  id: string;
  title: string;
  date: string; // e.g. "June 21" (annual calendar format)
  description: string;
}

export interface Certificate {
  id: string;
  studentName: string;
  department: string;
  year: string;
  event: string;
  hoursServed: number;
  issueDate: string;
  qrCodeValue?: string;
  status?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: "Circular" | "Announcement" | "Camp" | "Recruitment";
  isFeatured?: boolean;
  fileUrl?: string;
}

export interface JoinRequest {
  id: string;
  name: string;
  department: string;
  year: string;
  email: string;
  phone: string;
  skills: string;
  interests: string[];
  availability: string;
  whyJoin: string;
  photoUrl: string;
  submittedAt: string;
  status: "Pending" | "Approved" | "Rejected";
}

// 1. Official Statistics
export const OFFICIAL_STATISTICS: Statistic[] = [
  { id: "stat-1", label: "Official Volunteer Strength", value: 100, suffix: " Students", icon: "Users" },
  { id: "stat-2", label: "NSS Unit Status", value: 1, suffix: " Unit (RTMNU Registered)", icon: "ShieldCheck" },
  { id: "stat-3", label: "Adopted Villages", value: 2, suffix: " Villages", icon: "Tent" },
  { id: "stat-4", label: "Special Camp", value: 1, suffix: " Annual Camp", icon: "Tent" },
];

// 2. Student Benefits
export const STUDENT_BENEFITS: Benefit[] = [
  { id: "ben-1", text: "10 RTMNU incentive marks for regular NSS participation." },
  { id: "ben-2", text: "25 RTMNU incentive marks for National Level participation." },
  { id: "ben-3", text: "Leadership development opportunities." },
  { id: "ben-4", text: "Personality development." },
  { id: "ben-5", text: "Event management experience." },
  { id: "ben-6", text: "Teamwork and communication skills." },
  { id: "ben-7", text: "Rural exposure and community engagement." },
  { id: "ben-8", text: "Participation certificates." },
  { id: "ben-9", text: "Opportunities to attend State Level NSS Camps." },
  { id: "ben-10", text: "Opportunities to attend National Level NSS Camps." },
];

// 3. Official Activities (each with a unique, directly-matching gallery photo)
export const OFFICIAL_ACTIVITIES: Activity[] = [
  { id: "act-1", title: "Swachh Bharat Abhiyan", category: "Cleanliness", description: "Voluntary cleanliness drives inside JIT campus and in surrounding rural localities to spread general hygiene awareness.", imageUrl: "/images/gallery/awarness relly.jpeg" },
  { id: "act-2", title: "Tree Plantation Drives", category: "Environment", description: "Sapling plantations in campus zones and adopted villages to enrich biodiversity and fight deforestation.", imageUrl: "/images/gallery/tree plantation post.jpeg" },
  { id: "act-3", title: "Blood Donation Camps", category: "Health", description: "Regular donor camps organized in association with blood banks to support blood banks and save lives.", imageUrl: "/images/gallery/blood donation.jpeg" },
  { id: "act-4", title: "Special NSS Residential Camp", category: "Camps", description: "Annual 7-day residential camp at the adopted village covering health check-ups, rural outreach, and community service.", imageUrl: "/images/gallery/7days nss camp.jpeg" },
  { id: "act-5", title: "World Environment Day Campaign", category: "Environment", description: "Environmental awareness drives, cleanliness campaigns, and plastic-free pledges observed on June 5 every year.", imageUrl: "/images/gallery/environment day.jpeg" },
  { id: "act-6", title: "Plantation Awareness with Villagers", category: "Awareness", description: "Door-to-door counseling in rural communities regarding composting, home gardening, and eliminating single-use plastics.", imageUrl: "/images/gallery/plant awarness with villagers.jpeg" },
  { id: "act-7", title: "Cyber Security & Awareness Programme", category: "Education", description: "Seminars on safe digital banking, UPI security, and mobile transaction guidelines for village residents.", imageUrl: "/images/gallery/cyber awarness program.jpeg" },
  { id: "act-8", title: "Rural Primary School Teaching", category: "Education", description: "Student-led educational sessions for village school children covering basic science, hygiene, and value education.", imageUrl: "/images/gallery/children learning nss.jpeg" },
  { id: "act-9", title: "Joy of Giving – Children's Day", category: "Social Welfare", description: "Voluntary distribution of books, stationery, and warm clothes to support local municipal school students on Children's Day.", imageUrl: "/images/gallery/children day.jpeg" },
  { id: "act-10", title: "Independence Day Social Drive", category: "Events", description: "Flag hoisting ceremony followed by community outreach and patriotic awareness campaigns in adopted villages.", imageUrl: "/images/gallery/independence day.jpeg" },
  { id: "act-11", title: "Republic Day Parade & Shramdaan", category: "Events", description: "Republic Day parade by NSS unit followed by a cleanliness shramdaan drive in public parks and streets.", imageUrl: "/images/gallery/republic day.jpeg" },
  { id: "act-12", title: "Kargil Vijay Diwas Memorial", category: "Awareness", description: "Solemn tribute assembly to honour the armed forces heroes of India, followed by a public service pledge.", imageUrl: "/images/gallery/kargil day.jpeg" },
  { id: "act-13", title: "Children's Day with Infocepts Foundation", category: "Social Welfare", description: "Collaboration with Infocepts Foundation to conduct educational workshops and distribute stationery in rural schools.", imageUrl: "/images/gallery/children day x infocepts foundation.jpeg" },
  { id: "act-14", title: "Harit Maharashtra Tree Plantation", category: "Environment", description: "Participating in the state-wide Harit Maharashtra campaign, planting native trees in deforested areas around Nagpur.", imageUrl: "/images/gallery/harit maharashtra campaign.jpeg" },
  { id: "act-15", title: "Tree Plantation Drive with Infocepts", category: "Environment", description: "A joint plantation drive with Infocepts Foundation targeting green canopy expansion near the adopted villages.", imageUrl: "/images/gallery/tree plantation drive x infocepts foundation.jpeg" }
];

// 4. Special NSS Camp Timeline Items
export const CAMP_TIMELINE_ITEMS: CampTimelineItem[] = [
  { id: "ct-1", title: "Village Adoption", description: "Inducting Lonara and Ghumthala as adopted villages to coordinate structured improvements." },
  { id: "ct-2", title: "Rural Development", description: "Working on public infrastructure like wall-painting, school repairs, and clean spaces." },
  { id: "ct-3", title: "Community Health", description: "Facilitating basic check-up arrays, medicines distribution, and medical professional support." },
  { id: "ct-4", title: "Hygiene Awareness", description: "Counseling local communities on waste dumping, washroom setups, and sanitation." },
  { id: "ct-5", title: "Environmental Conservation", description: "Sapling plantations, compost creation, and plastics elimination campaigns." },
  { id: "ct-6", title: "Digital Literacy", description: "Introducing digital transactions, smartphone utilities, and safe net bank operations." },
  { id: "ct-7", title: "Youth Empowerment", description: "Engaging rural youth in leadership, sports activities, and civic values debates." },
  { id: "ct-8", title: "Social Surveys", description: "Conducting household audits to detail village sanitation, literacy levels, and public needs." },
  { id: "ct-9", title: "Community Engagement", description: "Organizing evening assemblies (Prabhat Pheri & Chaupals) to discuss community priorities." },
  { id: "ct-10", title: "Village Outreach", description: "Constructing strong personal linkages between volunteers and rural adopted residents." }
];

// 5. Adopted Villages Information
export const ADOPTED_VILLAGES: AdoptedVillage[] = [
  {
    id: "v-1",
    name: "Lonara",
    initiatives: [
      "Rural Education",
      "Digital Literacy",
      "School Beautification",
      "Health & Hygiene Awareness",
      "Tree Plantation",
      "Community Cleanliness",
      "Joy of Giving",
      "Environmental Conservation"
    ]
  },
  {
    id: "v-2",
    name: "Ghumthala (Gumtala)",
    initiatives: [
      "Rural Education",
      "Digital Literacy",
      "School Beautification",
      "Health & Hygiene Awareness",
      "Tree Plantation",
      "Community Cleanliness",
      "Joy of Giving",
      "Environmental Conservation"
    ]
  }
];

// 6. Major Campaigns
export const MAJOR_CAMPAIGNS = [
  "Swachh Bharat Abhiyan",
  "Nasha Mukt Bharat Abhiyan",
  "Blood Donation Drives",
  "Tree Plantation Drives",
  "International Yoga Day",
  "Health Check-up Camps",
  "Constitution Awareness",
  "Rural Development Programmes",
  "Annadan Seva",
  "Joy of Giving",
  "Environmental Awareness Campaigns"
];

// 7. Leadership Profiles
export const LEADERSHIP_PROFILES: FacultyLeader[] = [
  {
    id: "lead-2",
    name: "Dr. Uma Thakur",
    position: "Dean Student Development",
    email: "dean.studentdevp@jitnagpur.edu.in",
    photo: "/images/Faculty/Uma Patel Thakur mam.png"
  },
  {
    id: "lead-3",
    name: "Prof. Rani Rewatkar",
    position: "NSS Programme Officer",
    email: "r.rewatkar@jitnagpur.edu.in",
    photo: "https://ui-avatars.com/api/?name=Rani+Rewatkar&background=0f172a&color=fff&size=256"
  }
];

// 8. Verified Past Events (ONLY using available media files in public/images/gallery)
export const VERIFIED_PAST_EVENTS: PastEvent[] = [
  {
    id: "pe-1",
    title: "Special NSS Residential Camp (7 Days)",
    category: "Camps",
    description: "Annual 7-day NSS residential camp conducted at Lonara adopted village, focusing on village cleanliness, social audits, and rural outreach.",
    date: "2026-01-12",
    location: "Lonara adopted Village, Nagpur",
    imageUrl: "/images/gallery/7days nss camp.jpeg"
  },
  {
    id: "pe-2",
    title: "NSS Social Awareness Rally",
    category: "Events",
    description: "A public awareness march coordinated by JIT NSS volunteers advocating for social harmony, digital literacy, and environmental care.",
    date: "2026-01-13",
    location: "Lonara Village blocks",
    imageUrl: "/images/gallery/awarness relly.jpeg"
  },
  {
    id: "pe-3",
    title: "Blood Donation Drive - Phase 1",
    category: "Photos",
    description: "NSS volunteers coordinating and donating blood at the annual campus donor drive in association with local blood banks.",
    date: "2025-09-24",
    location: "JIT Main Auditorium",
    imageUrl: "/images/gallery/blood donation.jpeg"
  },
  {
    id: "pe-4",
    title: "Blood Donation Drive - Phase 2",
    category: "Photos",
    description: "Second phase of the blood donation drive, witnessing active participation from Engineering and Management students.",
    date: "2026-03-12",
    location: "JIT Campus grounds",
    imageUrl: "/images/gallery/blood donation 2.jpeg"
  },
  {
    id: "pe-5",
    title: "Emergency Blood Donation Session",
    category: "Photos",
    description: "An emergency blood donor mobilization drive to support local public hospitals during peak seasonal requirements.",
    date: "2026-03-13",
    location: "Nagpur Government Hospital",
    imageUrl: "/images/gallery/blood donation (2).jpeg"
  },
  {
    id: "pe-6",
    title: "Children's Day with Infocepts Foundation",
    category: "Events",
    description: "NSS unit collaborating with Infocepts Foundation to conduct educational workshops and distribute stationery for rural school students.",
    date: "2025-11-14",
    location: "Lonara Primary School",
    imageUrl: "/images/gallery/children day x infocepts foundation.jpeg"
  },
  {
    id: "pe-7",
    title: "Children's Day Celebrations",
    category: "Events",
    description: "Celebrating Children's Day in the adopted village by conducting sports and creative arts sessions for children.",
    date: "2025-11-14",
    location: "Ghumthala Primary School",
    imageUrl: "/images/gallery/children day.jpeg"
  },
  {
    id: "pe-8",
    title: "Children visit to College-Children's Day",
    category: "Photos",
    description: "Volunteers conducting primary educational classes, introducing basic science and hygiene habits to village kids.",
    date: "2026-01-14",
    location: "Lonara adopted Village School",
    imageUrl: "/images/gallery/children learning nss.jpeg"
  },
  {
    id: "pe-9",
    title: "Cyber Security & Awareness Seminar",
    category: "Events",
    description: "A seminar on cyber security, safe digital banking, and mobile transaction guidelines for village residents.",
    date: "2026-01-15",
    location: "Lonara Panchayat Bhavan",
    imageUrl: "/images/gallery/cyber awarness program.jpeg"
  },
  {
    id: "pe-10",
    title: "World Environment Day Campaign",
    category: "Photos",
    description: "Celebrating Environment Day with cleanliness campaigns, plastic-free pledges, and tree sapling plantations.",
    date: "2026-06-05",
    location: "JIT Campus and surrounding zones",
    imageUrl: "/images/gallery/environment day.jpeg"
  },
  {
    id: "pe-11",
    title: "Harit Maharashtra Tree Plantation Campaign",
    category: "Camps",
    description: "Participating in the state-wide Harit Maharashtra drive, planting native trees in deforested areas around Nagpur.",
    date: "2026-07-01",
    location: "Koradi Road reserve forest limits",
    imageUrl: "/images/gallery/harit maharashtra campaign.jpeg"
  },

  {
    id: "pe-12",
    title: "Independence Day Digital Awareness Campaign",
    category: "Events",
    description: "Creating and spreading digital awareness posters and guidelines for Independence Day observances.",
    date: "2025-08-14",
    location: "JIT NSS Digital Cell",
    imageUrl: "/images/gallery/independance day post.jpeg"
  },
  {
    id: "pe-13",
    title: "Kargil Vijay Diwas Memorial Service",
    category: "Awards",
    description: "Solemn assembly to pay respects to the heroic armed forces of India, followed by a local public service pledge.",
    date: "2025-07-26",
    location: "JIT Seminar Hall",
    imageUrl: "/images/gallery/kargil day.jpeg"
  },
  {
    id: "pe-14",
    title: "Kargil Vijay Diwas Remembrance ",
    category: "Events",
    description: "Volunteers presenting tribute stories and conducting patriotic awareness campaigns in local high schools.",
    date: "2025-07-26",
    location: "Lonara Secondary High School",
    imageUrl: "/images/gallery/kargil day (2).jpeg"
  },
  {
    id: "pe-15",
    title: "Plantation Awareness & Seed Distribution",
    category: "Camps",
    description: "Interactive awareness session with local villagers, detailing soil fertility and donating plant seeds for home gardens.",
    date: "2026-01-16",
    location: "Ghumthala adopted Village",
    imageUrl: "/images/gallery/plant awarness with villagers.jpeg"
  },
  {
    id: "pe-16",
    title: "Republic Day Celebration",
    category: "Events",
    description: "Republic Day parade by NSS unit followed by a cleanliness shramdaan in public parks.",
    date: "2026-01-26",
    location: "JIT Campus and Lonara",
    imageUrl: "/images/gallery/republic day.jpeg"
  },
  {
    id: "pe-17",
    title: "Tree Plantation with Infocepts Foundation",
    category: "Camps",
    description: "A joint tree planting drive executed with Infocepts Foundation, targeting green canopy expansion around the adopted villages.",
    date: "2025-07-15",
    location: "Lonara Village borders",
    imageUrl: "/images/gallery/tree plantation drive x infocepts foundation.jpeg"
  },
  {
    id: "pe-18",
    title: "Tree Plantation Campaign Launch",
    category: "Photos",
    description: "Inaugurative plantation drive and campaign banner unveiling to mark the onset of monsoon green drives.",
    date: "2025-07-10",
    location: "JIT Campus perimeter",
    imageUrl: "/images/gallery/tree plantation post.jpeg"
  },
  {
    id: "pe-19",
    title: "Ekta Daud Marathon",
    category: "Events",
    description: "Marathon conducted as a tribute to Sardar Vallabhbhai Patel from Lonara to Bailwada (5 km).",
    date: "2025-10-31",
    location: "Lonara to Bailwada",
    imageUrl: "/images/gallery/EktaDaud.png.jpg"
  },
  {
    id: "pe-20",
    title: "Gandhi Jayanti Cleanliness Drive",
    category: "Events",
    description: "A special cleanliness drive conducted in Gumthala village on the occasion of Gandhi Jayanti to promote hygiene.",
    date: "2025-10-02",
    location: "Gumthala Village",
    imageUrl: "/images/gallery/Cleanliness drive in gumthala 2 october.png.jpg"
  },
  {
    id: "pe-21",
    title: "Digital Literacy Workshop",
    category: "Camps",
    description: "Educational session focusing on basic computer literacy and digital skills for village residents during the special camp.",
    date: "2026-01-14",
    location: "Special Camp Site",
    imageUrl: "/images/gallery/Computer literacy in camp.png.jpg"
  },
  {
    id: "pe-22",
    title: "Morning Exercise Routine",
    category: "Camps",
    description: "Daily morning physical exercise session for NSS volunteers to maintain fitness and discipline during the camp.",
    date: "2026-01-13",
    location: "Camp Grounds",
    imageUrl: "/images/gallery/MORNING EXRECISE IN CAMP.png.jpg"
  },
  {
    id: "pe-23",
    title: "Morning Jog & Fitness",
    category: "health in Camp",
    description: "Volunteers participating in an early morning jog to kickstart the day with energy and team spirit during the 7-day camp.",
    date: "2026-01-15",
    location: "Camp Grounds",
    imageUrl: "/images/gallery/MORNING JOB IN CAMP.png.jpg"
  },
  {
    id: "pe-24",
    title: "Nasha Mukti Awareness Campaign",
    category: "Awareness in Camp",
    description: "A vital de-addiction (Nasha Mukti) awareness program educating the rural community on the harms of substance abuse.",
    date: "2026-01-16",
    location: "Camp Village",
    imageUrl: "/images/gallery/Nashamukti Awareness in 7 days camp.png.jpg"
  },
  {
    id: "pe-25",
    title: "Organic Farming Workshop",
    category: "Awareness in Camp",
    description: "An informative session teaching villagers and volunteers about sustainable and organic farming techniques.",
    date: "2026-01-17",
    location: "Agricultural Fields",
    imageUrl: "/images/gallery/Organic Farming Session in camp.png.jpg"
  },
  {
    id: "pe-26",
    title: "Drawing Competition for Kids",
    category: "Events in Camp",
    description: "A creative drawing competition organized for village children during the special NSS camp to encourage artistic expression.",
    date: "2026-01-18",
    location: "Village School",
    imageUrl: "/images/gallery/Special Camp Drawing Compe.png.jpg"
  },
  {
    id: "pe-27",
    title: "Sports Equipment Donation",
    category: "Social Welfare in Camp",
    description: "Donation of sports utilities and equipment in collaboration with Infocepts to promote physical activities among youth.",
    date: "2026-01-16",
    location: "Camp Village",
    imageUrl: "/images/gallery/Sports utilities donation in colaboration with infocepts 7 days camp.png.jpg"
  },
  {
    id: "pe-28",
    title: "Mega Tree Plantation",
    category: "Environment",
    description: "A massive tree plantation drive conducted jointly with Infocepts to enhance the green cover and fight climate change.",
    date: "2025-07-20",
    location: "Village Outskirts",
    imageUrl: "/images/gallery/Tree plantation With infocepts.jpg"
  }
];

// 9. Upcoming Observances (Annual Calendar format)
export const UPCOMING_OBSERVANCES: UpcomingObservance[] = [
  { id: "uo-1", title: "International Yoga Day", date: "June 21", description: "Yoga sessions and wellness programs conducted for students and faculty." },
  { id: "uo-2", title: "Independence Day", date: "August 15", description: "Flag hoisting ceremony, patriotic assemblies, and social drives." },
  { id: "uo-3", title: "National Sports Day", date: "August 29", description: "Promoting physical fitness, sports activities, and outdoor health camps." },
  { id: "uo-4", title: "NSS Day", date: "September 24", description: "Centenary foundation day celebrations, volunteer inductions, and awards." },
  { id: "uo-5", title: "Gandhi Jayanti & Swachh Bharat", date: "October 02", description: "Mega cleanliness shramdaan drives in honor of Mahatma Gandhi's birth anniversary." },
  { id: "uo-6", title: "Constitution Day", date: "November 26", description: "Reading of the Preamble, seminars on fundamental duties and civic rights." },
  { id: "uo-7", title: "Armed Forces Flag Day", date: "December 07", description: "Fund collection campaigns and tribute events for military martyrs." },
  { id: "uo-8", title: "Kargil Vijay Divas", date: "July 26", description: "Observing assemblies to pay respects to the heroic armed forces of India." },
  { id: "uo-9", title: "Republic Day", date: "January 26", description: "Flag hoisting, national integration rallies, and social awareness campaigns." },
  { id: "uo-10", title: "National Youth Day", date: "January 12", description: "Observing Swami Vivekananda's birth anniversary, holding youth empowerment rallies." },
  { id: "uo-11", title: "International Women's Day", date: "March 08", description: "Celebrating women empowerment with guest lectures and local self-help group programs." },
  { id: "uo-12", title: "World Environment Day", date: "June 05", description: "Environmental awareness drives, sapling plantation, and cleanup marches." }
];

// 10. Official Downloads
export const OFFICIAL_DOWNLOADS: DownloadItem[] = [
  { id: "dl-1", title: "JIT NSS Enrollment Registration Form", category: "Forms", fileSize: "148 KB", fileType: "PDF", url: "/documents/jit-nss-registration.pdf" },
  { id: "dl-2", title: "NSS Hand Book & Guideline Manual - Government of India", category: "Manuals", fileSize: "2.4 MB", fileType: "PDF", url: "/documents/nss-manual.pdf" },
  { id: "dl-3", title: "Constitution of India Fundamental Duties Circular", category: "Notices", fileSize: "92 KB", fileType: "PDF", url: "/documents/constitution-circular.pdf" },
  { id: "dl-4", title: "Special NSS Camp Rural Survey Sheet", category: "Reports", fileSize: "115 KB", fileType: "PDF", url: "/documents/rural-survey-sheet.pdf" }
];

// 11. Verified Verification Certificates
export const VERIFIED_CERTIFICATES: Certificate[] = [
  { id: "JITNSS-2026-001", studentName: "Sujal Dev", department: "Computer Science & Engineering", year: "3rd Year", event: "Swachh Bharat Abhiyan", hoursServed: 24, issueDate: "2026-02-23" },
  { id: "JITNSS-2026-002", studentName: "Rohan Vyas", department: "Mechanical Engineering", year: "4th Year", event: "Blood Donation Camps", hoursServed: 12, issueDate: "2026-03-13" },
  { id: "JITNSS-2026-003", studentName: "Ishita Patil", department: "Information Technology", year: "3rd Year", event: "Tree Plantation Drives", hoursServed: 16, issueDate: "2026-03-06" }
];

// 12. News Bulletin Board
export const OFFICIAL_NEWS: NewsItem[] = [
  {
    id: "n-1",
    title: "Official Enrollment Notice: NSS Unit JIT Registrations Open",
    content: "Jhulelal Institute of Technology NSS Unit announces fresh volunteer enrollment. Registrations are open to technical and management department candidates. Selected volunteers will participate in community service programs. Enroll online or submit physical forms to the Program Office by August 10, 2026.",
    date: "2026-07-10",
    category: "Recruitment",
    isFeatured: true
  },
  {
    id: "n-2",
    title: "Constitution Awareness Drive and Reading Assembly",
    content: "In compliance with the official guidelines, the JIT NSS Unit will coordinate a campus-wide reading of the Preamble to promote fundamental values and civic responsibilities among students.",
    date: "2026-07-05",
    category: "Circular",
    isFeatured: false
  }
];

export interface CommitteeMember {
  id: string;
  name: string;
  position: string;
  category: "Advisory" | "Core Committee" | "Junior Committee" | "Executive Members";
  description: string;
}

export const DEFAULT_COMMITTEE_MEMBERS: CommitteeMember[] = [
  {
    id: "cm-1",
    name: "Sujal Hadge",
    position: "Advisory (4th Year)",
    category: "Advisory",
    description: "Provides valuable guidance and strategic direction to the NSS team. Ensures smooth functioning through experience and mentorship."
  },
  {
    id: "cm-2",
    name: "Nayan Maske",
    position: "President (3rd Year)",
    category: "Core Committee",
    description: "Leads the NSS unit with dedication and vision. Represents the team and oversees all activities and initiatives."
  },
  {
    id: "cm-3",
    name: "Sonam Rahangdale",
    position: "Vice-President (3rd Year)",
    category: "Core Committee",
    description: "Assists the President in leadership and decision-making. Ensures smooth coordination across all departments."
  },
  {
    id: "cm-4",
    name: "Aksha Jambhulkar",
    position: "General Secretary (3rd Year)",
    category: "Core Committee",
    description: "Manages official records, meetings, and communication. Coordinates the overall administration of the NSS unit."
  },
  {
    id: "cm-5",
    name: "Mrudul Khobragade",
    position: "Treasurer (3rd Year)",
    category: "Core Committee",
    description: "Handles financial planning and maintains transparent records. Ensures proper management of NSS funds."
  },
  {
    id: "cm-6",
    name: "Lavy Chawla",
    position: "Chief Coordinator (3rd Year)",
    category: "Core Committee",
    description: "Coordinates all committees and oversees the execution of NSS events. Monitors the complete flow of procedures to ensure every event is conducted successfully, efficiently, and with smooth coordination."
  },
  {
    id: "cm-7",
    name: "Achal Thakre",
    position: "Joint Secretary (3rd Year)",
    category: "Core Committee",
    description: "Supports the General Secretary in documentation and coordination. Helps manage organizational responsibilities efficiently."
  },
  {
    id: "cm-8",
    name: "Nidhisha Rajesh Gargelwar",
    position: "Cultural Secretary (3rd Year)",
    category: "Core Committee",
    description: "Plans and organizes cultural events and celebrations. Encourages creativity and active participation."
  },
  {
    id: "cm-9",
    name: "Kanak Shrivas",
    position: "Discipline Head (3rd Year)",
    category: "Core Committee",
    description: "Maintains discipline and decorum during NSS activities. Ensures a safe and organized environment."
  },
  {
    id: "cm-10",
    name: "Bharti Thakre",
    position: "Event Manager (3rd Year)",
    category: "Core Committee",
    description: "Plans and manages NSS events from start to finish. Ensures successful execution with proper coordination."
  },
  {
    id: "cm-11",
    name: "Vrishti Jambhulkar",
    position: "Event Strategist (3rd Year)",
    category: "Core Committee",
    description: "Designs innovative event ideas and implementation plans. Focuses on impactful and well-structured programs."
  },
  {
    id: "cm-12",
    name: "Aditya Bokde",
    position: "Social Media Head (3rd Year)",
    category: "Core Committee",
    description: "Manages the online presence of the NSS unit. Promotes activities through engaging digital content."
  },
  {
    id: "cm-13",
    name: "Pratiksha Raut",
    position: "Campaign Head (3rd Year)",
    category: "Core Committee",
    description: "Leads awareness campaigns and community outreach programs. Inspires participation for social causes."
  },
  {
    id: "cm-14",
    name: "Chaitanya Bodhke",
    position: "Chief Technical Head (3rd Year)",
    category: "Core Committee",
    description: "Manages the setup and operation of speakers, microphones, mixers, projectors, and other technical equipment. Ensures all technical arrangements run smoothly for every NSS event and program."
  },
  {
    id: "cm-15",
    name: "Nipul Bhairam",
    position: "Logistics Head (3rd Year)",
    category: "Core Committee",
    description: "Manages event resources, materials, and arrangements. Ensures everything is available on time."
  },
  {
    id: "cm-16",
    name: "Pawan Oza",
    position: "Chief Editorial Head (3rd Year)",
    category: "Core Committee",
    description: "Oversees content writing, reports, and official publications. Ensures clear and professional communication."
  },
  {
    id: "cm-17",
    name: "Chaitali Hore",
    position: "Executive Supervisor (3rd Year)",
    category: "Core Committee",
    description: "Monitors the Executive Members, guides and manages them while helping develop their leadership and organizational qualities. Ensures responsibilities are carried out effectively and maintains proper coordination within the team."
  },
  {
    id: "cm-18",
    name: "Jahnavi Rajesh Ramteke",
    position: "Senior Executive Member (3rd Year)",
    category: "Core Committee",
    description: "Supports event planning and guides junior volunteers. Contributes actively to NSS initiatives and teamwork."
  },
  {
    id: "cm-19",
    name: "Roshan Tumbhre",
    position: "Senior Executive Member (2nd Year)",
    category: "Core Committee",
    description: "Assists in organizing activities and motivates fellow volunteers. Plays an active role in successful event execution."
  },
  {
    id: "cm-20",
    name: "Sudarshan Shukla",
    position: "Documentation Head (2nd Year)",
    category: "Junior Committee",
    description: "Maintains official records and event reports. Ensures proper documentation of all NSS activities."
  },
  {
    id: "cm-21",
    name: "Unnati Chawre",
    position: "Jr Documentation Head (2nd Year)",
    category: "Junior Committee",
    description: "Assists in preparing reports and maintaining records. Supports smooth documentation work."
  },
  {
    id: "cm-22",
    name: "Yachika Jaykumar Ingle",
    position: "Branding & Promotion Head (2nd Year)",
    category: "Junior Committee",
    description: "Leads branding and promotional campaigns. Enhances the visibility of NSS activities."
  },
  {
    id: "cm-23",
    name: "Mansi Kekati",
    position: "Branding & Promotion Coordinator (2nd Year)",
    category: "Junior Committee",
    description: "Coordinates promotional activities and publicity. Helps strengthen the NSS brand."
  },
  {
    id: "cm-24",
    name: "Shriyanshi Dekate",
    position: "Lead Designer (2nd Year)",
    category: "Junior Committee",
    description: "Creates posters, banners, and creative graphics. Ensures attractive visual designs for NSS events."
  },
  {
    id: "cm-25",
    name: "Shrawani Bonde",
    position: "Jr. Lead Designer (2nd Year)",
    category: "Junior Committee",
    description: "Assists in designing promotional materials. Supports the design team with creative ideas."
  },
  {
    id: "cm-26",
    name: "Janvi Mahurle",
    position: "Photography Head (2nd Year)",
    category: "Junior Committee",
    description: "Captures memorable moments from NSS events. Maintains the official photo archive."
  },
  {
    id: "cm-27",
    name: "Sarthak Tembhekar",
    position: "Photography Co-ordinator (2nd Year)",
    category: "Junior Committee",
    description: "Assists in event photography and photo management. Ensures quality visual coverage."
  },
  {
    id: "cm-28",
    name: "Pranav Malokar",
    position: "Photography Co-ordinator (2nd Year)",
    category: "Junior Committee",
    description: "Supports photography during NSS activities. Helps organize event photographs."
  },
  {
    id: "cm-29",
    name: "Punam Likhar",
    position: "Content Strategist (2nd Year)",
    category: "Junior Committee",
    description: "Plans engaging content for NSS platforms. Creates impactful messages for campaigns."
  },
  {
    id: "cm-30",
    name: "Krutika Hood",
    position: "Video Editor (2nd Year)",
    category: "Junior Committee",
    description: "Edits event videos and promotional content. Produces engaging visual stories."
  },
  {
    id: "cm-31",
    name: "Jatin Katre",
    position: "Technical Co-ordinator (2nd Year)",
    category: "Junior Committee",
    description: "Manages microphones, speakers, mixers, projectors, and technical equipment. Ensures smooth technical support during every event."
  },
  {
    id: "cm-32",
    name: "Saniya Khan",
    position: "Event Co-ordinator (2nd Year)",
    category: "Junior Committee",
    description: "Coordinates event planning and volunteer management. Ensures smooth execution of programs."
  },
  {
    id: "cm-33",
    name: "Shreya Bhojne",
    position: "Event Co-ordinator (2nd Year)",
    category: "Junior Committee",
    description: "Assists in organizing and managing NSS events. Helps maintain proper event coordination."
  },
  {
    id: "cm-34",
    name: "Tanishka Chavhan",
    position: "Discipline Co-ordinator (2nd Year)",
    category: "Junior Committee",
    description: "Maintains discipline during NSS activities. Ensures a safe and organized environment."
  },
  {
    id: "cm-35",
    name: "Poshank Bhoge",
    position: "Discipline Co-ordinator (2nd Year)",
    category: "Junior Committee",
    description: "Supports discipline and crowd management. Promotes responsible volunteer conduct."
  },
  {
    id: "cm-36",
    name: "Sahil Sanjay Chandpurkar",
    position: "Discipline Co-ordinator (2nd Year)",
    category: "Junior Committee",
    description: "Helps maintain order during events. Assists in volunteer coordination."
  },



  {
    id: "cm-38",
    name: "Lipika Marchive",
    position: "Discipline Co-ordinator (2nd Year)",
    category: "Junior Committee",
    description: "Ensures discipline and proper event management. Encourages responsible participation."
  },
  {
    id: "cm-39",
    name: "Samiksha Nandeshwar",
    position: "Outreach Co-ordinator (2nd Year)",
    category: "Junior Committee",
    description: "Builds community connections through NSS initiatives. Encourages public participation."
  },
  {
    id: "cm-40",
    name: "Tanushri Agade",
    position: "Outreach Co-ordinator (2nd Year)",
    category: "Junior Committee",
    description: "Supports awareness campaigns and outreach programs. Strengthens community engagement."
  },
  {
    id: "cm-41",
    name: "Neha Turkar",
    position: "Cultural Coordinator (2nd Year)",
    category: "Junior Committee",
    description: "Organizes cultural events and performances. Promotes creativity and teamwork."
  },
  {
    id: "cm-42",
    name: "Drishti Borkar",
    position: "Cultural Coordinator (2nd Year)",
    category: "Junior Committee",
    description: "Assists in planning cultural activities. Helps make NSS events vibrant and engaging."
  },
  {
    id: "cm-43",
    name: "Aditya Mahendra Turkar",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-44",
    name: "Minal Kapse",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-45",
    name: "Shweta Sontakke",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-46",
    name: "Janhvi Dadve",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-47",
    name: "Tanushri Bijekar",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-48",
    name: "Pushpak Vijay Telrandhe",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-49",
    name: "Drushti Borkar",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-50",
    name: "Sahil Selukar",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-51",
    name: "Divyani Prashant Atnerkar",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-52",
    name: "Samarthi Tembhurne",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-53",
    name: "Chaitali Gaigore",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-54",
    name: "Swasthik Sen",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-55",
    name: "Kanak Rathod",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-56",
    name: "Archana Patel",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-57",
    name: "Reenal Dupare",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-58",
    name: "Diksha Lande",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-59",
    name: "Yash Karmankar",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-60",
    name: "Sameera Sheikh",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-61",
    name: "Anuja Bhoskar",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-62",
    name: "Janhvi Zoting",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  },
  {
    id: "cm-63",
    name: "Chinmay Ketkar",
    position: "Executive Member (2nd Year)",
    category: "Executive Members",
    description: "Actively supports NSS events and community service activities. Works with the team to ensure successful program execution."
  }
];
