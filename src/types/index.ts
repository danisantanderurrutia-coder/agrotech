export interface ProductLine {
  id: string;
  number: number;
  title: string;
  tagline: string;
  category: 'Digital Twin' | 'Risk Analysis' | 'Hardware IoT' | 'Automation & AI' | 'Export ESG' | 'BioTech & Token' | 'Education' | 'Publishing';
  businessModel: string;
  priceRange: string;
  targetAudience: string[];
  description: string;
  keyFeatures: string[];
  specs: Record<string, string>;
  impactMetric: string;
  iconName: string;
  highlightColor: string;
}

export interface PitchSlide {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  image?: string;
  badge?: string;
  content: {
    headline: string;
    points: string[];
    metrics?: { label: string; value: string; detail: string }[];
    highlightBox?: { title: string; text: string };
  };
  speakerNotes: string;
}

export interface MerchItem {
  id: string;
  name: string;
  tagline: string;
  category: 'Apparel' | 'Headwear' | 'Accessories' | 'Stationery';
  price: string;
  description: string;
  specs: string[];
  badge: string;
  imageUrl?: string;
}

export interface SocialTemplate {
  id: string;
  platform: 'TikTok' | 'Instagram Post' | 'Instagram Story' | 'LinkedIn';
  title: string;
  format: string;
  headlinePrompt: string;
  visualConcept: string;
  callToAction: string;
  captionTemplate: string;
}

export interface TeamMember {
  name: string;
  role: string;
  location: string;
  flag: string;
  avatarBg: string;
  bio: string;
  skills: string[];
  focus: string;
}

export interface GtmPhase {
  phase: string;
  timeframe: string;
  title: string;
  focus: string;
  milestones: string[];
  kpi: string;
  status: 'Immediate' | 'Upcoming' | 'Expansion';
}

export interface BomItem {
  category: string;
  component: string;
  spec: string;
  priceClp: string;
  supplier: string;
}

export interface ChefKit {
  id: string;
  title: string;
  useCase: string;
  sensors: string[];
  actuators: string[];
  deliverables: string[];
  hwPriceClp: string;
  subPriceClp: string;
  whatsappPreview: string;
  badge: string;
  imageUrl?: string;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  publisher: string;
  category: 'Mecatrónica & IoT' | 'Permacultura & Suelos' | 'Ciencia & Satélites' | 'Infantil & Educación';
  isOwnWork: boolean;
  price: string;
  format: 'Digital PDF' | 'Impreso Kraft' | 'Pack Físico + Digital';
  coverImage: string;
  description: string;
  pages: number;
  badge?: string;
}

export interface BlogComment {
  id: string;
  author: string;
  date: string;
  text: string;
  avatarUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Columna de Opinión' | 'Noticias Agtech' | 'Entrevista' | 'Tutorial de Campo';
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  coverImage: string;
  summary: string;
  content: string[];
  comments: BlogComment[];
  tags: string[];
}

export interface Course {
  id: string;
  title: string;
  type: 'Webinar Gratuito' | 'Taller Presencial' | 'Curso Online HD';
  price: string;
  duration: string;
  locationOrPlatform: string;
  coverImage: string;
  description: string;
  instructor: string;
  syllabus: string[];
  badge: string;
  dateOrAccess: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  author: string;
  date: string;
  category: 'Taller & Encuentro' | 'Organización Aliada' | 'Redes Sociales' | 'Historia de Fundo';
  text: string;
  imageUrl?: string;
  likes: number;
  partnerName?: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  priceClp: string;
  priceEur: string;
  period: string;
  description: string;
  benefits: string[];
  paymentMethods: string[];
  badge?: string;
  isPopular?: boolean;
}

export interface EdulabGameProduct {
  id: string;
  lineId: 'raices-chip' | 'guardianes-cuenca' | 'rewilding-maule';
  lineTitle: string;
  lineBadge: string;
  type: 'main' | 'subproduct';
  subproductLabel: string;
  title: string;
  tagline: string;
  ageRange: string;
  players: string;
  priceClp: string;
  description: string;
  kidFeatures: string[];
  deliverables: string[];
  imageUrl: string;
  badge: string;
}

