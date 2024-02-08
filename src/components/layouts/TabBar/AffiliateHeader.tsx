import { TabLink } from "@/stories/organism/Links/TabLink/TabLink";
import useAffiliateHeaderViewModel, {
  IAffiliateHeaderViewModel,
} from "./AffiliateHeader-view-model";

const AffiliateLayout = ({ urlType, id }: IAffiliateHeaderViewModel) => {
  const {
    urls
  } = useAffiliateHeaderViewModel({ urlType, id });
  return (
    <TabLink
      className="mb-10"
      links={urls}
    />
  );
};

export default AffiliateLayout;
