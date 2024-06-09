import { createAppSlice } from '@/lib/createAppSlice'
import { NAMES } from '@/lib/words'

const randomIndexFromArray = (max: number) => {
  return Math.floor(Math.random() * max)
}

const generateSlug = () => Math.random().toString(16).slice(2)

const generateName = (gender: string, race: string) => {
  // @ts-ignore will fix later
  const namesStart = NAMES.races[race].words[gender].start
  // @ts-ignore will fix later
  const namesEnd = NAMES.races[race].words[gender].end
  const nameStart = namesStart[randomIndexFromArray(namesStart.length)]
  const nameEnd = namesEnd[randomIndexFromArray(namesEnd.length)]
  return `${nameStart}${nameEnd}`
}

const generateLocationName = (race: string) => {
  // @ts-ignore will fix later
  const namesStart = NAMES.races[race].words.locations.start
  // @ts-ignore will fix later
  const namesEnd = NAMES.races[race].words.locations.end
  const nameStart = namesStart[randomIndexFromArray(namesStart.length)]
  const nameEnd = namesEnd[randomIndexFromArray(namesEnd.length)]
  return `${nameStart}${nameEnd}`
}

const formatSentence = (word: string) => {
  return word[0].toUpperCase() + word.substring(1)
}

const addWordToHistory = (state: any, word: string, location: string | null | undefined) => {
  let newHistoryItem = formatSentence(word)
  if (location) {
    newHistoryItem += ` of ${location}`
  }
  const newHistory = state.history.slice()
  newHistory.push(newHistoryItem)
  state.history = newHistory.slice()
}

export const generateWord = (state: any, addToHistory = true) => {
  state.word = generateName(state.gender, state.race)
  if (addToHistory) {
    addWordToHistory(state, state.word, state.location)
  }
}

export const regenerateLocation = (state: any, addToHistory = true) => {
  state.location = generateLocationName(state.race)
  if (addToHistory) {
    addWordToHistory(state, state.word, state.location)
  }
}

const GENDER = {
  male: {
    name: 'Male',
    key: 'male',
  },
  female: {
    name: 'Female',
    key: 'female',
  },
}

const RACES = NAMES.races

const initialWords = generateName(GENDER.male.key, RACES.orc.key)

const initialState = {
  word: initialWords,
  location: null,
  gender: GENDER.male.key,
  race: RACES.orc.key,
  history: [formatSentence(initialWords)],
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const wordSlice = createAppSlice({
  name: 'word',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    generateNewName: create.reducer((state) => {
      generateWord(state)
    }),
    setWord: create.reducer((state, action: { payload: { word: string } }) => {
      const { word } = action.payload
      state.word = word
      addWordToHistory(state, state.word, state.location)
    }),
    resetHistory: create.reducer((state) => {
      state.history = []
    }),
    changeGender: create.reducer((state, action: { payload: { value: string } }) => {
      state.gender = action.payload.value
      generateWord(state)
    }),
    changeRace: create.reducer((state, action: { payload: { value: string } }) => {
      state.race = action.payload.value
      generateWord(state, false)
      regenerateLocation(state)
    }),
    generateLocation: create.reducer((state) => {
      regenerateLocation(state)
    }),
    removeLocation: create.reducer((state) => {
      state.location = null
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectWord: (state) => state.word,
    selectHistory: (state) => state.history,
    selectRace: (state) => state.race,
    selectGender: (state) => state.gender,
    selectLocation: (state) => state.location,
  },
})

// Action creators are generated for each case reducer function.
export const {
  generateNewName,
  setWord,
  resetHistory,
  changeGender,
  changeRace,
  removeLocation,
  generateLocation,
} = wordSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectWord, selectHistory, selectRace, selectGender, selectLocation } =
  wordSlice.selectors
