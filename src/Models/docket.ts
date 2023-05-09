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
  docketPk: string; // Id number for database
  docketId: string; //Id number to display
  docketName: string; //Description / title
  status: string; // actionStatusId
  statusColor: string; //action status color
  commentCount: number;
  invoiceCount: number;
  orderCount: number;
  noteCount: number;
  takeOffCount: number;
  startDate: TDateISODate | null; //planned start date, null if not scheduled
  endDate: TDateISODate | null; //planned end date, null if not scheduled
  commenced: TDateISO | null; //actual commenced time, null if not commenced
  completed: TDateISO | null; //actual completed time, null if not complete
  inCourt: string | null; //abCompanyId
  watching: string[]; //userIds
  assignedContractor: string | null; //abCompanyId
  assignedContractorName: string; //name of contractor
  costBudget: string | null; // Decimal number in string format,budgeted amount or null if not expense
  costActual: string | null; // Decimal number in string format,total of orders or null if not expense
  costXero: string | null;
  costRunning: string | null;
  incomeBudget: string | null; // Decimal number in string format,budgeted amount or null if not income
  incomeInvoices: string | null; // Decimal number in string format, total of invoices or null if not income
  stageModel: string | null;
  project: string | null; // projectId
  // message: string; //not used - detailed description
  // created: TDateISO; // Timestamp when created
  // modified: TDateISO; // Timestamp last modifies
  // creator: string; // UserId
  // category: string; // categoryId

  // account_tracking_id: string | null;

  // timerValue: number | null; //total seconds active, null if not started
  // timerStart: TDateISO | null; //time timer started, null if not started
  // timerEnd: TDateISO | null; //time timer ended, null if not ended
  // reminder: TDateISO | null; //time for reminder, null if not set
}

export interface IDocketStatus {
  statusId: string; // Id
  company: string; // CompanyId
  statusName: string; // eg working, draft etc
  color: string; // eg #0000ff or rgba(0, 0, 255, 1)
  index: string; // order to display in list
}

export interface INewDocket {
  docketPk: string;
  docketName: string;
  startDate: TDateISODate | null; //planned start date, null if not scheduled
  endDate: TDateISODate | null; //planned end date, null if not scheduled
  commenced: TDateISO | null; //actual commenced time, null if not commenced
  completed: TDateISO | null; //actual completed time, null if not complete
  status: string; // actionStatusId
  assignedContractor: string | null; //abCompanyId
  costActual: string | null; // Decimal number in string format,total of orders or null if not expense
  docketId: string; //Id number to display
  commentCount: number;
}

interface IGetNewDocketTemplateProps {
  docketName: string;
  startDate?: TDateISODate | null;
  endDate?: TDateISODate | null; //planned end date, null if not scheduled
  commenced?: TDateISO | null; //actual commenced time, null if not commenced
  completed?: TDateISO | null;
  status?: string; // actionStatusId
  assignedContractor?: string | null; //abCompanyId
  costActual?: string | null; // Decimal number in string format,total of orders or null if not expense
}

//###### FUNCTION RETURN NEW DOCKET TEMPLATE ####
export const getNewDocketTemplate = ({
  docketName,
  startDate,
  endDate,
  commenced,
  completed,
  status,
  assignedContractor,
  costActual,
}: IGetNewDocketTemplateProps): INewDocket => {
  return {
    docketPk: '',
    docketName: docketName,
    startDate: startDate ? startDate : null,
    endDate: endDate ? endDate : null,
    commenced: commenced ? commenced : null,
    completed: completed ? completed : null,
    status: status ? status : '',
    assignedContractor: assignedContractor ? assignedContractor : null,
    costActual: costActual ? costActual : '0',
    docketId: '',
    commentCount: 0,
  };
};
//#############################################
