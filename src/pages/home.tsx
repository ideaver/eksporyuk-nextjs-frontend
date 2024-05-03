import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { PageTitle } from "@/_metronic/layout/core";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <>
      {/* <MasterLayout> */}
      <PageTitle
        breadcrumbs={[
          {
            title: "Home",
            path: "/home",
            isSeparator: false,
            isActive: false,
          },
          {
            title: "",
            path: "",
            isSeparator: true,
            isActive: false,
          },
        ]}
      >
        Dashboard
      </PageTitle>
      <KTModal
        dataBsTarget="kt_logout_modal"
        title="Keluar akun?"
        fade
        modalCentered
        footerContentCentered
        onClose={() => {}}
        modalSize="md"
        buttonClose={
          <Buttons
            buttonColor="secondary"
            classNames="fw-bold"
            data-bs-dismiss="modal"
          >
            Batal
          </Buttons>
        }
        buttonSubmit={
          <Buttons classNames="fw-bold" onClick={() => signOut()}>
            Keluar
          </Buttons>
        }
      >
        <h3>Apakah kamu yakin untuk keluar dari akun ini?</h3>
      </KTModal>
      {/* </MasterLayout> */}
    </>
  );
}
