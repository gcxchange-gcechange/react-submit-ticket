import * as React from 'react';
import { IHttpClientOptions, AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';  
import {
  TextField,
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
  DatePicker,
  Stack
} from 'office-ui-fabric-react';
import styles from './SubmitTicket.module.scss';
import * as strings from 'SubmitTicketWebPartStrings';
import { ISubmitTicketProps } from './ISubmitTicketProps';
import { ISubmitTicketState } from './ISubmitTicketState';
import { escape } from '@microsoft/sp-lodash-subset';

// Example placeholder options
const options: IDropdownOption[] = [
  { key: 'issue', text: strings.ReasonIssue },
  { key: 'assistance', text: strings.ReasonAssistance },
  { key: 'data', text: strings.ReasonData },
  { key: 'other', text: strings.ReasonOther },
];

export default class SubmitTicket extends React.Component<ISubmitTicketProps, ISubmitTicketState> {

  constructor(props: ISubmitTicketProps, state: ISubmitTicketState) {  
    super(props);  
  
    // Initialize the state of the component  
    this.state = {  
      reasonOneVal: '',
      reasonTwoVal: '',
      ticketDescription: '',
      pageURL: '',
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
      'userText': `Page URL: ${this.state.pageURL} Description: ${this.state.ticketDescription}`,
    });
    console.log(reqBody);
    const options: IHttpClientOptions = {
      headers: reqHeaders,
      body: reqBody
    };
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
  }

  public render(): React.ReactElement<ISubmitTicketProps> {
    return (
      <div className={ styles.submitTicket }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log('A Submit function will go here');
                  this.sendTicket();
                }}
              >
                <TextField
                  label={strings.EmailLabel}
                  value={this.props.currentUser.email}
                  required
                />
                <Dropdown
                  label={strings.ReasonOneLabel}
                  options={options}
                  required
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
                  <div>
                    <TextField
                      label={ strings.PageLabel }
                      onChange={(e, o) => {
                        console.log(o);
                        this.setState({
                          pageURL: o,
                        })
                      }}
                    />
                    <TextField
                      label={strings.DescriptionLabel}
                      multiline
                      rows={3}
                      required
                      onChange={(e, o) => {
                        console.log(o);
                        this.setState({
                          ticketDescription: o,
                        })
                      }}
                    />
                  </div>
                }
                {
                  (this.state.reasonOneVal === 'assistance') &&
                  <div>
                    <TextField
                      label={ strings.PageLabel }
                      onChange={(e, o) => {
                        console.log(o);
                        this.setState({
                          pageURL: o,
                        })
                      }}
                    />
                    <TextField
                      label={strings.DescriptionLabel}
                      multiline
                      rows={3}
                      required
                      onChange={(e, o) => {
                        console.log(o);
                        this.setState({
                          ticketDescription: o,
                        })
                      }}
                    />
                  </div>
                }
                {
                  (this.state.reasonOneVal === 'data') &&
                  <div>
                    <TextField
                      label={ strings.PageLabel }
                      onChange={(e, o) => {
                        console.log(o);
                        this.setState({
                          pageURL: o,
                        })
                      }}
                    />
                    <Stack horizontal>
                      <DatePicker 
                        label="Start Date"
                      />
                      <DatePicker 
                        label="End Date"
                      />
                    </Stack>
                    <TextField
                      label="Email report to"
                    />
                    <TextField
                      label={strings.DescriptionLabel}
                      multiline
                      rows={3}
                      required
                      onChange={(e, o) => {
                        console.log(o);
                        this.setState({
                          ticketDescription: o,
                        })
                      }}
                    />
                  </div>
                }
                {
                  (this.state.reasonOneVal === 'other') &&
                  <div>
                    <TextField
                      label={ strings.PageLabel }
                      onChange={(e, o) => {
                        console.log(o);
                        this.setState({
                          pageURL: o,
                        })
                      }}
                    />
                    <TextField
                      label={strings.DescriptionLabel}
                      multiline
                      rows={3}
                      required
                      onChange={(e, o) => {
                        console.log(o);
                        this.setState({
                          ticketDescription: o,
                        })
                      }}
                    />
                  </div>
                }
                <input type="submit" value={strings.SubmitLabel} />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
