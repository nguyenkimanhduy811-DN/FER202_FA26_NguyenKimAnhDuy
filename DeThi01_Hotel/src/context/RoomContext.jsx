import { createContext, useContext, useReducer, useEffect } from 'react'
import { roomReducer, initialState } from '../reducer/roomReducer'
import { fetchRoomTypes, fetchRooms } from '../api/roomApi'
export const RoomContext = createContext(null)
export function RoomProvider({ children }) {
  const [state, dispatch] = useReducer(roomReducer, initialState)
  useEffect(() => {
    Promise.allSettled([fetchRoomTypes(), fetchRooms()]).then(([rtResult, roomResult]) => {
      if (rtResult.status === 'fulfilled') dispatch({ type: 'SET_ROOM_TYPES', payload: rtResult.value })
      if (roomResult.status === 'fulfilled') dispatch({ type: 'SET_ROOMS', payload: roomResult.value })
      else dispatch({ type: 'SET_ERROR', payload: roomResult.reason?.message })
      dispatch({ type: 'SET_LOADING', payload: false })
    })
  }, [])
  return <RoomContext.Provider value={{ state, dispatch }}>{children}</RoomContext.Provider>
}
export function useRoom() { return useContext(RoomContext) }
