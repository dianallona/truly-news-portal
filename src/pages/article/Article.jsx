import moment from "moment";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as IconChevronRight } from "../../assets/icons/chevron-right.svg";

const Article = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const { articles = [] } = useSelector((state) => state.news);
  const {
    author = "Unknown author",
    title = "",
    urlToImage = "",
    publishedAt = "",
    content = "",
  } = articles[id] ?? {};

  useEffect(() => {
    /**
     * If articles is empty, navigate back to /news
     * - this is because there is no api call in newsapi that calls for a specific article
     * - state is flushed after reload
     */
    //if articles is empty, navigate back to /news, this is because there is no api call in newsapi that calls for a specific article
    if (articles.length === 0) navigate(`/news`, { replace: true });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articles]);

  //if articles is empty, show empty div
  if (!articles[id]) return <></>;

  //renders the article's image
  const renderArticleImage = () => (
    <img
      className="w-full object-fit object-center max-h-[50vh]"
      src={urlToImage}
      alt=""
    />
  );

  //renders the breadcrumb so that the user could go back home
  // Home > Article
  const renderBreadCrumbs = () => (
    <div className="flex flex-row mb-6 font-normal text-md items-center mt-2">
      <a className="pr-1 font-semibold text-blue-700 mr-1" href="/news">
        Home
      </a>
      <IconChevronRight />
      Article
    </div>
  );

  //renders the article's title
  const renderTitle = () => (
    <h3 className="mt-3 text-4xl font-bold text-left">{title}</h3>
  );

  //renders the article's description
  const renderArticleDesc = () => (
    <>
      <p className="mt-2 text-gray-600 font-thin text-base">
        {moment(publishedAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}
      </p>
      <p className="flex mt-3 font-thin text-base">
        by: <span className="ml-1 font-normal text-base">{author}</span>
      </p>
    </>
  );

  //renders the article's content
  const renderContent = () => <p className="mt-[3rem] text-lg">{content}</p>;

  return (
    <div
      data-testid="article-page"
      className="flex flex-col w-screen px-[30rem] pt-[3rem]"
    >
      {renderArticleImage()}
      {renderBreadCrumbs()}
      {renderTitle()}
      {renderArticleDesc()}
      {renderContent()}
    </div>
  );
};

export default Article;
