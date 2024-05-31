import CurrencyInput from "react-currency-input-field";

import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { Textarea } from "@/stories/molecules/Forms/Textarea/Textarea";
import { PageTitle } from "@/_metronic/layout/core";
import useNewRewardViewModel, { breadcrumbs } from "./NewReward-view-model";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";

const CreateNewReward = () => {
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
    handleFileChange,
    onSubmit,
    errorMessage,
    namaReward,
    setNamaReward,
    fotoProduk,
    deskripsiReward,
    setDeskripsiReward,
    hargaPoint,
    akhirMasaBerlaku,
    setAkhirMasaBerlaku,
    handleStatusChange,
    status,
    handleChangeHargaPoint
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
                value={status}
                options={[
                  { label: "Published", value: "published" },
                  { label: "Private", value: "private" },
                ]}
                onValueChange={(value) => handleStatusChange(value as string)}
              />
            </div>
          </KTCardBody>
        </KTCard>
      </div>

      {/* Section 2 */}
      <div className="col-9">
        <KTCard>
          <KTCardBody>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}

            {/* Input 1 */}
            <div className="mb-5">
              <h3 className="mb-5">Informasi Reward</h3>
              <h5 className="required">Nama Reward</h5>
              <TextField
                onClickPreffixIcon={function noRefCheck() {}}
                onClickSuffixIcon={function noRefCheck() {}}
                props={{
                  value: namaReward,
                  onChange: setNamaReward,
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
                  {fotoProduk ? (
                    <>
                      <img
                        src={fotoProduk}
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

            {/* Input 3 */}
            <div className="mb-5">
              <h5>Deskripsi Reward</h5>
              <Textarea
                onClickPreffixIcon={function noRefCheck() {}}
                onClickSuffixIcon={function noRefCheck() {}}
                placeholder="Masukan deskripsi dari produk reward ini"
                props={{
                  value: deskripsiReward,
                  onChange: setDeskripsiReward,
                }}
              />
              <p className="fw-bold fs-5 text-muted pt-2">
                Masukan konten artikel
              </p>
            </div>

            {/* Input 4 */}
            <div className="mb-5">
              <h5 className="required">Harga Point</h5>
              <CurrencyInput
                  className="form-control"
                  id="price-field"
                  name="price"
                  placeholder="Masukan Jumlah Point"
                  intlConfig={{ locale: "id-ID" }}
                  defaultValue={0}
                  value={hargaPoint}
                  decimalsLimit={2}
                  onValueChange={(value, name, values) =>
                    handleChangeHargaPoint(value ?? "")
                  }
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
                  value: akhirMasaBerlaku,
                  onChange: setAkhirMasaBerlaku,
                }}
              />
              <p className="fw-bold fs-5 text-muted pt-2">
                Batas akhir reward dapat ditukarkan. Kosongkan jika tidak ada
                batasan waktu.
              </p>
            </div>
          </KTCardBody>
        </KTCard>
        <div
          className="d-flex justify-content-end mt-10 gap-3"
          style={{ width: "100%" }}
        >
          <button className="btn btn-secondary">Batal</button>
          <button className="btn btn-primary" onClick={onSubmit}>
            Tambahkan Reward
          </button>
        </div>
      </div>
    </div>
  );
};