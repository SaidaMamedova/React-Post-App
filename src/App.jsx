import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import PostDetails from './PostDetails';
import UserDetails from './UserDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route index={true} element={<HomePage />} />
        <Route path='/user/:id/' element={<UserDetails />} />
        <Route path='/post/:postId/' element={<PostDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
