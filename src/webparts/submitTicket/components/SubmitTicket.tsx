import * as React from 'react';
import { IHttpClientOptions, AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';  
import {
  TextField,
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
  MessageBar,
  MessageBarType
} from 'office-ui-fabric-react';
import styles from './SubmitTicket.module.scss';
import * as strings from 'SubmitTicketWebPartStrings';
import { ISubmitTicketProps } from './ISubmitTicketProps';
import { ISubmitTicketState } from './ISubmitTicketState';
import { escape } from '@microsoft/sp-lodash-subset';

// Example placeholder options
const options: IDropdownOption[] = [
  { key: 'I am experiencing an issue on gcxchange | Je rencontre un problème sur gcéchange', text: strings.ReasonIssue },
  { key: "I need assistance using gcxchange | J'ai besoin d'aide avec gcéchange", text: strings.ReasonAssistance },
  { key: "I would like to request statistics on my page | Je souhaite obtenir les statistiques de ma page", text: strings.ReasonData },
  { key: "Other (please specify) | Autre (veuillez préciser)", text: strings.ReasonOther },
];

const dateRange: IDropdownOption[] = [
  { key: '7', text: '7 days' },
  { key: '30', text: '30 days' },
  { key: '90', text: '90 days' },
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
      displayMessage: false
    };  
  }

  private sendTicket(): void {
    const reqHeaders: Headers = new Headers();
    // reqHeaders.append('Content-type', 'application/json');
    reqHeaders.append('Content-Type', 'multipart/form-data');
    var reqBody = new FormData();
    reqBody.append('email', this.props.currentUser.email);
    reqBody.append('reasonOneVal', this.state.reasonOneVal.key);
    reqBody.append('reasonTwoVal', '');
    reqBody.append('ticketDescription', this.state.ticketDescription);
    reqBody.append('pageURL', this.state.pageURL);
    reqBody.append('startDate', this.state.startDate);
    reqBody.append('endDate', this.state.endDate);
    reqBody.append('emailTo', this.state.emailTo);
    reqBody.append('attachment', this.state.attachImage);
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
            if (response.status === 200) {
              this.setState({
                displayMessage: true,
                reasonOneVal: '',
                ticketDescription: '',
                startDate: '',
                endDate: '',
                pageURL: '',
                emailTo: '',
                attachImage: null,
              });
            }
            return response.json();
          })
      });
  }

  public render(): React.ReactElement<ISubmitTicketProps> {
    return (
      <div className={ styles.submitTicket }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            {this.state.displayMessage &&
              <MessageBar
                messageBarType={MessageBarType.success}
              >
                Your Ticket was sent to the help desk!
              </MessageBar>
            }
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
                  className={ styles.inputHolder }
                  required
                />
                <Dropdown
                  label={strings.ReasonOneLabel}
                  options={options}
                  required
                  className={ styles.inputHolder }
                  onChange={(e, o) => {
                    this.setState({
                      reasonOneVal: o,
                      reasonTwoVal: '',
                      ticketDescription: '',
                      displayMessage: false
                    });
                  }}
                />
                {
                  (this.state.reasonOneVal.key === 'I am experiencing an issue on gcxchange | Je rencontre un problème sur gcéchange') &&
                  <div>
                    <TextField
                      label={ strings.PageLabel }
                      className={ styles.inputHolder }
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
                      className={ styles.inputHolder }
                      onChange={(e, o) => {
                        this.setState({
                          ticketDescription: o,
                        })
                      }}
                    />
                    <div className={styles.fileHolder}>
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
                  (this.state.reasonOneVal.key === "I need assistance using gcxchange | J'ai besoin d'aide avec gcéchange") &&
                  <div>
                    <TextField
                      label={ strings.PageLabel }
                      className={ styles.inputHolder }
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
                      className={ styles.inputHolder }
                      onChange={(e, o) => {
                        this.setState({
                          ticketDescription: o,
                        })
                      }}
                    />
                    <div className={styles.fileHolder}>
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
                  (this.state.reasonOneVal.key === "I would like to request statistics on my page | Je souhaite obtenir les statistiques de ma page") &&
                  <div>
                    <TextField
                      label={ strings.PageLabel }
                      className={ styles.inputHolder }
                      onChange={(e, o) => {
                        this.setState({
                          pageURL: o,
                        })
                      }}
                    />
                    <Dropdown
                      label={ strings.DateLabel }
                      options={dateRange}
                      required
                      className={ styles.inputHolder }
                      onChange={(e, o) => {
                        let today = new Date();
                        let startDate = new Date();
                        if (o.key === '7') {
                          startDate.setDate(startDate.getDate()-7);
                        } else if (o.key === '30') {
                          startDate.setDate(startDate.getDate()-30);
                        } else if ( o.key === '90') {
                          startDate.setDate(startDate.getDate()-90);
                        }
                        this.setState({
                          startDate: startDate,
                          endDate: today
                        });
                      }}
                    />
                    <TextField
                      label={ strings.EmailToLabel }
                      className={ styles.inputHolder }
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
                      className={ styles.inputHolder }
                      onChange={(e, o) => {
                        this.setState({
                          ticketDescription: o,
                        })
                      }}
                    />
                  </div>
                }
                {
                  (this.state.reasonOneVal.key === "Other (please specify) | Autre (veuillez préciser)") &&
                  <div>
                    <TextField
                      label={ strings.PageLabel }
                      className={ styles.inputHolder }
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
                      className={ styles.inputHolder }
                      onChange={(e, o) => {
                        this.setState({
                          ticketDescription: o,
                        })
                      }}
                    />
                    <div className={styles.fileHolder}>
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
                <input disabled={(this.state.ticketDescription) ? false : true} className={ styles.button } type="submit" value={strings.SubmitLabel} />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
