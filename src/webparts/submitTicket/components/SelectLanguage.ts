import * as strings from 'SubmitTicketWebPartStrings';

const english = require("../loc/en-us.js")
const french = require("../loc/fr-fr.js")

export function SelectLanguage(lang:string):ISubmitTicketWebPartStrings{
  switch(lang) {
    case "en-us": {
      return english;
    }
    case "fr-fr": {
      return french;
    }
    default: {
      return strings;
    }
 }
}
