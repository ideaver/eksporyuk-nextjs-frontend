import { ChatRoomFindManyQuery } from "@/app/service/graphql/gen/graphql";
import { Session } from "next-auth";
import { useRouter } from "next/router";

interface ISupportCenterAsideViewModel {
  data: ChatRoomFindManyQuery['chatRoomFindMany'];
  session: Session;
}

const useSupportCenterAsideViewModel = ({
  data,
  session,
}: ISupportCenterAsideViewModel) => {
  const router = useRouter();
  const activeChatRoomId = Number(router.query.activeChatRoom);

  const checkIsAdmin = (chatRoom: any) => {
    return chatRoom.participants?.filter(
      (participant: any) => participant.id !== session?.user.id
    )[0];
  };

  const handleChatRoomClick = (chatRoomId: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, activeChatRoom: chatRoomId },
    });
  };

  const getActiveChatRoom = () => {
    return router.query.activeChatRoom;
  };

  return {
    data,
    session,
    checkIsAdmin,
    activeChatRoomId,
    handleChatRoomClick,
    getActiveChatRoom,
  };
};

export default useSupportCenterAsideViewModel;
