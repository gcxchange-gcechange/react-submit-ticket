import * as strings from 'SubmitTicketWebPartStrings';
import * as english from '../loc/en-us.js';
import * as french from '../loc/fr-fr.js';

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
