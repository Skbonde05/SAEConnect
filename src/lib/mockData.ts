export type Company = {
    slug: string;
    name: string;
    tagline: string;
    logoColor: string;
    logoPath: string;
    experiences: number;
    placed: number;
    rating: number;
    tags: string[];
    category: "IT" | "Core" | "Product" | "Finance" | "Consulting" | "Startups";
};

export const companies: Company[] = [
    { slug: "tcs", name: "TCS", tagline: "Building on belief", logoColor: "#0F4C81", logoPath: "/logos/tcs.png", experiences: 428, placed: 65, rating: 3.8, tags: ["Aptitude", "Technical", "HR", "Communication"], category: "IT" },
    { slug: "infosys", name: "Infosys", tagline: "Navigate your next", logoColor: "#007CC3", logoPath: "/logos/infosys.png", experiences: 356, placed: 52, rating: 3.6, tags: ["Aptitude", "Technical", "HR", "SQL"], category: "IT" },
    { slug: "accenture", name: "Accenture", tagline: "Let there be change", logoColor: "#A100FF", logoPath: "/logos/accenture.png", experiences: 312, placed: 48, rating: 3.7, tags: ["Technical", "Coding", "HR", "System Design"], category: "IT" },
    { slug: "persistent", name: "Persistent", tagline: "See Beyond, Rise Above", logoColor: "#F97316", logoPath: "/logos/persistent.png", experiences: 198, placed: 36, rating: 3.9, tags: ["Coding", "Product", "HR", "Aptitude"], category: "Product" },
    { slug: "capgemini", name: "Capgemini", tagline: "Get the Future You Want", logoColor: "#0070AD", logoPath: "/logos/capgemini.svg", experiences: 174, placed: 28, rating: 3.5, tags: ["Aptitude", "Technical", "HR", "Communication"], category: "Consulting" },
    { slug: "wipro", name: "Wipro", tagline: "Ambitions Realized", logoColor: "#341F97", logoPath: "/logos/wipro.png", experiences: 162, placed: 31, rating: 3.6, tags: ["Technical", "Aptitude", "HR", "Coding"], category: "IT" },
    { slug: "cognizant", name: "Cognizant", tagline: "Intuition engineered", logoColor: "#0033A0", logoPath: "/logos/cognizant.png", experiences: 138, placed: 22, rating: 3.4, tags: ["Technical", "SQL", "HR", "Aptitude"], category: "IT" },
    { slug: "hcl", name: "HCL", tagline: "Supercharging Progress", logoColor: "#0072CE", logoPath: "/logos/hcl.png", experiences: 124, placed: 20, rating: 3.5, tags: ["Aptitude", "Technical", "HR", "Communication"], category: "IT" },
    { slug: "tech-mahindra", name: "Tech Mahindra", tagline: "Connected World. Connected Experiences.", logoColor: "#E4002B", logoPath: "/logos/tech-mahindra.png", experiences: 110, placed: 18, rating: 3.3, tags: ["Technical", "Networking", "HR", "Aptitude"], category: "IT" },
];

export const platformStats = {
    companies: 120,
    totalExperiences: 2500,
    contributors: 580,
    avgRating: 3.6,
};

export const topTopics = [
    { name: "SQL", mentions: 78, difficulty: "Medium" },
    { name: "OOP", mentions: 71, difficulty: "Medium" },
    { name: "DBMS", mentions: 65, difficulty: "Medium" },
    { name: "DSA", mentions: 52, difficulty: "Hard" },
    { name: "Java", mentions: 47, difficulty: "Medium" },
];