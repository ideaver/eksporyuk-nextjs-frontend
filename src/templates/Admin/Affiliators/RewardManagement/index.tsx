import { useState } from "react";
import { useRouter } from "next/router";
import { QueryResult } from "@apollo/client";
import Link from "next/link";

import { PageTitle } from "@/_metronic/layout/core";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { KTTableBody } from "@/_metronic/helpers/components/KTTableBody";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import DeleteRewardModal from "./components/DeleteRewardModal";
import { formatDate } from "@/app/service/utils/dateFormatter";
import { formatCurrency } from "@/app/service/utils/currencyFormatter";

import useRewardManagementViewModel, {
  dateFormatter,
} from "./RewardManagement-view-model";
import {
  RewardsCatalogFindManyQuery,
  SortOrder,
} from "@/app/service/graphql/gen/graphql";

const RewardManagement = () => {
  const {
    breadcrumbs,
    rewardsCatalogFindMany,
    handleSelectAllCheck,
    handleSingleCheck,
    checkedItems,
    selectAll,
    setSearchRewards,
    skipPage,
    setSkipPage,
    takePage,
    setTakePage,
    calculateTotalPage,
    setOrderBy,
    currentPage,
    handlePageChange,
    setFindTake,
    findTake,
  } = useRewardManagementViewModel();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  let rewardIds: number[] = [];

  rewardIds = checkedItems.filter((item) => item.value).map((item) => item.id);

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Semua Reward Affiliasi</PageTitle>
      <KTCard className="h-100">
        <KTCardBody>
          <Head
            onSearch={setSearchRewards}
            setOrderBy={(e: any) => {
              setOrderBy(e);
            }}
            rewardIds={rewardIds}
            setShowDeleteModal={setShowDeleteModal}
          />
          <Body
            rewardsCatalogFindMany={rewardsCatalogFindMany}
            handleSelectAllCheck={handleSelectAllCheck}
            handleSingleCheck={handleSingleCheck}
            checkedItems={checkedItems}
            selectAll={selectAll}
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
          />
          <Footer
            pageLength={calculateTotalPage()}
            currentPage={currentPage}
            setCurrentPage={(val) => handlePageChange(val)}
            findSkip={(val) => {}}
            findTake={(val) => {
              setFindTake(val);
            }}
            takeValue={findTake}
          />
        </KTCardBody>
      </KTCard>
    </>
  );
};

const Head = ({ onSearch, setOrderBy, rewardIds, setShowDeleteModal }: any) => {
  const router = useRouter();

  return (
    <div className="row justify-content-between gy-5">
        <div className="col-lg-auto">
          <TextField
            styleType="solid"
            preffixIcon="magnifier"
            placeholder="Search"
            props={{
              onChange: (e: any) => onSearch(e.target.value),
            }}
          ></TextField>
        </div>
        <div className="row col-lg-auto gy-3">
          {/* <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Status", value: "all" },
              { label: "Aktif", value: "active" },
              { label: "Tidak Aktif", value: "inactive" },
            ]}
            onValueChange={() => {}}
          />
        </div> */}
          <div className="col-lg-auto">
            <Dropdown
              styleType="solid"
              options={[
                { label: "Terbaru", value: SortOrder.Desc },
                { label: "Terlama", value: SortOrder.Asc },
              ]}
              onValueChange={(e) => {
                setOrderBy(e as SortOrder);
              }}
            />
          </div>
          <div className="col-lg-auto">
            <button
              className={`ms-auto d-inline btn btn-danger ${
                rewardIds.length !== 0 ? "d-inline-block" : "d-none"
              }`}
              onClick={() => setShowDeleteModal(true)}
            >
              Hapus Reward
            </button>
          </div>
          <div className="col-lg-auto">
            <Buttons onClick={() => router.push("reward/create/new-reward")}>
              Add New Reward
            </Buttons>
          </div>
        </div>
      </div>
  )
}

