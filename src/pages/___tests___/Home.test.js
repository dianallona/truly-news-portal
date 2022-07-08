import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNews } from "../../hooks/useNews";
import { renderWithProviders } from "../../utils/test-utils";
import { getNewsList } from "../../___mocks___/testData";
import Home from "../home/Home";

const mockedUseNews = useNews;

jest.mock("../../hooks/useNews");

describe("<Home />", () => {
  const newsList = getNewsList(5);

  beforeEach(() => {
    mockedUseNews.mockImplementation(() => ({ isLoading: true }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  delete window.location;
  window.location = { reload: jest.fn() };
  it("should render 8 Skeleton Cards when isLoading is true", () => {
    renderWithProviders(<Home />);
    const skeletonCard = screen.queryAllByTestId("skeleton-card");

    expect(skeletonCard.length).toBe(8);
    expect(useNews).toHaveBeenCalledTimes(1);
  });

  it("should render Home properly", () => {
    mockedUseNews.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: { articles: newsList.news.articles },
    }));
    const { container } = renderWithProviders(<Home />);

    expect(container).toBeInTheDocument();
  });
  it("should render Home with NewsCard properly", () => {
    mockedUseNews.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: { articles: newsList.news.articles },
    }));
    renderWithProviders(<Home />);

    const newsCardImg = screen.getAllByTestId(`news-card-img`);
    const newsCardTitle = screen.getAllByTestId(`news-card-title`);
    const newsCardDescription = screen.getAllByTestId(`news-card-description`);
    const newsCardBtn = screen.getAllByTestId(`news-card-btn`);

    expect(newsCardImg.length).toBe(5);
    expect(newsCardTitle.length).toBe(5);
    expect(newsCardDescription.length).toBe(5);
    expect(newsCardBtn.length).toBe(5);
  });
  it("should render search and sort on Home page properly", async () => {
    mockedUseNews.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: { articles: newsList.news.articles },
    }));

    renderWithProviders(<Home />);

    const user = userEvent.setup();

    const searchInput = screen.getByTestId("home-search-input");
    const searchIcon = screen.getByTestId("home-search-icon");

    //searching
    await user.type(searchInput, "Test");
    expect(searchInput.value).toBe("Test");
    await user.click(searchIcon);

    //sorting
    const sortDropdown = screen.getByTestId("home-sort-dropdown");
    expect(sortDropdown).toBeInTheDocument();
    await user.click(screen.getByText(/Oldest date/i));

    //go back hoome
    const homeLink = screen.getByTestId("home-link");
    await user.click(homeLink);
  });
});
