import { KTIcon } from "@/_metronic/helpers";
import { HeaderUserMenu } from "@/_metronic/partials";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { useSession } from "next-auth/react";

/* eslint-disable jsx-a11y/anchor-is-valid */
const AsideToolbar = () => {
  // Session State
  const { data: session, status } = useSession();
  return (
    <>
      {/*begin::User*/}
      <div className="aside-user d-flex align-items-sm-center justify-content-center py-5">
        {/*begin::Symbol*/}
        <div className="symbol symbol-50px">
          <img
            src={session?.user.image ?? "/media/avatars/150-1.jpg"}
            width={300}
            height={300}
            // fill={true}
            alt=""
          />
        </div>
        {/*end::Symbol*/}

        {/*begin::Wrapper*/}
        <div className="aside-user-info flex-row-fluid flex-wrap ms-5">
          {/*begin::Section*/}
          <div className="d-flex">
            {/*begin::Info*/}
            <div className="flex-grow-1 me-2">
              {/*begin::Username*/}
              <a
                href="#"
                className="text-white text-hover-primary fs-6 fw-bold"
              >
                {session?.user.name}
              </a>
              {/*end::Username*/}

              {/*begin::Description*/}
              <span className="text-gray-600 fw-bold d-block fs-8 mb-1">
                {session?.user.role === "ADMIN"
                  ? "ADMIN"
                  : `ADMIN`}
              </span>
              {/*end::Description*/}

              {/*begin::Label*/}
              <div className="d-flex align-items-center text-success fs-9">
                <span className="bullet bullet-dot bg-success me-1"></span>
                online
              </div>
              {/*end::Label*/}
            </div>
            {/*end::Info*/}

            {/*begin::User menu*/}
            <div className="me-n2">
              {/*begin::Action*/}
              <a
                // href="#"
                className="btn btn-icon btn-sm btn-active-color-primary mt-n2"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-start"
                data-kt-menu-overflow="false"
              >
                <KTIcon iconName="setting-2" className="text-muted fs-1" />
              </a>

              <HeaderUserMenu />
              {/*end::Action*/}
            </div>
            {/*end::User menu*/}
          </div>
          {/*end::Section*/}
        </div>
        {/*end::Wrapper*/}
      </div>
      {/*end::User*/}

      
    </>
  );
};

export { AsideToolbar };
