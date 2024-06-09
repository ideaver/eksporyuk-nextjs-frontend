/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTIcon } from "@/_metronic/helpers";
import { ChatRoomFindManyQuery } from "@/app/service/graphql/gen/graphql.js";
import { formatDistanceToNow } from "date-fns";
import { id } from "../../../../../../node_modules/date-fns/locale/id.js";
import { Session } from "next-auth";
import useSupportCenterAsideViewModel from "./SupportCenterAside-view-model";
interface ISupportCenterAside {
  children: React.ReactNode;
  data: ChatRoomFindManyQuery["chatRoomFindMany"];
  session: Session;
}

const SupportCenterAside = ({
  children,
  data: chatRoom,
  session,
}: ISupportCenterAside) => {
  const { data, checkIsAdmin, handleChatRoomClick, getActiveChatRoom } =
    useSupportCenterAsideViewModel({
      data: chatRoom,
      session: session,
    });
  return (
    <>
      <div className="d-flex flex-column flex-lg-row">
        {/* Chat List Section */}
        <div className="flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0">
          <div className="card card-flush">
            <div className="card-header pt-7" id="kt_chat_contacts_header">
              <form className="w-100 position-relative" autoComplete="off">
                <KTIcon
                  iconName="magnifier"
                  className="fs-2 text-lg-1 text-gray-500 position-absolute top-50 ms-5 translate-middle-y"
                />

                <input
                  type="text"
                  className="form-control form-control-solid px-15"
                  name="search"
                  placeholder="Search by username or email..."
                />
              </form>
            </div>

            <div className="card-body pt-5" id="kt_chat_contacts_body">
              <div
                className="scroll-y me-n5 pe-5 h-200px h-lg-auto"
                data-kt-scroll="true"
                data-kt-scroll-activate="{default: false, lg: true}"
                data-kt-scroll-max-height="auto"
                data-kt-scroll-dependencies="#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header"
                data-kt-scroll-wrappers="#kt_content, #kt_chat_contacts_body"
                data-kt-scroll-offset="0px"
              >
                {chatRoom?.map((chatRoom, index) => {
                  const isActiveChatRoom =
                    chatRoom.id ===
                    parseInt((getActiveChatRoom() as string) ?? "");
                  const updatedAt = new Date(chatRoom.updatedAt);
                  const timeAgo = formatDistanceToNow(updatedAt, {
                    addSuffix: true,
                    locale: id,
                  });
                  return (
                    <div
                      className={`d-flex flex-stack py-4 ${
                        isActiveChatRoom && "bg-light-primary"
                      }  bg-hover-light-primary rounded p-5`}
                      key={index}
                      onClick={() => handleChatRoomClick(chatRoom.id)}
                    >
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-45px symbol-circle">
                          <img
                            src={
                              checkIsAdmin(chatRoom)?.avatarImageId ??
                              "/media/avatars/blank.png"
                            }
                            alt=""
                            className="symbol-label bg-light-danger text-danger fs-6 fw-bolder"
                          ></img>
                        </div>

                        <div className="ms-5">
                          <div className="d-flex justify-content-between">
                            <a
                              href="#"
                              className="fs-5 fw-bolder text-gray-900 text-hover-primary mb-2"
                            >
                              {checkIsAdmin(chatRoom)?.name ??
                                "Tidak Ditemukan"}
                            </a>
                            <div className="d-flex flex-column align-items-end ms-2">
                              <span className="text-muted fs-7 mb-1">
                                {timeAgo}
                              </span>
                            </div>
                          </div>
                          <div className="fw-bold text-gray-400">
                            {checkIsAdmin(chatRoom)?.email ?? "Tidak Ditemukan"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        {children}
      </div>
    </>
  );
};

export default SupportCenterAside;
