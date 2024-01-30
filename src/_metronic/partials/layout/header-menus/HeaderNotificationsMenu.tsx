/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import { FC } from "react";
import {
  defaultAlerts,
  defaultLogs,
  KTIcon,
  toAbsoluteUrl,
  useIllustrationsPath,
} from "../../../helpers";
import Link from "next/link";

const HeaderNotificationsMenu: FC = () => (
  <div
    className="menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px"
    data-kt-menu="true"
  >
    <div
      className="d-flex flex-column bgi-no-repeat rounded-top"
      style={{
        backgroundImage: `url('${toAbsoluteUrl("/media/misc/pattern-1.jpg")}')`,
      }}
    >
      <h3 className="text-white fw-bold px-9 mt-10 mb-6">
        Notifications <span className="fs-8 opacity-75 ps-3">24 reports</span>
      </h3>

      <ul className="nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-bold px-9">
        <li className="nav-item">
          <a
            className="nav-link text-white opacity-75 opacity-state-100 pb-4"
            data-bs-toggle="tab"
            href="#kt_topbar_notifications_1"
          >
            Alerts
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link text-white opacity-75 opacity-state-100 pb-4 active"
            data-bs-toggle="tab"
            href="#kt_topbar_notifications_2"
          >
            Updates
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link text-white opacity-75 opacity-state-100 pb-4"
            data-bs-toggle="tab"
            href="#kt_topbar_notifications_3"
          >
            Logs
          </a>
        </li>
      </ul>
    </div>

    <div className="tab-content">
      <div
        className="tab-pane fade"
        id="kt_topbar_notifications_1"
        role="tabpanel"
      >
        <div className="scroll-y mh-325px my-5 px-8">
          {defaultAlerts.map((alert, index) => (
            <div key={`alert${index}`} className="d-flex flex-stack py-4">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-35px me-4">
                  <span
                    className={clsx("symbol-label", `bg-light-${alert.state}`)}
                  >
                    {" "}
                    <KTIcon
                      iconName={alert.icon}
                      className={`fs-2 text-${alert.state}`}
                    />
                  </span>
                </div>

                <div className="mb-0 me-2">
                  <a
                    href="#"
                    className="fs-6 text-gray-800 text-hover-primary fw-bolder"
                  >
                    {alert.title}
                  </a>
                  <div className="text-gray-400 fs-7">{alert.description}</div>
                </div>
              </div>

              <span className="badge badge-light fs-8">{alert.time}</span>
            </div>
          ))}
        </div>

        <div className="py-3 text-center border-top">
          <Link
            href="/crafted/pages/profile"
            className="btn btn-color-gray-600 btn-active-color-primary"
          >
            View All <KTIcon iconName="arrow-right" className="fs-5" />
          </Link>
        </div>
      </div>

      <div
        className="tab-pane fade show active"
        id="kt_topbar_notifications_2"
        role="tabpanel"
      >
        <div className="d-flex flex-column px-9">
          <div className="pt-10 pb-0">
            <h3 className="text-dark text-center fw-bolder">Get Pro Access</h3>

            <div className="text-center text-gray-600 fw-bold pt-1">
              Outlines keep you honest. They stoping you from amazing poorly
              about drive
            </div>

            <div className="text-center mt-5 mb-9">
              <a
                href="#"
                className="btn btn-sm btn-primary px-6"
                data-bs-toggle="modal"
                data-bs-target="#kt_modal_upgrade_plan"
              >
                Upgrade
              </a>
            </div>
          </div>

          <div className="text-center px-4">
            <img
              className="mw-100 mh-200px"
              alt="metronic"
              src={useIllustrationsPath("1.png")}
            />
          </div>
        </div>
      </div>

      <div
        className="tab-pane fade"
        id="kt_topbar_notifications_3"
        role="tabpanel"
      >
        <div className="scroll-y mh-325px my-5 px-8">
          {defaultLogs.map((log, index) => (
            <div key={`log${index}`} className="d-flex flex-stack py-4">
              <div className="d-flex align-items-center me-2">
                <span
                  className={clsx(
                    "w-70px badge",
                    `badge-light-${log.state}`,
                    "me-4"
                  )}
                >
                  {log.code}
                </span>

                <a
                  href="#"
                  className="text-gray-800 text-hover-primary fw-bold"
                >
                  {log.message}
                </a>

                <span className="badge badge-light fs-8">{log.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="py-3 text-center border-top">
          <Link
            href="/crafted/pages/profile"
            className="btn btn-color-gray-600 btn-active-color-primary"
          >
            View All <KTIcon iconName="arrow-right" className="fs-5" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export { HeaderNotificationsMenu };
