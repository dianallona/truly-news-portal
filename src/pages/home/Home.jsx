import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as IconChevronRight } from "../../assets/icons/chevron-right.svg";
import { ReactComponent as IconSearch } from "../../assets/icons/search.svg";
import NewsCard from "../../components/newsCard/NewsCard";
import SkeletonCard from "../../components/skeletonCard/SkeletonCard";
import { useNews } from "../../hooks/useNews";
import { setArticles } from "../../redux/news/newsSlice";
import { sortDataByDate } from "../../utils/utils";

export default function Home() {
  const dispatch = useDispatch();

  /**Local States */
  const [articleList, setArticleList] = useState([]);
  const [typedSearch, setTypedSearch] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  /**Custom hooks */
  const { isLoading, isError, data: newsData } = useNews({ search });

  const sortedArticle = useMemo(() => {
    return sortDataByDate(articleList, sortBy);
  }, [articleList, sortBy]);
  useEffect(() => {
    if (!newsData) return;

    dispatch(setArticles(newsData.articles ?? []));
    setArticleList(newsData.articles ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsData]);
  /**
   * Event handlers
   */
  // Handles on click event of the search input
  const handleSearchOnClick = () => setSearch(typedSearch);

  /**
   * Handles on keydown event of search input
   * If the user pressed the `Enter` key, this will set the `search` state
   * @param {MouseEvent} e
   */
  const handleSearchOnKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearch(e.target.value);
    }
    setTypedSearch(e.target.value);
  };

  /**
   * Handles on click event of sort dropdown
   * @param {MouseEvent} e
   */
  const handleOnClickSort = (e) => {
    setSortBy(e.target.value);
  };

  //renders the breadcrumbs for search, only visible after searching
  //Home > Search
  const renderBreadCrumbs = () => (
    <>
      <div className="flex flex-row mb-6 font-normal text-md items-center">
        <a
          data-testid="home-link"
          className="pr-1 font-semibold text-blue-700 mr-1"
          href="/news"
        >
          Home
        </a>
        <IconChevronRight />
        Search
      </div>
      <h3 className="font-bold text-2xl mb-4">Search</h3>
    </>
  );

  //renders search actions, (search input & sort dropdown)
  // sort dropdown is only visible after searching
  const renderSearchActions = () => (
    <div className="flex flex-col md:flex-row w-full h-auto justify-between items-end mb-2">
      <div className="flex flex-row border border-gray-300 hover:border-gray-400 focus:border-gray-600 rounded">
        <button
          data-testid="home-search-icon"
          type="button"
          className="focus:outline-none focus:shadow-outline pl-2"
          onClick={handleSearchOnClick}
        >
          <IconSearch />
        </button>
        <input
          data-testid="home-search-input"
          className="focus:outline-none py-2 px-4 font-normal w-full md:w-auto mb-3 md:mb-0"
          type="text"
          placeholder="Search..."
          onKeyDown={handleSearchOnKeyDown}
        />
      </div>
      {search !== "" && (
        <div>
          <h3 className="text-sm">Sort by:</h3>
          <select
            data-testid="home-sort-dropdown"
            id="small"
            className="dropdown:block focus:shadow-outline relative h-full w-full md:w-auto rounded border border-gray-300 bg-white px-3 py-2 text-sm font-normal leading-relaxed text-gray-800 transition-colors duration-150 hover:border-gray-600 focus:border-gray-900 focus:outline-none"
            onChange={handleOnClickSort}
            defaultValue={"newest"}
            value={sortBy}
          >
            <option value="newest">Newest date</option>
            <option value="oldest">Oldest date</option>
          </select>
        </div>
      )}
    </div>
  );

  //renders search results, only visible after searching
  const renderSearchResult = () => (
    <p className="mt-4">
      <b>{sortedArticle.length}</b> Search results for '<b>{search}</b>'
    </p>
  );

  //renders the page action (breadcrumbs, search, sort dropdown, search result )
  const renderPageAction = () => (
    <div className="flex flex-col">
      {search !== "" && renderBreadCrumbs()}
      {renderSearchActions()}
      {search !== "" && renderSearchResult()}
    </div>
  );

  //renders the page contents
  //if isLoading = render skeleton card, if is not loading render newsCard with the articles's details
  const renderContents = () => (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10 mt-10">
      {/* While the api is loading, render SkeletonCard for lazy loading */}
      {isLoading &&
        [...Array(8)].map((x, i) => (
          <SkeletonCard key={`skeleton-card-${i}`} />
        ))}
      {/* After the api loads, show all the article lists */}
      {!isLoading &&
        sortedArticle.map((_article, id) => (
          <NewsCard key={`news-card-${id}`} article={_article} id={id} />
        ))}
    </div>
  );

  return (
    <div data-testid="home-page" className="flex flex-col w-screen">
      {!isError ? (
        <div className="flex flex-col pb-[4rem] px-[1rem] sm:px-[2rem] md:px-[4rem] lg:px-[8rem] ">
          {renderPageAction()}
          {renderContents()}
        </div>
      ) : (
        <div>There is an error in the API</div>
      )}
    </div>
  );
}
