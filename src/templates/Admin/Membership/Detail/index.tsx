import { PageTitle } from "@/_metronic/layout/core";
import useDetailMembershipViewModel, {
  IDetailMembership,
} from "./DetailMembership-view-model";
import { breadcrumbs } from "../Membership-view-model";
import { KTCard, KTCardBody } from "@/_metronic/helpers";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import Link from "next/link";
import { useRouter } from "next/router";

const DetailMembership = ({ id, data }: IDetailMembership) => {
  const router = useRouter();
  const {
    nameMembership,
    descriptionMembership,
    membershipType,
    price,
    duration,
    benefits,
    courses,
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
          <h4 className="">Tipe Membership</h4>
          <p className="mb-8 fs-5">{membershipType}</p>
          <h4 className="">Harga</h4>
          <p className="mb-8 fs-5">{price}</p>
          <h4 className="">Durasi</h4>
          <p className="mb-8 fs-5">{duration + "Hari"}</p>
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
          <h4 className="">Benefit</h4>
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
            href={`/admin/subscriber/edit/${id}`}
          >
            Edit
          </Link>
        </div>
      </KTCard>
    </>
  );
};

export default DetailMembership;