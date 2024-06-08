import {
  useUserFindOneQuery,
  useUserSoftDeleteMutation,
} from "@/app/service/graphql/gen/graphql";
import { AppLogo } from "@/stories/atoms/AppLogo/AppLogo";
import { useState } from "react";
import Swal from "sweetalert2";

const AccountDeletion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    data: findAccount,
    loading: findAccountLoading,
    error: findAccountError,
  } = useUserFindOneQuery({
    variables: {
      where: {
        email: email,
      },
    },
  });
  const [deleteAccount] = useUserSoftDeleteMutation({
    onCompleted: () => {
      Swal.fire({
        title: "Berhasil",
        text: "Akun anda berhasil di hapus",
        icon: "success",
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    },
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!findAccount?.userFindOne) {
    Swal.fire({
      title: "Apakah Anda yakin untuk menghapus Akun?",
      text: "Anda tidak bisa mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus itu!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (
          findAccount !== undefined &&
          findAccount?.userFindOne !== undefined
        ) {
          deleteAccount({
            variables: {
              where: {
                id: findAccount?.userFindOne?.id,
              },
              data: {
                deletedReason: {
                  set: "User requested account deletion",
                },
                password: {
                  set: password,
                },
              },
            },
          });
        }

        // Reset form fields
        // setEmail("");
        // setPassword("");
      }
    });
    //   return;
    // }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 container">
        <div className="row g-0">
          <div className="col-md-6 p-5 border-end">
            <form className="rounded-3" onSubmit={handleFormSubmit}>
              <AppLogo
                customUrlLogo="/images/logo/EksporYukLogo-Mobile.png"
                size="small"
              ></AppLogo>
              <h1 className="mb-4 mt-5">Hapus Akun EksporYuk</h1>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-danger">
                Hapus Akun
              </button>
            </form>
          </div>
          <div className="col-md-6 p-5">
            <h2 className="mb-4">About Account Deletion</h2>
            <p className="mb-3 text-muted">
              This page allows you to delete your account from our application.
              It is designed to be compliant with Google Play Store's User Data
              policy, specifically the section on "Managing and deleting user
              data".
            </p>
            <p className="mb-3 text-muted">
              The process is simple. You just need to confirm your identity by
              entering your email and password. Once you submit the form, a
              warning message will be displayed, asking you to confirm that you
              want to delete your account. This is to ensure that you do not
              accidentally delete your account.
            </p>
            <p className="mb-3 text-muted">
              If you confirm the action, the application will delete your
              account. We use a soft delete method, which means that your data
              is not immediately removed from our database. Instead, a "deleted"
              flag is set on your account, and the reason for the deletion is
              recorded. This allows for the possibility of restoring your
              account if necessary.
            </p>
            <p className="mb-3 text-muted">
              After the account is deleted, a success message will be displayed
              to you. If there is an error during the deletion process, an error
              message will be displayed.
            </p>
            <p className="text-muted">
              This page is designed to respect your privacy and control over
              your data. It provides a clear and straightforward way for you to
              delete your account if you choose to do so.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDeletion;
