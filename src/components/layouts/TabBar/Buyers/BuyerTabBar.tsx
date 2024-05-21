import { PageTitle } from "@/_metronic/layout/core";
import { TabLink } from "@/stories/organism/Links/TabLink/TabLink";
import useClassTabBarViewModel, {
  IClassTabBarViewModel,
} from "./BuyerTabBar-view-model";

const BuyerTabBar = ({ id }: IClassTabBarViewModel) => {
  const { urls, breadcrumbs } = useClassTabBarViewModel({ id });

  return (
    <div>
      <PageTitle breadcrumbs={breadcrumbs}>Form Buyer</PageTitle>
      <div className="d-lg-flex justify-content-between mb-5">
        <TabLink className="mb-5" links={urls} />
      </div>
    </div>
  );
};

export default BuyerTabBar;
