import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SubmitTicketWebPartStrings';
import SubmitTicket from './components/SubmitTicket';
import { ISubmitTicketProps } from './components/ISubmitTicketProps';

export interface ISubmitTicketWebPartProps {
  description: string;
  prefLang: string;
}

export default class SubmitTicketWebPart extends BaseClientSideWebPart<ISubmitTicketWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISubmitTicketProps> = React.createElement(
      SubmitTicket,
      {
        description: this.properties.description,
        currentUser: this.context.pageContext.user,
        context: this.context,
        prefLang: this.properties.prefLang,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown('prefLang', {
                  label: 'Preferred Language',
                  options: [
                    { key: 'account', text: 'Account' },
                    { key: 'en-us', text: 'English' },
                    { key: 'fr-fr', text: 'Français' }
                  ]}),
              ]
            }
          ]
        }
      ]
    };
  }
}
