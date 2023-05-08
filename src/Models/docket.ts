//$$$$$$$$$$$$$$$$$$$$$$$$$$ NEW DOCKET $$$$$$$$$$$$$$$$$$$$$$$$$
type TYear = `${number}${number}${number}${number}`;
type TMonth = `${number}${number}`;
type TDay = `${number}${number}`;
type THours = `${number}${number}`;
type TMinutes = `${number}${number}`;
type TSeconds = `${number}${number}`;
type TMilliseconds = `${number}${number}${number}`;
type TDateISODate = `${TYear}-${TMonth}-${TDay}`;
type TDateISOTime = `${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}`;
export type TDateISO = `${TDateISODate}T${TDateISOTime}Z`;
export interface IDocket {
  actionId: string; // Id number for database
  actionIdStr: string; //Id number to display
  subject: string; //Description / title
  // message: string; //not used - detailed description
  created: TDateISO; // Timestamp when created
  modified: TDateISO; // Timestamp last modifies
  creator: string; // UserId
  isTask: boolean;
  isPermit: boolean;
  isExpense: boolean;
  isIncome: boolean;
  isVariation: boolean;
  isSticky: boolean;
  isPrivate: boolean;
  isArchived: boolean;
  category: string; // categoryId
  project: string; // projectId
  status: string; // actionStatusId
  statusColor: string; //action status color
  costBudget: string | null; // Decimal number in string format,budgeted amount or null if not expense
  costOrders: string | null; // Decimal number in string format,total of orders or null if not expense
  incomeBudget: string | null; // Decimal number in string format,budgeted amount or null if not income
  incomeInvoices: string | null; // Decimal number in string format, total of invoices or null if not income
  account_tracking_id: string | null;
  startDate: TDateISODate | null; //planned start date, null if not scheduled
  endDate: TDateISODate | null; //planned end date, null if not scheduled
  commenced: TDateISO | null; //actual commenced time, null if not commenced
  completed: TDateISO | null; //actual completed time, null if not complete
  timerValue: number | null; //total seconds active, null if not started
  timerStart: TDateISO | null; //time timer started, null if not started
  timerEnd: TDateISO | null; //time timer ended, null if not ended
  reminder: TDateISO | null; //time for reminder, null if not set
  inCourt: string | null; //abCompanyId
  watching: string[]; //userIds
  assignedContractor: string | null; //abCompanyId
}

export interface IDocketStatus {
  statusId: string; // Id
  company: string; // CompanyId
  statusName: string; // eg working, draft etc
  color: string; // eg #0000ff or rgba(0, 0, 255, 1)
  index: string; // order to display in list
}
