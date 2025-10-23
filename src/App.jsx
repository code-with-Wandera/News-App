import { useEffect, useState } from "react"

import axios from 'axios';

function App() {

  // creating state to store news
const [news, setNews]=useState([]);

// creating state to load the news
const [loading, setLoading]=useState(true);

// creating state for error
const [error, setError]=useState(null);

// creating state for different category of news
const [category, setCategory]= useState('all');

// creating state for current page 
const [currentPage, setCurrentPage]=useState(1);

// creating state for results
const[totalResults, setTotalResults]=useState(0);

// creating state for total pages
const[totalPages, setTotalPages]=useState(1);

// Creating a variable to allow get us access to API KEY
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// The number of news to be displayed in one page
const PAGE_SIZE =20;

// Creating a function to fetch news
const fetchNews = async()=>{
  setLoading(true);
  setError(null);
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${currentPage}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`);

    console.log(response);
    
    const articles = response.data.articles ||[];
    setNews(articles);
    setTotalResults(response.data.totalResults||0);
    setTotalPages(Math.ceil((response.data.totalResults || 0)/ PAGE_SIZE));
  } catch (err) {
    setError("Failed to fetch the news.");
  } finally{
    setLoading(false)
  }
}

useEffect (()=>{
  fetchNews();
},[category, currentPage]);

  return (
    <>
    <div className="min-h-screen bg-base-200">
      <header className="bg-primary text-primary-content p-4">

        <div className="container mx-auto">
        <h1 className="text-3xl font-bold">News App</h1>
        </div>
      </header>

      <main className="container mx-auto p-4">Categories</main>
    </div>
    </>
  )
}

export default App
