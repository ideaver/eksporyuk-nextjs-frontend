/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
// import {useAuth} from '../../../../app/modules/auth'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const HeaderUserMenu: FC = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
        data-kt-menu="true"
        data-popper-placement="bottom-start"
      >
        <div className="menu-item px-3">
          <div className="menu-content d-flex align-items-center px-3">
            <div className="symbol symbol-50px me-5">
              <img
                alt="Logo"
                src={session?.user.image ?? "/media/avatars/150-1.jpg"}
              />
            </div>

            <div className="d-flex flex-column">
              <div className="fw-bolder d-flex align-items-center fs-5">
                {/* {currentUser?.first_name} {currentUser?.first_name} */}
                {session?.user.name}
                <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">
                  {session?.user.role}
                </span>
              </div>
              <a
                href="#"
                className="fw-bold text-muted text-hover-primary fs-7"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "170px", // adjust this value as needed
                  display: "block", // ensure it's a block element
                }}
              >
                {/* {currentUser?.email} */}
                {session?.user.email}aaaaaaaaaaaaaaaaaa
              </a>
            </div>
          </div>
        </div>

        <div className="separator my-2"></div>

        <div className="menu-item px-5">
          <Link href={"/crafted/pages/profile"} className="menu-link px-5">
            Profil Saya
          </Link>
        </div>

        <div className="menu-item px-5 my-1">
          <Link href="/crafted/account/settings" className="menu-link px-5">
            Pengaturan Akun
          </Link>
        </div>
        <div className="separator my-2"></div>

        <div className="menu-item px-5">
          {/* <a onClick={logout} className='menu-link px-5'>
          Sign Out
        </a> */}
          <a
            // data-bs-target="#kt_logout_modal"
            // data-bs-toggle="modal"
            className="menu-link px-5"
            onClick={() => signOut()}
          >
            Keluar Akun
          </a>
        </div>
      </div>
    </>
  );
};

export { HeaderUserMenu };
