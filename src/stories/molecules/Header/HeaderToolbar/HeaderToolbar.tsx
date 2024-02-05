/* eslint-disable jsx-a11y/anchor-is-valid */
import { useLayout } from "@/_metronic/layout/core";
import { HeaderTitle } from "../HeaderTitle/HeaderTitle";

const HeaderToolbar = () => {
  const { classes } = useLayout();

  return (
    <div className="toolbar d-flex align-items-stretch">
      {/* begin::Toolbar container */}
      <div
        className={`${classes.headerContainer.join(
          " "
        )} py-6 py-lg-0 d-flex flex-column flex-lg-row align-items-lg-stretch justify-content-lg-between`}
      >
        <HeaderTitle />
      </div>
    </div>
  );
};

export { HeaderToolbar };
