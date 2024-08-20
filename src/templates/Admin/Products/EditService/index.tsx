import CurrencyInput from "react-currency-input-field";

import useEditServiceViewModel, {
  breadcrumbs,
  IEditProduct,
} from "./EditService-view-model";

import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { PageTitle } from "@/_metronic/layout/core";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { RadioInput } from "@/stories/molecules/Forms/Advance/RadioInput/RadioInput";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { AsyncPaginate } from "react-select-async-paginate";

const EditService = ({ id, data }: IEditProduct) => {
  const {
    serviceType,
    setServiceType,
    serviceName,
    setServiceName,
    serviceDesc,
    setServiceDesc,
    serviceImages,
    serviceCost,
    serviceDiscountCost,
    itemPortfolios,
    status,
    handleChangeServiceCost,
    handleChangeServiceDiscountCost,
    handleStatusChange,
    handleFileChange,
    handleRemoveImage,
    handleFileClick,
    fileInputRef,
    itemObjective,
    addObjectiveItem,
    removeObjectiveItem,
    handleInputObjectiveChange,
    addPortfolioItem,
    removePortfolioItem,
    handleInputPortfolioChange,
    onSubmit,
    isLoading,
    handleInputSubscriberListId,
    inputSubscriberListId,
    loadOptions,
  } = useEditServiceViewModel({ data, id });

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Edit Service</PageTitle>
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
                onChange={(e: any) => setServiceType(e.target.value)}
                checked={serviceType === "LEGALITY"}
                value="LEGALITY"
              >
                Legalitas
              </RadioInput>
              <RadioInput
                name="service-type"
                onChange={(e: any) => setServiceType(e.target.value)}
                checked={serviceType === "WEBSITE"}
                value="WEBSITE"
              >
                Website
              </RadioInput>
              <RadioInput
                name="service-type"
                onChange={(e: any) => setServiceType(e.target.value)}
                checked={serviceType === "OTHER"}
                value="OTHER"
              >
                Lainnya
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
                onChange: (e: any) => setServiceName(e.target.value),
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
                value: serviceDesc,
                onChange: (e: any) => setServiceDesc(e.target.value),
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
              onClick={handleFileClick}
            >
              <input
                type="file"
                onChange={handleFileChange}
                className="d-none"
                accept=".jpg, .jpeg, .png"
                id="foto-produk"
                multiple
                ref={fileInputRef}
              />
              <label style={{ cursor: "pointer" }}>
                {serviceImages && serviceImages.length > 0 ? (
                  <div className="d-flex flex-wrap">
                    {serviceImages.map((image: any, index: any) => (
                      <div key={index} className="position-relative">
                        <label htmlFor="foto-produk">
                          {image.path ? (
                            <img
                              src={image.path}
                              alt=""
                              className="img-fluid rounded object-fit-cover m-2"
                              style={{ maxWidth: "150px" }}
                            />
                          ) : (
                            <div>
                              <h4>Loading</h4>
                            </div>
                          )}
                        </label>
                        <i
                          className="bi bi-x-circle position-absolute m-2"
                          style={{
                            fontSize: "20px",
                            color: "red",
                            top: "-10px",
                            right: "-5px",
                          }}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering file input
                            handleRemoveImage(index);
                          }}
                        ></i>
                      </div>
                    ))}
                  </div>
                ) : (
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
                        File yang diupload dapat berformat .JPG, .PNG dan .JPEG.
                        Maksimal 10 file
                      </small>
                    </div>
                  </div>
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
                  handleChangeServiceCost(value ?? "")
                }
              />
            </div>
          </div>

          <div className="mb-5">
            <h4 className="fw-bold text-gray-700">Harga Diskon</h4>
            <div className="input-group">
              <span className="input-group-text" id="price-field">
                Rp
              </span>
              <CurrencyInput
                className="form-control"
                id="price-field"
                name="price"
                placeholder="Masukan Harga Diskon (Rp)"
                intlConfig={{ locale: "id-ID" }}
                defaultValue={0}
                value={serviceDiscountCost}
                decimalsLimit={2}
                onValueChange={(value, name, values) =>
                  handleChangeServiceDiscountCost(value ?? "")
                }
              />
            </div>
          </div>

          {serviceType === "LEGALITY" && (
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
                      onClick={() => removeObjectiveItem(index)}
                    ></Buttons>
                  </div>
                </div>
              ))}
              <Buttons
                showIcon={true}
                mode="light"
                classNames="mt-5"
                onClick={() => {
                  addObjectiveItem();
                }}
              >
                Tambahkan Objektif
              </Buttons>
            </div>
          )}

          {/* {serviceType === "WEBSITE" && (
            <div className="mb-3">
              <h4 className="required fw-bold text-gray-700">
                Portfolio Website
              </h4>
              {itemPortfolios.map((item: any, index: any) => (
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
                      onClick={() => removePortfolioItem(index)}
                    ></Buttons>
                  </div>
                </div>
              ))}
              <Buttons
                showIcon={true}
                mode="light"
                classNames="mt-5"
                onClick={() => {
                  addPortfolioItem();
                }}
              >
                Tambahkan Portfolio Website
              </Buttons>
            </div>
          )} */}

          {serviceType === "OTHER" && (
            <>
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
                        onClick={() => removeObjectiveItem(index)}
                      ></Buttons>
                    </div>
                  </div>
                ))}
                <Buttons
                  showIcon={true}
                  mode="light"
                  classNames="mt-5"
                  onClick={() => {
                    addObjectiveItem();
                  }}
                >
                  Tambahkan Objektif
                </Buttons>
              </div>

              <div className="mb-3">
                <h4 className="required fw-bold text-gray-700">
                  Portfolio Website
                </h4>
                {itemPortfolios.map((item: any, index: any) => (
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
                        onClick={() => removePortfolioItem(index)}
                      ></Buttons>
                    </div>
                  </div>
                ))}
                <Buttons
                  showIcon={true}
                  mode="light"
                  classNames="mt-5"
                  onClick={() => {
                    addPortfolioItem();
                  }}
                >
                  Tambahkan Portfolio Website
                </Buttons>
              </div>
            </>
          )}
          <h4 className="mt-5 text-gray-700">Pengaturan Mailketing</h4>
          <AsyncPaginate
            defaultValue={inputSubscriberListId}
            value={inputSubscriberListId}
            loadOptions={loadOptions as any}
            onChange={(value) => {
              handleInputSubscriberListId(value);
            }}
          />
          <div className="mb-5 mt-5">
            <h4 className="required fw-bold text-gray-700">Status</h4>
            <Dropdown
              options={[
                { value: "true", label: "Aktif" },
                { value: "", label: "Tidak Aktif" },
              ]}
              value={status ? "true" : ""}
              onValueChange={(value: any) => handleStatusChange(value)}
            ></Dropdown>
            <p className="text-muted fw-bold mt-5">Atur Status</p>
          </div>

          <button
            className="btn btn-primary w-100 mt-3"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submit Data..." : "Edit Service"}
          </button>
        </KTCardBody>
      </KTCard>
    </>
  );
};

export default EditService;
