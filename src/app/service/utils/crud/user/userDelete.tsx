import { useUserSoftDeleteForAdminMutation } from "@/app/service/graphql/gen/graphql";
import { useState } from "react";

const useDeleteUser = () => {
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [deleteUserLoading, setDeleteUserModalLoading] = useState(false);
  const [deleteUserSuccess, setDeleteUserSuccess] = useState(false);
  const [delteUserError, setDeleteUserError] = useState("");
  const userSoftDeleteMutation = useUserSoftDeleteForAdminMutation();

  const handleDeleteUser = async (id: string, deleteReason: string) => {
    setDeleteUserModalLoading(true);
    try {
      const response = await userSoftDeleteMutation[0]({
        variables: {
          where: {
            id: id,
          },
          data: {
            deletedReason: {
              set: deleteReason,
            },
          },
        },
      });
      setDeleteUserModalLoading(false);
      if (response.data?.userSoftDeleteForAdmin === true) {
        setShowDeleteUserModal(false);
        setDeleteUserSuccess(true);

        setTimeout(() => {
          setDeleteUserSuccess(false);
        }, 5000);
      }
    } catch (error: any) {
      console.log(error);
      setDeleteUserModalLoading(false);
      setShowDeleteUserModal(false);
      setDeleteUserError(error.toString());
      setTimeout(() => {
        setDeleteUserSuccess(false);
      }, 5000);
    }
  };

  return {
    showDeleteUserModal,
    setShowDeleteUserModal,
    deleteUserLoading,
    deleteUserSuccess,
    handleDeleteUser,
    delteUserError,
  };
};

export default useDeleteUser;
