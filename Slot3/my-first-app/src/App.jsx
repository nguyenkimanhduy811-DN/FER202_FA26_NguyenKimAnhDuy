import './App.css'
import About from './About'

function App() {
  
  const user1 = {
    name: "Kim",
    email: "Kim@fe.edu.vn"
  }

  const user2 = {
    name: "Duy",
    email: "Duy@gmail.com"
  }

  return (
    <>
      <About user={user1} />
      <About user={user2} />
    </>
  )
}

export default App