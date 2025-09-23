import type { Student, Company } from './definitions';

export const students: Student[] = [
  { id: 'S01', name: "Aarav Sharma", skills: "Python, Data Science, SQL, Machine Learning, Pandas", category: "GEN", location: "Delhi", sector: "IT", isRural: false },
  { id: 'S02', name: "Meera Iyer", skills: "Java, Spring Boot, Cloud, SQL, AWS", category: "SC", location: "Bangalore", sector: "IT", isRural: false },
  { id: 'S03', name: "Kabir Khan", skills: "Finance, Accounting, Excel, Risk Analysis, Tally", category: "GEN", location: "Mumbai", sector: "Banking", isRural: false },
  { id: 'S04', name: "Riya Devi", skills: "Agriculture, Soil Science, Remote Sensing, GIS, Crop Management", category: "ST", location: "Patna", sector: "Agriculture", isRural: true },
  { id: 'S05', name: "Dev Patel", skills: "Tourism, Communication, Marketing, Hospitality, Social Media", category: "PwD", location: "Jaipur", sector: "Travel", isRural: false },
  { id: 'S06', name: "Priya Singh", skills: "Python, SQL, Statistics, Data Visualization, Tableau", category: "GEN", location: "Bangalore", sector: "IT", isRural: false },
  { id: 'S07', name: "Rohan Das", skills: "JavaScript, React, Node.js, HTML, CSS", category: "SC", location: "Hyderabad", sector: "IT", isRural: false },
  { id: 'S08', name: "Anjali Kumari", skills: "Financial Modeling, Excel, Valuation, Investment Banking", category: "GEN", location: "Mumbai", sector: "Banking", isRural: false },
  { id: 'S09', name: "Vikram Kumar", skills: "Agronomy, Pest Control, GIS, Soil Science", category: "OBC", location: "Bhopal", sector: "Agriculture", isRural: true },
  { id: 'S10', name: "Sana Ahmed", skills: "Digital Marketing, SEO, Content Creation, Social Media", category: "GEN", location: "Delhi", sector: "Marketing", isRural: false },
];

export const companies: Company[] = [
  { id: 'C01', name: "TechNova Solutions", title: "Data Analyst Intern", req: "Python, SQL, Data Science, Statistics, Tableau", sector: "IT", location: "Bangalore", capacity: 2 },
  { id: 'C02', name: "FinSecure Bank", title: "Finance Intern", req: "Finance, Accounting, Excel, Risk Analysis, Financial Modeling", sector: "Banking", location: "Mumbai", capacity: 2 },
  { id: 'C03', name: "GreenGrow Agri", title: "Agriculture Intern", req: "Agriculture, Soil Science, GIS, Agronomy", sector: "Agriculture", location: "Patna", capacity: 1 },
];
