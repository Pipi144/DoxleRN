export interface TimelineDocket {
  actionId: string;
  subject: string;
  startDate: string;
  endDate: string;
  commenced: string | null;
  completed: string | null;
  project?: string;
  actionIdStr: string;
  assignedContractor?: string;
  status: string;
  costOrders?: number;
}

export type themeOptions = 'light' | 'dark';
export interface IProjectTimeline {
  projectId: string;
  siteAddress: string;
  actions: TimelineDocket[];
  scheduleItems?: TimelineDocket[];
}
export interface NewTimelineDocket {
  actionId: string;
  subject: string;
  startDate: string;
  endDate: string;
  company: string;
  project?: string;
  actionIdStr: string;
  status: string;
  message?: string;
}
