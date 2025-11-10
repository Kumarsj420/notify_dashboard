export interface ExposureEvent {
  profile: string;
  id: string;
  email: string;
  user: string;
  password: string;
  url: string;
  source: string;
  riskLevel: string;
  detectionDate: string;
  action: string;
}

export const EmployeeExposureData: ExposureEvent[] = [
  {
    profile:
      "https://threat.notifybreach.com/_next/image?url=https%3A%2F%2Fimages.contactout.com%2Fprofiles%2F1439a86d7e466c509ffde33bdcdd5dbf&w=128&q=75",
    id: "1",
    email: "matheley@notify.com",
    user: "user",
    password: "password",
    url: "url",
    source: "source",
    riskLevel: "high",
    detectionDate: "12 jan 2023",
    action: "actions",
  },
  {
    profile:
      "https://threat.notifybreach.com/_next/image?url=https%3A%2F%2Fimages.contactout.com%2Fprofiles%2F1439a86d7e466c509ffde33bdcdd5dbf&w=128&q=75",
    id: "2",
    email: "matheley@notify.com",
    user: "user",
    password: "password",
    url: "url",
    source: "source",
    riskLevel: "high",
    detectionDate: "12 jan 2023",
    action: "actions",
  },
  {
    profile:
      "https://threat.notifybreach.com/_next/image?url=https%3A%2F%2Fimages.contactout.com%2Fprofiles%2F1439a86d7e466c509ffde33bdcdd5dbf&w=128&q=75",
    id: "3",
    email: "matheley@notify.com",
    user: "user",
    password: "password",
    url: "url",
    source: "source",
    riskLevel: "high",
    detectionDate: "12 jan 2023",
    action: "actions",
  },
  {
    profile:
      "https://threat.notifybreach.com/_next/image?url=https%3A%2F%2Fimages.contactout.com%2Fprofiles%2F1439a86d7e466c509ffde33bdcdd5dbf&w=128&q=75",
    id: "4",
    email: "matheley@notify.com",
    user: "user",
    password: "password",
    url: "url",
    source: "source",
    riskLevel: "high",
    detectionDate: "12 jan 2023",
    action: "actions",
  },
];
