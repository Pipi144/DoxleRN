export interface TimelineActions {
  actionId: string;
  subject: string;
  startDate: string;
  endDate: string;
  commenced: string | null;
  completed: string | null;
  project?: string;
}

export type themeOptions = "light" | "dark";
export interface IProjectTimeline {
  projectId: string;
  siteAddress: string;
  actions: TimelineActions[];
  scheduleItems?: TimelineActions[];
}
export interface NewTimelineActions {
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

export type dateObj = {
  date: string;
  dateNumber: string;
};

export interface SubjectListProps {
  cellDate: dateObj;
}

export interface FooterMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FooterOpenProps {
  onOpen: () => void;
}

export interface ISimpleProjectTimeline {
  projectId: string;
  siteAddress: string;
  contractPrice: string;
  budget: string;
  startDate: string;
  endDate: string;
  projectPrefix: string;
  company: string;
  trackingId: string;
  users: any[];
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerAbn: string;
  contractDate: string;
}

export interface IActionTimelineContext {
  projects: ISimpleProjectTimeline[];
  isLoadingProject: boolean;
  isSuccessFetchingProject: boolean;
  isErrorFetchingProject: boolean;
}
