import AxiosDemo from "./components/AxiosDemo";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";
import PatchPost from "./components/PatchPost";
import DeletePost from "./components/DeletePost";

function App() {
  return (
    <>
      

      <PostList />
      <hr />

      <CreatePost />
      <hr />

      <UpdatePost />
      <hr />

      <PatchPost />
      <hr />

      <DeletePost />
    </>
  );
}

export default App;