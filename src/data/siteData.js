import {
  PiBriefcase,
  PiBuildings,
  PiChampagne,
  PiHandshake,
  PiBed,
  PiUsersThree,
  PiDiamond,
  PiUserGear,
} from "react-icons/pi";

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "About", path: "/about" },
  { label: "Venues", path: "/venues" },
  { label: "Quote Builder", path: "/quote-builder" },
  { label: "Contact", path: "/contact" },
];

export const heroSlides = [
  {
    title: "Corporate Hospitality & High-Impact Events",
    text: "From global summits and AGMs to executive leadership retreats, Plan My Hospitality pairs strategic venue intelligence with polished production.",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=85",
  },
  {
    title: "Elite Venues, Seamless Corporate Protocol",
    text: "Curated destination spaces, executive logistics, delegate hosting, and premium dinner experiences managed with absolute precision.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=85",
  },
  {
    title: "Corporate Offsites with Measurable Success",
    text: "Product reveals, annual stakeholder days, and team-building events engineered to motivate, connect, and perform seamlessly.",
    image:
      "https://images.unsplash.com/photo-1529310399831-ed472b81d589?auto=format&fit=crop&w=1800&q=85",
  },
];

export const stats = [
  { value: "1,200+", label: "Corporate Projects" },
  { value: "85", label: "Fortune 500 Clients" },
  { value: "45", label: "Global Destinations" },
  { value: "99.2%", label: "SLA Adherence" },
];

export const services = [
  {
    title: "Conferences & Summits",
    category: "Corporate",
    icon: PiBriefcase,
    text: "Large-scale industry summits, tech conferences, and annual general meetings planned end to end.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Executive Retreats",
    category: "Retreats",
    icon: PiBed,
    text: "Bespoke leadership retreats, strategic planning meets, and VIP accommodation services.",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Venue Procurement",
    category: "Venues",
    icon: PiBuildings,
    text: "A curated global network of corporate centers, five-star resorts, and unique boardrooms.",
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "VIP & Delegate Logistics",
    category: "Logistics",
    icon: PiUserGear,
    text: "End-to-end guest travel logistics, private transfers, multi-lingual reception, and concierge.",
    image: "https://images.unsplash.com/photo-1758272134082-f7078f04fdbb?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Team Alignment Programs",
    category: "Retreats",
    icon: PiUsersThree,
    text: "Facilitated offsites, gamified team-building exercises, and wellness workshops.",
    image: "https://images.unsplash.com/photo-1529310399831-ed472b81d589?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Galas & Awards Nights",
    category: "Celebrations",
    icon: PiDiamond,
    text: "Employee recognition ceremonies, stakeholder galas, and themed anniversary dinners.",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Product & Brand Launches",
    category: "Corporate",
    icon: PiHandshake,
    text: "Experiential product reveals, press conferences, and digital media activation zones.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "B2B Exhibitions",
    category: "Corporate",
    icon: PiChampagne,
    text: "Custom stall design, high-footfall zone planning, security clearances, and on-site setup.",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
  },
];

export const galleryImages = [
  {
    title: "Global Tech Summit Keynote",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Executive Roundtable Session",
    category: "Retreats",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Annual Corporate Gala Dinner",
    category: "Celebrations",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "B2B Innovation Pavilion",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Scenic Leadership Lodge",
    category: "Retreats",
    image: "https://images.unsplash.com/photo-1529310399831-ed472b81d589?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "VIP Networking Cocktail",
    category: "Celebrations",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "AI Launch Exhibition Hall",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Milestone Anniversary Event",
    category: "Celebrations",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=900&q=80",
  },
];

export const venues = [
  {
    id: "grand-ballroom",
    name: "The Grand Ballroom",
    city: "Delhi NCR",
    guests: "800",
    type: "Luxury Banquet",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "meridian-convention-center",
    name: "Meridian Convention Center",
    city: "Mumbai",
    guests: "450",
    type: "Convention Hall",
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "solstice-retreat-spa",
    name: "The Solstice Retreat & Spa",
    city: "Goa",
    guests: "300",
    type: "Executive Beach Resort",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ivory-expo-center",
    name: "Ivory Expo Center",
    city: "Bengaluru",
    guests: "1200",
    type: "Exhibition Hall",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "casa-verde-corporate-garden",
    name: "Casa Verde Corporate Garden",
    city: "Jaipur",
    guests: "220",
    type: "Premium Lounge",
    image: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "skyline-executive-pavilion",
    name: "Skyline Executive Pavilion",
    city: "Pune",
    guests: "180",
    type: "Rooftop Lounge",
    image: "https://images.unsplash.com/photo-1758272134082-f7078f04fdbb?auto=format&fit=crop&w=900&q=80",
  },
];

export const testimonials = [
  {
    name: "Rhea Malhotra",
    role: "Marketing Director, Novus Corp",
    quote: "Plan My Hospitality brought executive strategy, absolute calm, and flawless operational design to our multi-city brand activation launch.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    video: null,
    rating: 5,
  },
  {
    name: "Arjun Mehta",
    role: "COO, Meridian Foods Group",
    quote: "Our annual stakeholder meeting was elegant, secure, and run to the minute. They understand the nuances of corporate protocols.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    video: null,
    rating: 5,
  },
  {
    name: "Naina Kapoor",
    role: "VP of People, Finora Tech",
    quote: "The Goa leadership retreat had the perfect mix of strategic alignment and high-end hospitality. Logistics were entirely invisible.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    video: null,
    rating: 4.5,
  },
  {
    name: "Kabir Sethi",
    role: "VP Operations, Vantage Global",
    quote: "From premium venue sourcing to VIP guest logistics, they were fast, responsive, and completely aligned with our compliance standards.",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80",
    video: null,
    rating: 5,
  },
  {
    name: "Divya Reddy",
    role: "Head of Events, Cascade Pharma",
    quote: "Their team ran a 400-delegate product launch without a single hiccup. Every vendor, badge, and timing cue was accounted for in advance.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    video: null,
    rating: 5,
  },
  {
    name: "Vikram Chauhan",
    role: "Director of Admin, Solstice Bank",
    quote: "We've used them for three consecutive AGMs. Consistent quality, transparent billing, and they anticipate compliance needs before we raise them.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    video: null,
    rating: 4.5,
  },
];

export const portfolio = [
  {
    title: "Sapphire Annual General Meeting",
    tag: "Corporate",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Global Partners Executive Weekend",
    tag: "Retreat",
    image: "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Nova Product Reveal Launch",
    tag: "Launch",
    image: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&w=900&q=80",
  },
];

export const partners = [
  "Hilton",
  "Taj Hotels",
  "Hyatt",
  "Marriott International",
  "Radisson",
  "Accor",
  "ITC Hotels",
  "Lemon Tree",
  "Novotel",
  "Westin",
];