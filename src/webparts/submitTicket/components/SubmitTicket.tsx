import * as React from 'react';
import { IHttpClientOptions, AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';  
import {
  TextField,
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption
} from 'office-ui-fabric-react';
import styles from './SubmitTicket.module.scss';
import { ISubmitTicketProps } from './ISubmitTicketProps';
import { ISubmitTicketState } from './ISubmitTicketState';
import { escape } from '@microsoft/sp-lodash-subset';

// Example placeholder options
const options: IDropdownOption[] = [
  { key: 'issue', text: 'I am experiencing an issue on gcxchange' },
  { key: 'assistance', text: 'I need assistance using gcxchange' },
  { key: 'data', text: 'I would like to request statistics on my page' },
  { key: 'other', text: 'Other' },
];

// Example placeholder options
const issuesOptions: IDropdownOption[] =[
  { key: 'reason1', text: 'Issues Reason 1 Placeholder'},
  { key: 'reason2', text: 'Issues Reason 2 Placeholder'},
  { key: 'reason3', text: 'Issues Reason 3 Placeholder'},
];

const assistanceOptions: IDropdownOption[] =[
  { key: 'reason1', text: 'Assistance Reason 1 Placeholder'},
  { key: 'reason2', text: 'Assistance Reason 2 Placeholder'},
  { key: 'reason3', text: 'Assistance Reason 3 Placeholder'},
];

const dataOptions: IDropdownOption[] =[
  { key: 'reason1', text: 'Data Reason 1 Placeholder'},
  { key: 'reason2', text: 'Data Reason 2 Placeholder'},
  { key: 'reason3', text: 'Data Reason 3 Placeholder'},
];

export default class SubmitTicket extends React.Component<ISubmitTicketProps, ISubmitTicketState> {

  constructor(props: ISubmitTicketProps, state: ISubmitTicketState) {  
    super(props);  
  
    // Initialize the state of the component  
    this.state = {  
      reasonOneVal: '',
      reasonTwoVal: '',
      ticketDescription: ''
    };  
  }

  private sendTicket(): void {
    console.log('sending the ticket!');
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-type', 'application/json');
    const reqBody: string = JSON.stringify({
      'userName': this.props.currentUser.displayName,
      'userEmail': this.props.currentUser.email,
      'options': this.state.reasonOneVal,
      'userText': this.state.ticketDescription
    });
    console.log(reqBody);
    const options: IHttpClientOptions = {
      headers: reqHeaders,
      body: reqBody
    };
    /*
    this.props.context.aadHttpClientFactory
      // Add Client
      .getClient('')
      .then((client: AadHttpClient): void => {
        client
          // Add URL
          .post('', AadHttpClient.configurations.v1, options)
          .then((response: HttpClientResponse) => {
            console.log(response);
            return response.json();
          })
      });
      */
  }

  public render(): React.ReactElement<ISubmitTicketProps> {
    return (
      <div className={ styles.submitTicket }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              Current Logged in User Info:
              <p>{escape(this.props.currentUser.displayName)}</p>
              <p>{escape(this.props.currentUser.email)}</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log('A Submit function will go here');
                  this.sendTicket();
                }}
              >
                <TextField
                  label="Email"
                  value={this.props.currentUser.email}
                />
                <Dropdown
                  label="REASON 1 FOR TICKET"
                  options={options}
                  onChange={(e, o) => {
                    console.log(e.target);
                    console.log(o.key);
                    this.setState({
                      reasonOneVal: o.key,
                      reasonTwoVal: '',
                      ticketDescription: ''
                    })
                  }}
                />
                {
                  (this.state.reasonOneVal === 'issue') &&
                  <Dropdown
                    label="Reasons for issues"
                    options={issuesOptions}
                    onChange={(e, o) => {
                      this.setState({
                        reasonTwoVal: o.key
                      })
                      console.log(o.key);
                    }}
                  />
                }
                {
                  (this.state.reasonOneVal === 'assistance') &&
                  <Dropdown
                    label="reasons for assistance"
                    options={assistanceOptions}
                    onChange={(e, o) => {
                      this.setState({
                        reasonTwoVal: o.key
                      })
                      console.log(o.key);
                    }}
                  />
                }
                {
                  (this.state.reasonOneVal === 'data') &&
                  <Dropdown
                    label="reasons for data"
                    options={dataOptions}
                    onChange={(e, o) => {
                      this.setState({
                        reasonTwoVal: o.key
                      })
                      console.log(o.key);
                    }}
                  />
                }
                {
                  (this.state.reasonOneVal === 'other') &&
                  <TextField
                    label="Description"
                    multiline
                    rows={3}
                    onChange={(e, o) => {
                      console.log(o);
                      this.setState({
                        ticketDescription: o,
                      })
                    }}
                  />
                }
                {
                  (this.state.reasonTwoVal) &&
                  <TextField
                    label="Description"
                    multiline
                    rows={3}
                    onChange={(e, o) => {
                      console.log(o);
                      this.setState({
                        ticketDescription: o,
                      })
                    }}
                  />
                }
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
