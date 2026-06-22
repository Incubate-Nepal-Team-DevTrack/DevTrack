// DevTrack seed — mission-driven Kathmandu Metropolitan City dataset
import { db } from "../src/lib/db";

async function main() {
  console.log("🌱 Seeding DevTrack…");

  // ---------- Categories ----------
  const categories = [
    { slug: "infrastructure", name: "Infrastructure", description: "Roads, bridges, drainage, water supply", icon: "construction", color: "#DC143C" },
    { slug: "education", name: "Education", description: "Schools, scholarships, literacy programs", icon: "school", color: "#003893" },
    { slug: "healthcare", name: "Healthcare", description: "Hospitals, clinics, public health", icon: "heart-pulse", color: "#0EA5E9" },
    { slug: "economy", name: "Economy", description: "Markets, jobs, SME support", icon: "trending-up", color: "#F59E0B" },
    { slug: "environment", name: "Environment", description: "Air quality, rivers, green cover", icon: "leaf", color: "#16A34A" },
    { slug: "policy", name: "Policy", description: "Legislation, regulations, governance", icon: "scale", color: "#7C3AED" },
    { slug: "urban_development", name: "Urban Development", description: "Zoning, heritage, public spaces", icon: "building-2", color: "#EA580C" },
    { slug: "citizen_benefits", name: "Citizen Benefits", description: "Subsidies, welfare, elderly & youth", icon: "users", color: "#DB2777" },
  ];
  const catMap: Record<string, string> = {};
  for (const c of categories) {
    const row = await db.category.create({ data: c });
    catMap[c.slug] = row.id;
  }

  // ---------- Wards (32 KMC wards with approximate centroids) ----------
  const wardCoords: Record<number, [number, number]> = {
    1: [27.7045, 85.3095], 2: [27.7080, 85.3150], 3: [27.7120, 85.3210], 4: [27.7160, 85.3260],
    5: [27.7200, 85.3300], 6: [27.7000, 85.3000], 7: [27.6900, 85.3100], 8: [27.6850, 85.3200],
    9: [27.6800, 85.3280], 10: [27.6750, 85.3350], 11: [27.6720, 85.3120], 12: [27.6680, 85.3050],
    13: [27.6640, 85.2980], 14: [27.6600, 85.2900], 15: [27.6950, 85.2950], 16: [27.6990, 85.2850],
    17: [27.7030, 85.2780], 18: [27.7070, 85.2720], 19: [27.7110, 85.2660], 20: [27.7100, 85.3400],
    21: [27.7050, 85.3450], 22: [27.7000, 85.3500], 23: [27.6950, 85.3550], 24: [27.6900, 85.3600],
    25: [27.6780, 85.3450], 26: [27.6820, 85.3400], 27: [27.6850, 85.3350], 28: [27.6890, 85.3300],
    29: [27.7150, 85.3100], 30: [27.7180, 85.3150], 31: [27.7220, 85.3200], 32: [27.7260, 85.3250],
  };
  const wardMap: Record<number, string> = {};
  for (let n = 1; n <= 32; n++) {
    const [lat, lng] = wardCoords[n];
    const w = await db.ward.create({
      data: {
        number: n,
        name: `KMC Ward ${n}`,
        district: "Kathmandu",
        population: 15000 + (n * 837) % 40000,
        area: 1.2 + (n * 0.13) % 2.4,
        latitude: lat,
        longitude: lng,
      },
    });
    wardMap[n] = w.id;
  }

  // ---------- Users ----------
  const users = [
    { email: "admin@devtrack.gov.np", name: "DevTrack Admin", passwordHash: "$2a$10$placeholder1", role: "ADMIN", avatarColor: "#003893", bio: "Platform administrator" },
    { email: "mayor@kmc.gov.np", name: "Bidya Sundar Shakya (Demo)", passwordHash: "$2a$10$placeholder2", role: "OFFICIAL", avatarColor: "#DC143C", bio: "Mayor — Kathmandu Metropolitan City" },
    { email: "sugam@devtrack.np", name: "Sugam Parajuli", passwordHash: "$2a$10$placeholder3", role: "CITIZEN", avatarColor: "#16A34A", wardId: wardMap[15], bio: "Team DevTrack member, Pokhara" },
    { email: "preeti@devtrack.np", name: "Preeti Pantha", passwordHash: "$2a$10$placeholder4", role: "CITIZEN", avatarColor: "#DB2777", wardId: wardMap[3], bio: "Socio-economic enthusiast" },
    { email: "tushar@devtrack.np", name: "Tushar Shah", passwordHash: "$2a$10$placeholder5", role: "CITIZEN", avatarColor: "#F59E0B", wardId: wardMap[10], bio: "Socio-economic thinker" },
    { email: "sampada@devtrack.np", name: "Sampada Koirala", passwordHash: "$2a$10$placeholder6", role: "CITIZEN", avatarColor: "#7C3AED", wardId: wardMap[20], bio: "Economics enthusiast" },
    { email: "sushil@devtrack.np", name: "Sushil Bhattarai", passwordHash: "$2a$10$placeholder7", role: "EXPERT", avatarColor: "#0EA5E9", expertise: "Computer Science, Community Tech", wardId: wardMap[5], bio: "Tech for social impact" },
    { email: "kristina@devtrack.np", name: "Kristina Khanal", passwordHash: "$2a$10$placeholder8", role: "EXPERT", avatarColor: "#EA580C", expertise: "Web Design, National Hackathon Tech Girl", wardId: wardMap[12], bio: "Designer & hackathon winner" },
    { email: "rajesh@citizen.np", name: "Rajesh Maharjan", passwordHash: "$2a$10$placeholder9", role: "CITIZEN", avatarColor: "#0EA5E9", wardId: wardMap[22], bio: "Local shopkeeper, Ward 22" },
    { email: "sita@citizen.np", name: "Sita Tamang", passwordHash: "$2a$10$placeholder10", role: "CITIZEN", avatarColor: "#16A34A", wardId: wardMap[7], bio: "Mother of two, community volunteer" },
    { email: "anil@expert.np", name: "Er. Anil K.C.", passwordHash: "$2a$10$placeholder11", role: "EXPERT", avatarColor: "#DC143C", expertise: "Civil Engineer, M.Sc. Structural Engineering, IOE Pulchowk", wardId: wardMap[1], bio: "20 years infrastructure experience" },
  ];
  const userMap: Record<string, string> = {};
  for (const u of users) {
    const row = await db.user.create({ data: u });
    userMap[u.email] = row.id;
  }

  // ---------- Officials ----------
  const officials = [
    { name: "Bidya Sundar Shakya", title: "Mayor", portfolio: "Chief Executive of KMC, all wards", wardId: null, phone: "+977-1-4215123", email: "mayor@kmc.gov.np", officeAddress: "KMC Building, Bagdurbar, Kathmandu", surgeryHours: "Every Sunday 10:00–12:00", party: "CPN-UML", termStart: new Date("2017-09-04") },
    { name: "Hari Prabha Khadgi", title: "Deputy Mayor", portfolio: "Social development, women & children", wardId: null, phone: "+977-1-4215124", email: "deputymayor@kmc.gov.np", officeAddress: "KMC Building, Bagdurbar", surgeryHours: "Every Monday 11:00–13:00", party: "NC", termStart: new Date("2017-09-04") },
    { name: "Ishwor Man Dangol", title: "Ward Chair", portfolio: "Ward 1 — Administration & local disputes", wardId: wardMap[1], phone: "+977-1-4100001", email: "ward01@kmc.gov.np", officeAddress: "Ward Office 1, Chhetrapati", surgeryHours: "Sun–Fri 10:00–12:00", party: "CPN-UML", termStart: new Date("2017-09-04") },
    { name: "Suman Maharjan", title: "Ward Chair", portfolio: "Ward 5 — Heritage & tourism", wardId: wardMap[5], phone: "+977-1-4100005", email: "ward05@kmc.gov.np", officeAddress: "Ward Office 5, Jyatha", surgeryHours: "Sun–Fri 10:00–12:00", party: "NC", termStart: new Date("2017-09-04") },
    { name: "Bhakta Ratna Tuladhar", title: "Ward Chair", portfolio: "Ward 20 — Urban planning", wardId: wardMap[20], phone: "+977-1-4100020", email: "ward20@kmc.gov.np", officeAddress: "Ward Office 20, Tokha Road", surgeryHours: "Sun–Fri 11:00–13:00", party: "CPN-UML", termStart: new Date("2017-09-04") },
    { name: "Gyan Maya Lama", title: "Ward Chair", portfolio: "Ward 22 — Water & sanitation", wardId: wardMap[22], phone: "+977-1-4100022", email: "ward22@kmc.gov.np", officeAddress: "Ward Office 22, Balaju", surgeryHours: "Sun–Fri 10:00–12:00", party: "CPN-MC", termStart: new Date("2017-09-04") },
    { name: "Rabin Man Shrestha", title: "Chief, Environment Dept.", portfolio: "Air quality, Bagmati cleanup, solid waste", wardId: null, phone: "+977-1-4215140", email: "environment@kmc.gov.np", officeAddress: "Environment Mgmt Division, Teku", surgeryHours: "Sunday 13:00–15:00", party: "", termStart: new Date("2020-01-01") },
    { name: "Sarbendra Khanal", title: "Chief, Infrastructure Dept.", portfolio: "Roads, drainage, street lighting", wardId: null, phone: "+977-1-4215150", email: "infra@kmc.gov.np", officeAddress: "Infrastructure Div, Bagdurbar", surgeryHours: "Tuesday 11:00–13:00", party: "", termStart: new Date("2020-01-01") },
  ];
  for (const o of officials) {
    await db.official.create({ data: o });
  }

  // ---------- Projects (mission-driven, real-feel) ----------
  const P = (slug: string, data: any) => ({ slug, ...data });
  const projectDefs = [
    P("ring-road-widening-ward-1-5", {
      title: "Ring Road Widening — Kalankati to Maharajgunj (Ward 1–5)",
      summary: "8-laning of 6.2 km Ring Road stretch with cycle lane, drainage & pedestrian skywalks.",
      description: "This 6.2 km stretch of the Ring Road between Kalankati and Maharajgunj will be widened to 8 lanes with a dedicated cycle lane, new stormwater drainage, LED street lighting, and 4 pedestrian skywalks at major intersections. The project is jointly funded by the Government of Nepal and the China Railway Construction Engineering Group. Citizens of Wards 1–5 will benefit from reduced commute times and safer pedestrian crossings. Concerns raised by residents near Balaju include noise during night-time construction and the loss of 87 mature trees along the verge.",
      category: "infrastructure", ward: 5, status: "ONGOING", priority: "CRITICAL",
      budgetAllocated: 1850000000, budgetSpent: 1240000000, progress: 62,
      startDate: new Date("2023-03-01"), endDatePlanned: new Date("2025-12-31"),
      contractor: "China Railway Construction Engineering Group", consultant: "ICTC Nepal",
      fundingSource: "Federal + Donor", latitude: 27.7355, longitude: 85.3005, featured: true,
      milestones: [
        { title: "Land acquisition complete", dueDate: new Date("2023-06-30"), completedAt: new Date("2023-08-15"), status: "DONE" },
        { title: "Drainage installation (north carriageway)", dueDate: new Date("2024-03-31"), completedAt: new Date("2024-04-20"), status: "DONE" },
        { title: "Cycle lane asphalt laid", dueDate: new Date("2025-06-30"), status: "PENDING" },
        { title: "Skywalk at Maharajgunj junction", dueDate: new Date("2025-09-30"), status: "PENDING" },
        { title: "Project handover", dueDate: new Date("2025-12-31"), status: "PENDING" },
      ],
      budgetLines: [
        { label: "Materials (asphalt, concrete, steel)", amount: 920000000, spent: 680000000 },
        { label: "Labor", amount: 380000000, spent: 260000000 },
        { label: "Equipment", amount: 240000000, spent: 180000000 },
        { label: "Land compensation", amount: 210000000, spent: 120000000 },
        { label: "Overhead & consultancy", amount: 100000000, spent: 0 },
      ],
      updates: [
        { title: "North carriageway opened to traffic", body: "The north carriageway has been completed and opened to two-way traffic. South carriageway construction begins next week.", type: "PROGRESS", authorId: userMap["admin@devtrack.gov.np"] },
        { title: "Tree-felling permit approved for 87 trees", body: "Department of Forests approved compensatory plantation of 870 saplings (10x) at Ichangu Narayan. Citizens with concerns may contact the Environment Division.", type: "ISSUE", authorId: userMap["admin@devtrack.gov.np"] },
      ],
    }),
    P("bagmati-river-cleanup-phase-4", {
      title: "Bagmati River Cleanup & Restoration — Phase 4",
      summary: "Sewer interception, riverbank greening and inline wetlands from Thapathali to Chobhar.",
      description: "Phase 4 of the long-running Bagmati Cleanup Initiative intercepts 14 sewer outfalls between Thapathali and Chobhar, constructs 3 inline constructed wetlands for bio-remediation, and replants 9 hectares of riverbank with native species (Sal, Katus, Simal). Weekly Riverside Walks and monthly Clean Bagmati Days will be hosted to maintain citizen engagement. Expected outcomes: dissolved oxygen >5 mg/L at monitoring station BGM-07; visible reduction in floating plastics; return of native fish species within 18 months.",
      category: "environment", ward: 11, status: "ONGOING", priority: "HIGH",
      budgetAllocated: 420000000, budgetSpent: 165000000, progress: 38,
      startDate: new Date("2024-01-15"), endDatePlanned: new Date("2026-03-31"),
      contractor: "Kalika Construction", consultant: "IUCN Nepal",
      fundingSource: "KMC + Donor", latitude: 27.6855, longitude: 85.3140, featured: true,
      milestones: [
        { title: "Sewer intercept 1–5 commissioned", dueDate: new Date("2024-09-30"), completedAt: new Date("2024-10-15"), status: "DONE" },
        { title: "Wetland #1 at Sankhamul", dueDate: new Date("2025-06-30"), status: "PENDING" },
        { title: "Riverbank plantation (9 ha)", dueDate: new Date("2025-12-31"), status: "PENDING" },
      ],
      budgetLines: [
        { label: "Sewer interception structures", amount: 180000000, spent: 95000000 },
        { label: "Constructed wetlands", amount: 110000000, spent: 30000000 },
        { label: "Plantation & nursery", amount: 60000000, spent: 25000000 },
        { label: "Community engagement", amount: 40000000, spent: 15000000 },
        { label: "Monitoring equipment", amount: 30000000, spent: 0 },
      ],
      updates: [
        { title: "First wetland cell operational at Sankhamul", body: "Cell A (0.4 ha) commissioned with 1,200 Phragmites reeds. Early water tests show 35% reduction in BOD downstream.", type: "PROGRESS", authorId: userMap["admin@devtrack.gov.np"] },
      ],
    }),
    P("tribhuvan-university-hospital-wing", {
      title: "Tribhuvan University Teaching Hospital — New Pediatric Wing",
      summary: "120-bed pediatric wing with NICU, PICU and emergency trauma bay.",
      description: "The new 120-bed pediatric wing at TUTH Maharajgunj will house a 30-bed Level-3 NICU, a 15-bed PICU, 4 modern operating theatres, and a 24/7 pediatric emergency trauma bay. The wing serves children from all of Kathmandu Valley and nearby districts. Construction is being executed by Nepali contractor Pappu Construction with quality assurance by an independent panel from the Nepal Medical Association.",
      category: "healthcare", ward: 4, status: "DELAYED", priority: "CRITICAL",
      budgetAllocated: 980000000, budgetSpent: 690000000, progress: 55,
      startDate: new Date("2022-09-01"), endDatePlanned: new Date("2025-03-31"),
      endDateActual: null,
      contractor: "Pappu Construction", consultant: "Nepal Medical Association",
      fundingSource: "Federal", latitude: 27.7155, longitude: 85.3270, featured: true,
      milestones: [
        { title: "Foundation complete", dueDate: new Date("2023-02-28"), completedAt: new Date("2023-04-10"), status: "DONE" },
        { title: "Superstructure (4 floors)", dueDate: new Date("2024-01-31"), completedAt: new Date("2024-05-20"), status: "DONE" },
        { title: "MEP installation", dueDate: new Date("2024-11-30"), status: "OVERDUE" },
        { title: "Equipment installation & commissioning", dueDate: new Date("2025-01-31"), status: "PENDING" },
        { title: "Soft opening", dueDate: new Date("2025-03-31"), status: "PENDING" },
      ],
      budgetLines: [
        { label: "Civil works", amount: 480000000, spent: 420000000 },
        { label: "Medical equipment", amount: 280000000, spent: 130000000 },
        { label: "MEP & HVAC", amount: 130000000, spent: 90000000 },
        { label: "Furniture & fixtures", amount: 50000000, spent: 30000000 },
        { label: "Consultancy & QA", amount: 40000000, spent: 20000000 },
      ],
      updates: [
        { title: "MEP delay — steel shortage", body: "Mechanical, electrical and plumbing works delayed by 14 weeks due to import restrictions on medical-grade stainless steel. Revised MEP completion: August 2025.", type: "DELAY", authorId: userMap["admin@devtrack.gov.np"] },
        { title: "NICU incubators tender awarded", body: "Tender for 24 incubators (Dräger brand) awarded to Om Medicos at NPR 38 million, delivery expected within 90 days.", type: "PROGRESS", authorId: userMap["admin@devtrack.gov.np"] },
      ],
    }),
    P("community-school-upgrade-ward-7", {
      title: "Shree Janasewa Secondary School — Earthquake Retrofit",
      summary: "Retrofit 3 blocks + new science lab + girls' sanitation block.",
      description: "Three pre-1990 school blocks at Shree Janasewa Secondary School (Ward 7, enrolment 1,140) will be retrofitted to NBC 1994 seismic standards. A new 4-room science laboratory and a dedicated girls' sanitation block with 12 toilets and an incinerator will be added. The retrofit follows the 2015 Gorkha Earthquake School Safety Audit, which had flagged these blocks as 'high risk'.",
      category: "education", ward: 7, status: "ONGOING", priority: "HIGH",
      budgetAllocated: 145000000, budgetSpent: 78000000, progress: 48,
      startDate: new Date("2024-05-01"), endDatePlanned: new Date("2025-10-31"),
      contractor: "Annapurna Construction", consultant: "NSET Nepal",
      fundingSource: "KMC + Donor", latitude: 27.6905, longitude: 85.3120, featured: false,
      milestones: [
        { title: "Block A retrofit", dueDate: new Date("2024-12-31"), completedAt: new Date("2025-01-15"), status: "DONE" },
        { title: "Block B retrofit", dueDate: new Date("2025-04-30"), status: "PENDING" },
        { title: "Science lab construction", dueDate: new Date("2025-07-31"), status: "PENDING" },
        { title: "Girls' sanitation block", dueDate: new Date("2025-09-30"), status: "PENDING" },
      ],
      budgetLines: [
        { label: "Seismic retrofit (blocks A–C)", amount: 82000000, spent: 48000000 },
        { label: "Science lab", amount: 32000000, spent: 18000000 },
        { label: "Sanitation block", amount: 21000000, spent: 12000000 },
        { label: "Furniture & equipment", amount: 10000000, spent: 0 },
      ],
      updates: [
        { title: "Block A handed back to school", body: "Block A reopened for classes 9–10 on 16 Jan 2025 after successful structural integrity testing by NSET engineers.", type: "PROGRESS", authorId: userMap["admin@devtrack.gov.np"] },
      ],
    }),
    P("asasan-market-modernization", {
      title: "Asan Bazaar Heritage Market Modernization",
      summary: "Heritage-sensitive paving, overhead cable burial, vendor zoning.",
      description: "Asan — a 400-year-old market square — will see heritage-sensitive stone paving, burial of all overhead electricity and telecom cables, structured vendor zoning (vegetables / spices / brassware), and restoration of the Annapurna Ajima temple precinct. Work proceeds in 4 phases of 45 days each to minimize disruption to the 2,000+ daily vendors.",
      category: "urban_development", ward: 5, status: "PLANNED", priority: "MEDIUM",
      budgetAllocated: 220000000, budgetSpent: 0, progress: 0,
      startDate: new Date("2025-10-01"), endDatePlanned: new Date("2027-03-31"),
      contractor: null, consultant: "Kathmandu Valley Preservation Trust",
      fundingSource: "KMC + Federal", latitude: 27.7076, longitude: 85.3130, featured: false,
      milestones: [
        { title: "Vendor consultation rounds (3)", dueDate: new Date("2025-09-30"), status: "PENDING" },
        { title: "Phase 1 — paving", dueDate: new Date("2025-12-31"), status: "PENDING" },
        { title: "Phase 2 — cable burial", dueDate: new Date("2026-06-30"), status: "PENDING" },
        { title: "Phase 3 — vendor zoning", dueDate: new Date("2026-12-31"), status: "PENDING" },
        { title: "Phase 4 — temple precinct", dueDate: new Date("2027-03-31"), status: "PENDING" },
      ],
      budgetLines: [
        { label: "Stone paving", amount: 80000000, spent: 0 },
        { label: "Cable burial", amount: 70000000, spent: 0 },
        { label: "Temple restoration", amount: 45000000, spent: 0 },
        { label: "Vendor zoning & signage", amount: 25000000, spent: 0 },
      ],
      updates: [],
    }),
    P("elderly-pension-disbursement-2024", {
      title: "Senior Citizen Allowance Digital Disbursement 2024",
      summary: "Direct-to-bank pension disbursement for 38,000 KMC senior citizens.",
      description: "All 38,000 senior citizens (60+ years) registered with KMC will receive their monthly Senior Citizen Allowance (NPR 4,000) directly to their bank account via the Nepal Clearing House electronic transfer system, replacing the previous paper-voucher system that caused 6–8 week delays. The digital system also sends an SMS confirmation in Nepali on the 5th of every month. Eligibility re-verification happens annually through ward offices.",
      category: "citizen_benefits", ward: 1, status: "COMPLETED", priority: "HIGH",
      budgetAllocated: 1824000000, budgetSpent: 1824000000, progress: 100,
      startDate: new Date("2023-07-01"), endDatePlanned: new Date("2024-06-30"),
      endDateActual: new Date("2024-06-12"),
      contractor: "Nepal Clearing House Ltd.", consultant: "Ministry of Federal Affairs",
      fundingSource: "Federal", latitude: 27.7045, longitude: 85.3095, featured: false,
      milestones: [
        { title: "Bank account linking (100%)", dueDate: new Date("2023-12-31"), completedAt: new Date("2023-12-20"), status: "DONE" },
        { title: "Pilot in Ward 1–5", dueDate: new Date("2024-01-31"), completedAt: new Date("2024-01-25"), status: "DONE" },
        { title: "City-wide rollout", dueDate: new Date("2024-06-30"), completedAt: new Date("2024-06-12"), status: "DONE" },
      ],
      budgetLines: [
        { label: "Allowance disbursement (12 months × 38k × 4000)", amount: 1824000000, spent: 1824000000 },
      ],
      updates: [
        { title: "Project complete — 100% on-time disbursement for 6 consecutive months", body: "Audit by Office of Auditor General confirms 100% on-time disbursement for the last 6 months. Average delay reduced from 47 days (paper system) to 0 days.", type: "COMPLETION", authorId: userMap["admin@devtrack.gov.np"] },
      ],
    }),
    P("air-quality-monitoring-network", {
      title: "Kathmandu Air Quality Monitoring Network — 12 Stations",
      summary: "12 low-cost AQI stations across KMC wards, public dashboard every 15 min.",
      description: "A network of 12 reference-grade PM2.5/PM10/NO2/SO2 monitoring stations will be installed across KMC wards (1, 5, 7, 11, 15, 19, 20, 22, 25, 27, 30, 32). Data is published to a public dashboard every 15 minutes and integrated with the World Air Quality Index project. Stations are co-located with KMC school and hospital buildings for security. The network supports KMC's Clean Air Action Plan 2024–2028.",
      category: "environment", ward: 15, status: "ONGOING", priority: "CRITICAL",
      budgetAllocated: 95000000, budgetSpent: 62000000, progress: 70,
      startDate: new Date("2024-02-01"), endDatePlanned: new Date("2025-08-31"),
      contractor: "Aeroqual Nepal", consultant: "ICIMOD",
      fundingSource: "Donor", latitude: 27.6975, longitude: 85.2960, featured: true,
      milestones: [
        { title: "Site survey & permissions (12)", dueDate: new Date("2024-05-31"), completedAt: new Date("2024-05-20"), status: "DONE" },
        { title: "Stations 1–6 installed", dueDate: new Date("2024-12-31"), completedAt: new Date("2025-01-10"), status: "DONE" },
        { title: "Public dashboard live", dueDate: new Date("2025-02-28"), completedAt: new Date("2025-03-05"), status: "DONE" },
        { title: "Stations 7–12 installed", dueDate: new Date("2025-08-31"), status: "PENDING" },
      ],
      budgetLines: [
        { label: "Monitoring hardware (12 stations)", amount: 55000000, spent: 38000000 },
        { label: "Installation & civil works", amount: 15000000, spent: 12000000 },
        { label: "Dashboard & data pipeline", amount: 12000000, spent: 8000000 },
        { label: "2-year operation & calibration", amount: 13000000, spent: 4000000 },
      ],
      updates: [
        { title: "Public dashboard now live at air.kmc.gov.np", body: "Real-time AQI for stations 1–6 published every 15 minutes. Ward 11 (Patan Dhoka) currently shows the highest PM2.5 readings at 187 µg/m³ (Unhealthy).", type: "PROGRESS", authorId: userMap["admin@devtrack.gov.np"] },
      ],
    }),
    P("indra-chowk-pedestrian-zone", {
      title: "Indra Chowk Pedestrian-Only Zone Pilot",
      summary: "Pedestrianize Indra Chowk–Makhan Tole 8am–8pm, 6-month pilot.",
      description: "A 450-meter stretch from Indra Chowk to Makhan Tole will be pedestrianized daily from 8 AM to 8 PM for a 6-month pilot starting Kartik 1. Only emergency vehicles, residents with permits, and cycle-rickshaws will be allowed. The pilot aims to reduce congestion, improve air quality in the heritage core, and revive traditional street commerce. 24/7 CCTV and 4 traffic marshals will enforce the zone.",
      category: "policy", ward: 5, status: "PLANNED", priority: "MEDIUM",
      budgetAllocated: 28000000, budgetSpent: 0, progress: 5,
      startDate: new Date("2025-10-17"), endDatePlanned: new Date("2026-04-17"),
      contractor: null, consultant: "Clean Nepal Initiative",
      fundingSource: "KMC", latitude: 27.7088, longitude: 85.3120, featured: false,
      milestones: [
        { title: "Stakeholder consultations", dueDate: new Date("2025-09-30"), status: "PENDING" },
        { title: "Pilot launch", dueDate: new Date("2025-10-17"), status: "PENDING" },
        { title: "Mid-pilot review", dueDate: new Date("2026-01-17"), status: "PENDING" },
        { title: "Final report & decision", dueDate: new Date("2026-05-17"), status: "PENDING" },
      ],
      budgetLines: [
        { label: "Bollards & signage", amount: 12000000, spent: 0 },
        { label: "CCTV & enforcement", amount: 8000000, spent: 0 },
        { label: "Public engagement", amount: 5000000, spent: 0 },
        { label: "Monitoring & evaluation", amount: 3000000, spent: 0 },
      ],
      updates: [],
    }),
    P("balaju-stormwater-drainage", {
      title: "Balaju Ward 22 Stormwater Drainage System",
      summary: "12 km new drain network to end annual monsoon flooding in Balaju.",
      description: "Ward 22 (Balaju) suffers annual monsoon flooding affecting 4,500 households. This project installs 12 km of new covered RC drain (600–1200 mm dia), 4 sump pumps at Balaju Chowk, and rehabilitates 3 km of existing drain. A community-based maintenance committee will be formed in each tole for post-construction upkeep.",
      category: "infrastructure", ward: 22, status: "ONGOING", priority: "HIGH",
      budgetAllocated: 340000000, budgetSpent: 95000000, progress: 28,
      startDate: new Date("2024-09-01"), endDatePlanned: new Date("2026-08-31"),
      contractor: "BG Builders", consultant: "DWSS",
      fundingSource: "KMC", latitude: 27.7000, longitude: 85.3000, featured: false,
      milestones: [
        { title: "Survey & detailed design", dueDate: new Date("2024-12-31"), completedAt: new Date("2025-01-05"), status: "DONE" },
        { title: "Drain — Balaju Chowk to Gongabu", dueDate: new Date("2025-06-30"), status: "PENDING" },
        { title: "Sump pump installation (4)", dueDate: new Date("2025-12-31"), status: "PENDING" },
        { title: "Network completion", dueDate: new Date("2026-08-31"), status: "PENDING" },
      ],
      budgetLines: [
        { label: "RC drain construction", amount: 220000000, spent: 62000000 },
        { label: "Sump pumps & electicals", amount: 65000000, spent: 15000000 },
        { label: "Existing drain rehab", amount: 35000000, spent: 12000000 },
        { label: "Community mobilization", amount: 20000000, spent: 6000000 },
      ],
      updates: [
        { title: "First 3.2 km drain operational before monsoon", body: "3.2 km of the new drain in the lower Balaju area was completed and tested before the 2025 monsoon, preventing flooding in 1,400 households that were flooded in 2024.", type: "PROGRESS", authorId: userMap["admin@devtrack.gov.np"] },
      ],
    }),
    P("youth-tech-bootcamp-2024", {
      title: "Kathmandu Youth Tech Bootcamp 2024 — 1,000 Trainees",
      summary: "Free 12-week coding + AI bootcamp for 1,000 youth aged 18–28.",
      description: "A free 12-week intensive bootcamp covering Python, web development, data analysis and applied AI for 1,000 Kathmandu youth aged 18–28, with priority for women (50% seats), Dalit and Janajati candidates (30% seats). The bootcamp is delivered by FusionEdge in partnership with KMC and includes a 4-week industry internship. Top 50 graduates receive placement support with Kathmandu's tech companies.",
      category: "economy", ward: 20, status: "COMPLETED", priority: "HIGH",
      budgetAllocated: 85000000, budgetSpent: 82000000, progress: 100,
      startDate: new Date("2024-03-01"), endDatePlanned: new Date("2024-09-30"),
      endDateActual: new Date("2024-10-15"),
      contractor: "FusionEdge Academy", consultant: "ICT Council Nepal",
      fundingSource: "PPP", latitude: 27.7100, longitude: 85.3400, featured: false,
      milestones: [
        { title: "Selection of 1,000 trainees (from 4,200 applicants)", dueDate: new Date("2024-02-28"), completedAt: new Date("2024-02-25"), status: "DONE" },
        { title: "12-week training complete", dueDate: new Date("2024-08-31"), completedAt: new Date("2024-09-05"), status: "DONE" },
        { title: "Internship completion", dueDate: new Date("2024-10-15"), completedAt: new Date("2024-10-15"), status: "DONE" },
      ],
      budgetLines: [
        { label: "Training delivery", amount: 45000000, spent: 44000000 },
        { label: "Stipend (1,000 × 5,000 × 3 months)", amount: 15000000, spent: 15000000 },
        { label: "Internship stipend", amount: 12000000, spent: 12000000 },
        { label: "Curriculum & platform", amount: 8000000, spent: 7000000 },
        { label: "Placement support", amount: 5000000, spent: 4000000 },
      ],
      updates: [
        { title: "Bootcamp completed — 73% placement rate", body: "Of 1,000 graduates, 732 secured tech jobs within 90 days at average salary NPR 38,000/month. 412 were women, 308 were from Dalit/Janajati communities.", type: "COMPLETION", authorId: userMap["admin@devtrack.gov.np"] },
      ],
    }),
    P("solar-rooftop-hospitals", {
      title: "Solar Rooftop at 4 KMC Health Posts",
      summary: "20 kWp solar + battery at 4 health posts for uninterrupted cold-chain.",
      description: "Installation of 20 kWp rooftop solar PV with lithium battery storage at 4 KMC health posts (Wards 5, 12, 19, 27). The system ensures uninterrupted vaccine cold-chain and emergency night-time power. Excess power is exported to the grid under NEA net-metering. Total CO2 offset: 96 tonnes/year.",
      category: "environment", ward: 5, status: "ONGOING", priority: "MEDIUM",
      budgetAllocated: 48000000, budgetSpent: 19000000, progress: 40,
      startDate: new Date("2024-11-01"), endDatePlanned: new Date("2025-09-30"),
      contractor: "Gham Power", consultant: "AEPC",
      fundingSource: "Donor + KMC", latitude: 27.7200, longitude: 85.3300, featured: false,
      milestones: [
        { title: "Site survey & structural audit (4)", dueDate: new Date("2024-12-31"), completedAt: new Date("2025-01-10"), status: "DONE" },
        { title: "Ward 5 & 12 installation", dueDate: new Date("2025-06-30"), status: "PENDING" },
        { title: "Ward 19 & 27 installation", dueDate: new Date("2025-09-30"), status: "PENDING" },
      ],
      budgetLines: [
        { label: "Solar PV modules", amount: 18000000, spent: 7000000 },
        { label: "Battery storage", amount: 15000000, spent: 6000000 },
        { label: "Inverters & grid sync", amount: 8000000, spent: 3000000 },
        { label: "Structural & installation", amount: 5000000, spent: 2000000 },
        { label: "Monitoring platform", amount: 2000000, spent: 1000000 },
      ],
      updates: [],
    }),
    P("smart-parking-new-road", {
      title: "New Road Smart Parking — 380 bays",
      summary: "Sensor-guided parking with mobile payment at New Road.",
      description: "380 parking bays along New Road, Dharma Path and Bhotahiti will be equipped with ground sensors indicating bay occupancy in real-time via a mobile app. Payment via eSewa, Khalti, IME Pay. Hourly rate: NPR 40 (car), NPR 20 (bike). Expected to reduce circling-for-parking by 60% and increase average search time savings of 8 minutes per trip.",
      category: "urban_development", ward: 1, status: "ONGOING", priority: "MEDIUM",
      budgetAllocated: 65000000, budgetSpent: 28000000, progress: 45,
      startDate: new Date("2024-08-01"), endDatePlanned: new Date("2025-07-31"),
      contractor: "SmartLink Nepal", consultant: "Kathmandu Smart City Office",
      fundingSource: "PPP", latitude: 27.7050, longitude: 85.3115, featured: false,
      milestones: [
        { title: "Sensor pilot (50 bays)", dueDate: new Date("2024-12-31"), completedAt: new Date("2025-01-15"), status: "DONE" },
        { title: "Mobile app launch", dueDate: new Date("2025-04-30"), status: "PENDING" },
        { title: "Full rollout (380 bays)", dueDate: new Date("2025-07-31"), status: "PENDING" },
      ],
      budgetLines: [
        { label: "Ground sensors (380)", amount: 28000000, spent: 12000000 },
        { label: "Mobile app & backend", amount: 15000000, spent: 7000000 },
        { label: "Signage & entry gates", amount: 12000000, spent: 5000000 },
        { label: "Operation (1 year)", amount: 10000000, spent: 4000000 },
      ],
      updates: [],
    }),
    P("ward-20-public-toilets", {
      title: "Ward 20 — 6 Public Toilets with Disabled Access",
      summary: "6 modular public toilets with disabled access & women's section.",
      description: "6 prefabricated modular public toilets with separate sections for men, women (with sanitary disposal), and disabled access (ramp, grab bars, wider stalls) will be installed at 6 high-footfall locations in Ward 20: Tokha chowk, Gongabu bus park, Ward Office, Health Post, Market Square, and Ward 20 Park. Operations & maintenance contracted to a women-led cooperative for 5 years.",
      category: "citizen_benefits", ward: 20, status: "ONGOING", priority: "LOW",
      budgetAllocated: 18000000, budgetSpent: 8500000, progress: 50,
      startDate: new Date("2024-10-01"), endDatePlanned: new Date("2025-06-30"),
      contractor: "EcoLoo Nepal", consultant: "ENPHO",
      fundingSource: "KMC", latitude: 27.7100, longitude: 85.3260, featured: false,
      milestones: [
        { title: "Site preparation (6)", dueDate: new Date("2024-12-31"), completedAt: new Date("2025-01-20"), status: "DONE" },
        { title: "Modular units delivered (6)", dueDate: new Date("2025-03-31"), status: "PENDING" },
        { title: "Commissioning & O&M handover", dueDate: new Date("2025-06-30"), status: "PENDING" },
      ],
      budgetLines: [
        { label: "Modular units (6)", amount: 9000000, spent: 4500000 },
        { label: "Site works", amount: 3000000, spent: 2000000 },
        { label: "Plumbing & sewer", amount: 3000000, spent: 1500000 },
        { label: "O&M retainer (5 years)", amount: 3000000, spent: 500000 },
      ],
      updates: [],
    }),
    P("digital-citizen-services-portal", {
      title: "KMC e-Sewa — Unified Citizen Services Portal",
      summary: "Single portal for 42 KMC services (permits, certificates, taxes).",
      description: "A unified digital portal integrating 42 KMC citizen services — birth/death certificates, building permits, business registration, property tax payment, urban planning clearance, vehicle passes — into a single sign-on platform. Includes Nepali + English UI, SMS + email notifications, digital payments (eSewa, Khalti, connectIPS), and a 7-day service-level commitment per service.",
      category: "policy", ward: 1, status: "ONGOING", priority: "CRITICAL",
      budgetAllocated: 220000000, budgetSpent: 145000000, progress: 65,
      startDate: new Date("2023-07-01"), endDatePlanned: new Date("2025-12-31"),
      contractor: "F1Soft International", consultant: "Ministry of Communications",
      fundingSource: "Federal + KMC", latitude: 27.7045, longitude: 85.3095, featured: true,
      milestones: [
        { title: "SSO & citizen DB integration", dueDate: new Date("2024-03-31"), completedAt: new Date("2024-04-10"), status: "DONE" },
        { title: "Phase 1 — 14 services live", dueDate: new Date("2024-09-30"), completedAt: new Date("2024-10-05"), status: "DONE" },
        { title: "Phase 2 — 28 services live", dueDate: new Date("2025-06-30"), status: "PENDING" },
        { title: "Phase 3 — 42 services (full)", dueDate: new Date("2025-12-31"), status: "PENDING" },
      ],
      budgetLines: [
        { label: "Platform development", amount: 110000000, spent: 80000000 },
        { label: "Integration (Nagarik App, NEA, etc.)", amount: 40000000, spent: 28000000 },
        { label: "Data center & security", amount: 40000000, spent: 22000000 },
        { label: "Citizen onboarding campaign", amount: 20000000, spent: 12000000 },
        { label: "Year 1 operations", amount: 10000000, spent: 3000000 },
      ],
      updates: [
        { title: "Phase 1 live — 14 services, 9,400 applications in first 60 days", body: "Birth/death certificates, building permit, property tax — all live. Average processing time 4.2 days vs 21 days previously.", type: "PROGRESS", authorId: userMap["admin@devtrack.gov.np"] },
      ],
    }),
    P("kmc-disaster-early-warning", {
      title: "KMC Disaster Early Warning & Response System",
      summary: "Siren network + SMS alerts for fire, flood, earthquake.",
      description: "A network of 16 sirens (covering all 32 wards), integrated with the National Earthquake Monitoring Center and Department of Hydrology flood gauges, will trigger automated SMS alerts to all KMC-registered mobile numbers within 90 seconds of an event. Includes a 24/7 KMC Emergency Operations Center at Bhrikutimandap with 8 operators, integration with 1144 ambulance dispatch, and quarterly city-wide drills.",
      category: "policy", ward: 1, status: "PLANNED", priority: "CRITICAL",
      budgetAllocated: 175000000, budgetSpent: 0, progress: 0,
      startDate: new Date("2025-11-01"), endDatePlanned: new Date("2027-04-30"),
      contractor: null, consultant: "BIPAD Authority",
      fundingSource: "Federal + Donor", latitude: 27.7045, longitude: 85.3095, featured: false,
      milestones: [
        { title: "Siren procurement (16)", dueDate: new Date("2026-03-31"), status: "PENDING" },
        { title: "EOC fit-out", dueDate: new Date("2026-06-30"), status: "PENDING" },
        { title: "Pilot SMS alerts (Ward 1–8)", dueDate: new Date("2026-10-31"), status: "PENDING" },
        { title: "City-wide rollout + first drill", dueDate: new Date("2027-04-30"), status: "PENDING" },
      ],
      budgetLines: [
        { label: "Siren network (16)", amount: 60000000, spent: 0 },
        { label: "EOC fit-out", amount: 45000000, spent: 0 },
        { label: "SMS gateway & software", amount: 35000000, spent: 0 },
        { label: "Training & drills", amount: 20000000, spent: 0 },
        { label: "Annual operations", amount: 15000000, spent: 0 },
      ],
      updates: [],
    }),
  ];

  for (const def of projectDefs) {
    const { slug, milestones, budgetLines, updates, category, ward, ...rest } = def as any;
    const project = await db.project.create({
      data: {
        ...rest,
        slug,
        categoryId: catMap[category],
        wardId: ward ? wardMap[ward] : null,
        milestones: { create: milestones },
        budgetLines: { create: budgetLines },
        updates: updates && updates.length ? { create: updates } : undefined,
      },
    });

    // Forum threads for some projects
    if (["ring-road-widening-ward-1-5", "bagmati-river-cleanup-phase-4", "tribhuvan-university-hospital-wing", "indra-chowk-pedestrian-zone"].includes(slug)) {
      await db.forumThread.create({
        data: {
          projectId: project.id,
          title: `Public discussion — ${def.title}`,
          body: `This is the official DevTrack public discussion thread for "${def.title}". Citizens are encouraged to share concerns, suggestions, and observations. Expert comments will be prioritized by KMC. Please be respectful and factual.`,
          authorId: userMap["admin@devtrack.gov.np"],
          pinned: true,
          comments: {
            create: [
              {
                authorId: userMap["sita@citizen.np"],
                body: "The night-time construction noise after 10 PM is affecting my children's sleep. Can the contractor be asked to stop work by 9 PM on weekdays?",
                createdAt: new Date("2025-05-12T08:30:00Z"),
              },
              {
                authorId: userMap["anil@expert.np"],
                body: "From a structural engineering perspective, the tree felling along the Ring Road verge could increase urban heat island effect by 1.5–2°C in Wards 1–5. Strongly recommend the 870 compensatory saplings be planted within 6 months, not the 2-year window currently proposed. Also recommend species selection favour native shade trees (Neem, Pipal, Katus).",
                createdAt: new Date("2025-05-12T11:15:00Z"),
              },
              {
                authorId: userMap["mayor@kmc.gov.np"],
                body: "Thank you Sita-ji and Er. Anil. I have instructed the Infrastructure Division to (1) enforce 9 PM stop-work on weekdays, (2) advance the plantation timeline to within 12 months, and (3) prioritise native shade species. A formal response letter will be issued via DevTrack within 7 days.",
                isOfficial: true,
                createdAt: new Date("2025-05-14T03:00:00Z"),
              },
            ],
          },
        },
      });
    }
  }

  // ---------- General forum threads ----------
  await db.forumThread.create({
    data: {
      projectId: null,
      title: "How should KMC prioritize projects for the FY 2025-26 budget?",
      body: "KMC invites citizens to suggest which development categories should receive increased allocation in the next fiscal year. Top recommendations will be presented to the City Council in August.",
      authorId: userMap["mayor@kmc.gov.np"],
      comments: {
        create: [
          { authorId: userMap["rajesh@citizen.np"], body: "Drainage and flood control in Ward 22 (Balaju) must be the #1 priority. We have lost goods worth NPR 4 lakh in last year's flood.", createdAt: new Date("2025-06-01T05:00:00Z") },
          { authorId: userMap["kristina@devtrack.np"], body: "As a Tech Girl hackathon participant, I'd love to see more digital literacy programs in government schools. The Youth Tech Bootcamp model works — let's scale it 5x.", createdAt: new Date("2025-06-01T06:30:00Z") },
          { authorId: userMap["sushil@devtrack.np"], body: "Air quality monitoring network should be expanded beyond 12 stations to all 32 wards. Children's health is at stake.", createdAt: new Date("2025-06-01T08:45:00Z") },
        ],
      },
    },
  });

  // ---------- Beta feedback ----------
  const betaFeedback = [
    { authorName: "Rajesh Maharjan", userId: userMap["rajesh@citizen.np"], category: "FEATURE", body: "Please add a 'My Ward' widget on the dashboard showing only Ward 22 projects.", rating: 5 },
    { authorName: "Sita Tamang", userId: userMap["sita@citizen.np"], category: "PRAISE", body: "Finally a place where my voice reaches the Mayor. The Ring Road discussion got a real response in 2 days!", rating: 5 },
    { authorName: "Er. Anil K.C.", userId: userMap["anil@expert.np"], category: "IDEA", body: "Add an 'Expert Verified' badge on comments approved by 3+ domain experts.", rating: 4 },
    { authorName: "Preeti Pantha", userId: userMap["preeti@devtrack.np"], category: "FEATURE", body: "Nepali language toggle is essential — most KMC citizens prefer Nepali.", rating: 5 },
    { authorName: "Anonymous Citizen", category: "BUG", body: "Filter by ward sometimes shows wrong projects when category is also selected.", rating: 3 },
    { authorName: "Sushil Bhattarai", userId: userMap["sushil@devtrack.np"], category: "IDEA", body: "Add an AI summary at the top of each project — non-technical citizens cannot read 800-word descriptions.", rating: 5 },
  ];
  for (const b of betaFeedback) {
    await db.betaFeedback.create({ data: b });
  }

  // ---------- Notifications for admin ----------
  await db.notification.create({ data: { userId: userMap["admin@devtrack.gov.np"], title: "DevTrack Beta is live", body: "Welcome to DevTrack Beta. The platform is now open to all KMC citizens.", link: "/" } });

  console.log("✅ Seeding complete.");
  console.log(`   ${Object.keys(catMap).length} categories, ${Object.keys(wardMap).length} wards, ${users.length} users, ${officials.length} officials, ${projectDefs.length} projects.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
