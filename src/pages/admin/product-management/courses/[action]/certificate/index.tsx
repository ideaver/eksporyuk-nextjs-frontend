import AsideProductLayout from "@/components/layouts/Aside/Products/ClassAside";
import Certificate from "@/templates/Admin/Course/CreateOrEdit/Certificate";
import { NextPage } from "next";

const CertificatePage: NextPage = () => {
    return (
        <AsideProductLayout>
          <Certificate />
        </AsideProductLayout>
      );
};

export default CertificatePage;
