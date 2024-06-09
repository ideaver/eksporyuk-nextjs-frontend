import { PageTitle } from "@/_metronic/layout/core";
import { TabLink } from "@/stories/organism/Links/TabLink/TabLink";

import useClassTabBarViewModel from "./AffiliateTabBar-view-model";

const ClassTabBar = () => {
  const { urls, breadcrumbs } = useClassTabBarViewModel();

  return (
    <div>
      <PageTitle breadcrumbs={breadcrumbs}>
        Tambah Kupon Baru
      </PageTitle>
      <div className="d-lg-flex justify-content-between mb-5">
        <TabLink className="mb-5" links={urls} />
      </div>
    </div>
  );
};

export default ClassTabBar;
