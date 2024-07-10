import { KTModal } from "@/_metronic/helpers/components/KTModal";
import {
  useFollowUpCreateOneMutation,
  UserRoleEnum,
} from "@/app/service/graphql/gen/graphql";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export const CreateFollowUpAffiliatorModal = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [tamplateName, setTamplateName] = useState("");
  const [tamplateContent, setTamplateContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [followUpTamplateCreateOne] = useFollowUpCreateOneMutation();

  const handleFollowUpCreateOne = async () => {
    setIsLoading(true);
    try {
      await followUpTamplateCreateOne({
        variables: {
          data: {
            forRole: UserRoleEnum.Affiliator,
            admin: {
              connect: {
                id: session?.user.id,
              },
            },
            content: tamplateContent,
            name: tamplateName,
          },
        },
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      router.reload();
    }
  };

  return (
    <KTModal
      dataBsTarget="kt_create_follup_modal"
      fade
      modalSize="lg"
      modalCentered
      title="Buat Tamplate Follow Up Affiliator"
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
        isLoading ? (
          <>
            {" "}
            <Buttons classNames="fw-bold" buttonColor="secondary">
              Loading..
            </Buttons>
          </>
        ) : (
          <Buttons onClick={handleFollowUpCreateOne} classNames="fw-bold">
            Buat
          </Buttons>
        )
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
            setTamplateContent((prevMessage) => prevMessage + "[[nama]]");
          }}
        >
          {"[[nama]]"}
        </Buttons>
        <Buttons
          showIcon
          icon="copy"
          buttonColor="secondary"
          onClick={() => {
            setTamplateContent((prevMessage) => prevMessage + "[[email]]");
          }}
        >
          {"[[email]]"}
        </Buttons>
        <Buttons
          showIcon
          icon="copy"
          buttonColor="secondary"
          onClick={() => {
            setTamplateContent(
              (prevMessage) => prevMessage + "[[nomor-telepon]]"
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
            setTamplateContent((prevMessage) => prevMessage + "[[tanggal]]");
          }}
        >
          {"[[tanggal]]"}
        </Buttons>
        <Buttons
          showIcon
          icon="copy"
          buttonColor="secondary"
          onClick={() => {
            setTamplateContent(
              (prevMessage) => prevMessage + "[[nama-produk]]"
            );
          }}
        >
          {"[[nama-produk]]"}
        </Buttons>
        <Buttons
          showIcon
          icon="copy"
          buttonColor="secondary"
          onClick={() => {
            setTamplateContent(
              (prevMessage) => prevMessage + "[[total-order]]"
            );
          }}
        >
          {"[[total-order]]"}
        </Buttons>
        <Buttons
          showIcon
          icon="copy"
          buttonColor="secondary"
          onClick={() => {
            setTamplateContent(
              (prevMessage) => prevMessage + "[[jenis-produk]]"
            );
          }}
        >
          {"[[jenis-produk]]"}
        </Buttons>
        <Buttons
          showIcon
          icon="copy"
          buttonColor="secondary"
          onClick={() => {
            setTamplateContent(
              (prevMessage) => prevMessage + "[[id-invoice-produk]]"
            );
          }}
        >
          {"[[id-invoice-produk]]"}
        </Buttons>
        <Buttons
          showIcon
          icon="copy"
          buttonColor="secondary"
          onClick={() => {
            setTamplateContent((prevMessage) => prevMessage + "[[kupon]]");
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
        value={`${tamplateName}`}
        onChange={(e) => {
          setTamplateName(e.target.value);
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
            value: tamplateContent,
            onChange: (e: any) => {
              setTamplateContent(e.target.value);
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
