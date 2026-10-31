**PRACTICAL EXAM FER202_SU26**

**Hotel Management App**

_Duration: 85 minutes_

## APPLICATION DESCRIPTION

You will complete a **Hotel Management App** - a hotel room management system with 3 main collections:

- **rooms**: list of rooms (id, name, roomTypeId, floor, view, priceWeekday, priceWeekend, lastRenovated)
- **roomTypes**: room types (id, name)
- **users**: login accounts (id, username, password, role, fullName, email)

The application already provides the base structure, API, reducer, context, and basic pages. Your task is to **complete the TODOs** marked in the source code.

## SAMPLE DATA (db.json)

- 3 users (1 Admin, 2 User)
- 3 roomTypes (Standard, Deluxe, Suite)
- 15 rooms - **5 rooms per type**

## HOW TO RUN THE APPLICATION

\# Run JSON Server (port 3001) + React Dev Server (port 5173) concurrently

npm start

\# Run tests

npm test

## TODO LIST AND SCORING

| **TODO** | **Description**                                                                              | **Points** |
| -------- | -------------------------------------------------------------------------------------------- | ---------- |
| TODO-01  | Login - show an Alert when login fails                                                       | 1.0        |
| TODO-02  | Navbar - display user.email (bold) + user.role (Badge)                                       | 1.0        |
| TODO-03  | Navbar - Logout calls logoutUser() + navigate('/login')                                      | 1.0        |
| TODO-04  | AddRoom - useEffect fetches RoomType, populates the dropdown                                 | 1.0        |
| TODO-05  | RoomDetail - useEffect fetch, Spinner, Alert, Back, Card                                     | 1.0        |
| TODO-06  | RoomRow - Delete with ModalConfirm                                                           | 1.0        |
| TODO-07  | RoomRow - Price Range column using formatPriceRange()                                        | 0.5        |
| TODO-08  | AppFooter - display logo, copyright, version, appName                                        | 0.5        |
| TODO-09  | NotFound - design a proper 404 page                                                          | 1.0        |
| TODO-10A | RoomTypeDetail - fetch data (Promise.all), redirect to 404 for invalid id, display room list | 1.0        |
| TODO-10B | ManageRoomTypes - check whether a RoomType is in use before deleting it                      | 1.0        |
| Total    |                                                                                              | 10.0       |

## TODO DETAILS

### TODO-01 - Login: Display login error (1.0 point)

**File:** src/pages/Login.jsx

**Requirement:** In the catch block of the handleSubmit function, dispatch the SET_ERROR action with err.message to display the error message in an Alert.

- Call dispatch({ type: 'SET_ERROR', payload: err.message })
- The Alert must have role="alert" (the default Bootstrap Alert already has this)
- The Alert must display the exact error content returned by the server

**Error scenarios:**

- Wrong username/password → "Invalid username or password."
- Logging in with a User account (not Admin) → "Access denied. Only Admin users can log in."

**Checklist:**

- dispatch({ type: 'SET_ERROR', payload: err.message }) in the catch block
- Alert is shown when state.serverError has a value
- Alert disappears when the username/password is retyped

### TODO-02 - Navbar: Display email and role (1.0 point)

**File:** src/components/AppNavbar.jsx

**Requirement:** Inside {isAuthenticated && user && (...)}, display user.email and user.role.

- user.email must have the fw-bold and text-white classes
- user.role must be rendered inside a React-Bootstrap &lt;Badge&gt; component
- Example: &lt;span className="text-white fw-bold"&gt;{user.email}&lt;/span&gt; and &lt;Badge bg="info"&gt;{user.role}&lt;/Badge&gt;

**Checklist:**

- user.email is displayed with the fw-bold class
- user.role is displayed inside a Badge component
- Not shown when not logged in

### TODO-03 - Navbar: Logout button (1.0 point)

**File:** src/components/AppNavbar.jsx

**Requirement:** Complete the handleLogout function and add a Logout button to the Navbar.

- handleLogout must call logoutUser() (from useAuth())
- Then call navigate('/login')
- The Logout button has the text "Logout", variant outline-light, size sm
- The button must appear inside {isAuthenticated && user && (...)}

**Checklist:**

- logoutUser() is called when Logout is clicked
- navigate('/login') is called after logout
- The Logout button is shown when logged in
- Not shown when not logged in

