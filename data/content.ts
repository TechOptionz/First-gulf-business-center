export interface NavItem {
  name: string;
  href: string;
  description?: string;
  children?: {
    name: string;
    href: string;
    description: string;
    badge?: string;
  }[];
}

export const COMPANY_DETAILS = {
  name: "First Gulf Business Center",
  legalName: "First Gulf Business Center L.L.C",
  tagline: "Premier Executive Workspaces & Corporate Consultancy in Dubai",
  address: "2nd Floor, Madina Mall, Offices 2–20 & 2–21, Al Muhaisnah 4, Dubai, UAE",
  addressShort: "Madina Mall, Al Muhaisnah 4, Dubai",
  poBox: "234438",
  phonePrimary: "+971 52 790 0335",
  phonePrimaryTel: "+971527900335",
  phoneSecondary: "+971 4 288 8632",
  phoneSecondaryTel: "+97142888632",
  email: "office@firstgulfbusiness.ae",
  supportHours: "24/7 Days Dedicated Support",
  officeHours: "Monday – Saturday: 8:30 AM – 7:30 PM (24/7 Access for Tenants)",
  mapCoordinates: {
    lat: 25.282119,
    lng: 55.3982757,
  },
  mapUrl: "https://www.google.com/maps/place/First+Gulf+Business+Center+L.L.C/@25.282119,55.3982757,15z/data=!4m6!3m5!1s0x3e5f5d8bf589793d:0xa36d2b6714157480!8m2!3d25.282119!4d55.3982757!16s%2Fg%2F11q4c_tpck?entry=ttu",
  socials: {
    facebook: "https://www.facebook.com/firstgulfbusinesscenter",
    instagram: "https://www.instagram.com/firstgulfbusinesscenter",
    linkedin: "https://www.linkedin.com/company/first-gulf-business-center/",
    tiktok: "https://www.tiktok.com/@firstgulfbusinesscenter",
    whatsapp: "https://wa.me/971527900335?text=Hello%20First%20Gulf%20Business%20Center%2C%20I%20would%20like%20to%20inquire%20about%20your%20office%20spaces.",
  },
};

export const NAVIGATION_LINKS: NavItem[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About Us",
    href: "/about",
  },
  {
    name: "Office Space",
    href: "/office-space",
    children: [
      {
        name: "Coworking Space",
        href: "/office-space/coworking",
        description: "Flexible hot desks & dedicated workstations on hourly, daily, or monthly terms.",
        badge: "Flexible",
      },
      {
        name: "Virtual Office (EJARI / Estidama)",
        href: "/office-space/virtual-office",
        description: "Official DED & RERA compliant business address for licensing & visa renewal.",
        badge: "Certified",
      },
      {
        name: "Office Spaces for Freezone",
        href: "/office-space/freezone",
        description: "Fully furnished executive serviced offices tailored for Dubai free zone entities.",
        badge: "100% Ownership",
      },
    ],
  },
  {
    name: "Business Consultancy",
    href: "/business-consultancy",
    children: [
      {
        name: "Business Setup & PRO Services",
        href: "/business-consultancy/business-setup-pro",
        description: "Mainland, Free Zone, and Offshore company formation with complete government clearance.",
        badge: "Fast Track",
      },
      {
        name: "Corporate Solutions",
        href: "/business-consultancy/corporate-solutions",
        description: "Comprehensive office management, 24/7 IT support, and administration packages.",
      },
      {
        name: "Trademark Registration",
        href: "/business-consultancy/trademark-registration",
        description: "Protect your brand identity and intellectual property across the UAE and GCC.",
      },
    ],
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
];

