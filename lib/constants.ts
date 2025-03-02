import { format } from "date-fns";

export const BARANGAY: string[] = [
  "Amsipit",
  "Bales",
  "Colon",
  "Daliao",
  "Kabatiol",
  "Kablacan",
  "Kamanga",
  "Kanalo",
  "Lumasal",
  "Lumatil",
  "Malbang",
  "Nomoh",
  "Pananag",
  "Poblacion (Maasim)",
  "Seven Hills",
  "Tinoto",
];
export const TYPE_OF_OCCUPANCY: string[] = [
  "Business Occupancy",
  "Day Care",
  "Detention and Correctional Occupancy",
  "Educational Occupancy",
  "Gasoline Service Station",
  "Health Care Occupancy",
  "Industrial Occupancy",
  "Mercantile Occupancy",
  "Miscellaneous Occupancy",
  "Place of Assembly Occupancy",
  "Residential Occupancy",
  "Single and Two Family Dwellings",
  "N/A",
  "Others",
];
export const TYPE_OF_BUILDING: string[] = [
  "Public Building",
  "Business Building",
  "Hospital",
  "High Rise",
  "Schools",
  "Assembly",
  "N/A",
  "Others",
];

export const NATURE_OF_BUSINESS: string[] = [
  "RESIDENTIAL",
  "COMMERCIAL",
  "N/A",
  "Others",
];

export const lastIssuanceOptions: string[] = [
  "Unknown",
  "Notice of Disapproval (occupancy permit)",
  "Abatement Order",
  "Fire Safety Evaluation Clearance",
  "Fire Safety Inspection Certificate (Business Permit) - New",
  "Stoppage of Operation",
  "Notice of Disapproval (FSEC)",
  "Notice To Comply",
  "Fire Safety Inspection Certificate (Business Permit) - Renewal",
];
export function getCurrentMonthAndDay(data: Date | undefined) {
  const getDate = data || new Date();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return {
    month: monthNames[getDate.getMonth()],
    day: getDate.getDate().toString(),
  };
}

export function getPHtime(dayProps: string | Date = new Date()): string {
  const timeZone = "Asia/Manila";

  const date = typeof dayProps === "string" ? new Date(dayProps) : dayProps;

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  const philippinesTime = new Date(date.toLocaleString("en-US", { timeZone }));

  return format(philippinesTime, "yyyy-MM-dd");
}
