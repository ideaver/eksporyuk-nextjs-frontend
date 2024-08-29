/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTIcon, MessageModel } from "@/_metronic/helpers";
import {
  ChatRoomFindOneQuery,
  FileTypeEnum,
  useMessageCreateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { formatTime } from "@/app/service/utils/timeFormatter";
import clsx from "clsx";
import { Session } from "next-auth";
import { FC, useEffect, useRef, useState } from "react";
import UploadFileModal from "./UploadFileImageModal";
import { postDataAPI } from "@/app/service/api/rest-service";
import { useRouter } from "next/router";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import UploadFileDocumentModal from "./UploadFileDocumentModal";

type Props = {
  isDrawer?: boolean;
  chatRoom: ChatRoomFindOneQuery["chatRoomFindOne"];
  session: Session;
};

const truncateFileName = (fileName: string, maxLength = 20) => {
  if (fileName.length <= maxLength) return fileName;

  const extension = fileName.slice(fileName.lastIndexOf("."));
  const fileNameWithoutExt = fileName.slice(0, fileName.lastIndexOf("."));

  const charsToShow = maxLength - extension.length - 3; // Mengurangi 3 untuk '...'
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  return (
    fileNameWithoutExt.slice(0, frontChars) +
    "..." +
    fileNameWithoutExt.slice(fileNameWithoutExt.length - backChars) +
    extension
  );
};

const ChatInner: FC<Props> = ({ isDrawer = false, chatRoom, session }) => {
  const router = useRouter();

  const [chatUpdateFlag, toggleChatUpdateFlat] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [messageCreateOneMutation, { data, loading, error }] =
    useMessageCreateOneMutation();
  const bottomChatRef = useRef<null | HTMLDivElement>(null);

  // iamge upload
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const uploadFile = async (file: File) => {
    try {
      const form = {
        file: file,
        userId: session?.user?.id,
      };
      const response = await postDataAPI({
        endpoint: "upload/file",
        body: form,
        isMultipartRequest: true,
      });
      return response;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    if (chatRoom) {
      const messages = chatRoom.messages;
      if (messages) {
        const formattedMessages = [...messages]
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
          .map(
            (message) =>
              ({
                user: {
                  email: message.sender.email,
                  name: message.sender.name,
                  online: true,
                  position: "",
                  avatar: message.sender.avatarImageId,
                },
                type: message.senderId == session.user.id ? "out" : "in",
                text: message.content,
                image: message.files?.[0]?.path,
                fileType: message.files?.[0]?.fileType,
                time: formatTime(message.updatedAt),
              } as MessageModel)
          );
        setMessages(formattedMessages.reverse());
        bottomChatRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [chatRoom, session.user.id]);
  const sendMessage = async () => {
    const date = new Date();
    const newMessage: MessageModel = {
      user: {
        email: session.user.email!,
        name: session.user.name!,
        online: true,
        position: "",
        avatar: session.user.image!,
      },
      type: "out",
      text: message,
      time: formatTime(date.toString()),
    };
    try {
      await messageCreateOneMutation({
        variables: {
          data: {
            content: message,
            sender: {
              connect: {
                id: session.user.id,
              },
            },
            chatRoom: {
              connect: {
                id: chatRoom?.id,
              },
            },
          },
        },
      });
      setMessages([...messages, newMessage]);
      toggleChatUpdateFlat(!chatUpdateFlag);
      setMessage("");
      bottomChatRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log(error);
    }
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="card-body"
      id={isDrawer ? "kt_drawer_chat_messenger_body" : "kt_chat_messenger_body"}
    >
      <div
        className={clsx("scroll-y me-n5 pe-5", {
          "h-300px h-lg-auto": !isDrawer,
        })}
        data-kt-element="messages"
        data-kt-scroll="true"
        data-kt-scroll-activate="{default: false, lg: true}"
        data-kt-scroll-max-height="auto"
        data-kt-scroll-dependencies={
          isDrawer
            ? "#kt_drawer_chat_messenger_header, #kt_drawer_chat_messenger_footer"
            : "#kt_header, #kt_app_header, #kt_app_toolbar, #kt_toolbar, #kt_footer, #kt_app_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer"
        }
        data-kt-scroll-wrappers={
          isDrawer
            ? "#kt_drawer_chat_messenger_body"
            : "#kt_content, #kt_app_content, #kt_chat_messenger_body"
        }
        data-kt-scroll-offset={isDrawer ? "0px" : "-2px"}
      >
        {messages.map((message, index) => {
          // const userInfo = userInfos[message.user];
          const userInfo = message.user;
          const state = message.type === "in" ? "info" : "primary";
          const templateAttr = {};
          if (message.template) {
            Object.defineProperty(templateAttr, "data-kt-element", {
              value: `template-${message.type}`,
            });
          }
          const contentClass = `${isDrawer ? "" : "d-flex"} justify-content-${
            message.type === "in" ? "start" : "end"
          } mb-10`;
          return (
            <div
              key={`message${index}`}
              className={clsx("d-flex", contentClass, "mb-10", {
                "d-none": message.template,
              })}
              {...templateAttr}
            >
              <div
                className={clsx(
                  "d-flex flex-column align-items",
                  `align-items-${message.type === "in" ? "start" : "end"}`
                )}
              >
                <div className="d-flex align-items-center mb-2">
                  {message.type === "in" ? (
                    <>
                      <div className="symbol  symbol-35px symbol-circle ">
                        <img
                          alt="Pic"
                          src={userInfo.avatar ?? "/media/avatars/blank.png"}
                        />
                      </div>
                      <div className="ms-3">
                        <a
                          href="#"
                          className="fs-5 fw-bolder text-gray-900 text-hover-primary me-1"
                        >
                          {userInfo.name}
                        </a>
                        <span className="text-muted fs-7 mb-1">
                          {message.time}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="me-3">
                        <span className="text-muted fs-7 mb-1">
                          {message.time}
                        </span>
                        <a
                          href="#"
                          className="fs-5 fw-bolder text-gray-900 text-hover-primary ms-1"
                        >
                          You
                        </a>
                      </div>
                      <div className="symbol  symbol-35px symbol-circle ">
                        <img alt="Pic" src={userInfo.avatar} />
                      </div>
                    </>
                  )}
                </div>

                {message.image && // Check if image exists
                message.fileType !== FileTypeEnum.Jpg &&
                message.fileType !== FileTypeEnum.Png ? (
                  <div className="mt-2">
                    <a
                      href={message.image}
                      download={message.image}
                      className="btn btn-primary"
                      data-bs-toggle="tooltip"
                      title="Kilk untuk download"
                    >
                      <KTIcon
                        iconName="arrow-down"
                        className="fs-4 fw-1 text-white"
                      />
                      {truncateFileName(
                        message.image.split("/").at(-1) ?? "",
                        30
                      )}
                    </a>
                  </div>
                ) : null}

                <img
                  src={message.image}
                  alt=""
                  className="rounded"
                  style={{
                    maxWidth: "500px",
                    maxHeight: "400px",
                    objectFit: "cover",
                  }}
                />
                <div
                  className={clsx(
                    "p-5 rounded",
                    `bg-light-${state}`,
                    "text-dark fw-bold mw-lg-400px",
                    `text-${message.type === "in" ? "start" : "end"}`
                  )}
                  data-kt-element="message-text"
                  dangerouslySetInnerHTML={{ __html: message.text }}
                ></div>
              </div>
            </div>
          );
        })}
        <div ref={bottomChatRef} />
      </div>

      <div
        className="card-footer pt-4"
        id={
          isDrawer
            ? "kt_drawer_chat_messenger_footer"
            : "kt_chat_messenger_footer"
        }
      >
        <textarea
          className="form-control form-control-flush mb-3"
          rows={1}
          data-kt-element="input"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onEnterPress}
        ></textarea>

        <div className="d-flex flex-stack">
          <div className="d-flex align-items-center me-2">
            <button
              className="btn btn-sm btn-icon btn-active-light-primary me-1"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#kt_upload_file_document"
            >
              <i
                className="bi bi-paperclip fs-3"
                data-bs-toggle="tooltip"
                title="Upload File"
              ></i>
            </button>
            <button
              className="btn btn-sm btn-icon btn-active-light-primary me-1"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#kt_upload_file"
              onClick={() => {}}
            >
              <i
                className="bi bi-upload fs-3"
                data-bs-toggle="tooltip"
                title="Upload Gambar"
              ></i>
            </button>
          </div>
          <button
            className="btn btn-primary"
            type="button"
            data-kt-element="send"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
      <UploadFileModal
        errorMessage={errorMessage}
        loading={isLoading}
        handleSend={async (messageModal) => {
          try {
            setIsLoading(true);
            const response = await uploadFile(image!);
            await messageCreateOneMutation({
              variables: {
                data: {
                  content: messageModal,
                  sender: {
                    connect: {
                      id: session.user.id,
                    },
                  },
                  chatRoom: {
                    connect: {
                      id: chatRoom?.id,
                    },
                  },
                  files: {
                    connect: [
                      {
                        path: response?.data,
                      },
                    ],
                  },
                },
              },
            });
            router.reload();

            // setIsLoading(false);
          } catch (error) {
            setErrorMessage("Something error. Please try again");
            setIsLoading(false);
            console.log(error);
          } finally {
            bottomChatRef.current?.scrollIntoView({ behavior: "smooth" });
          }
        }}
        onImageUpload={(fileImage) => {
          setImage(fileImage);
        }}
      />

      <UploadFileDocumentModal
        errorMessage={errorMessage}
        loading={isLoading}
        handleSend={async (messageModal) => {
          try {
            setIsLoading(true);
            const response = await uploadFile(image!);
            await messageCreateOneMutation({
              variables: {
                data: {
                  content: messageModal,
                  sender: {
                    connect: {
                      id: session.user.id,
                    },
                  },
                  chatRoom: {
                    connect: {
                      id: chatRoom?.id,
                    },
                  },
                  files: {
                    connect: [
                      {
                        path: response?.data,
                      },
                    ],
                  },
                },
              },
            });
            router.reload();

            // setIsLoading(false);
          } catch (error) {
            setErrorMessage("Something error. Please try again");
            setIsLoading(false);
            console.log(error);
          } finally {
            bottomChatRef.current?.scrollIntoView({ behavior: "smooth" });
          }
        }}
        onImageUpload={(fileImage) => {
          setImage(fileImage);
        }}
      />
    </div>
  );
};

export { ChatInner };
