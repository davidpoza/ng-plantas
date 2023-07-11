import { JournalEntryType } from "../models/IJournalEntry";

function readCookie(name: string) : string {
  return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '' ;
}

function writeCookie(name: string, value: string) : void {
  document.cookie = `${name}=${value};path=/`;
}

function getJournalImageSrcFromType(type: JournalEntryType) {
  switch(type) {
    case JournalEntryType.watering:
      return 'water.png';
    case JournalEntryType.mist:
      return 'spray.png';
    case JournalEntryType.fertilize:
      return 'fertilizer.png';
    case JournalEntryType.photo:
      return 'camera.png';
  }
}


export {
  readCookie,
  writeCookie,
  getJournalImageSrcFromType,
}