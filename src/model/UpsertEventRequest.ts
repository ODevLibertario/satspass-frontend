export class UpsertEventRequest {
  name: string;
  startDate: Date; // Use Date for Instant equivalent in TypeScript
  endDate: Date;
  startTime: Date;
  endTime: Date;
  description?: string; // Optional fields with `?`
  location?: string;
  publicityImageUrl?: string;

  constructor(name: string, startDate: Date, endDate: Date, startTime: Date, endTime: Date, description: string, location: string, publicityImageUrl: string) {
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.description = description;
    this.location = location;
    this.publicityImageUrl = publicityImageUrl;
  }
}
