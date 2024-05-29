"use client";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrencyInput from "react-currency-input-field";

import { breadcrumbs } from "./CreateService-view-model";
import { RootState } from "@/app/store/store";
import {
  changeServiceName,
  changeServiceImages,
  changeServiceDesc,
  changeServiceCost,
  changeServiceType,
  changeServiceObjective,
  changeServiceStatus,
} from "@/features/reducers/products/serviceReducer";

import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { PageTitle } from "@/_metronic/layout/core";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Pagination } from "@/stories/organism/Paginations/Pagination";
import { KTTableBody } from "@/_metronic/helpers/components/KTTableBody";
import { RadioInput } from "@/stories/molecules/Forms/Advance/RadioInput/RadioInput";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";

const CreateService = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redux state
  const serviceName = useSelector(
    (state: RootState) => state.service.serviceName
  );
  const serviceImages = useSelector(
    (state: RootState) => state.service.serviceImages
  );
  const serviceCost = useSelector(
    (state: RootState) => state.service.serviceCost
  );
  const serviceObjective = useSelector(
    (state: RootState) => state.service.serviceObjective
  );
  const servicePortfolio = useSelector(
    (state: RootState) => state.service.servicePortfolio
  );
  const serviceType = useSelector(
    (state: RootState) => state.service.serviceType
  );

  // Local state
  const [itemObjective, setItemObjective] = useState<any>(serviceObjective);
  const [itemPortfolio, setItemPortfolio] = useState<any>(servicePortfolio);
  const [radio, setRadio] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(changeServiceImages(reader.result as string));
    };
    reader.readAsDataURL(file);
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChangePrice = (price: string) => {
    dispatch(changeServiceCost(price));
  };

  const removeItemObjective = (index: number) => {
    setItemObjective((prevItems: any) =>
      prevItems.filter((item: any, i: any) => i !== index)
    );
  };

  const handleInputObjectiveChange = (index: number, newValue: string) => {
    setItemObjective((prevItems: any) =>
      prevItems.map((item: any, i: any) => (i === index ? newValue : item))
    );
  };

  const addItemObjective = () => {
    setItemObjective((prevItems: any) => [...prevItems, ""]);
  };

  const removeItemPortfolio = (index: number) => {
    setItemPortfolio((prevItems: any) =>
      prevItems.filter((item: any, i: any) => i !== index)
    );
  };

  const handleInputPortfolioChange = (index: number, newValue: string) => {
    setItemPortfolio((prevItems: any) =>
      prevItems.map((item: any, i: any) => (i === index ? newValue : item))
    );
  };

  const addItemPortfolio = () => {
    setItemPortfolio((prevItems: any) => [...prevItems, ""]);
  };

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Tambah Service Baru</PageTitle>
      <KTCard>
        <KTCardBody>
          <h3 className="mb-10">Informasi Service</h3>

          <div className="mb-3">
            <h4 className="required fw-bold text-gray-700">Tipe Service</h4>
            <div
              className="d-flex justify-content-between gap-5 flex-wrap flex-lg-nowrap"
              data-kt-buttons="true"
            >
              <RadioInput
                name="service-type"
                onChange={() => dispatch(changeServiceType("legalitas"))}
                checked={serviceType === "legalitas"}
                value="legalitas"
              >
                Legalitas
              </RadioInput>
              <RadioInput
                name="service-type"
                onChange={() => dispatch(changeServiceType("website"))}
                checked={serviceType === "website"}
                value="website"
              >
                Website
              </RadioInput>
            </div>
          </div>

          <div className="mb-3">
            <h4 className="required fw-bold text-gray-700">Nama Service</h4>
            <TextField
              styleType="outline"
              size="medium"
              placeholder="Dokumen legalitas..."
              props={{
                value: serviceName,
                onChange: (e: any) =>
                  dispatch(changeServiceName(e.target.value)),
              }}
            />
            <p className="fw-bold fs-6 text-muted">Nama Service</p>
          </div>

          <div className="mb-3">
            <h4 className="required fw-bold text-gray-700">
              Deskripsi Service
            </h4>
            <Textarea
              onClickPreffixIcon={function noRefCheck() {}}
              onClickSuffixIcon={function noRefCheck() {}}
              placeholder="Masukan deskripsi dari service ini"
              props={{
                value: "",
                onChange: () => {},
              }}
              rows={10}
            />
            <p className="fw-bold fs-5 text-muted pt-2">
              Masukan konten service
            </p>
          </div>

          <div className="mb-3">
            <h4 className="required fw-bold text-gray-700">Foto Service</h4>
            <div
              className="border-dashed border-primary rounded p-3 mb-5"
              style={{ cursor: "pointer" }}
            >
              <input
                type="file"
                onChange={handleFileChange}
                className="d-none"
                accept=".jpg, .jpeg, .png"
                id="foto-produk"
              />
              <label htmlFor="foto-produk" style={{ cursor: "pointer" }}>
                {serviceImages ? (
                  <>
                    <img
                      src={serviceImages}
                      alt=""
                      className="img-fluid rounded object-fit-cover"
                    />
                  </>
                ) : (
                  <>
                    <div className="d-flex flex-row align-items-center gap-3">
                      <div>
                        <i
                          className="bi bi-upload"
                          style={{ fontSize: "2rem" }}
                        ></i>
                      </div>
                      <div>
                        <h5 className="m-0">Pilih file untuk diupload</h5>
                        <small className="text-muted">
                          File yang diupload dapat berformat .JPG, .PNG dan
                          .JPEG. Maksimal 10 file
                        </small>
                      </div>
                    </div>
                  </>
                )}
              </label>
            </div>
          </div>

          <div className="mb-5">
            <h4 className="required fw-bold text-gray-700">Harga Service</h4>
            <div className="input-group">
              <span className="input-group-text" id="price-field">
                Rp
              </span>
              <CurrencyInput
                className="form-control"
                id="price-field"
                name="price"
                placeholder="Masukan Harga (Rp)"
                intlConfig={{ locale: "id-ID" }}
                defaultValue={0}
                value={serviceCost}
                decimalsLimit={2}
                onValueChange={(value, name, values) =>
                  dispatch(changeServiceCost(value ?? ""))
                }
              />
            </div>
          </div>

          {serviceType === "legalitas" && (
            <div className="mb-3">
              <h4 className="required fw-bold text-gray-700">
                Objektif Service
              </h4>
              {itemObjective.map((item: any, index: any) => (
                <div className="d-flex mt-5" key={index}>
                  <div className="w-100">
                    <TextField
                      props={{
                        value: item,
                        onChange: (e: any) =>
                          handleInputObjectiveChange(index, e.target.value),
                      }}
                    ></TextField>
                  </div>
                  <div className="ms-5">
                    <Buttons
                      icon="cross"
                      buttonColor="danger"
                      showIcon={true}
                      onClick={() => removeItemObjective(index)}
                    ></Buttons>
                  </div>
                </div>
              ))}
              <Buttons
                showIcon={true}
                mode="light"
                classNames="mt-5"
                onClick={() => {
                  addItemObjective();
                }}
              >
                Tambahkan Objektif
              </Buttons>
            </div>
          )}

          {serviceType === "website" && (
            <div className="mb-3">
              <h4 className="required fw-bold text-gray-700">
                Portfolio Website
              </h4>
              {itemPortfolio.map((item: any, index: any) => (
                <div className="d-flex mt-5" key={index}>
                  <div className="w-100">
                    <TextField
                      props={{
                        value: item,
                        onChange: (e: any) =>
                          handleInputPortfolioChange(index, e.target.value),
                      }}
                    ></TextField>
                  </div>
                  <div className="ms-5">
                    <Buttons
                      icon="cross"
                      buttonColor="danger"
                      showIcon={true}
                      onClick={() => removeItemPortfolio(index)}
                    ></Buttons>
                  </div>
                </div>
              ))}
              <Buttons
                showIcon={true}
                mode="light"
                classNames="mt-5"
                onClick={() => {
                  addItemPortfolio();
                }}
              >
                Tambahkan Portfolio Website
              </Buttons>
            </div>
          )}

          <div className="mb-5">
            <h4 className="required fw-bold text-gray-700">Status</h4>
            <Dropdown
              options={[
                { value: "true", label: "Aktif" },
                { value: "", label: "Tidak Aktif" },
              ]}
              value={""}
              onValueChange={(value: any) => {}}
            ></Dropdown>
            <p className="text-muted fw-bold mt-5">Atur Status</p>
          </div>

          <button className="btn btn-primary w-100 mt-3" onClick={() => {}}>
            Buat Service
          </button>
        </KTCardBody>
      </KTCard>
    </>
  );
};

export default CreateService;
