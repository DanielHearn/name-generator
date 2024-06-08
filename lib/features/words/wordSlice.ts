import { createAppSlice } from '@/lib/createAppSlice'
import { NAMES } from '@/lib/words'

const randomIndexFromArray = (max: number) => {
  return Math.floor(Math.random() * max)
}

const generateSlug = () => Math.random().toString(16).slice(2)

const generateName = (gender, race): words => {
  const namesStart = NAMES.races[race].words[gender].start
  const namesEnd = NAMES.races[race].words[gender].end
  const nameStart = namesStart[randomIndexFromArray(namesStart.length)]
  const nameEnd = namesEnd[randomIndexFromArray(namesEnd.length)]
  return `${nameStart}${nameEnd}`
}

const formatSentence = (word) => {
  return word[0].toUpperCase() + word.substring(1)
}

const addWordToHistory = (state: any, words) => {
  const newHistoryItem = formatSentence(words)
  const newHistory = state.history.slice()
  newHistory.push(newHistoryItem)
  state.history = newHistory.slice()
}

export const generateWord = (state: any) => {
  console.log(state)
  state.word = generateName(state.gender, state.race)
  addWordToHistory(state, state.word)
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
    setWord: create.reducer((state, action: { payload: { word } }) => {
      const { word } = action.payload
      state.word = word
      addWordToHistory(state, state.word)
    }),
    resetHistory: create.reducer((state) => {
      state.history = []
    }),
    changeGender: create.reducer((state, action: { payload: { value } }) => {
      state.gender = action.payload.value
      generateWord(state)
    }),
    changeRace: create.reducer((state, action: { payload: { value } }) => {
      state.race = action.payload.value
      generateWord(state)
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
export const { generateNewName, setWord, resetHistory, changeGender, changeRace } =
  wordSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectWord, selectHistory, selectRace, selectGender, selectLocation } =
  wordSlice.selectors
