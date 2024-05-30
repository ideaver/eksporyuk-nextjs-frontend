import AsideProductLayout from "@/components/layouts/Aside/Products/ClassAside";
import ClassInformation from "@/templates/Admin/Course/CreateOrEdit/Information";
import { NextPage } from "next";

const InformationPage: NextPage = () => {
  return (
    <AsideProductLayout>
      <ClassInformation />
    </AsideProductLayout>
  );
};

export default InformationPage;
