import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ISubmitTicketProps {
  description: string;
  currentUser: any;
  context: WebPartContext;
  prefLang: string;
  updateWebPart: ()=>void;

}
