export const initialState = { loading: true, error: null, roomTypes: [], rooms: [] }
export function roomReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, loading: action.payload }
    case 'SET_ERROR': return { ...state, error: action.payload, loading: false }
    case 'SET_ROOM_TYPES': return { ...state, roomTypes: action.payload }
    case 'SET_ROOMS': return { ...state, rooms: action.payload }
    case 'ADD_ROOM': return { ...state, rooms: [...state.rooms, action.payload] }
    case 'DELETE_ROOM': return { ...state, rooms: state.rooms.filter((r) => r.id !== action.payload) }
    default: return state
  }
}