### TODO-04 - AddRoom: RoomType dropdown list (1.0 point)

**File:** src/pages/AddRoom.jsx

**Requirement:** In useEffect, call fetchRoomTypes() and update the roomTypes state to populate the room-type selection dropdown. RoomType is fetched from the db.json API (not from RoomContext).

const \[roomTypes, setRoomTypes\] = useState(\[\])

useEffect(() => {

fetchRoomTypes().then(setRoomTypes).catch(console.error)

}, \[\])

fetchRoomTypes has already been imported from ../api/roomApi

The dropdown must show all room types from db.json (Standard, Deluxe, Suite)

The first option is "-- Select room type --" (with no value)

**Checklist:**

- roomTypes is declared with useState(\[\])
- useEffect calls fetchRoomTypes() on mount
- The result is stored in the roomTypes state via setRoomTypes
- The dropdown shows all options returned by the API
- The placeholder option "-- Select room type --" has value=""

### TODO-05 - RoomDetail: Fetch and display room details (1.0 point)

**File:** src/pages/RoomDetail.jsx

**Requirement:** Complete the useEffect to fetch room data and display the full details.

useEffect(() => {

fetchRoomById(id)

.then((data) => { setRoom(data); setLoading(false) })

.catch((err) => { setError(err.message || 'Failed to load room.'); setLoading(false) })

}, \[id\])

**While loading:** Return &lt;Spinner animation="border" className="d-block mx-auto mt-5" /&gt;

**On error:** Return &lt;Alert variant="danger" role="alert"&gt;{error}&lt;/Alert&gt;

**When data is available:** Display a Card with:

**Display:**

- Back button: &lt;Button onClick={() =&gt; navigate(-1)}>← Back&lt;/Button&gt;
- Room Type inside &lt;Badge bg="primary"&gt;
- Floor, View
- Price Weekday: formatVND(room.priceWeekday)
- Price Weekend: formatVND(room.priceWeekend)
- Last Renovated: formatDateDisplay(room.lastRenovated)

**Checklist:**

- useEffect calls fetchRoomById(id)
- Spinner is shown while loading (.spinner-border)
- Danger Alert is shown on error
- The Back button navigates to the previous page
- The Card shows Room Type, Floor, View, Price Weekday, Price Weekend, Last Renovated

### TODO-06 - RoomRow: Delete with ModalConfirm (1.0 point)

**File:** src/components/RoomRow.jsx

**Requirement:** When Delete is clicked, show ModalConfirm. On confirmation → call onDelete(room.id) and close the modal.

- The showModal state is already declared
- Delete button: onClick={() => setShowModal(true)}
- handleDeleteConfirm: calls onDelete(room.id) then setShowModal(false)
- The ModalConfirm body can be: "Are you sure you want to delete this room?"

**Checklist:**

- Clicking Delete → the Modal appears
- Confirm → onDelete(room.id) is called
- Cancel → onDelete is NOT called
- The Modal closes after confirm or cancel

### TODO-07 - RoomRow: Price Range column (0.5 point)

**File:** src/components/RoomRow.jsx

**Requirement:** Replace the - price cell with formatPriceRange(room.priceWeekday, room.priceWeekend).

- formatPriceRange has already been imported from ../utils/format
- Result: "800.000 ₫ - 1.200.000 ₫" (vi-VN format)
- The ₫ symbol must appear in the cell

**Checklist:**

- formatPriceRange(room.priceWeekday, room.priceWeekend) is called
- The weekday price is displayed correctly
- The weekend price is displayed correctly
- The ₫ symbol appears in the output

### TODO-08 - AppFooter: Display app info (0.5 point)

**File:** src/components/AppFooter.jsx

**Requirement:** Inside the &lt;footer&gt; tag, display the logo, appName, copyright, version, and course from about.js.

- Must use the HTML &lt;footer&gt; tag
- &lt;img src={about.logo} alt="logo" width="24" height="24" /&gt;
- Display about.appName, about.copyright, about.version, about.course
- Values must come from import about from '../data/about' (do not hardcode)

**Values in about.js:**

logo: '/images/logo.jpg'

copyright: '© 2026 Hotel Management App'

version: 'v1.0.0'

course: 'FER202 - ReactJS'

appName: 'Hotel Management App'

**Checklist:**

