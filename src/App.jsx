import { useEffect, useState } from "react"
import axios from 'axios';
import CategorySelector from "./Components/CategorySelector";
import NewsList from "./Components/NewsList";
import Pagination from "./Components/Pagination";

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
  };

  const handlePrev= ()=>{
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

   const handleNext= ()=>{
    if (currentPage < 1) setCurrentPage(currentPage + 1);
  }
  return (
    <div className="min-h-screen bg-base-200">
      <header className="bg-accent text-primary-content p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">News App</h1>
        </div>
      </header>

      <main className="container mx-auto p-4 ">

        <div className="mb-6">
        <CategorySelector
          category={category}
          onCategoryChange={handleCategoryChange} />
          </div>

          <div className="mb-6 text-center">
            <p className="text-lg">Total results:{totalResults}</p>
          </div>

            {loading &&(
              <div className="flex justify-center my-10">
                <span className="loading loading-spinner loading-lg"></span>
              </div>)}

              {/* Error handling */}
              {error && <div className="alert alert-error">{error}</div>}

              {/* newslist */}
              {!loading && !error &&(
                <>
                <NewsList articles={news}/>

                {/* pagination */}
                {totalPages > 1 && (
                  <div>
                    <Pagination currentPage={currentPage} totalPages={totalPages}
                    noPrev={handlePrev}
                    onNext={handleNext}  />
                  </div>
                )}
                </>
              )}
      </main>
    </div>
  )
}

export default App
