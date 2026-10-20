import AxiosDemo from "./components/AxiosDemo";
import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";
import PatchPost from "./components/PatchPost";

function App() {
  return (
    <>
     

      <CreatePost />
      <hr />

      <UpdatePost />
      <hr />

      <PatchPost />
    </>
  );
}

export default App;