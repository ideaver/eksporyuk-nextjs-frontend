import { PageTitle } from "@/_metronic/layout/core";
import { TabLink } from "@/stories/organism/Links/TabLink/TabLink";
import useClassTabBarViewModel, {
  IClassTabBarViewModel,
} from "./ClassTabBar-view-model";

const ClassTabBar = ({ urlType, id }: IClassTabBarViewModel) => {
  const { urls, breadcrumbs } = useClassTabBarViewModel({ urlType, id });

  return (
    <div>
      <PageTitle breadcrumbs={breadcrumbs}>
        {urlType === "create" ? "Tambah Kelas Baru" : "Edit Kelas"}
      </PageTitle>
      <div className="d-lg-flex justify-content-between mb-5">
        <TabLink className="mb-5" links={urls} />
      </div>
    </div>
  );
};

export default ClassTabBar;
