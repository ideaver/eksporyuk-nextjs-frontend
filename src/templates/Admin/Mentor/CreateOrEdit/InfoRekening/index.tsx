import { MentorFindOneQuery } from "@/app/service/graphql/gen/graphql";

const InfoRekening = ({
  data,
}: {
  data: MentorFindOneQuery | undefined;
}) => {
  return (
    <>
      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">Informasi Rekening</h3>
          </div>
        </div>

        <div className="card-body p-9 d-flex flex-wrap gap-2">
          {data?.mentorFindOne?.user?.accounts?.map((item, index) => {
            return (
              <div
                className="card-body d-flex justify-content-start gap-5 align-items-center p-9 border border-secondary border-dashed rounded"
                style={{ width: "542.5px", height: "95px" }}
                key={index}
              >
                <div>
                  <i
                    className="bi bi-credit-card-2-back-fill"
                    style={{ fontSize: "45px" }}
                  ></i>
                </div>
                <div className="">
                  <h5 className="mb-1">{item.accountInquiry?.bank.name ?? "..."}</h5>
                  <p className="text-muted m-0">{item.accountInquiry?.accountNumber ?? "..."}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default InfoRekening;