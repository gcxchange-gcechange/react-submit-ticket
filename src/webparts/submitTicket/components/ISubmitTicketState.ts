export interface ISubmitTicketState {
  reasonOneVal: {key: string, text: string};
  reasonTwoVal: {key: string, text: string};
  ticketDescription: string |undefined ;
  startDate: string;
  endDate: string;
  emailTo: string | undefined;
  pageURL: string | undefined;
  attachImage: undefined | File;
  displayMessage: string;
  isLoading: boolean;
}