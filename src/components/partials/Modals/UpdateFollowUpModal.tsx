import { KTModal } from "@/_metronic/helpers/components/KTModal";
import {
  useFollowUpCreateOneMutation,
  useFollowUpUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { RootState } from "@/app/store/store";
import {
  changeContent,
  changeName,
} from "@/features/reducers/followup/followupReducer";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const UpdateFollowUpModal = ({}: {}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const followUpState = useSelector((state: RootState) => state.followUp);
  const dispatch = useDispatch();

  // const [followUpTamplateCreateOne] = useFollowUpCreateOneMutation();
  const [followUpTamplateUpdateOne] = useFollowUpUpdateOneMutation();

  const handleFollowUpUpdateOne = async () => {
    try {
      await followUpTamplateUpdateOne({
        variables: {
          where: {
            id: followUpState.id,
          },
          data: {
            admin: {
              connect: {
                id: session?.user.id,
              },
            },
            content: {
              set: followUpState.content as string,
            },
            name: {
              set: followUpState.name as string,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      router.reload();
    }
  };

  return (
    <KTModal
      dataBsTarget="kt_edit_follup_modal"
      fade
      modalSize="lg"
      modalCentered
      title="Buat Tamplate FollowUp"
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
        <Buttons
          onClick={() => {
            handleFollowUpUpdateOne();
          }}
          classNames="fw-bold"
        >
          Simpan Perubahan
        </Buttons>
      }
      footerContentCentered
      onClose={() => {}}
      //   onClose={handleModalClose}
    >
      <h4>Shortcode</h4>
      <div className="m-2 d-flex flex-wrap gap-2 mb-5">
        <Buttons
          showIcon
          icon="copy"
          buttonColor="secondary"
          onClick={() => {
            dispatch(changeContent(followUpState.content + "[[nama]]"));
          }}
        >
          {"[[nama]]"}
        </Buttons>
        <Buttons
          showIcon
          icon="copy"
          buttonColor="secondary"
          onClick={() => {
            dispatch(changeContent(followUpState.content + "[[email]]"));
          }}
        >
          {"[[email]]"}
        </Buttons>
        <Buttons
          showIcon
          icon="copy"
          buttonColor="secondary"
          onClick={() => {
            dispatch(
              changeContent(followUpState.content + "[[nomor-telepon]]")
            );
          }}
        >
          {"[[nomor-telepon]]"}
        </Buttons>
        <Buttons
          showIcon
          icon="copy"
          buttonColor="secondary"
          onClick={() => {
            dispatch(
              changeContent(followUpState.content + "[[tanggal-pembelian]]")
            );
          }}
        >
          {"[[tanggal-pembelian]]"}
        </Buttons>
        <Buttons
          showIcon
          icon="copy"
          buttonColor="secondary"
          onClick={() => {
            dispatch(changeContent(followUpState.content + "[[kupon]]"));
          }}
        >
          {"[[kupon]]"}
        </Buttons>
      </div>
      <h4>Nama</h4>
      <input
        type="text"
        placeholder="Masukan nama"
        className="px-4 p-3 form-control-md form-control mb-5"
        value={`${followUpState.name}`}
        onChange={(e) => {
          dispatch(changeName(e.target.value));
        }}
      />
      <h4>Content</h4>
      <div
        style={{
          height: "220px",
        }}
      >
        <Textarea
          placeholder="Masukan content"
          classNames="min-h-200px"
          props={{
            value: followUpState.content,
            onChange: (e: any) => {
              dispatch(changeContent(e.target.value));
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
  );
};
