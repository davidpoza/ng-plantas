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
  photoURL: string,
  plantId: number,
}

interface IJournalEntryPost {
  type: JournalEntryType,
  text: string,
  timestamp: number,
  photoURL: string | undefined,
  plantId: number,
  userId: number,
}

export { IJournalEntry, JournalEntryType, IJournalEntryPost };