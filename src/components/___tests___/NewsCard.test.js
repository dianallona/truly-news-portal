import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { getNewsList } from "../../___mocks___/testData";
import NewsCard from "../newsCard/NewsCard";

describe("<NewsCard />", () => {
  delete window.location;
  window.location = { reload: jest.fn() };
  const newsList = getNewsList(5);
  it("should render NewsCard component", () => {
    const { container } = renderWithProviders(
      <NewsCard article={newsList.news.articles[0]} index={0} />,
      {
        preloadedState: newsList,
      }
    );

    expect(container).toBeInTheDocument();
  });

  it.each([0, 1, 2, 3, 4])(`should render Newscard %i`, (index) => {
    renderWithProviders(
      <NewsCard article={newsList.news.articles[index]} id={index} />,
      {
        preloadedState: newsList,
      }
    );

    const newsCardImg = screen.queryByTestId(`news-card-img`);
    const newsCardTitle = screen.queryByTestId(`news-card-title`);
    const newsCardDescription = screen.queryByTestId(`news-card-description`);
    const newsCardBtn = screen.queryByTestId(`news-card-btn`);

    expect(newsCardImg).not.toBeNull();
    expect(newsCardTitle).toHaveTextContent(`Test title ${index}`);
    expect(newsCardDescription).toHaveTextContent(`Test description ${index}`);
    expect(newsCardBtn).toHaveTextContent(`Read full article`);
  });
});
