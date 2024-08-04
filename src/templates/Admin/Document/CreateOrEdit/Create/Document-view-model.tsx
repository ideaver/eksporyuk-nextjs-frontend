import { postDataAPI } from "@/app/service/api/rest-service";
import {
  useEksporDocumentCreateOneMutation,
  useLocalCommodityCreateOneMutation,
  useSopFileCreateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { ApolloError } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const breadcrumbs = [
  {
    title: "Manajemen Dokumen",
    path: "/admin/document",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];
const useCreateDocumentViewModel = () => {
  const { data: session, status } = useSession();
  //   state SOP
  const [filePDFPreview, setFilePDFPreview] = useState<string | undefined>();
  const [filePDF, setFilePDF] = useState<File | undefined>();
  const [content, setContent] = useState<string | null>(null);
  const [titleSOP, setTitleSOP] = useState<string | null>(null);

  //   state Ekspor dokumen
  const [filePDFPreviewEkspor, setFilePDFPreviewEkspor] = useState<
    string | undefined
  >();
  const [filePDFEkspor, setFilePDFEkspor] = useState<File | undefined>();
  const [titleEkspor, setTitleEkspor] = useState<string | null>(null);

  // state Komoditas ekspor
  const [filePDFPreviewCommodity, setFilePDFPreviewCommodity] = useState<
    string | undefined
  >();
  const [filePDFCommodity, setFilePDFCommudity] = useState<File | undefined>();
  const [titleCommodity, setTitleCommodity] = useState<string | null>(null);
  const [descriptionCommodity, setDescriptionCommodity] = useState<
    string | null
  >(null);
  const [instructionCommodity, setInstructionCommodity] = useState<
    string | null
  >(null);

  const [swalProps, setSwalProps] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [SOPFileCreateOne] = useSopFileCreateOneMutation();
  const [eksporDocumentCreateOne] = useEksporDocumentCreateOneMutation();

  const uploadFile = async (fileImage: File | undefined) => {
    try {
      const form = {
        file: fileImage,
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
  //  sop create one
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFilePDFPreview(file.name);

    const blob = file.slice(0, file.size);
    const newFile = new File([blob as Blob], file.name);

    setFilePDF(newFile);
  };

  const handleSOPFileCreateOne = async () => {
    setIsLoading(true);
    try {
      const response = await uploadFile(filePDF);
      await SOPFileCreateOne({
        variables: {
          data: {
            createdBy: {
              connect: {
                id: session?.user.id,
              },
            },
            title: titleSOP,
            content: content,
            file: {
              connect: {
                path: response?.data,
              },
            },
          },
        },
      });
      setSwalProps({
        show: true,
        title: "Berhasil",
        text: "SOP berhasil ditambahkan",
        icon: "success",
        confirmButtonText: "OK",
      });
      setFilePDFPreview(undefined);
      setFilePDF(undefined);
      setContent(null);
    } catch (error) {
      console.log(error);
      setSwalProps({
        show: true,
        title: "Terjadi kesalahan",
        text: (error as ApolloError).message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  //   ekspor dokumen create one
  const handleFileChangeEkspor = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFilePDFPreviewEkspor(file.name);

    const blob = file.slice(0, file.size);
    const newFile = new File([blob as Blob], file.name);

    setFilePDFEkspor(newFile);
  };

  const handleEksporFileCreateOne = async () => {
    setIsLoading(true);
    try {
      const response = await uploadFile(filePDFEkspor);
      await eksporDocumentCreateOne({
        variables: {
          data: {
            createdBy: {
              connect: {
                id: session?.user.id,
              },
            },
            // content: content,
            title: titleEkspor,
            file: {
              connect: {
                path: response?.data,
              },
            },
          },
        },
      });
      setSwalProps({
        show: true,
        title: "Berhasil",
        text: "Ekspor Dokumen berhasil ditambahkan",
        icon: "success",
        confirmButtonText: "OK",
      });
      setFilePDFPreviewEkspor(undefined);
      setFilePDFEkspor(undefined);
    } catch (error) {
      console.log(error);
      setSwalProps({
        show: true,
        title: "Terjadi kesalahan",
        text: (error as ApolloError).message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChangeCommodity = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFilePDFPreviewCommodity(file.name);

    const blob = file.slice(0, file.size);
    const newFile = new File([blob as Blob], file.name);

    setFilePDFCommudity(newFile);
  };

  const [commodityCreateOne] = useLocalCommodityCreateOneMutation();

  const handleCommodityCreateOne = async () => {
    setIsLoading(true);
    try {
      const response = await uploadFile(filePDFCommodity);
      await commodityCreateOne({
        variables: {
          data: {
            name: titleCommodity ?? "Komoditas",
            description: descriptionCommodity,
            instructionsForUse: instructionCommodity,
            file: {
              connect: {
                path: response?.data,
              },
            },
          },
        },
      });
      setSwalProps({
        show: true,
        title: "Berhasil",
        text: "Komoditas berhasil ditambahkan",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
      setSwalProps({
        show: true,
        title: "Terjadi kesalahan",
        text: (error as ApolloError).message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    titleEkspor,
    setTitleEkspor,
    isLoading,
    content,
    setContent,
    handleSOPFileCreateOne,
    swalProps,
    setSwalProps,
    filePDFPreview,
    filePDF,
    setFilePDF,
    setFilePDFPreview,
    handleFileChange,
    handleEksporFileCreateOne,
    filePDFEkspor,
    filePDFPreviewEkspor,
    handleFileChangeEkspor,
    titleSOP,
    setTitleSOP,
    titleCommodity,
    setTitleCommodity,
    filePDFPreviewCommodity,
    filePDFCommodity,
    handleFileChangeCommodity,
    descriptionCommodity,
    setDescriptionCommodity,
    instructionCommodity,
    setInstructionCommodity,
    handleCommodityCreateOne,
  };
};

export default useCreateDocumentViewModel;