- The &lt;footer&gt; tag exists in the DOM
- The logo &lt;img&gt; is shown inside the footer, with src equal to about.logo
- The logo actually renders in the browser (no 404 from a wrong extension or wrong path prefix)
- about.copyright is displayed
- about.version is displayed
- about.course is displayed

### TODO-09 - NotFound: Design the 404 page (1.0 point)

**File:** src/pages/NotFound.jsx

**Requirement:** Design a proper 404 page - display the error code, a clear message, and a button to navigate back home.

- The \* route in AppRoutes.jsx must point to &lt;NotFound /&gt; (already configured)
- The page must display **"404"** (a clear number or text)
- Must include a descriptive error message (e.g. "Page Not Found")
- Must include a **"Back to Home"** button/link using &lt;Link to="/"&gt; or useNavigate()

**Example UI:**

&lt;Container className="text-center py-5"&gt;

&lt;h1 style={{ fontSize: '6rem', fontWeight: 'bold', color: '#dc3545' }}&gt;404&lt;/h1&gt;

&lt;h2 className="mb-3"&gt;Page Not Found&lt;/h2&gt;

&lt;p className="text-muted mb-4"&gt;The page you are looking for does not exist or has been moved.&lt;/p&gt;

&lt;Button as={Link} to="/" variant="primary"&gt;Back to Home&lt;/Button&gt;

&lt;/Container&gt;

**Checklist:**

- The text "404" is shown on the page
- A clear error message is displayed
- A button/link back to the home page (to="/")
- The \* route points to &lt;NotFound /&gt;

### TODO-10A - RoomTypeDetail (1.0 point)

**File:** src/pages/RoomTypeDetail.jsx

_The "View Details" button in RoomTypeList.jsx is already provided (not a TODO - students do not need to modify this file)._

**Requirement:** In RoomTypeDetail: use Promise.all to fetch data. If id is invalid → redirect to the 404 page. Display the list of rooms belonging to this type.

**Technical requirements:**

// RoomTypeDetail.jsx - inside useEffect

const \[roomTypes, allRooms\] = await Promise.all(\[fetchRoomTypes(), fetchRooms()\])

const found = roomTypes.find((rt) => String(rt.id) === String(id))

if (!found) {

navigate('/not-found', { replace: true })

return

}

setRoomType(found)

setRooms(allRooms.filter((r) => String(r.roomTypeId) === String(id)))

setLoading(false)

**Display:**

- Back button: onClick={() => navigate('/room-types')} with text "← Back to Room Types"
- A Card with the room type's name and room count
- A table of rooms (Name, Floor, View, Price Range, Last Renovated)

**Checklist:**

- Promise.all(\[fetchRoomTypes(), fetchRooms()\]) is called
- id not found → navigate('/not-found', { replace: true })
- Spinner while loading, Alert on network error
- The "← Back to Room Types" button navigates to /room-types
- The table only shows rooms of the type being viewed
- Redirecting to /not-found correctly shows the 404 page - it must **not** bounce to the Login page (see "How to test the not-found page" below)

**You need to cover all of the following cases:**

1\. Never logged in + /room-types/999 → goes to Login

2\. Logged in, then unmount/remount (simulating a reload) at /room-types/999 → shows the 404 page, **not** redirected to Login

3\. Logout → unmount/remount on a protected route → goes to Login (session was cleared correctly)

4\. Not logged in + any other invalid URL /some-nonexistent-path → shows the 404 page, is not automatically redirected to Login

### TODO-10B - ManageRoomTypes: Check whether a RoomType is in use (1.0 point)

**File:** src/pages/ManageRoomTypes.jsx

**Requirement:** Before deleting a RoomType, call fetchRooms() to check whether any room is currently using this type. If so → show an error message **containing the RoomType's name** in the dialog body, and do not allow the deletion.

