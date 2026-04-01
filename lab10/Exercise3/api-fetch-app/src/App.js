import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State management
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data using useEffect (runs only once on mount)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data.slice(0, 10)); // Limit to first 10 posts for better UX
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array → runs only once on component mount

  // Conditional rendering for loading, error, and data
  if (loading) {
    return (
      <div className="App">
        <div className="container">
          <h1>API Fetch Demo</h1>
          <div className="loading">Loading posts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="container">
          <h1>API Fetch Demo</h1>
          <div className="error">
            <p>Error: {error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Posts from JSONPlaceholder API</h1>
        <p className="subtitle">
          Fetched {posts.length} posts using useEffect + fetch API
        </p>

        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <small>User ID: {post.userId}</small>
            </div>
          ))}
        </div>

        <div className="info">
          <strong>Key Concepts Demonstrated:</strong><br />
          • useState for data, loading, and error<br />
          • useEffect for side effects (API call)<br />
          • Async/await with fetch<br />
          • Conditional rendering<br />
          • List rendering with map() + unique keys
        </div>
      </div>
    </div>
  );
}

export default App;