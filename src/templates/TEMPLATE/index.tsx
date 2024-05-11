import { PageTitle } from "@/_metronic/layout/core";
import { breadcrumbs } from "./Member-view-model";

const MemberPage = ({}) => {
  return (
    <div>
      <PageTitle breadcrumbs={breadcrumbs}>Member</PageTitle>
      <h1>Member Page</h1>
    </div>
  );
};

export default MemberPage;