export const WORKSPACE_SERVICES = [
  {
    id: "coworking",
    title: "Coworking Space",
    tagline: "Productive, Flexible & Community-Driven Workspaces",
    shortDesc: "Cost-controlled, amenity-laden shared office environments designed for freelancers, remote teams, and growing startups in Dubai.",
    href: "/office-space/coworking",
    image: "/images/coworking-desk.webp",
    features: [
      "Hourly, daily, weekly & monthly flexible terms",
      "Choice of open Hot Desks or Reserved Dedicated Desks",
      "High-speed fiber internet with backup redundant line",
      "Free access to the Tenant Leisure Lounge & Pool Table",
      "Unlimited premium coffee, tea & filtered water",
      "Receptionist greeting & mail management included",
    ],
    pricingNote: "Starting with flexible daily & monthly plans",
    idealFor: "Freelancers, digital nomads, remote workers, and agile project teams",
  },
  {
    id: "virtual-office",
    title: "Virtual Office (EJARI / Estidama)",
    tagline: "Government-Approved Business Address & Legal Compliance",
    shortDesc: "RERA-certified EJARI and DED Estidama sustainable lease agreements ensuring quick trade license issuance and employee visa processing.",
    href: "/office-space/virtual-office",
    image: "/images/virtual-office.webp",
    features: [
      "Official EJARI registration certificate for DED licensing",
      "Estidama sustainable virtual lease compliance",
      "Prestigious Madina Mall corporate business address",
      "Dedicated telephone answering & call forwarding",
      "Mail & courier handling with digital notifications",
      "Monthly complimentary meeting room access hours",
    ],
    pricingNote: "Annual compliance packages with instant certificate issuance",
    idealFor: "International firms, startups, consultants, and companies renewing UAE licenses",
  },
  {
    id: "freezone",
    title: "Office Spaces for Freezone",
    tagline: "Move-In Ready Serviced Executive Suites",
    shortDesc: "Fully furnished private offices providing 100% foreign ownership, tax benefits, zero trade barriers, and state-of-the-art tech infrastructure.",
    href: "/office-space/freezone",
    image: "/images/freezone-office.webp",
    features: [
      "100% foreign company ownership & 0% personal tax environment",
      "Ready-to-occupy fully furnished executive offices",
      "Individual air conditioning temperature controls",
      "High-security electronic smart locks & 24/7 CCTV",
      "Dedicated server room rack space & IT assistance",
      "Covered parking space allocation for tenants & visitors",
    ],
    pricingNote: "Tailored private office suites from 1 to 20+ workstations",
    idealFor: "Freezone corporations, expanding enterprises, and regional branch offices",
  },
];

export const CONSULTANCY_SERVICES = [
  {
    id: "business-setup-pro",
    title: "Business Setup & PRO Services",
    tagline: "End-to-End UAE Company Formation & Government Relations",
    shortDesc: "Navigating UAE business regulations with zero hassle. We handle Mainland DED licensing, Free Zone jurisdictions, Offshore entities, and ministerial PRO clearances.",
    href: "/business-consultancy/business-setup-pro",
    image: "/images/business-setup.webp",
    offerings: [
      "Renewal & registration of commercial, professional & industrial trade licenses",
      "Investor, partner & employee visa applications, medical, Emirates ID & cancellations",
      "Certified legal document translation in Arabic and English",
      "Government ministry clearance (MoHRE, GDRFA, Dubai Municipality, Civil Defense)",
      "Establishment Card & Immigration Card issuance",
      "Document attestation with Ministry of Foreign Affairs (MOFA)",
      "Mandatory Corporate Health Insurance processing",
    ],
  },
  {
    id: "corporate-solutions",
    title: "Corporate Solutions",
    tagline: "Holistic Office Administration & Enterprise IT Management",
    shortDesc: "Tailored management and operational support packages that keep your Dubai business running efficiently 24 hours a day, 7 days a week.",
    href: "/business-consultancy/corporate-solutions",
    image: "/images/corporate-solutions.webp",
    offerings: [
      "Customizable office administration & facility management",
      "24/7 on-site & remote IT troubleshooting and infrastructure support",
      "Secretarial, front-desk concierge & telephone switchboard operations",
      "Accounting, bookkeeping & VAT filing coordination",
      "Meeting room AV technology setup and hybrid conference support",
      "Local corporate sponsorship advisory & PRO retained retainers",
    ],
  },
  {
    id: "trademark-registration",
    title: "Trademark Registration",
    tagline: "Intellectual Property Protection & Brand Security Across the UAE",
    shortDesc: "Safeguard your brand name, logo, slogans, and intellectual property against counterfeiting and unauthorized commercial exploitation in the Middle East.",
    href: "/business-consultancy/trademark-registration",
    image: "/images/trademark.webp",
    offerings: [
      "Comprehensive pre-filing UAE trademark search & conflict analysis",
      "Preparation & submission of Ministry of Economy (MoE) IP applications",
      "Official trademark journal publication & gazette monitoring",
      "Handling official examiner queries and opposition proceedings",
      "Final Trademark Registration Certificate acquisition",
      "10-year trademark renewal monitoring and maintenance filings",
    ],
  },
];