const Body = ({
  rewardsCatalogFindMany,
  handleSelectAllCheck,
  handleSingleCheck,
  checkedItems,
  selectAll,
  showDeleteModal,
  setShowDeleteModal,
}: {
  rewardsCatalogFindMany: QueryResult<RewardsCatalogFindManyQuery>;
  handleSelectAllCheck: () => void;
  handleSingleCheck: (index: number) => void;
  checkedItems: { id: any; value: boolean }[];
  selectAll: boolean;
  showDeleteModal: boolean;
  setShowDeleteModal: (index: boolean) => void;
}) => {
  const router = useRouter();

  const [rewardId, setRewardId] = useState(0);

  let rewardIds: number[] = [];

  rewardIds = checkedItems.filter((item) => item.value).map((item) => item.id);

  // console.log(rewardsCatalogFindMany.data)

  return (
    <>
      <DeleteRewardModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        rewardId={rewardId}
        rewardIds={rewardIds}
      />
      {rewardsCatalogFindMany.error ? (
        <div className="d-flex justify-content-center align-items-center h-500px flex-column">
          <h3 className="text-center">
            {rewardsCatalogFindMany.error.message}
          </h3>
        </div>
      ) : rewardsCatalogFindMany.loading ? (
        <div className="d-flex justify-content-center align-items-center h-500px">
          <h3 className="text-center">Loading....</h3>
        </div>
      ) : (
        <KTTable utilityGY={5} responsive="table-responsive my-10">
          <KTTableHead
            textColor="muted"
            fontWeight="bold"
            className="text-uppercase align-middle"
          >
            <th className="w-200px">
              <CheckBoxInput
                className="min-w-200px"
                checked={selectAll}
                name="check-all"
                value="all"
                defaultChildren={false}
                onChange={handleSelectAllCheck}
              >
                <>Nama Reward</>
              </CheckBoxInput>
            </th>
            {/* <th className="">Nama Reward</th> */}
            <th className="text-end">Harga</th>
            <th className="text-end">Tanggal Pembuatan</th>
            <th className="text-end">Jumlah Penukaran</th>
            <th className="text-end">Status</th>
            <th className="text-end">Actions</th>
          </KTTableHead>

          {rewardsCatalogFindMany.data?.rewardsCatalogFindMany?.map(
            (reward, index) => {
              return (
                <KTTableBody key={reward.id}>
                  <td className="align-middle text-end w-200px">
                    <CheckBoxInput
                      className="ps-0"
                      checked={checkedItems[index]?.value ?? false}
                      name={"check-" + reward.id}
                      value={String(reward.id)}
                      defaultChildren={false}
                      onChange={() => handleSingleCheck(index)}
                    >
                      <Link
                        href={`/admin/affiliate/reward/detail/${reward.id}`}
                      >
                        <div className="d-flex align-items-center gap-5">
                          {/* <img
                            src="/media/avatars/300-2.jpg"
                            width={50}
                            height={50}
                            alt=""
                          /> */}
                          {reward?.title && (
                            <p className="min-w-200px mb-0">Saldo {formatCurrency(Number(reward.title))}</p>
                          )}
                          {reward?.course?.title && (
                            <p className="min-w-200px mb-0">{reward.course?.title}</p>
                          )}
                          {/* <p className="min-w-200px mb-0">{reward.title || reward.course?.title}</p> */}
                        </div>
                      </Link>
                    </CheckBoxInput>
                  </td>
                  <td className="align-middle text-end text-muted fw-bold w-150px">
                    {reward.pointsRequired}
                  </td>
                  <td className="align-middle text-end text-muted fw-bold">
                    {formatDate(reward.createdAt)}
                  </td>
                  <td className="align-middle text-end text-muted fw-bold">
                    {reward._count.rewardsRedeem}
                  </td>
                  <td className="align-middle text-end">
                    <Badge
                      badgeColor="success"
                      label="Buka"
                      onClick={function noRefCheck() {}}
                    />
                  </td>
                  <td className="align-middle text-end">
                    <div className="dropdown  ps-15 pe-0">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Actions
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              setShowDeleteModal(true);
                              setRewardId(reward.id);
                            }}
                          >
                            Hapus
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </KTTableBody>
              );
            }
          )}
        </KTTable>
      )}
    </>
  );
};

// const Footer = ({
//   skipPage,
//   setSkipPage,
//   takePage,
//   setTakePage,
//   totalPage,
// }: any) => {
//   if (skipPage === 0) skipPage = 1;

//   return (
//     <div className="row justify-content-between">
//       <div className="col-auto">
//         <div className="dropdown">
//           <button
//             className="btn btn-secondary dropdown-toggle p-3"
//             type="button"
//             data-bs-toggle="dropdown"
//             aria-expanded="false"
//           >
//             {takePage}
//           </button>
//           <ul className="dropdown-menu">
//             <li>
//               <button
//                 className="dropdown-item"
//                 onClick={() => {
//                   setTakePage(10);
//                 }}
//               >
//                 10
//               </button>
//             </li>
//             <li>
//               <button
//                 className="dropdown-item"
//                 onClick={() => {
//                   setTakePage(50);
//                 }}
//               >
//                 50
//               </button>
//             </li>
//             <li>
//               {/* <button className="dropdown-item">Hapus</button> */}
//               <input
//                 type="number"
//                 value={takePage}
//                 className="form-control py-2"
//                 placeholder="Nilai Custom"
//                 min={0}
//                 onChange={(e) => {
//                   setTakePage(parseInt(e.target.value));
//                 }}
//               />
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className="col-auto">
//         <Pagination
//           total={totalPage()}
//           current={skipPage}
//           maxLength={5}
//           onPageChange={(e) => {
//             if (e === 1) e = 0;
//             setSkipPage(e);
//           }}
//         ></Pagination>
//       </div>
//     </div>
//   );
// };
const Footer = ({
  currentPage,
  setCurrentPage,
  findTake,
  pageLength,
  takeValue,
}: {
  findTake: (val: number) => void;
  findSkip: (val: number) => void;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  pageLength: number;
  takeValue: number;
}) => {
  return (
    <div className="row justify-content-between">
      <div className="col-auto">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle p-3"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {takeValue}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  findTake(10);
                }}
              >
                10
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  findTake(50);
                }}
              >
                50
              </button>
            </li>
            <li>
              <input
                type="number"
                value={takeValue}
                className="form-control py-2"
                placeholder="Nilai Custom"
                min={0}
                onChange={(e) => {
                  findTake(parseInt(e.target.value));
                }}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="col-auto">
        <Pagination
          total={pageLength}
          current={currentPage}
          maxLength={5}
          onPageChange={(val) => setCurrentPage(val)}
        ></Pagination>
      </div>
    </div>
  );
};

export default RewardManagement;
