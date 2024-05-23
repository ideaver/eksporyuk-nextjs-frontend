import {
  SortOrder,
  useChatRoomFindManyQuery,
} from "@/app/service/graphql/gen/graphql";
import SupportCenterAside from "@/components/layouts/Aside/Chat/Support/SupportCenterAside";
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import SupportCenter from "@/templates/Admin/Support";
import { NextPage } from "next";
import { useSession } from "next-auth/react";

const SupportCenterPage: NextPage = () => {
  const { data: session, status } = useSession();

  const { data, loading, error } = useChatRoomFindManyQuery({
    variables: {
      where: {
        participants: {
          some: {
            id: {
              equals: session?.user?.id,
            },
          },
        },
      },
      orderBy: [
        {
          updatedAt: SortOrder.Desc,
        },
      ],
    },
  });
  return (
    <>
      {session == null && <LoadingUI error="Unauthorized" loading={false} />}
      {data == null && <LoadingUI error={error?.message} loading={loading} />}
      {data != null && session != null && (
        <SupportCenterAside data={data.chatRoomFindMany} session={session}>
          <SupportCenter session={session}/>
        </SupportCenterAside>
      )}
    </>
  );
};

export default SupportCenterPage;
