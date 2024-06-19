import { postDataAPI } from "@/app/service/api/rest-service";
import { useUserUpdateOneMutation } from "@/app/service/graphql/gen/graphql";
import { IValidationSchema } from "@/components/partials/Modals/Mutations/EditUserModal";
import { useState } from "react";

const useUserEdit = () => {
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editUserModalLoading, setEditUserModalLoading] = useState(false);
  const [editUserSuccess, setEditUserSuccess] = useState(false);
  const [editUserError, setEditUserError] = useState("");
  const userUpdateOneMutation = useUserUpdateOneMutation();

  const handleUserUpdate = async (
    id: string,
    data: IValidationSchema,
    file: File | undefined
  ) => {
    setEditUserModalLoading(true);
    try {
      let uploadedUrl = null;
      if (file) {
        const uploadFile = await postDataAPI({
          endpoint: "upload/file",
          body: {
            file: file,
          },
          isMultipartRequest: true,
          fields: {
            userId: id,
          },
        });
        uploadedUrl = uploadFile?.data;
      }
      const response = await userUpdateOneMutation[0]({
        variables: {
          where: {
            id: id,
          },
          data: {
            avatarImage: {
              connect: {
                path: uploadedUrl,
              },
            },
            name: {
              set: data.fullName,
            },
            username: {
              set: data.username,
            },
            email: {
              set: data.email,
            },
            gender: {
              set: data?.gender?.value,
            },
            password: {
              set: data.password,
            },
            // deletedAt: {
            //   set: data.deletedReason?.value === "active" ? null : undefined,
            // },
            deletedReason: {
              set:
                data.deletedReason?.value === "active"
                  ? "reActivateUser"
                  : undefined,
            },
            birthDate: {
              set: data.birthDate,
            },
            personalId: {
              set: data.ktpNumber,
            },
            npwpId: {
              set: data.npwpNumber,
            },
            mentor: {
              update: {
                where: {
                  id: {
                    equals: id,
                  },
                },
                data: {
                  description: {
                    set: data.description,
                  },
                },
              },
            },
          },
        },
      });
      if (response.data?.userUpdateOne) {
        setShowEditUserModal(false);
        setEditUserSuccess(true);
        setEditUserModalLoading(false);
      }
    } catch (error: any) {
      setShowEditUserModal(false);
      setEditUserModalLoading(false);
      setEditUserError(error.toString());
    }
  };

  return {
    showEditUserModal,
    setShowEditUserModal,
    editUserModalLoading,
    editUserSuccess,
    setEditUserSuccess,
    editUserError,
    setEditUserError,
    handleUserUpdate,
  };
};

export default useUserEdit;
