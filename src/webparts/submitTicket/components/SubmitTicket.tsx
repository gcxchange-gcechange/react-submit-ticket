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
      startDate: '',
      endDate: '',
      pageURL: '',
      emailTo: '',
      attachImage: null,
    };  
  }

  private sendTicket(): void {
    let formatText;
    if(this.state.reasonOneVal === 'data') {
      formatText = `Page URL: ${this.state.pageURL} Start Date: ${this.state.startDate} End Date: ${this.state.endDate} Description: ${this.state.ticketDescription} Email To: ${this.state.emailTo}`
    } else {
      formatText = `Page URL: ${this.state.pageURL} Description: ${this.state.ticketDescription}`
    }
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-type', 'application/json');
    const reqBody: string = JSON.stringify({
      'userName': this.props.currentUser.displayName,
      'userEmail': this.props.currentUser.email,
      'options': this.state.reasonOneVal,
      'userText': formatText,
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
                        this.setState({
                          ticketDescription: o,
                        })
                      }}
                    />
                    <div>
                      <label htmlFor="issueFile">
                        { strings.AttachLabel }
                      </label>
                      <input
                        type="file"
                        id="issueFile"
                        onChange={({ target }) => {
                          this.setState({
                            attachImage: target.files[0],
                          });
                        }}
                      />   
                    </div>
                  </div>
                }
                {
                  (this.state.reasonOneVal === 'assistance') &&
                  <div>
                    <TextField
                      label={ strings.PageLabel }
                      onChange={(e, o) => {
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
                        this.setState({
                          ticketDescription: o,
                        })
                      }}
                    />
                    <div>
                      <label htmlFor="assistFile">
                        { strings.AttachLabel }
                      </label>
                      <input
                        type="file"
                        id="assistFile"
                        onChange={({ target }) => {
                          this.setState({
                            attachImage: target.files[0],
                          });
                        }}
                      />   
                    </div>
                  </div>
                }
                {
                  (this.state.reasonOneVal === 'data') &&
                  <div>
                    <TextField
                      label={ strings.PageLabel }
                      onChange={(e, o) => {
                        this.setState({
                          pageURL: o,
                        })
                      }}
                    />
                    <Stack horizontal>
                      <DatePicker 
                        label={ strings.StartDateLabel }
                        onSelectDate={(d) => {
                          this.setState({
                            startDate: d
                          });
                        }}
                      />
                      <DatePicker 
                        label={ strings.EndDateLabel }
                        onSelectDate={(d) => {
                          this.setState({
                            endDate: d
                          });
                        }}
                      />
                    </Stack>
                    <TextField
                      label={ strings.EmailToLabel }
                      onChange={(e, o) => {
                        this.setState({
                          emailTo: o,
                        })
                      }}
                    />
                    <TextField
                      label={strings.DescriptionLabel}
                      multiline
                      rows={3}
                      required
                      onChange={(e, o) => {
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
                        this.setState({
                          ticketDescription: o,
                        })
                      }}
                    />
                    <div>
                      <label htmlFor="otherFile">
                        { strings.AttachLabel }
                      </label>
                      <input
                        type="file"
                        id="otherFile"
                        onChange={({ target }) => {
                          this.setState({
                            attachImage: target.files[0],
                          });
                        }}
                      />   
                    </div>
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
