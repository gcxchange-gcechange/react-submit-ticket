import * as React from 'react';
import {
  TextField,
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption
} from 'office-ui-fabric-react';
import styles from './SubmitTicket.module.scss';
import { ISubmitTicketProps } from './ISubmitTicketProps';
import { escape } from '@microsoft/sp-lodash-subset';

// Example placeholder options
const options: IDropdownOption[] = [
  { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange', disabled: true },
  { key: 'grape', text: 'Grape' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' },
];

// Example placeholder options
const options2: IDropdownOption[] =[
  { key: 'reason1', text: 'Reason 1 Placeholder'},
  { key: 'reason2', text: 'Reason 2 Placeholder'},
  { key: 'reason3', text: 'Reason 3 Placeholder'},
];

export default class SubmitTicket extends React.Component<ISubmitTicketProps, {}> {
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
                }}
              >
                <TextField
                  label="Email"
                  value={this.props.currentUser.email}
                />
                <Dropdown
                  label="REASON 1 FOR TICKET"
                  options={options}
                />
                <Dropdown
                  label="REASON 2 FOR TICKET"
                  options={options2}
                />
                <TextField label="Description" multiline rows={3} />
                <input className={ styles.button } type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
