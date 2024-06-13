import AsideProductLayout from "@/components/layouts/Aside/Products/ClassAside";
import CourseSettings from "@/templates/Admin/Course/CreateOrEdit/Settings";
import { NextPage } from "next";

const InformationPage: NextPage = () => {
  return (
    <AsideProductLayout>
      <CourseSettings />
    </AsideProductLayout>
  );
};

export default InformationPage;
