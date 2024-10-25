import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EntryCard from './EntryCard';

const EntryList = ({ onEntrySelect }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0); // Página actual
  const [totalPages, setTotalPages] = useState(0); // Total de páginas
  const limit = 8

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/blog?limit=8&page=${page}`);
        setBlogs(response.data.results);
        setTotalPages(Math.ceil(response.data.total / limit)); // Calcular total de páginas
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]); // Ejecutar efecto cuando cambie la página

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching blogs</div>;

  return (
    <div>
      <div className='EntryCard-list'>
        {blogs.map((blog) => (
          <EntryCard 
            key={blog.id} 
            title={blog.title} 
            preview={blog.preview} 
            onClick={() => onEntrySelect(blog)} 
          />
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0}>
          Previous
        </button>
        <span>Page {page + 1} of {totalPages}</span>
        <button onClick={() => setPage(prev => prev + 1)} disabled={page + 1 >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default EntryList;
