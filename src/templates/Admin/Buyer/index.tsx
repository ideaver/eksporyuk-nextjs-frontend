import { PageTitle } from "@/_metronic/layout/core";
import useBuyerViewModel, { breadcrumbs } from "./Buyer-view-model";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { useEffect, useState } from "react";

const dummyData: any = [
  {
    id: 1,
    name: "Jhon Doe",
    companyName: "Global corporate",
    country: "Amerika Serikat",
    flag: "/media/flags/united-states.svg",
    companyAddress: "123 Street, New York USA",
    email: "jondoe@gmail.com",
    telephoneNumber: "+82 213123213123",
    registeredDate: "12 November 2022",
    demand: "bubuk mesiu",
    quantityRequired: "100 Tom",
    shippingTerms: "FQB",
    destinationPort: "Port of Los Angels, USA",
  },
  {
    id: 2,
    name: "Jhon Mimi",
    companyName: "Global company",
    country: "Amerika Latin",
    flag: "/media/flags/united-states.svg",
    companyAddress: "123 Street, New York USA",
    email: "jonmimi@gmail.com",
    telephoneNumber: "+82 213123213123",
    registeredDate: "12 November 2022",
    demand: "bubuk mesiu",
    quantityRequired: "100 Tom",
    shippingTerms: "FQB",
    destinationPort: "Port of Los Angels, USA",
  },
];

const BuyerPage = () => {
  //dumy
  const [buyers, setBuyers] = useState(
    dummyData.map((buyer: any) => ({ ...buyer, checked: false }))
  );

  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);

  const handleCheckedAllChange = () => {
    const newSelectAll = !isCheckedAll;
    setIsCheckedAll(newSelectAll);
    setBuyers(
      buyers.map((buyer: any) => ({ ...buyer, checked: newSelectAll }))
    );
  };
  const handleCheckedItemChange = (id: number) => {
    const newBuyers = buyers.map((buyer: any) =>
      buyer.id === id ? { ...buyer, checked: !buyer.checked } : buyer
    );
    setBuyers(newBuyers);
    setIsCheckedAll(newBuyers.every((buyer: any) => buyer.checked));
  };

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Semua Buyer</PageTitle>
      <KTCard>
        <KTCardBody>
          <Head />
          <KTTable
            utilityGY={5}
            utilityGX={8}
            responsive="table-responsive my-10"
            className="fs-6"
          >
            <KTTableHead
              textColor="muted"
              fontWeight="bold"
              className="text-uppercase align-middle"
            >
              <th className="min-w-200px">
                <CheckBoxInput
                  checked={isCheckedAll}
                  name="check-all"
                  value="all"
                  defaultChildren={false}
                  onChange={handleCheckedAllChange}
                >
                  <p className="mb-0">NAMA BUYER</p>
                </CheckBoxInput>
              </th>
              <th className="text-end min-w-200px">NAMA PERUSAHAAN</th>
              <th className="text-end min-w-250px">NEGARA</th>
              <th className="text-end min-w-250px">ALAMAT</th>
              <th className="text-end min-w-200px">E-MAIL</th>
              <th className="text-end min-w-200px">NO. TELEPON</th>
              <th className="text-end min-w-250px">TANGGAL TERDAFTAR</th>
              <th className="text-end min-w-200px">DEMAND</th>
              <th className="text-end min-w-250px">QUANTITY REQUIRED</th>
              <th className="text-end min-w-200px">SHIPPING TERMS</th>
              <th className="text-end min-w-250px">DESTINATION PORT</th>
              <th className="text-end min-w-125px">ACTION</th>
            </KTTableHead>
            {buyers.map((buyer: any) => {
              return (
                <tr key={buyer.id}>
                  <td className="align-middle">
                    <CheckBoxInput
                      className="ps-0"
                      checked={buyer.checked}
                      name="check-all"
                      value="all"
                      defaultChildren={false}
                      onChange={() => {
                        handleCheckedItemChange(buyer.id);
                      }}
                    >
                      <p className="fw-bold text-black mb-0">{buyer.name}</p>
                    </CheckBoxInput>
                  </td>
                  <td className="min-w-200px text-end fw-bold text-muted">
                    {buyer.companyName}
                  </td>
                  <td className="min-w-250px align-middle text-end fw-bold text-muted">
                    <Image
                      className="symbol-label bg-gray-600 rounded-circle"
                      src={buyer.flag}
                      width={60}
                      height={60}
                      alt="flag"
                    />
                    <span className="text-muted fw-bold">{buyer.country}</span>
                  </td>
                  <td className="min-w-200px text-end fw-bold text-muted">
                    {buyer.companyAddress}
                  </td>
                  <td className="min-w-200px text-end fw-bold text-muted">
                    {buyer.email}
                  </td>
                  <td className="min-w-200px text-end fw-bold text-muted">
                    {buyer.telephoneNumber}
                  </td>
                  <td className="min-w-200px text-end fw-bold text-muted">
                    {buyer.registeredDate}
                  </td>
                  <td className="min-w-200px text-end fw-bold text-muted">
                    {buyer.demand}
                  </td>
                  <td className="min-w-200px text-end fw-bold text-muted">
                    {buyer.quantityRequired}
                  </td>
                  <td className="min-w-200px text-end fw-bold text-muted">
                    {buyer.shippingTerms}
                  </td>
                  <td className="min-w-200px text-end fw-bold text-muted">
                    {buyer.destinationPort}
                  </td>
                  <td className="align-middle text-end ">
                    <Dropdown
                      styleType="solid"
                      options={[
                        { label: "Action", value: "all" },
                        { label: "Aktif", value: "active" },
                        { label: "Tidak Aktif", value: "inactive" },
                      ]}
                      onValueChange={() => {}}
                    />
                  </td>
                </tr>
              );
            })}
          </KTTable>
          <Footer />
        </KTCardBody>
      </KTCard>
      <ImportModal />
    </>
  );
};

