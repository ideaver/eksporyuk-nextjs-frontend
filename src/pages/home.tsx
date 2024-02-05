import { PageTitle } from "@/_metronic/layout/core";
import { ChartsWidget1 } from "@/_metronic/partials/widgets";
import { MasterLayout } from "@/components/layouts/Master/MasterLayout";

export default function Home() {
  return (
    <>
      {/* <MasterLayout> */}
      <PageTitle
        breadcrumbs={[
          {
            title: "Home",
            path: "/home",
            isSeparator: false,
            isActive: false,
          },
          {
            title: "",
            path: "",
            isSeparator: true,
            isActive: false,
          },
        ]}
      >
        Dashboard
      </PageTitle>
      
      {/* </MasterLayout> */}
    </>
  );
}
