import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

import { PageTitle } from "@/_metronic/layout/core";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { CheckBoxInput } from "@/stories/molecules/Forms/Advance/CheckBox/CheckBox";
import useAddNewCouponViewModel, { breadcrumbs } from "./AddNewCoupon-view-model";

const CreateNewCoupon = () => {
  const { preview, handleImageClick, handleFileChange, fileInputRef } = useAddNewCouponViewModel();

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Tambah Kupon Baru</PageTitle>
      <CreateNewCouponContent 
        preview={preview}
        handleImageClick={handleImageClick}
        handleFileChange={handleFileChange}
        fileInputRef={fileInputRef}
      />
    </>
  );
};

export default CreateNewCoupon;

const CreateNewCouponContent = ({ preview, handleImageClick, handleFileChange, fileInputRef }: any) => {
  return (
    <div className="row">
      {/* Section 1 */}
      <div className="col-3">
        {/* Upload Image */}
        <div className="mb-5">
          <div
            className="card p-5"
            style={{ boxShadow: "10px 15px 8px -6px rgba(186,186,186,0.94)" }}
          >
            <h2 className="fw-bold text-gray-700 pb-4 card-title">
              Gambar Kupon
            </h2>
            <div className="card-body text-center">
              <div
                className="position-relative mb-5"
                onClick={handleImageClick}
              >
                <img
                  src={preview}
                  alt="Coupon"
                  className="img-fluid"
                  style={{ maxWidth: "150px" }}
                />
                <button
                  className="position-absolute top-0 end-0 btn btn-light"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    padding: "0",
                  }}
                >
                  <i className="bi bi-pencil" style={{ fontSize: "16px" }}></i>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
              <p className="card-text text-muted">
                Pilih gambar untuk dijadikan gambar kupon. Format gambar yang
                diterima adalah .jpg, .jpeg dan .png
              </p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="">
          <KTCard>
            <KTCardBody>
              <h2 className="fw-bold text-gray-700 pb-4">Status</h2>
              <div className="d-flex">
                <Dropdown
                  styleType="outline"
                  props={{ id: "couponName" }}
                  options={[
                    { label: "Aktif", value: "status1" },
                    { label: "Non-Aktif", value: "status2" },
                  ]}
                  onValueChange={() => {}}
                />
              </div>
              <p className="fw-bold fs-5 text-muted pt-2">Atur Status</p>
            </KTCardBody>
          </KTCard>
        </div>
      </div>

      {/* Section 2 */}
      <div className="col-9">
        <div>
          <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap mb-5">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-bs-toggle="tab"
                href="#informasi-kupon"
              >
                Informasi Kupon
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="tab"
                href="#pengaturan-affiliasi"
              >
                Affiliasi
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" href="#penggunaan">
                Penggunaan
              </a>
            </li>
          </ul>
          <div>
            <div>
              <KTCard>
                <KTCardBody>
                  <div className="tab-content" id="myTabContent">
                    {/* Informasi Kupon */}
                    <div
                      className="tab-pane fade active show"
                      id="informasi-kupon"
                      role="tabpanel"
                    >
                      <h2 className="pb-3">Informasi Kupon</h2>
                      <div>
                        <h4 className="required fw-bold text-gray-700">
                          Kode Kupon
                        </h4>
                        <TextField
                          styleType="outline"
                          size="medium"
                          placeholder="https://member.eksporyuk.com/aff/6267/6068/"
                        />
                        <p className="fw-bold fs-6 text-muted">
                          Nama/Kode Kupon
                        </p>
                      </div>
                      <h4 className="required fw-bold text-gray-700">
                        Besar Potongan
                      </h4>
                      <div className="d-flex">
                        <div className="w-50 pe-3">
                          <TextField
                            classNames=""
                            styleType="outline"
                            size="medium"
                            placeholder="ID, isi dengan identifikasi apapun"
                          />
                        </div>
                        <div className="w-50 ps-3">
                          <Dropdown
                            styleType="outline"
                            props={{ id: "couponName" }}
                            options={[
                              { label: "Facebook", value: "akuisisi1" },
                              { label: "Instagram", value: "akuisisi2" },
                            ]}
                            onValueChange={() => {}}
                          />
                        </div>
                      </div>
                      <p className="fw-bold fs-6 text-muted">
                        Besar dan jenis potongan yang didapatkan
                      </p>
                      <div className="mt-6">
                        <CheckBoxInput
                          className="active"
                          name="follup"
                          value={"option1" || "option2"}
                          checked={false}
                          onChange={() => {}}
                        >
                          {`Sesuaikan Jumlah Potongan dengan Kuantitas Item`}
                          <span className="fw-bold fs-6 text-muted pt-2">
                            Apabila diaktifkan, maka besaran potongan akan
                            menyesuaikan dengan jumlah produk yang dibeli
                          </span>
                        </CheckBoxInput>
                      </div>
                      <div className="mt-3">
                        <CheckBoxInput
                          className="active"
                          name="follup"
                          value={"option1" || "option2"}
                          checked={false}
                          onChange={() => {}}
                        >
                          {`Aktifkan Gratis Ongkir pada Item Ini agar pelanggan bisa menikmati pengiriman tanpa biaya tambahan`}
                          <span className="fw-bold fs-6 text-muted pt-2">
                          Apabila diaktifkan, maka pembeli
                          tidak menanggung ongkos kirim
                          </span>
                        </CheckBoxInput>
                      </div>
                      <div className="pt-4">
                        <h4 className="required fw-bold text-gray-700">
                          Batas Jumlah Penggunaan
                        </h4>
                        <TextField
                          styleType="outline"
                          size="medium"
                          placeholder="Berapa kali kupon ini dapat digunakan"
                        />
                        <p className="fw-bold fs-6 text-muted">
                          Masukkan 0 jika kupon ini dapat digunakan sampai
                          berapa kalipun
                        </p>
                      </div>
                      <div>
                        <h4 className="required fw-bold text-gray-700">
                          Batas Waktu Penggunaan
                        </h4>
                        <TextField
                          styleType="outline"
                          size="medium"
                          placeholder="Pilih tanggal"
                        />
                        <p className="fw-bold fs-6 text-muted">
                          Masukkan 0 jika kupon ini dapat digunakan sampai
                          kapanpun
                        </p>
                      </div>
                    </div>

                    {/* Pengaturan Afiliasi */}
                    <div
                      className="tab-pane fade"
                      id="pengaturan-affiliasi"
                      role="tabpanel"
                    >
                      <h2 className="pb-3">Pengaturan Afiliasi</h2>

                      <div className="mt-6">
                        <CheckBoxInput
                          className="active"
                          name="follup"
                          value={"option1" && "option2"}
                          checked={false}
                          onChange={() => {}}
                        >
                          {`Izinkan Affiliasi Menggunakan Kupon Ini`}
                          <span className="fw-bold fs-6 text-muted pt-2">
                            Apabila diaktifkan, maka affilasi dapat menggunakan
                            kode ini dan membuat kode sendiri menggunakan kode
                            ini
                          </span>
                        </CheckBoxInput>
                      </div>
                      <div className="pt-4">
                        <h4 className="fw-bold text-gray-700">
                          Batas Penggunaan Kupon oleh Affiliasi
                        </h4>
                        <TextField
                          styleType="outline"
                          size="medium"
                          placeholder="Berapa kali kupon ini dapat digunakan sebagai base kupon affiliasi"
                        />
                        <p className="fw-bold fs-6 text-muted">
                          Masukkan 0 jika kupon ini dapat digunakan berkali-kali
                          oleh affiliasi
                        </p>
                      </div>
                    </div>

                    {/* Penerapan Kupon */}
                    <div
                      className="tab-pane fade"
                      id="penggunaan"
                      role="tabpanel"
                    >
                      <h2 className="pb-3">Penerapan Kupon</h2>

                      <div className="pt-4">
                        <h4 className="fw-bold text-gray-700">
                          Batas Penggunaan Kupon oleh Affiliasi
                        </h4>
                        <div className="d-flex">
                          <Dropdown
                            styleType="outline"
                            props={{ id: "couponName" }}
                            options={[
                              { label: "Facebook", value: "akuisisi1" },
                              { label: "Instagram", value: "akuisisi2" },
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
                        <div className="d-flex pt-3">
                          <Dropdown
                            styleType="outline"
                            props={{ id: "couponName" }}
                            options={[
                              { label: "Facebook", value: "akuisisi1" },
                              { label: "Instagram", value: "akuisisi2" },
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
                <button className="btn btn-primary">Tambahkan Kupon</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
