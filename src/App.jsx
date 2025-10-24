import { useEffect, useState } from "react"
import axios from 'axios';
import CategorySelector from "./Components/CategorySelector";

function App() {

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const PAGE_SIZE = 20;

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${currentPage}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`);
      const articles = response.data.articles || [];
      setNews(articles);
      setTotalResults(response.data.totalResults || 0);
      setTotalPages(Math.ceil((response.data.totalResults || 0) / PAGE_SIZE));
    } catch (err) {
      setError("Failed to fetch the news.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews();
  }, [category, currentPage]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);
  }

  return (
    <div className="min-h-screen bg-base-200">
      <header className="bg-primary text-primary-content p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">News App</h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <CategorySelector
          category={category}
          onCategoryChange={handleCategoryChange} />
      </main>
    </div>
  )
}

export default App
