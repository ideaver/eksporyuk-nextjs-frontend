import { useMentorFindOneQuery } from "@/app/service/graphql/gen/graphql";
import Mentorheader from "@/components/layouts/Header/Mentor/MentorHeader";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import MentorProfilePage from "@/templates/Admin/Mentor/CreateOrEdit/Profile";
import { NextPage } from "next";
import { useRouter } from "next/router";

const DetailProfileMentor: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useMentorFindOneQuery({
    variables: {
      where: {
        id: id as string,
      },
    },
  });
  return (
    <>
      {data == null && <LoadingUI error={error?.message} loading={loading} />}

      {data?.mentorFindOne && (
        <>
          <Mentorheader id={id} data={data} />
          <MentorProfilePage data={data} />
        </>
      )}
    </>
  );
};

export default DetailProfileMentor;
