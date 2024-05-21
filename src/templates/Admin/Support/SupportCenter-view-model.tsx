import { useChatRoomFindOneQuery } from "@/app/service/graphql/gen/graphql";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

const useSupportCenterViewModel = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const getActiveChatRoom = useCallback(() => {
    return router.query.activeChatRoom;
  }, [router.query.activeChatRoom]);

  const chatRoomFindOne = useChatRoomFindOneQuery({
    variables: {
      where: {
        id: Number(getActiveChatRoom()),
      },
      
    },
  });

  const checkIsAdmin = (chatRoom: any) => {
    return chatRoom?.participants?.filter(
      (participant: any) => participant.id !== session?.user.id
    )[0];
  };

  useEffect(() => {
    if (getActiveChatRoom()) {
      chatRoomFindOne.refetch();
    }
  }, [chatRoomFindOne, getActiveChatRoom]);

  return {
    session,
    getActiveChatRoom,
    chatRoomFindOne,checkIsAdmin, router
  };
};

export default useSupportCenterViewModel;