const Head = () => {
  return (
    <div className="row justify-content-between gy-5">
      <div className="col-lg-auto">
        <TextField
          styleType="solid"
          preffixIcon="magnifier"
          placeholder="Search"
        />
      </div>
      <div className="col-lg-auto row gy-3">
        <div className="col-lg-auto">
          <Dropdown
            styleType="solid"
            options={[
              { label: "Semua Negara", value: "all" },
              { label: "Indonesia", value: "IND" },
              { label: "Malaysia", value: "MLY" },
            ]}
            onValueChange={() => {}}
          />
        </div>
        <div className="col-lg-auto">
          <Buttons
            mode="light"
            data-bs-toggle="modal"
            data-bs-target="#kt_import_data_modal"
          >
            Import Data
          </Buttons>
        </div>

        <div className="col-lg-auto">
          <Buttons>
            <Link
              href={"/admin/buyers/buyer-information"}
              className="text-white"
            >
              Add New Buyyer
            </Link>
          </Buttons>
        </div>
      </div>
    </div>
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
          onValueChange={() => {}}
        />
      </div>
      <div className="col-auto">
        <Pagination
          total={10}
          current={1}
          maxLength={5}
          onPageChange={() => {}}
        ></Pagination>
      </div>
    </div>
  );
};

const ImportModal = () => {
  const { handleFileChange, fileXLSX } = useBuyerViewModel();
  useEffect(() => {
    console.log(fileXLSX ? fileXLSX : null);
  }, [fileXLSX]);
  return (
    <div>
      <KTModal
        dataBsTarget="kt_import_data_modal"
        title="Import Data Buyer"
        fade
        modalCentered
        buttonClose={
          <Buttons
            buttonColor="secondary"
            data-bs-dismiss="modal"
            classNames="fw-bold"
          >
            Batal
          </Buttons>
        }
        buttonSubmit={
          <Buttons data-bs-dismiss="modal" classNames="fw-bold">
            Export
          </Buttons>
        }
        footerContentCentered
        modalSize="lg"
      >
        <div className="mx-10">
          <p className="fw-bold fs-5  text-muted">Tamplate Data Buyer</p>
        </div>
        <div className="min-h-50px">
          <input
            type="file"
            onChange={handleFileChange}
            className="d-none"
            accept=".xlsx"
            id="input-file"
          />
          {fileXLSX ? (
            <div className="m-4 mx-10">
              <div className="d-flex">
                <img
                  src="/media/svg/files/xlsx.svg"
                  width={60}
                  height={60}
                  alt="xlsx icon"
                />
                <div className="px-3 mt-1  d-flex flex-column align-content-center justify-content-center ">
                  <h4>{fileXLSX}</h4>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="mx-10">
          <p className="fw-bold required text-muted mt-2 fs-5">
            Pilih File Yang Ingin Diimport
          </p>
          <label
            htmlFor="input-file"
            className="d-flex justify-content-between bg-light-primary p-5 align-items-center rounded border border-primary border-dashed mt-5"
          >
            <div className="title">
              <div className="mt-1 text-muted fw-bold mb-0">
                <div className="d-flex">
                  <img
                    src="/media/svg/files/upload.svg"
                    width={50}
                    height={50}
                    alt="xlsx icon"
                  />
                  <div className="px-3 mt-1  d-flex flex-column align-content-center justify-content-center ">
                    <h4>Pilih file yang ingin di upload</h4>
                    <h5 className="text-muted">
                      File yang diupload harus berformat .XLSX
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>
      </KTModal>
    </div>
  );
};

export default BuyerPage;
