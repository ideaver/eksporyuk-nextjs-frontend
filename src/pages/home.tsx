import { PageTitle } from "@/_metronic/layout/core";

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
