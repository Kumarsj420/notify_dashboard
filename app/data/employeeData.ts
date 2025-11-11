export interface ExposureEvent {
  profile: string;
  id: string;
  name: string;
  designation: string;
  description: string;
  location: string;

}

export const employeeData: ExposureEvent[] = [
  {
    profile: "https://threat.notifybreach.com/_next/image?url=https%3A%2F%2Fimages.contactout.com%2Fprofiles%2F64393d8111141144938578773a86585e&w=128&q=75",
    id: "1",
    name: 'Kartik',
    designation: 'CEO',
    description: 'Helping businesses prevent cyber and network threats',
    location: "New York, USA",
  },
  {
    profile: "https://threat.notifybreach.com/_next/image?url=https%3A%2F%2Fimages.contactout.com%2Fprofiles%2F64393d8111141144938578773a86585e&w=128&q=75",
    id: "2",
    name: 'Kartik',
    designation: 'CEO',
    description: 'Helping businesses prevent cyber and network threats',
    location: "New York, USA",
  }
];
