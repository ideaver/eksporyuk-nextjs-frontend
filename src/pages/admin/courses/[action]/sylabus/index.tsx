import AsideProductLayout from "@/components/layouts/Aside/Products/ClassAside";
import Sylabus from "@/templates/Admin/Course/CreateOrEdit/Sylabus";
import { NextPage } from "next";

const SylabusPage: NextPage = () => {
  return (
    <AsideProductLayout>
      <Sylabus />
    </AsideProductLayout>
  );
};

export default SylabusPage;
