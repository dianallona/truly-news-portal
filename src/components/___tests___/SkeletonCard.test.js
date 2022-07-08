import { renderWithProviders } from "../../utils/test-utils";
import SkeletonCard from "../skeletonCard/SkeletonCard";
describe("<SkeletonCard />", () => {
  it("should render SkeletonCard component", () => {
    const { container } = renderWithProviders(<SkeletonCard />);

    expect(container).toBeInTheDocument();
  });
});
