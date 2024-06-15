'use client'
import {
  selectWord,
  selectHistory,
  selectGender,
  selectLocation,
  selectRace,
  selectFavourites,
  resetHistory,
  changeGender,
  generateNewName,
  changeRace,
  generateLocation,
  removeLocation,
  removeFavourite,
  addFavourite,
  resetFavourites,
} from '@/lib/features/words/wordSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { primaryButtonStyle, secondaryButtonStyle } from '../../styles'
import { useEffect, useMemo } from 'react'
import { selectMobile, setMobile } from '@/lib/features/words/metaSlice'
import Dropdown from '../dropdown/Dropdown'
import { NAMES } from '@/lib/words'

export const Words = () => {
  const dispatch = useAppDispatch()
  const word = useAppSelector(selectWord)
  const history = useAppSelector(selectHistory)
  const mobile = useAppSelector(selectMobile)
  const race = useAppSelector(selectRace)
  const gender = useAppSelector(selectGender)
  const location = useAppSelector(selectLocation)
  const favourites = useAppSelector(selectFavourites)

  const availableGenders = useMemo(() => {
    // @ts-ignore will fix later
    return NAMES.races?.[race]?.words.genders
  }, [race])

  const availableGendersObject = useMemo(() => {
    const object: Record<string, string> = {}
    for (const key of availableGenders) {
      object[key] = key.toUpperCase()
    }
    return object
  }, [availableGenders])

  const availableRaces = useMemo(() => {
    return Object.keys(NAMES.races)
  }, [])

  const availableRacesObject = useMemo(() => {
    const object: Record<string, string> = {}
    for (const key of availableRaces) {
      object[key] = key.toUpperCase()
    }
    return object
  }, [availableRaces])

  const formattedSentence =
    word[0].toUpperCase() + word.substring(1) + (location ? ` of ${location}` : '')

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < 700) {
        dispatch(setMobile(true))
      } else {
        dispatch(setMobile(false))
      }
    }

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [dispatch])

  const orderedHistory = useMemo(() => {
    const tempHistory = history.slice()
    tempHistory.reverse()
    return tempHistory
  }, [history])

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div
        className="flex flex-row gap-2 mb-8 mt-6 p-4 bg-gray-100 items-center justify-center text-xl"
        suppressHydrationWarning
      >
        {formattedSentence}
      </div>
      <div
        className={`flex flex-row flex-wrap items-center justify-center gap-2 mt-8 mb-2 ml-0 mr-0`}
      >
        <button className={primaryButtonStyle} onClick={() => dispatch(generateNewName())}>
          Regenerate Name
        </button>
        {location && (
          <button className={primaryButtonStyle} onClick={() => dispatch(generateLocation())}>
            Regenerate Location
          </button>
        )}
        <Dropdown
          activeKey={gender}
          values={availableGendersObject}
          onChange={(key) => {
            dispatch(changeGender({ value: key }))
          }}
        />
        <Dropdown
          activeKey={race}
          values={availableRacesObject}
          onChange={(key) => {
            dispatch(changeRace({ value: key }))
          }}
        />
        <button
          className={primaryButtonStyle}
          onClick={() => {
            location ? dispatch(removeLocation()) : dispatch(generateLocation())
          }}
        >
          {location ? 'Remove Location' : 'Add Location'}
        </button>
        <button
          className={primaryButtonStyle}
          onClick={() => {
            favourites.includes(formattedSentence)
              ? dispatch(removeFavourite({ value: formattedSentence }))
              : dispatch(addFavourite({ value: formattedSentence }))
          }}
        >
          {favourites.includes(formattedSentence) ? 'Remove Favourite' : 'Add Favourite'}
        </button>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="flex flex-col items-center justify-center gap-2 mt-8 mb-2 ml-0 mr-0 w-full max-w-4xl bg-gray-100 rounded-md overflow-hidden">
          <div className="flex flex-row items-center place-content-between p-4 bg-gray-300 w-full">
            <h4 className="text-xl">Favourites</h4>
            <button className={secondaryButtonStyle} onClick={() => dispatch(resetFavourites())}>
              Reset
            </button>
          </div>
          <ul
            className={`flex flex-col gap-2 overflow-auto ${
              mobile ? 'min-h-20' : 'h-80'
            } w-full p-4`}
          >
            {favourites.map((sentence, i) => (
              <li key={`${sentence}_${i}`}>
                <p suppressHydrationWarning>{sentence}</p>{' '}
                <button
                  className={secondaryButtonStyle}
                  onClick={() => dispatch(removeFavourite({ value: sentence }))}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 mt-8 mb-2 ml-0 mr-0 w-full max-w-4xl bg-gray-100 rounded-md overflow-hidden">
          <div className="flex flex-row items-center place-content-between p-4 bg-gray-300 w-full">
            <h4 className="text-xl">Name History</h4>
            <button className={secondaryButtonStyle} onClick={() => dispatch(resetHistory())}>
              Reset
            </button>
          </div>
          <ul
            className={`flex flex-col gap-2 overflow-auto ${
              mobile ? 'min-h-20' : 'h-80'
            } w-full p-4`}
          >
            {orderedHistory.map((sentence, i) => (
              <li key={`${sentence}_${i}`}>
                <p suppressHydrationWarning>{sentence}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Words
