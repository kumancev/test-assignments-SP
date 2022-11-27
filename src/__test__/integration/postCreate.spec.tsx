import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import PostCreate from "../../components/PostCreate/PostCreate";
import PostItem from '../../components/PostItem/PostItem';
import { Route, MemoryRouter, BrowserRouter } from 'react-router-dom';
import { store } from '../../app/store';
import { PostType } from '../../models/post';
import { useAppSelector } from '../../app/hooks';


const renderPost = (post: PostType): RenderResult =>
  render(
    <Provider store={store}>
      <PostItem title={post.title} body={post.body} id={post.id} />
    </Provider>
  );


test('PostCreate element: exist in the DOM', () => {
  render(<Provider store={store}><BrowserRouter><PostCreate /></BrowserRouter></Provider>);
  expect(screen.getByText('Add A Post')).toBeInTheDocument();
})

// const renderPostCreate = (): RenderResult =>
//   render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <PostCreate />
//       </MemoryRouter>
//     </Provider>
//   );

// const getPost = (postId: string): PostType => {
//   const post = useAppSelector(state => state.posts.list.find((post) => post.id === postId));
//   expect(post).toBeDefined();
//   return post as PostType;
// };

// test('Renders PostInfo', () => {
//   const post = getPost('1');
//   renderPost(post);
//   expect(screen.getByText('sunt aut facere repellat provident occaecati excepturi optio reprehenderit')).toHaveTextContent('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
// });

