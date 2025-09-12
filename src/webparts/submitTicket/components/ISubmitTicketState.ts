export interface ISubmitTicketState {
  reasonOneVal: {key: string, text: string};
  reasonTwoVal: {key: string, text: string};
  ticketDescription: string;
  startDate: string;
  endDate: string;
  emailTo: string;
  pageURL: string;
  attachImage: undefined | File;
  displayMessage: string;
  isLoading: boolean;
}