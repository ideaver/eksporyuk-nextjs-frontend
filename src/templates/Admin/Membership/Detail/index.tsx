import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { PageTitle } from "@/_metronic/layout/core";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import Link from "next/link";
import { useRouter } from "next/router";
import CurrencyInput from "react-currency-input-field";
import { breadcrumbs } from "../Membership-view-model";
import useDetailMembershipViewModel, {
  IDetailMembership,
} from "./DetailMembership-view-model";

const DetailMembership = ({ id, data }: IDetailMembership) => {
  const router = useRouter();
  const {
    nameMembership,
    descriptionMembership,
    price,
    duration,
    benefits,
    courses,
    affiliateCommission,
    affiliateFirstCommission,
  } = useDetailMembershipViewModel({ id, data });
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Detail Membership</PageTitle>
      <KTCard>
        <KTCardBody>
          <h3 className="mb-10">Detail Membership</h3>
          <h4 className="">Nama Membership</h4>
          <p className="mb-8 fs-5">{nameMembership}</p>
          <h4 className="">Deskripsi Membership</h4>
          <p className="mb-8 fs-5">{descriptionMembership}</p>
          <h4 className="">Harga</h4>
          <div className="input-group">
            <span className="input-group-text" id="price-field">
              {"Rp"}
            </span>
            <CurrencyInput
              className="form-control"
              id="price-field"
              name="price"
              disabled
              placeholder="Masukan Komisi (Rp)"
              intlConfig={{ locale: "id-ID" }}
              defaultValue={0}
              value={price}
              decimalsLimit={2}
              onValueChange={(value, name, values) => {}}
            />
          </div>
          <h4 className=" mt-8">Durasi</h4>
          <p className="mb-8 fs-5">{duration + " Hari"}</p>
          <h4 className="">Benefit Kelas</h4>
          <div className="mb-8 fs-5 d-flex flex-wrap gap-5">
            {courses?.length == 0
              ? "Tidak ada benefit kelas"
              : courses?.map((e) => {
                  return (
                    <Buttons
                      buttonColor="secondary"
                      classNames="text-dark"
                      disabled
                      key={e.id}
                    >
                      {e.title}
                    </Buttons>
                  );
                })}
          </div>
          <div className="row">
            <div className="col">
              <h5 className="required mt-5">Harga Afiliasi Komisi Pertama</h5>
              <div className="input-group">
                <span className="input-group-text" id="price-field">
                  {"Rp"}
                </span>
                <CurrencyInput
                  className="form-control"
                  id="price-field"
                  disabled
                  name="price"
                  placeholder="Masukan Komisi (Rp)"
                  intlConfig={{ locale: "id-ID" }}
                  defaultValue={0}
                  value={affiliateFirstCommission}
                  decimalsLimit={2}
                  onValueChange={(value, name, values) => {}}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h5 className="required mt-10">Harga Afiliasi Komisi</h5>
              <div className="input-group">
                <span className="input-group-text" id="price-field">
                  {"Rp"}
                </span>
                <CurrencyInput
                  className="form-control"
                  id="price-field"
                  name="price"
                  disabled
                  placeholder="Masukan Komisi (Rp)"
                  intlConfig={{ locale: "id-ID" }}
                  defaultValue={0}
                  value={affiliateCommission}
                  decimalsLimit={2}
                  onValueChange={(value, name, values) => {}}
                />
              </div>
            </div>
          </div>
          <h4 className="mt-8">Benefit</h4>
          <div
            style={{
              height: "220px",
            }}
          >
            <div className="my-2 mx-4">
              <div dangerouslySetInnerHTML={{ __html: benefits as string }} />
            </div>
          </div>
          {/* <Textarea
                placeholder="Masukan Benefit"
                classNames={clsx(
                  {
                    "is-invalid":
                      formik.touched.benefits && formik.errors.benefits,
                  },
                  {
                    "is-valid":
                      formik.touched.benefits && !formik.errors.benefits,
                  }
                )}
                props={{
                  ...formik.getFieldProps("benefits"),
                  onChange: (e: any) => {
                    formik.setFieldValue("benefits", e.target.value);
                    setBenefits(e.target.value);
                  },
                  value: formik.values.benefits,
                }}
              /> */}
        </KTCardBody>
        <div className={"row flex-end mt-10"}>
          <Buttons
            // mode="light"
            buttonColor="secondary"
            classNames={"col-lg-2 me-lg-5"}
            onClick={() => {
              router.back();
            }}
          >
            Kembali
          </Buttons>{" "}
          <Link
            className={"col-lg-2 mt-5 mt-lg-0 btn btn-primary"}
            type="submit"
            href={`/admin/product-management/subscriber/edit/${id}`}
          >
            Edit
          </Link>
        </div>
      </KTCard>
    </>
  );
};

export default DetailMembership;
