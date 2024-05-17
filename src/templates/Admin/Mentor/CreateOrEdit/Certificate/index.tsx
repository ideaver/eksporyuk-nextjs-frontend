import { KTIcon } from "@/_metronic/helpers";
import { MentorFindOneQuery } from "@/app/service/graphql/gen/graphql";

const MentorCertificatePage = ({ data }: { data: MentorFindOneQuery }) => {
    return (
        <div className="card mb-5 mb-xl-10" id="kt_certificate_details_view">
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">Sertifikat</h3>
          </div>
        </div>

        <div className="card-body p-9">
         
          
        </div>
      </div>
    );
}

export default MentorCertificatePage;