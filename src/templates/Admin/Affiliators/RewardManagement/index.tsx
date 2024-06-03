import { useRouter } from "next/router";
import { QueryResult } from "@apollo/client";

import { PageTitle } from "@/_metronic/layout/core";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import useRewardManagementViewModel, {
  dateFormatter,
} from "./RewardManagement-view-model";
import { KTTableBody } from "@/_metronic/helpers/components/KTTableBody";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
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
  } = useRewardManagementViewModel();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Semua Reward Affiliasi</PageTitle>
      <KTCard className="h-100">
        <KTCardBody>
          <Head
            onSearch={setSearchRewards}
            setOrderBy={(e) => {
              setOrderBy(e);
            }}
          />
          <Body
            rewardsCatalogFindMany={rewardsCatalogFindMany}
            handleSelectAllCheck={handleSelectAllCheck}
            handleSingleCheck={handleSingleCheck}
            checkedItems={checkedItems}
            selectAll={selectAll}
          />
          <Footer
            skipPage={skipPage}
            setSkipPage={setSkipPage}
            takePage={takePage}
            setTakePage={setTakePage}
            totalPage={calculateTotalPage}
          />
        </KTCardBody>
      </KTCard>
    </>
  );
};

const Head = ({
  onSearch,
  setOrderBy,
}: {
  onSearch: (val: string) => void;
  setOrderBy: (e: SortOrder) => void;
}) => {
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
          <Buttons onClick={() => router.push("reward/create/new-reward")}>
            Add New Reward
          </Buttons>
        </div>
      </div>
    </div>
  );
};

const Body = ({
  rewardsCatalogFindMany,
  handleSelectAllCheck,
  handleSingleCheck,
  checkedItems,
  selectAll,
}: {
  rewardsCatalogFindMany: QueryResult<RewardsCatalogFindManyQuery>;
  handleSelectAllCheck: () => void;
  handleSingleCheck: (index: number) => void;
  checkedItems: { id: any; value: boolean }[];
  selectAll: boolean;
}) => {
  return (
    <>
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
                      <div className="d-flex align-items-center gap-5">
                        <img
                          src="/media/avatars/300-2.jpg"
                          width={50}
                          height={50}
                          alt=""
                        />
                        <p className="min-w-200px">{reward.title}</p>
                      </div>
                    </CheckBoxInput>
                  </td>
                  <td className="align-middle text-end text-muted fw-bold w-150px">
                    {reward.pointsRequired}
                  </td>
                  <td className="align-middle text-end text-muted fw-bold">
                    {dateFormatter(reward.createdAt)}
                  </td>
                  <td className="align-middle text-end text-muted fw-bold">
                    0
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
                      <ul className="dropdown-menu d-none">
                        <li>
                          <button className="dropdown-item" onClick={() => {}}>
                            Kirim Pengaturan ulang kata sandi
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item">Edit</button>
                        </li>
                        <li>
                          <button className="dropdown-item">Hapus</button>
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

const Footer = ({
  skipPage,
  setSkipPage,
  takePage,
  setTakePage,
  totalPage,
}: any) => {
  if (skipPage === 0) skipPage = 1;

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
            {takePage}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setTakePage(10);
                }}
              >
                10
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setTakePage(50);
                }}
              >
                50
              </button>
            </li>
            <li>
              {/* <button className="dropdown-item">Hapus</button> */}
              <input
                type="number"
                value={takePage}
                className="form-control py-2"
                placeholder="Nilai Custom"
                min={0}
                onChange={(e) => {
                  setTakePage(parseInt(e.target.value));
                }}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="col-auto">
        <Pagination
          total={totalPage()}
          current={skipPage}
          maxLength={5}
          onPageChange={(e) => {
            if (e === 1) e = 0;
            setSkipPage(e);
          }}
        ></Pagination>
      </div>
    </div>
  );
};

export default RewardManagement;