export const FACILITIES = [
  {
    id: "ac",
    title: "Central Air Conditioning",
    description: "Climate-controlled work areas with individual zone controls for supreme comfort year-round.",
    icon: "Wind",
  },
  {
    id: "admin",
    title: "Administrative Support",
    description: "Multilingual front desk receptionists, secretarial assistance, document printing, and scanning.",
    icon: "Users",
  },
  {
    id: "kitchen",
    title: "Equipped Kitchen & Coffee Bar",
    description: "Complimentary bean-to-cup artisan espresso, gourmet teas, microwaves, and cold filtered water.",
    icon: "Coffee",
  },
  {
    id: "security",
    title: "24/7 CCTV & Smart Security",
    description: "Round-the-clock high-definition surveillance and biometric/keycard access control.",
    icon: "ShieldCheck",
  },
  {
    id: "power",
    title: "100% Uninterrupted Power",
    description: "Dual backup power generators and redundant UPS systems ensuring zero workflow disruption.",
    icon: "Zap",
  },
  {
    id: "parking",
    title: "Dedicated Parking Spaces",
    description: "Direct mall covered parking bays for tenants, executive clients, and visiting guests.",
    icon: "Car",
  },
  {
    id: "internet",
    title: "High-Speed Fiber Connectivity",
    description: "Enterprise tier dual-redundant high-speed Wi-Fi and hardwired Gigabit Ethernet ports.",
    icon: "Wifi",
  },
  {
    id: "lounge",
    title: "Exclusive Wellbeing & Pool Lounge",
    description: "Dubai's signature leisure breakout space featuring a full-size pool table, plush bean bags, and relaxation sofas.",
    icon: "Sparkles",
    highlight: true,
  },
  {
    id: "meeting",
    title: "High-Tech Meeting Suites",
    description: "Conference rooms equipped with 4K display monitors, video conference hardware, and presentation tools.",
    icon: "Presentation",
  },
  {
    id: "cleaning",
    title: "Daily Housekeeping & Sanitization",
    description: "Spotless daily workspace cleaning, continuous trash clearing, and immaculate washrooms.",
    icon: "Sparkle",
  },
];

