/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTIcon } from "@/_metronic/helpers";
import { PageTitle } from "@/_metronic/layout/core";
import { formatAddress } from "@/app/service/utils/addressFormatter";
import { TabLink } from "@/stories/organism/Links/TabLink/TabLink";
import useAffiliatorHeaderViewModel from "./AffiliatorHeader-view-model";

const AffiliatorHeader = ({ id, data }: any) => {
  const { urls, breadcrumbs } = useAffiliatorHeaderViewModel({ id });
  const userData = data?.affiliatorFindOne?.user;
  const affiliatorData = data?.affiliatorFindOne;

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Detail Affiliator</PageTitle>

      <div className="card mb-5 mb-xl-10">
        <div className="card-body pt-9 pb-0">
          <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
            <div className="me-7 mb-4">
              <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                <img
                  src={userData?.avatarImageId ?? "/media/avatars/300-1.jpg"}
                  alt="Metornic"
                />
              </div>
            </div>

            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <p className="text-gray-800 fs-2 fw-bolder me-1 mb-0">
                      {userData?.name ?? "Ananda"}
                    </p>
                  </div>

                  <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                    <p className="d-flex align-items-center text-gray-400  me-5 mb-2">
                      <KTIcon iconName="profile-circle" className="fs-4 me-1" />
                      Affiliator
                    </p>
                    <p className="d-flex align-items-center text-gray-400  me-5 mb-2">
                      <KTIcon iconName="geolocation" className="fs-4 me-1" />
                      {formatAddress(
                        userData?.addresses?.find((a: any) => a.isMain === true)
                      ) ?? "JL. Kebun Karet No. 10, Loktabat Utara, Banjarbaru Utara, Kalimantan Selatan"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-wrap flex-stack">
                <div className="d-flex flex-column flex-grow-1 pe-8">
                  <div className="d-flex flex-wrap">
                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fs-2 fw-bolder">
                          Rp. {userData?.orders[0]?.invoices[0]?.amount ?? "1"}
                        </div>
                      </div>

                      <div className="fw-bold fs-6 text-gray-400">
                        Total Pembelian
                      </div>
                    </div>

                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fs-2 fw-bolder">
                          {affiliatorData?._count.createdCourses ?? "1"}
                        </div>
                      </div>

                      <div className="fw-bold fs-6 text-gray-400">
                        Kuantitas Pembelian
                      </div>
                    </div>

                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fs-2 fw-bolder">
                          {userData?.orders[0]._count.enrollment ?? "1"}
                        </div>
                      </div>

                      <div className="fw-bold fs-6 text-gray-400">
                        Kelas Terdaftar
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex overflow-auto h-55px">
            <TabLink links={urls}></TabLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default AffiliatorHeader;
