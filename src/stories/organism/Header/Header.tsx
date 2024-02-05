/* eslint-disable react-hooks/exhaustive-deps */
import { KTIcon } from "@/_metronic/helpers";
import { useLayout } from "@/_metronic/layout/core";
import { HeaderToolbar } from "@/stories/molecules/Header/HeaderToolbar/HeaderToolbar";
import clsx from "clsx";
import Link from "next/link";

export function Header() {
  const { config, classes, attributes } = useLayout();
  const { aside } = config;

  return (
    <div
      id="kt_header"
      className={clsx(
        "header",
        classes.header.join(" "),
        "align-items-stretch"
      )}
      {...attributes.headerMenu}
    >
      {/* begin::Brand */}
      <div className="header-brand">
        {/* begin::Logo */}
        <Link href="/">
          <img
            alt="Logo"
            src={"/images/logo/logo-white.png"}
            className="h-35px h-lg-35px"
          />
        </Link>
        {/* end::Logo */}

        {aside.minimize && (
          <div
            id="kt_aside_toggle"
            className="btn btn-icon w-auto px-0 btn-active-color-primary aside-minimize"
            data-kt-toggle="true"
            data-kt-toggle-state="active"
            data-kt-toggle-target="body"
            data-kt-toggle-name="aside-minimize"
          >
            <KTIcon
              iconName="exit-left"
              className="fs-1 me-n1 minimize-default"
            />
            <KTIcon iconName="entrance-left" className="fs-1 minimize-active" />
          </div>
        )}

        {/* begin::Aside toggle */}
        <div
          className="d-flex align-items-center d-lg-none ms-n3 me-1"
          title="Show aside menu"
        >
          <div
            className="btn btn-icon btn-active-color-primary w-30px h-30px"
            id="kt_aside_mobile_toggle"
          >
            <KTIcon iconName="abstract-14" className="fs-1" />
          </div>
        </div>
        {/* end::Aside toggle */}
      </div>
      {/* end::Brand */}
      <HeaderToolbar />
    </div>
  );
}