export const TESTIMONIALS = [
  {
    name: "Muhammed Kk",
    role: "Managing Director, Tech Consult FZE",
    review: "Great ambiance and high-speed internet. Ideal for remote work and high-level client meetings. The management staff is exceptionally friendly, prompt, and helpful. Definitely recommend First Gulf to anyone setting up in Dubai.",
    rating: 5,
    verified: true,
  },
  {
    name: "Noushad Ellikkal",
    role: "Founder & CEO, Global Logistics FZC",
    review: "Excellent ambiance, highly supportive management team, and a strategic location inside Madina Mall with convenient covered parking. Perfect business center in Dubai for hassle-free corporate expansion.",
    rating: 5,
    verified: true,
  },
  {
    name: "Tippu VH",
    role: "Commercial Partner, Vantage Commercial Brokerage",
    review: "Professional business setup and office space solutions in Dubai. Their prompt customer service and EJARI support made establishing our new corporate branch completely effortless. Outstanding experience.",
    rating: 5,
    verified: true,
  },
  {
    name: "Ahmed Al Mansoori",
    role: "General Manager, Al Mansoori Capital",
    review: "First Gulf provided us with a seamless Freezone transition. The move-in ready executive office suites and well-equipped boardroom facilities exceeded our standards for executive privacy and prestige.",
    rating: 5,
    verified: true,
  },
  {
    name: "Sarah Jenkins",
    role: "Creative Director, Studio Seven Media",
    review: "The tenant lounge with the pool table, comfortable bean bags, and fresh espresso is an absolute game changer for our creative team between intensive work sprints. Truly a modern workspace built for people.",
    rating: 5,
    verified: true,
  },
];

export const FAQS = [
  {
    question: "What is an EJARI certificate, and is it provided with your virtual and private offices?",
    answer: "Yes. EJARI is the official online registration system mandated by the Dubai Real Estate Regulatory Agency (RERA) to authenticate tenancy contracts. Every virtual office and private serviced office lease with First Gulf Business Center comes with authentic, government-certified documentation (including Estidama contracts) required by the Dubai Department of Economy and Tourism (DED) for trade license issuance and renewal.",
    category: "Legal & Compliance",
  },
  {
    question: "What is Estidama and how does it relate to Dubai business licensing?",
    answer: "Estidama is a DED-approved sustainable virtual office program allowing entrepreneurs to secure a certified corporate address in Dubai with minimal overhead. It fulfills the legal physical address requirement for company registration and employee quota sponsorship without leasing massive square footage.",
    category: "Legal & Compliance",
  },
  {
    question: "Can I use First Gulf Business Center's address as my registered company address?",
    answer: "Absolutely. When you subscribe to our Virtual Office or Serviced Office packages, you are legally entitled to display '2nd Floor, Madina Mall, Offices 2–20 & 2–21, Al Muhaisnah 4, Dubai, UAE' on your official trade license, invoices, website, corporate letterheads, and business cards.",
    category: "Office Space",
  },
  {
    question: "What amenities are included with a Coworking Space membership?",
    answer: "Coworking members enjoy high-speed fiber internet, central air conditioning, ergonomic workstations, incoming reception services, mail handling, full access to our pantry (complimentary bean-to-cup coffee and tea), and free access to our signature tenant wellbeing lounge featuring a pool table and bean bag relaxation zones.",
    category: "Amenities",
  },
  {
    question: "How fast can I move into a private serviced office?",
    answer: "Our serviced offices are completely move-in ready. Once the standard tenancy agreement is executed and identification documents are verified, you can move in within the same business day with functional high-speed internet, telephone routing, and furnishings pre-configured.",
    category: "Office Space",
  },
  {
    question: "Do you assist with UAE visas and bank account opening?",
    answer: "Yes. Our in-house Business Setup & PRO Services team assists clients through every phase of investor, partner, and employee visa applications (including medical examinations, Emirates ID biometrics, and visa stamping) as well as coordinating corporate bank account introductions with leading UAE financial institutions.",
    category: "Business Consultancy",
  },
  {
    question: "Is parking available for tenants and visiting clients?",
    answer: "Yes. Madina Mall features extensive covered parking directly connected to the 2nd-floor office elevators, making access effortless and comfortable in all weather conditions for you and your guests.",
    category: "Amenities",
  },
  {
    question: "How do I book a tour of the facility?",
    answer: "You can schedule a tour directly through our website via the 'Book a Tour' page, or contact our concierge directly at +971 52 790 0335 or office@firstgulfbusiness.ae. We are delighted to welcome you for a walk-through from Monday to Saturday.",
    category: "General",
  },
];