const handleDeleteClick = async (id, name) => {

setTargetId(id)

setTargetName(name)

const rooms = await fetchRooms()

const inUse = rooms.some((r) => String(r.roomTypeId) === String(id))

if (inUse) {

setDeleteError(\`Room type "\${name}" is currently in use and cannot be deleted.\`)

} else {

setDeleteError(null)

}

setShowModal(true)

}

**Modal display:**

**Display:**

- If **in use**: title "Cannot Delete", body contains the RoomType name + error message, the confirm button changes to "OK" (no deletion)
- If **not in use**: title "Confirm Delete", normal confirmation body, the "Delete" button performs the deletion

**Checklist:**

- fetchRooms() is called when Delete is clicked
- If the RoomType is in use → the modal body contains the **RoomType's name**
- If in use → deleteRoomType is NOT called
- If not in use → deletion proceeds normally and the list is updated
- The Modal closes after handling

## FINAL SCORE SUMMARY

| **TODO**                               | **File**                      | **Points** |
| -------------------------------------- | ----------------------------- | ---------- |
| TODO-01: Login Alert                   | src/pages/Login.jsx           | 1.0        |
| TODO-02: Navbar email + Badge          | src/components/AppNavbar.jsx  | 1.0        |
| TODO-03: Navbar Logout                 | src/components/AppNavbar.jsx  | 1.0        |
| TODO-04: AddRoom RoomType dropdown     | src/pages/AddRoom.jsx         | 1.0        |
| TODO-05: RoomDetail fetch + display    | src/pages/RoomDetail.jsx      | 1.0        |
| TODO-06: RoomRow Delete Modal          | src/components/RoomRow.jsx    | 1.0        |
| TODO-07: RoomRow Price Range           | src/components/RoomRow.jsx    | 0.5        |
| TODO-08: AppFooter about info          | src/components/AppFooter.jsx  | 0.5        |
| TODO-09: NotFound 404 page             | src/pages/NotFound.jsx        | 1.0        |
| TODO-10A: RoomTypeDetail               | src/pages/RoomTypeDetail.jsx  | 1.0        |
| TODO-10B: ManageRoomTypes in-use check | src/pages/ManageRoomTypes.jsx | 1.0        |
| TOTAL                                  |                               | 10.0       |

## FOLDER STRUCTURE

template/

├── db.json # Sample data (DO NOT modify)

├── src/

│ ├── api/

│ │ ├── authApi.js # Provided (DO NOT modify)

│ │ └── roomApi.js # Provided (DO NOT modify)

│ ├── context/

│ │ ├── AuthContext.jsx # Provided (DO NOT modify)

│ │ └── RoomContext.jsx # Provided (DO NOT modify)

│ ├── reducer/

│ │ ├── authReducer.js # Provided (DO NOT modify)

│ │ ├── roomReducer.js # Provided (DO NOT modify)

│ │ └── roomTypeReducer.js # Provided (DO NOT modify)

│ ├── utils/

│ │ ├── format.js # Provided (DO NOT modify)

│ │ └── validate.js # Provided (DO NOT modify)

│ ├── data/

│ │ └── about.js # Provided (DO NOT modify)

│ ├── routes/

│ │ ├── AppRoutes.jsx # Provided (DO NOT modify)

│ │ └── ProtectedRoute.jsx # Provided (DO NOT modify)

│ ├── components/

│ │ ├── AppNavbar.jsx # TODO-02, 03

│ │ ├── AppFooter.jsx # TODO-08

│ │ ├── ModalConfirm.jsx # Provided (DO NOT modify)

│ │ ├── FilterBar.jsx # Provided (DO NOT modify)

│ │ ├── RoomTypeList.jsx # Provided (DO NOT modify)

│ │ └── RoomRow.jsx # TODO-06, 07

│ ├── pages/

│ │ ├── Login.jsx # TODO-01

│ │ ├── RoomList.jsx # Provided (DO NOT modify)

│ │ ├── RoomDetail.jsx # TODO-05

│ │ ├── AddRoom.jsx # TODO-04

│ │ ├── ManageRoomTypes.jsx # TODO-10B

│ │ ├── RoomTypeDetail.jsx # TODO-10A

│ │ └── NotFound.jsx # TODO-09

│ └── \__tests_\_/ # Test files (DO NOT modify)

## IMPORTANT NOTES

1\. **Do NOT modify** files that have no TODO - points will be deducted if you break existing logic

2\. **Run the app:** npm start (starts JSON Server + React Dev Server together)

3\. **Test account:** admin / admin123 (Admin role - allowed to log in)

4\. The account user1 / user123 has the User role - login will be denied

5\. **formatPriceRange** returns the format "800.000 ₫ - 1.200.000 ₫" (vi-VN locale)

7\. **lastRenovated** is stored as "dd/MM/yyyy" - use formatDateDisplay() to display it

8\. ModalConfirm is already imported in RoomRow.jsx and ManageRoomTypes.jsx

**GOOD LUCK WITH YOUR EXAM!**