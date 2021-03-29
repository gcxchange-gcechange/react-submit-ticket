declare interface ISubmitTicketWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  EmailLabel: string;
  ReasonOneLabel: string;
  ReasonTwoLabel: string;
  DescriptionLabel: string;
  PageLabel: string;
  AttachLabel: string;
  DateLabel: string;
  EmailToLabel: string;
  SubmitLabel: string;
  ReasonIssue: string;
  ReasonAssistance: string;
  ReasonData: string;
  ReasonOther: string;
  MessageSuccess: string;
  MessageError: string;
  MessageButtonResubmit: string;
  LoadingSubmitTicket: string;
}

declare module 'SubmitTicketWebPartStrings' {
  const strings: ISubmitTicketWebPartStrings;
  export = strings;
}
