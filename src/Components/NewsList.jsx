import NewsCard from "./NewsCard";

const NewsList = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols lg:grid-cols-3 gap-4">
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
};

export default NewsList;
