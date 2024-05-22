/* eslint-disable jsx-a11y/anchor-is-valid */
import LoadingUI from "@/components/partials/Handler/LoadingUI";
import { ChatInner } from "./component/ChatInner";
import useSupportCenterViewModel from "./SupportCenter-view-model";
import { Session } from "next-auth";

interface ISupportCenter {
  session: Session;
}
const SupportCenter = ({session}: ISupportCenter) => {
  const { chatRoomFindOne, getActiveChatRoom, checkIsAdmin, router } =
    useSupportCenterViewModel();
  if (chatRoomFindOne.loading)
    return (
      <div className="w-100">
        <LoadingUI error="" loading />
      </div>
    );
  return router.query.activeChatRoom &&
    chatRoomFindOne.data?.chatRoomFindOne != null ? (
    <div className="flex-lg-row-fluid ms-lg-7 ms-xl-10">
      <div className="card" id="kt_chat_messenger">
        <div className="card-header" id="kt_chat_messenger_header">
          <div className="card-title">
            <div className="symbol-group symbol-hover"></div>
            <div className="d-flex justify-content-center flex-column me-3">
              <a
                href="#"
                className="fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-2 lh-1"
              >
                {checkIsAdmin(chatRoomFindOne.data?.chatRoomFindOne)?.name}
              </a>
            </div>
          </div>
        </div>
        <ChatInner chatRoom={chatRoomFindOne.data.chatRoomFindOne} session={session}/>
      </div>
    </div>
  ) : (
    <div className="d-flex ms-lg-7 ms-xl-10 h-500px w-100 justify-content-center align-items-center">
      <h5 className="">Ketuk nama untuk membuka chat</h5>
    </div>
  );
};

export default SupportCenter;
