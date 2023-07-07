enum JournalEntryType {
  watering = 0,
  photo = 1,
  mist = 2,
  fertilize = 3
}

interface IJournalEntry {
  id: number,
  type: JournalEntryType,
  text: string,
  timestamp: number,
  photoURL: string,
  plantId: number,
}

export { IJournalEntry };