import React from 'react';
import Navigation from './components/Navigation';
import { Routes, Route } from 'react-router-dom';
import ThreadPage from './pages/ThreadPage';
import CommentPage from './pages/CommentPage';
import ThreadCreatePage from './pages/ThreadCreatePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Loading from './components/Loading';
import LeaderboardsPage from './pages/LeaderboardsPage';



const App = () => {
  return (
    <>
      <div className="app-container">
        <header>
          <Navigation />
          <Loading />
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={<ThreadPage />}
            />
            <Route path="/threads/:threadId" element={<CommentPage />} />
            <Route path="/threads" element={<ThreadCreatePage />} />
            <Route path="/leaderboards" element={<LeaderboardsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
