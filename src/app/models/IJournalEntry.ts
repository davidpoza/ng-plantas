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

export { IJournalEntry, JournalEntryType };