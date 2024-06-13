import { PageTitle } from "@/_metronic/layout/core";
import useFeedbackDetailViewModel, {
  IFeedbackDetail,
  breadcrumbs,
} from "./FeedbackDetail-view-model";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { useRouter } from "next/router";
import { formatCategoryType } from "@/app/service/utils/categoryTypeEnumFormatter";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { formatTime } from "@/app/service/utils/timeFormatter";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { useEffect, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { preventOverflow } from "@popperjs/core";
import { useSession } from "next-auth/react";
import { ChatRoomTypeEnum } from "@/app/service/graphql/gen/graphql";
import { CreateFollowUpModal } from "@/components/partials/Modals/CreateFollowUpModal";
import { UpdateFollowUpModal } from "@/components/partials/Modals/UpdateFollowUpModal";
import { FollowUpModal } from "@/components/partials/Modals/FollowUpModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { changeFollowUpTamplate } from "@/features/reducers/followup/followupReducer";

const FeedbackDetail = ({ id, data, refetch }: IFeedbackDetail) => {
  const { feedbackUpdateMutation } = useFeedbackDetailViewModel();
  useEffect(() => {
    try {
      feedbackUpdateMutation({
        variables: {
          where: {
            id: parseInt(id as string),
          },
          data: {
            isRead: {
              set: true,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }, [feedbackUpdateMutation, id]);
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Feedback Detail</PageTitle>
      <KTCard>
        <KTCardBody className="p-0">
          <Head />
          <Body data={data} id={id} refetch={refetch} />
        </KTCardBody>
      </KTCard>
      <ReplyEmailModal id={id} />
    </>
  );
};

const Body = ({ id, data, refetch }: IFeedbackDetail) => {
  const {
    feedbackUpdateMutation,
    response,
    replyViaLiveChat,
    setLoadingLiveChat,
    loadingLiveChat,
    followUpFindMany,
    handleChangeFollowUpState,
    handleDeleteFollowUp,
    handleEditState,
    handleSendFollowUp,
    handleFollupChange,
  } = useFeedbackDetailViewModel();
  const followUpState = useSelector((state: RootState) => state.followUp);
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <div className=" d-flex flex-column gap-10">
      <div className="p-5 m-5 d-flex flex-column gap-10 border-bottom ">
        <h1>{formatCategoryType(data.feedbackFindOne?.feedbackCategory)}</h1>
        <div className="d-flex align-items-center justify-content-between gap-6">
          <div className="d-flex align-items-center gap-6">
            <div className="symbol symbol-50px me-2">
              <span className="symbol-label bg-gray-600 ">
                <img
                  src={
                    data.feedbackFindOne?.user.avatarImageId ??
                    "/media/avatars/300-1.jpg"
                  }
                  width={50}
                  height={50}
                  alt=""
                  className="rounded"
                />
              </span>
            </div>
            <h4>{data.feedbackFindOne?.user.name}</h4>
            <p className="fs-5 mt-1 text-muted">
              {formatTime(data.feedbackFindOne?.createdAt)}
            </p>
          </div>
          <div className="d-flex align-items-center gap-6">
            <p className="fs-5 text-muted d-flex align-items-center justify-items-center justify-content-center my-2">
              {formatDate(data.feedbackFindOne?.createdAt)}{" "}
            </p>
            <Buttons
              mode="light"
              onClick={async () => {
                try {
                  await feedbackUpdateMutation({
                    variables: {
                      where: {
                        id: parseInt(id as string),
                      },
                      data: {
                        isCleared: {
                          set: !data.feedbackFindOne?.isCleared,
                        },
                      },
                    },
                  });

                  await refetch();
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <KTIcon
                iconName="check-circle"
                className={`fs-3  ${
                  data.feedbackFindOne?.isCleared ? null : "text-dark"
                }`}
              />
            </Buttons>
          </div>
        </div>
        <p className="fs-4">{data.feedbackFindOne?.content}</p>
        <div className="d-flex justify-content-end gap-3">
          <Buttons
            mode="light"
            showIcon
            icon="sms"
            data-bs-toggle="modal"
            data-bs-target="#kt_reply_email_modal"
          >
            Balas via Email
          </Buttons>
          <Buttons
            mode="light"
            showIcon
            icon="whatsapp"
            data-bs-toggle="modal"
            data-bs-target="#kt_follup_modal"
            onClick={() => {
              handleChangeFollowUpState({
                name: data.feedbackFindOne?.user.name as string,
                date: data.feedbackFindOne?.createdAt as string,
                phone: `${data.feedbackFindOne?.user.phone?.phoneNumber}`,
                email: data.feedbackFindOne?.user.email as string,
                coupon: "Tidak Ada Coupon",
              });
            }}
          >
            Balas via WhatsApp
          </Buttons>
          <Buttons
            showIcon
            disabled={loadingLiveChat}
            icon="messages"
            onClick={async () => {
              setLoadingLiveChat(true);
              console.log(
                session?.user.id,
                "nnnnn",
                data.feedbackFindOne?.userId
              );
              try {
                const response = await replyViaLiveChat({
                  variables: {
                    data: {
                      participants: {
                        connect: [
                          {
                            id: session?.user.id,
                          },
                          {
                            id: data.feedbackFindOne?.userId,
                          },
                        ],
                      },
                      type: ChatRoomTypeEnum.Support,
                      name: "support",
                    },
                  },
                });
                await router.push(
                  "/admin/support?activeChatRoom=" +
                    response.data?.chatRoomCreateOne?.id
                );
              } catch (error) {
                console.log(error);
              } finally {
                setLoadingLiveChat(false);
                router.reload();
              }
            }}
          >
            Balas via Live Chat
          </Buttons>
        </div>
      </div>
      {/* reply admin */}
      {data.feedbackFindOne?.resolvedBy ? (
        <div className="p-10 d-flex flex-column gap-10 border-bottom">
          <h1>Balasan Admin</h1>
          <div className="d-flex align-items-center justify-content-between gap-6">
            <div className="d-flex align-items-center gap-6">
              <div className="symbol symbol-50px me-2">
                <span className="symbol-label bg-gray-600 ">
                  <img
                    src={
                      data.feedbackFindOne?.resolvedBy?.user.avatarImageId ??
                      "/media/avatars/300-1.jpg"
                    }
                    width={50}
                    height={50}
                    alt=""
                    className="rounded"
                  />
                </span>
              </div>
              <div>
                <h4>{data.feedbackFindOne?.resolvedBy?.user.name}</h4>
                <h6 className="text-muted">Balasan via {"Email"}</h6>
              </div>
              <p className="fs-5 mt-1 text-muted">
                {formatTime(data.feedbackFindOne?.feedbackRepliedAt)}
              </p>
            </div>
            <div className="d-flex align-items-center gap-6">
              <p className="fs-5 text-muted d-flex align-items-center justify-items-center justify-content-center my-2">
                {formatDate(data.feedbackFindOne?.feedbackRepliedAt)}{" "}
              </p>
            </div>
          </div>
          <p className="fs-4">{data.feedbackFindOne?.feedbackReplied}</p>
        </div>
      ) : null}
      <FollowUpModal
        follupValues={
          followUpFindMany.data?.followUpFindMany?.map(
            (e) => e.name
          ) as string[]
        }
        value={followUpState.followUpTamplate ?? ""}
        // follupValues={follupValues}
        selectedFollupValue={followUpState.selectedFollowUpValue}
        handleFollupChange={handleFollupChange}
        onChange={(e: any) => {
          dispatch(changeFollowUpTamplate(e.target.value));
        }}
        handleEditState={handleEditState}
        handleDeleteFollowUp={handleDeleteFollowUp}
        linkAPIWhatsapp={handleSendFollowUp()}
      />

      <CreateFollowUpModal />
      <UpdateFollowUpModal />
    </div>
  );
};

const Head = () => {
  const router = useRouter();
  return (
    <div className="p-4 border-bottom">
      <button
        className="btn"
        onClick={() => {
          router.back();
        }}
      >
        <h1>
          <KTIcon iconName="arrow-left" className="display-6 p-0 text-dark" />
        </h1>
      </button>
    </div>
  );
};

const ReplyEmailModal = ({ id }: { id: string | string[] | undefined }) => {
  // const ReactQuill = useMemo(
  //   () => dynamic(() => import("react-quill"), { ssr: false }),
  //   []
  // );
  const {
    message,
    setMessage,
    setSubject,
    subject,
    replyViaEmail,
    handleUpdateFeedbackEmail,
  } = useFeedbackDetailViewModel();

  return (
    <div>
      <KTModal
        dataBsTarget="kt_reply_email_modal"
        title="Tambah Kategori"
        fade
        onClose={() => {
          setMessage("");
          setSubject("");
        }}
        modalCentered
        buttonClose={
          <Buttons
            buttonColor="secondary"
            data-bs-dismiss="modal"
            classNames="fw-bold"
            onClick={() => {
              setMessage("");
              setSubject("");
            }}
          >
            Batal
          </Buttons>
        }
        buttonSubmit={
          <Buttons
            data-bs-dismiss="modal"
            classNames="fw-bold"
            type="submit"
            onClick={async () => {
              try {
                await replyViaEmail({
                  variables: {
                    feedbackReplyEmail: {
                      feedbackId: parseInt(id as string),
                      content: message,
                      subject,
                    },
                  },
                });
                await handleUpdateFeedbackEmail(parseInt(id as string));
              } catch (error) {
                console.log(error);
              } finally {
                setMessage("");
                setSubject("");
              }
            }}
          >
            Kirim Balasan
          </Buttons>
        }
        footerContentCentered
        modalSize="lg"
      >
        <h4>Shortcode</h4>
        <div className="m-2 d-flex justify-content-start align-content-center gap-2 mb-5">
          <Buttons
            showIcon
            icon="copy"
            buttonColor="secondary"
            onClick={() => {
              setMessage((prevMessage) => prevMessage + "[[member-name]]");
            }}
          >
            {"[[member-name]]"}
          </Buttons>
          <Buttons
            showIcon
            icon="copy"
            buttonColor="secondary"
            onClick={() => {
              setMessage(
                (prevMessage) => prevMessage + "[[feedback-category]]"
              );
            }}
          >
            {"[[feedback-category]]"}
          </Buttons>
          <Buttons
            showIcon
            icon="copy"
            buttonColor="secondary"
            onClick={() => {
              setMessage((prevMessage) => prevMessage + "[[feedback-date]]");
            }}
          >
            {"[[feedback-date]]"}
          </Buttons>
        </div>
        <h4>Subject</h4>
        <input
          type="text"
          placeholder="Masukan subject"
          className="px-4 p-3 form-control-md form-control mb-5"
          value={`${subject}`}
          onChange={(e) => {
            setSubject(e.target.value);
          }}
        />
        <h4>Balasan Feedback</h4>
        <div
          style={{
            height: "220px",
          }}
        >
          <Textarea
            placeholder="Masukan message"
            classNames="min-h-200px"
            props={{
              value: message,
              onChange: (e: any) => {
                setMessage(e.target.value);
              },
            }}
          ></Textarea>
          {/* <ReactQuill
            placeholder="Masukan balasan"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["clean"],
              ],
            }}
            theme="snow"
            value={message}
            style={{ height: "80%" }}
            onChange={(e) => {
              setMessage(e);
            }}
          /> */}
        </div>
      </KTModal>
    </div>
  );
};

export default FeedbackDetail;
