export const validateUsername = (username) => {
  if (!username || !username.trim()) return 'Username is required.'
  return null
}
export const validatePassword = (password) => {
  if (!password || !password.trim()) return 'Password is required.'
  return null
}
export const validateRoomTypeName = (name, existingNames = [], currentId = null) => {
  if (!name || !name.trim()) return 'Room type name is required.'
  if (name.trim().length < 2) return 'Room type name must be at least 2 characters.'
  if (name.trim().length > 50) return 'Room type name must be at most 50 characters.'
  const duplicate = existingNames.find(
    (n) => n.name.trim().toLowerCase() === name.trim().toLowerCase() && n.id !== currentId
  )
  if (duplicate) return 'Room type name already exists.'
  return null
}
export const validateRoomName = (name, existingNames = [], currentId = null) => {
  if (!name || !name.trim()) return 'Room name is required.'
  if (name.trim().length < 2) return 'Room name must be at least 2 characters.'
  if (name.trim().length > 100) return 'Room name must be at most 100 characters.'
  const duplicate = existingNames.find(
    (n) => n.name.trim().toLowerCase() === name.trim().toLowerCase() && n.id !== currentId
  )
  if (duplicate) return 'Room name already exists.'
  return null
}
