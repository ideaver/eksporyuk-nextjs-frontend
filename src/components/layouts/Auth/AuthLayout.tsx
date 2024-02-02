import { AppLogo } from "@/stories/atoms/AppLogo/AppLogo";
import Link from "next/link";
import React, { useEffect} from "react";

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.height = "100%";
    }
    return () => {
      if (root) {
        root.style.height = "auto";
      }
    };
  }, []);

  return (
    <div className="d-flex flex-column flex-lg-row flex-column-fluid h-100">
      {/* begin::Body */}
      <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1">
        {/* begin::Form */}
        <div className="d-flex flex-center flex-column flex-lg-row-fluid">
          {/* begin::Wrapper */}
          <div className="w-lg-500px p-10">{children}</div>
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}

        {/* begin::Footer */}
        <div className="d-flex flex-center flex-wrap px-5">
          {/* begin::Links */}
          <div className="d-flex fw-semibold text-primary fs-base">
            <Link href="#" className="px-5" target="_blank">
              Syarat & Ketentuan
            </Link>

            <Link href="#" className="px-5" target="_blank">
              Contact Us
            </Link>
          </div>
          {/* end::Links */}
        </div>
        {/* end::Footer */}
      </div>
      {/* end::Body */}

      {/* begin::Aside */}
      <div
        className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2 vh-100"
        style={{ backgroundImage: `url(${"/media/misc/auth-bg.png"})` }}
      >
        {/* begin::Content */}
        <div className="d-flex flex-column flex-center py-15 px-5 px-md-15 w-100">
          {/* begin::Logo */}
          <AppLogo classNames="mb-12" type="white" size="small" />
          {/* end::Logo */}

          {/* begin::Image */}
          <img
            className="mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20"
            src={"/media/misc/auth-screens.png"}
            alt=""
          />
          {/* end::Image */}

          {/* begin::Title */}
          <h1 className="text-white fs-2qx fw-bolder text-center mb-7">
            Mulai Perjalanan Ekspor Anda
          </h1>
          {/* end::Title */}

          {/* begin::Text */}
          <div className="text-white fs-base text-center">
            Sudah ada,{" "}
            <span className="opacity-75-hover text-warning fw-bold me-1">
              2600+ Orang
            </span>
            yang bergabung di komunitas{" "}
            <span className="opacity-75-hover text-warning fw-bold me-1">
              EksporYuk
            </span>
            sejak dibuka bulan Februari 2022. Jadilah bagian dari mereka dan dan
            <span className="opacity-75-hover text-warning fw-bold me-1">
              mulailah perjalanan Anda menuju kesuksesan ekspor.
            </span>
          </div>
          {/* end::Text */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::Aside */}
    </div>
  );
};

export default AuthLayout;
