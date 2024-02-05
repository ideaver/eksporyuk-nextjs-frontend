import { useEffect } from "react";
import { useRouter } from "next/router";
import { MenuComponent } from "@/_metronic/assets/ts/components";
import { AsideDefault } from "@/stories/organism/Aside/AsideDefault/AsideDefault";
import { Header } from "@/stories/organism/Header/Header";
import { PageDataProvider } from "@/_metronic/layout/core";
import { Content } from "@/_metronic/layout/components/Content";
import { ScrollTop } from "@/_metronic/layout/components/ScrollTop";

interface MasterLayoutProps {
  children?: React.ReactNode;
}

const MasterLayout = ({ children }: MasterLayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization();
    }, 500);
  }, [router]);

  return (
    <PageDataProvider>
      <div className="page d-flex flex-row flex-column-fluid">
        <AsideDefault />
        <div
          className="wrapper d-flex flex-column flex-row-fluid"
          id="kt_wrapper"
        >
          <Header />

          <div
            id="kt_content"
            className="content d-flex flex-column flex-column-fluid"
          >
            <div className="post d-flex flex-column-fluid" id="kt_post">
              <Content>{children}</Content>
            </div>
          </div>
        </div>
      </div>

      <ScrollTop />
    </PageDataProvider>
  );
};

export { MasterLayout };
