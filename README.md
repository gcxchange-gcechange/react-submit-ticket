# Name of the application

## Summary

- A simple form that allows users of gcxchange to submit tickets to a submit ticket Azure Function.
- Able to change the language (English/French) in the property pane.

### Default Form:
![Default Form](./src/webparts/submitTicket/assets/submit-ticket-default-form.png)

### Form when first option seleted:
![Form when first option seleted](./src/webparts/submitTicket/assets/submit-ticket-first-option-form.png)

### Form when third option seleted:
![Form when third option seleted](./src/webparts/submitTicket/assets/submit-ticket-third-option-form.png)

### Form with active submit button:
![Form with active submit button](./src/webparts/submitTicket/assets/submit-ticket-form-with-active-submit-button.png)

## Prerequisites

This web part connects to [This function app](https://github.com/gcxchange-gcechange/CreateTicketAzureFunction).

## API permission
None
## Version 

Used SharePoint Framework Webpart or Sharepoint Framework Extension 

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11-green.svg)

![Node.js v10](https://img.shields.io/badge/Node.js-10.22.0-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Version history

Version|Date|Comments
-------|----|--------
1.0|Dec 9, 2021|Initial release
1.1|March 25, 2022|Next release

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- In the command-line run:
  - **npm install**
  - **gulp serve**
- You will need to add your client id and azure function to the `clientId` and `url` classs members at the top of the filename.tsx file.
- To debug in the front end:
  - go to the `serve.json` file and update `initialPage` to `https://domain-name.sharepoint.com/_layouts/15/workbench.aspx`
  - Run the command **gulp serve**
- To deploy: in the command-line run
  - **gulp bundle --ship**
  - **gulp package-solution --ship**
- Add the webpart to your tenant app store
- Approve the web API permissions

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**