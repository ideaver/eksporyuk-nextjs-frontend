import { PageTitle } from "@/_metronic/layout/core";
import { breadcrumbs } from "./Member-view-model";
import { Modal } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";

const MemberPage = ({}) => {
  return (
    <div>
      <PageTitle breadcrumbs={breadcrumbs}>Member</PageTitle>
      <h1>Member Page</h1>
    </div>
  );
};

export default MemberPage;

const ExportModal = () => {
  return (
    <Modal show={true} centered={true} size="lg">
      <div className="modal-header">
        <h2>Export Data</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={()=>{

          }}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </div>

      <div className="modal-body">

      </div>

      <div className="modal-footer mx-auto">
        <Buttons buttonColor="secondary" classNames="btn-lg" onClick={()=>{}}>
          Batal
        </Buttons>
        <Buttons buttonColor="primary" classNames="btn-lg" onClick={()=>{}}>
          Export
        </Buttons>
      </div>
    </Modal>
  )};