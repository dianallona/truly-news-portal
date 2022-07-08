import PropTypes from "prop-types";
import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowNarrowRight } from "../../assets/icons/arrow-narrow-right.svg";

const NewsCard = ({ article, id }) => {
  let navigate = useNavigate();
  /**REDUX STATES*/
  const {
    title = "",
    description = "",
    urlToImage = "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg",
  } = article;

  /**EVENT HANDLERS */
  const handleOnClickCard = () => {
    navigate(`/news/article/${id}`, { replace: true });
  };

  //renders the article's image
  const renderImage = () => (
    <img
      data-testid={`news-card-img`}
      className="w-full"
      src={urlToImage}
      alt=""
    />
  );

  //renders the articles description (title & description)
  const renderContent = () => (
    <div className="px-6 py-4">
      <div data-testid={`news-card-title`} className="font-bold text-xl mb-2">
        {title}
      </div>
      <p
        data-testid={`news-card-description`}
        className="text-gray-700 text-base"
      >
        {description}
      </p>
    </div>
  );

  //render the button that redirects to /news/article
  const renderGoToFullArticleBtn = () => (
    <div className="flex justify-end px-6 py-4 mt-auto">
      <Link data-testid={`news-card-btn`} to={`/news/article/${id}`}>
        <button className="flex items-center py-1 px-3 bg-sky-400 hover:bg-sky-500 text-white font-bold rounded">
          Read full article
          <ArrowNarrowRight />
        </button>
      </Link>
    </div>
  );

  return (
    <div
      key={`news-card`}
      className="flex flex-col rounded overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-shadow"
      onClick={handleOnClickCard}
    >
      {renderImage()}
      {renderContent()}
      {renderGoToFullArticleBtn()}
    </div>
  );
};

NewsCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    urlToImage: PropTypes.string,
    publishedAt: PropTypes.string,
    author: PropTypes.string,
    content: PropTypes.string,
    sorce: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
};
export default memo(NewsCard);
