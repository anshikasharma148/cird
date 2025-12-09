export interface Patent {
  id: string;
  designNumber: string;
  title: string;
  description: string;
  registrationDate: string;
  issueDate: string;
  class: string;
  applicant: string;
  pdfPath: string;
  serialNumber?: string;
}

export const patents: Patent[] = [
  {
    id: "1",
    designNumber: "420940-001",
    title: "Master Troughing Idler with Parallel Hydraulic Drive",
    description: "Design registration for a master troughing idler system with parallel hydraulic drive mechanism",
    registrationDate: "22/06/2024",
    issueDate: "01/10/2024",
    class: "15-99",
    applicant: "Jaiprakash Power Ventures Limited",
    pdfPath: "/assets/patents/pdf1.pdf",
    serialNumber: "181633"
  },
  {
    id: "2",
    designNumber: "420905-001",
    title: "Inspection Robot",
    description: "Design registration for an inspection robot system",
    registrationDate: "22/06/2024",
    issueDate: "26/08/2024",
    class: "15-99",
    applicant: "Jaiprakash Power Ventures Limited",
    pdfPath: "/assets/patents/pdf2.pdf"
  },
  {
    id: "3",
    designNumber: "420961-001",
    title: "Master Troughing Idler with Bottom Mechanical Drive",
    description: "Design registration for a master troughing idler with bottom mechanical drive, horizontal gear assembly, and without support idler",
    registrationDate: "23/06/2024",
    issueDate: "13/01/2025",
    class: "15-99",
    applicant: "Jaiprakash Power Ventures Limited",
    pdfPath: "/assets/patents/pdf3.pdf",
    serialNumber: "189763"
  },
  {
    id: "4",
    designNumber: "420892-001",
    title: "Interlocking Brick",
    description: "Design registration for interlocking brick system",
    registrationDate: "22/06/2024",
    issueDate: "06/03/2025",
    class: "25-01",
    applicant: "Jaiprakash Power Ventures Limited",
    pdfPath: "/assets/patents/pdf4.pdf"
  },
  {
    id: "5",
    designNumber: "420909-001",
    title: "Seismic-Resistant Interlocking Brick",
    description: "Design registration for seismic-resistant interlocking brick system",
    registrationDate: "22/06/2024",
    issueDate: "09/08/2024",
    class: "25-01",
    applicant: "Jaiprakash Power Ventures Limited",
    pdfPath: "/assets/patents/pdf5.pdf",
    serialNumber: "177754"
  },
  {
    id: "6",
    designNumber: "420913-001",
    title: "Monumental Block with Perforations",
    description: "Design registration for monumental block with perforations",
    registrationDate: "22/06/2024",
    issueDate: "06/03/2025",
    class: "25-01",
    applicant: "Jaiprakash Power Ventures Limited",
    pdfPath: "/assets/patents/pdf6.pdf",
    serialNumber: "179587"
  },
  {
    id: "7",
    designNumber: "420974-001",
    title: "Master Troughing Idler with Vertical Hydraulic Drive",
    description: "Design registration for master troughing idler with vertical hydraulic drive without support idler",
    registrationDate: "23/06/2024",
    issueDate: "22/08/2024",
    class: "15-99",
    applicant: "Jaiprakash Power Ventures Limited",
    pdfPath: "/assets/patents/pdf7.pdf",
    serialNumber: "178554"
  },
  {
    id: "8",
    designNumber: "420930-001",
    title: "Rail-Guided Inspection Robot",
    description: "Design registration for rail-guided inspection robot system",
    registrationDate: "22/06/2024",
    issueDate: "05/08/2024",
    class: "10-05",
    applicant: "Jaiprakash Power Ventures Limited",
    pdfPath: "/assets/patents/pdf8.pdf"
  },
  {
    id: "9",
    designNumber: "420908-001",
    title: "Brick",
    description: "Design registration for brick design",
    registrationDate: "22/06/2024",
    issueDate: "06/03/2025",
    class: "25-01",
    applicant: "Jaiprakash Power Ventures Limited",
    pdfPath: "/assets/patents/pdf9.pdf"
  },
  {
    id: "10",
    designNumber: "420914-001",
    title: "Lateral Force Resistance Interlocking Brick",
    description: "Design registration for lateral force resistance interlocking brick system",
    registrationDate: "22/06/2024",
    issueDate: "01/10/2024",
    class: "25-01",
    applicant: "Jaiprakash Power Ventures Limited",
    pdfPath: "/assets/patents/pdf10.pdf"
  }
];

