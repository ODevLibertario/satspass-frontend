export class Event {
  id: string;
  managerId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  description?: string;
  location?: string;
  publicityImageUrl?: string;
  eventStatus: EventStatus;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    managerId: string,
    name: string,
    startDate: Date,
    endDate: Date,
    startTime: Date,
    endTime: Date,
    eventStatus: EventStatus,
    description?: string,
    location?: string,
    publicityImageUrl?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.managerId = managerId;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.eventStatus = eventStatus;
    this.description = description;
    this.location = location;
    this.publicityImageUrl = publicityImageUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

enum EventStatus {
  SCHEDULED,
  ONGOING,
  COMPLETED,
  CANCELLED,
}
