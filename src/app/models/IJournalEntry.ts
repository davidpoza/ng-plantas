enum JournalEntryType {
  watering = 'watering',
  photo = 'photo',
  mist = 'mist',
  fertilize = 'fertilize'
}

interface IJournalEntry {
  id: number,
  type: JournalEntryType,
  text: string,
  timestamp: number,
  photo: string,
  plantId: number,
}

interface IJournalEntryPost {
  type: JournalEntryType,
  text: string,
  timestamp: number,
  plantId: number,
}

interface IJournalEntryPatch {
  type?: JournalEntryType,
  text?: string,
  timestamp?: number,
  photo?: string,
  plantId?: number,
}


export { IJournalEntry, JournalEntryType, IJournalEntryPost, IJournalEntryPatch };