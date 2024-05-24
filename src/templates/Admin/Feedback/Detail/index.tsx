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
      <ReplyEmailModal />
    </>
  );
};

const Body = ({ id, data, refetch }: IFeedbackDetail) => {
  const { feedbackUpdateMutation, response } = useFeedbackDetailViewModel();

  return (
    <div className="p-10 d-flex flex-column gap-10">
      <h1>
        {formatCategoryType(data.feedbackFindOne?.FeedbackCategoryTypeEnum)}
      </h1>
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
        {/* <Buttons mode="light" showIcon icon="whatsapp">
          Balas via WhatsApp
        </Buttons> */}
        <Buttons showIcon icon="messages">
          Balas via Live Chat
        </Buttons>
      </div>
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

const ReplyEmailModal = () => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const [message, setMessage] = useState<string>();
  // const { formik, response } = useCategoryForm();
  return (
    <div>
      <form>
        <KTModal
          dataBsTarget="kt_reply_email_modal"
          title="Tambah Kategori"
          fade
          modalCentered
          buttonClose={
            <Buttons
              buttonColor="secondary"
              data-bs-dismiss="modal"
              classNames="fw-bold"
            >
              Batal
            </Buttons>
          }
          buttonSubmit={
            <Buttons data-bs-dismiss="modal" classNames="fw-bold" type="submit">
              Kirim Balasan
            </Buttons>
          }
          footerContentCentered
          modalSize="lg"
        >
          <h4>Shortcode</h4>
          <div className="m-2 d-flex justify-content-start align-content-center gap-2">
            <Buttons showIcon icon="copy" buttonColor="secondary">
              {"{{member name}}"}
            </Buttons>
            <Buttons showIcon icon="copy" buttonColor="secondary">
              {"{{member name}}"}
            </Buttons>
            <Buttons showIcon icon="copy" buttonColor="secondary">
              {"{{member name}}"}
            </Buttons>
          </div>
          <h4>Balasan Feedback</h4>
          <div
            style={{
              height: "220px",
            }}
          >
            <ReactQuill
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
            />
          </div>
        </KTModal>
      </form>
    </div>
  );
};

export default FeedbackDetail;
