import { useState, useRef, ChangeEvent } from "react";

import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { PageTitle } from "@/_metronic/layout/core";
import useNewRewardViewModel, { breadcrumbs } from "./NewReward-view-model";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";

const CreateNewReward = () => {
  const { previewImages, setPreviewImages, handleFileChange, handleFileClick } =
    useNewRewardViewModel();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Tambah Reward</PageTitle>
      <CreateNewRewardContent />
    </>
  );
};

export default CreateNewReward;

const CreateNewRewardContent = () => {
  const {
    previewImages,
    setPreviewImages,
    handleFileChange,
    handleFileClick,
    fileInputRef,
    rewardName,
    setRewardName,
    rewardDesc,
    setRewardDesc,
    pointsRequired,
    setPointsRequired,
    endSales,
    setEndSales,
    onSubmit,
  } = useNewRewardViewModel();

  return (
    <div className="row">
      {/* Section 1 */}
      <div className="col-3">
        {/* Status */}
        <KTCard>
          <KTCardBody>
            <h2 className="fw-bold text-gray-700 pb-4">Status</h2>
            <div className="d-flex">
              <Dropdown
                styleType="outline"
                props={{ id: "couponName" }}
                options={[
                  { label: "Published", value: "published" },
                  { label: "Private", value: "private" },
                ]}
                onValueChange={() => {}}
              />
            </div>
          </KTCardBody>
        </KTCard>
      </div>

      {/* Section 2 */}
      <div className="col-9">
        <div>
          <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap mb-5">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-bs-toggle="tab"
                href="#informasi-reward"
              >
                Informasi Reward
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="tab"
                href="#hubungkan-course"
              >
                Hubungkan Course
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="tab"
                href="#hubungkan-produk"
              >
                Hubungkan Produk
              </a>
            </li>
          </ul>
          <div>
            <div>
              <KTCard>
                <KTCardBody>
                  <div className="tab-content" id="myTabContent">
                    {/* Informasi Reward */}
                    <div
                      className="tab-pane fade active show"
                      id="informasi-reward"
                      role="tabpanel"
                    >
                      {/* Input 1 */}
                      <div className="mb-5">
                        <h3 className="mb-5">Informasi Reward</h3>
                        <h5 className="required">Nama Reward</h5>
                        <TextField
                          onClickPreffixIcon={function noRefCheck() {}}
                          onClickSuffixIcon={function noRefCheck() {}}
                          props={{
                            value: rewardName,
                            onChange: (e: any) => setRewardName(e.target.value)
                          }}
                        />
                        <p className="fw-bold fs-5 text-muted pt-2">
                          Masukan nama produk reward
                        </p>
                      </div>

                      {/* Input 2 */}
                      <div className="mb-5">
                        <h5 className="required">Foto Produk</h5>
                        <div
                          className="border-dashed border-primary rounded p-3"
                          onClick={handleFileClick}
                          style={{ cursor: "pointer" }}
                        >
                          {previewImages.length > 0 ? (
                            <div className="row">
                              {previewImages.map((image, index) => (
                                <div key={index} className="">
                                  <img
                                    src={image}
                                    alt={`Preview ${index + 1}`}
                                    className="img-fluid rounded"
                                    onClick={() => setPreviewImages([])}
                                  />
                                </div>
                              ))}
                            </div>
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
                                  <h5 className="m-0">
                                    Pilih file untuk diupload
                                  </h5>
                                  <small className="text-muted">
                                    File yang diupload dapat berformat .JPG,
                                    .PNG dan .JPEG. Maksimal 10 file
                                  </small>
                                </div>
                              </div>
                              <input
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                              />
                            </>
                          )}
                        </div>
                      </div>

                      {/* Input 3 */}
                      <div className="mb-5">
                        <h5>Deskripsi Reward</h5>
                        <Textarea
                          onClickPreffixIcon={function noRefCheck() {}}
                          onClickSuffixIcon={function noRefCheck() {}}
                          placeholder="Masukan deskripsi dari produk reward ini"
                          props={{
                            value: rewardDesc,
                            onChange: (e: any) => setRewardDesc(e.target.value),
                          }}
                        />
                        <p className="fw-bold fs-5 text-muted pt-2">
                          Masukan konten artikel
                        </p>
                      </div>

                      {/* Input 4 */}
                      <div className="mb-5">
                        <h5 className="required">Harga Poin</h5>
                        <TextField
                          onClickPreffixIcon={function noRefCheck() {}}
                          onClickSuffixIcon={function noRefCheck() {}}
                          type="number"
                          placeholder="Masukan jumlah poin"
                          preffixIcon="bi bi-0-circle"
                          props={{
                            value: pointsRequired,
                            onChange: (e: any) => setPointsRequired(e.target.value)
                          }}
                        />
                        <p className="fw-bold fs-5 text-muted pt-2">
                          Poin yang harus ditukarkan affiliate
                        </p>
                      </div>

                      {/* Input 5 */}
                      <div className="mb-5">
                        <h5>Akhir Masa Berlaku</h5>
                        <TextField
                          onClickPreffixIcon={function noRefCheck() {}}
                          onClickSuffixIcon={function noRefCheck() {}}
                          type="date"
                          props={{
                            value: endSales,
                            onChange: (e: any) => setEndSales(e.target.value)
                          }}
                        />
                        <p className="fw-bold fs-5 text-muted pt-2">
                          Batas akhir reward dapat ditukarkan. Kosongkan jika
                          tidak ada batasan waktu.
                        </p>
                      </div>
                    </div>

                    {/* Hubungkan Course */}
                    <div
                      className="tab-pane fade"
                      id="hubungkan-course"
                      role="tabpanel"
                    >
                      <h2 className="pb-3">Hubungkan Course</h2>
                    </div>

                    {/* Hubungkan Produk */}
                    <div
                      className="tab-pane fade"
                      id="hubungkan-produk"
                      role="tabpanel"
                    >
                      <h2 className="pb-3">Hubungkan Produk</h2>

                      <div className="pt-4">
                        <h4 className="fw-bold text-gray-700">
                          Tambahkan Produk yang Didapat dari Reward Ini
                        </h4>
                        <div className="d-flex">
                          <Dropdown
                            styleType="outline"
                            props={{ id: "couponName" }}
                            options={[
                              {
                                label: "Jasa Website Ekspor Hemat",
                                value: "ekspor-hemat",
                              },
                              {
                                label: "Jasa Website Ekspor Reguler",
                                value: "ekspor-reguler",
                              },
                            ]}
                            onValueChange={() => {}}
                          />
                          <Buttons
                            mode="light"
                            classNames="ms-6"
                            buttonColor="danger"
                            size="small"
                          >
                            <KTIcon iconName="cross" className="fs-2" />
                          </Buttons>
                        </div>
                        <div className="pt-3">
                          <Buttons buttonColor="primary" mode="light">
                            <KTIcon iconName="plus" className="fs-2" />
                            Tambahkan Produk
                          </Buttons>
                        </div>
                      </div>
                    </div>
                  </div>
                </KTCardBody>
              </KTCard>
              <div
                className="d-flex justify-content-end mt-10 gap-3"
                style={{ width: "100%" }}
              >
                <button className="btn btn-secondary">Batal</button>
                <button className="btn btn-primary" onClick={onSubmit}>Tambahkan Reward</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
