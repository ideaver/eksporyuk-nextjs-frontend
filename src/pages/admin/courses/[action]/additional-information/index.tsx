import AsideProductLayout from "@/components/layouts/Aside/Products/ClassAside";
import CourseAdditionalInformation from "@/templates/Admin/Course/CreateOrEdit/AdditionalInformation";
import { NextPage } from "next";

const AdditionalInformationPage: NextPage = () => {
  return (
    <AsideProductLayout>
      <CourseAdditionalInformation />
    </AsideProductLayout>
  );
};

export default AdditionalInformationPage;
