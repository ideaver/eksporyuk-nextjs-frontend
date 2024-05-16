import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import { PageTitle } from "@/_metronic/layout/core";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import useRewardManagementViewModel, {
  rewardsData,
} from "./RewardManagement-view-model";
import { KTTableBody } from "@/_metronic/helpers/components/KTTableBody";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { Pagination } from "@/stories/organism/Paginations/Pagination";

const RewardManagement = () => {
  const { breadcrumbs } = useRewardManagementViewModel();
  
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Semua Reward Affiliasi</PageTitle>
      <KTCard className="h-100">
        <KTCardBody>
          <Head />
          <Body />
          <Footer />
        </KTCardBody>
      </KTCard>
    </>
  );
};

const Head = () => {
  const router = useRouter();

  return (
    <div className="row justify-content-between gy-5">
      <div className="col-lg-auto">
        <TextField
          styleType="solid"
          preffixIcon="magnifier"
          placeholder="Search"
          props={{
            onChange: (e: any) => {},
          }}
        ></TextField>
      </div>
      <div className="row col-lg-auto gy-3">
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Status", value: "all" },
              { label: "Aktif", value: "active" },
              { label: "Tidak Aktif", value: "inactive" },
            ]}
            onValueChange={() => {}}
          />
        </div>
        <div className="col-lg-auto">
          <Buttons onClick={() => router.push("reward/create/new-reward")}>Add New Reward</Buttons>
        </div>
      </div>
    </div>
  );
};

const Body = () => {
  return (
    <KTTable utilityGY={5} responsive="table-responsive my-10">
      <KTTableHead
        textColor="muted"
        fontWeight="bold"
        className="text-uppercase align-middle"
      >
        <th className="w-200px">
          <CheckBoxInput
            className="min-w-200px"
            checked={false}
            name="check-all"
            value="all"
            defaultChildren={false}
            onChange={() => {}}
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

      {/* Query data */}
      {rewardsData.map((reward) => {
        return (
          <KTTableBody key={reward.id}>
            <td className="align-middle text-end w-200px">
              <CheckBoxInput
                className="ps-0"
                checked={false}
                name={"check-"}
                value={"20"}
                defaultChildren={false}
                onChange={() => {}}
              >
                <div className="d-flex align-items-center gap-5">
                  <img
                    src="/media/avatars/300-2.jpg"
                    width={50}
                    height={50}
                    alt=""
                  />
                  <p className="min-w-200px">{reward.name}</p>
                </div>
              </CheckBoxInput>
            </td>
            <td className="align-middle text-end text-muted fw-bold w-150px">
              {reward.price}
            </td>
            <td className="align-middle text-end text-muted fw-bold">
              {reward.creationDate}
            </td>
            <td className="align-middle text-end text-muted fw-bold">
              {reward.redemptionCount}
            </td>
            <td className="align-middle text-end">
              <Badge
                badgeColor={reward.status === "Buka" ? "success" : "danger"}
                label={reward.status}
                onClick={function noRefCheck() {}}
              />
            </td>
            <td className="align-middle text-end">
              <Dropdown
                styleType="solid"
                options={[
                  { label: "Action", value: "all" },
                  {
                    label: "Ubah Status",
                    value: "edit-status",
                  },
                  { label: "Edit", value: "edit" },
                  { label: "Hapus", value: "delete" },
                ]}
                onValueChange={() => {}}
              />
            </td>
          </KTTableBody>
        );
      })}
    </KTTable>
  );
};

const Footer = () => {
  return (
    <div className="row justify-content-between">
      <div className="col-auto">
        <Dropdown
          styleType="solid"
          options={[
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "30", value: 30 },
          ]}
          onValueChange={(e) => {}}
        />
      </div>
      <div className="col-auto">
        <Pagination
          total={1}
          current={1}
          maxLength={5}
          onPageChange={() => {}}
        ></Pagination>
      </div>
    </div>
  );
};

export default RewardManagement;
