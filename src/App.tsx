import { Route, Routes } from "react-router-dom"
import AlbumSlider from "./components/Album/AlbumSlider"
import LayoutApp from "./components/Layout/Layout"
import Post from "./components/Post/Post"
import PostCreate from "./components/PostCreate/PostCreate"
import PostUpdate from "./components/PostUpdate/PostUpdate"
import AlbumsPage from "./pages/AlbumsPage/AlbumsPage"
import HomePage from "./pages/HomePage/HomePage"
import NotFound from "./pages/NotFound/NotFound"
import PostsPage from "./pages/PostsPage/PostsPage"
import TodosPage from "./pages/TodosPage/TodosPage"

function App() {
  return (
    <LayoutApp>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/" element={<PostsPage />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="updatePost/:id" element={<PostUpdate />} />
        <Route path="/createPost" element={<PostCreate />} />
        <Route path="/albums/" element={<AlbumsPage />} />
        <Route path="/albums/:id/" element={<AlbumSlider />} />
        <Route path="/todos/" element={<TodosPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LayoutApp>
  )
}

export default App
