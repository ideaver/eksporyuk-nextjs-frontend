import { KTModal } from "@/_metronic/helpers/components/KTModal";
import { PageTitle } from "@/_metronic/layout/core";
import { useUserFindOneQuery } from "@/app/service/graphql/gen/graphql";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const { data, loading, error } = useUserFindOneQuery({
    variables: {
      where: { id: session?.user.id },
    },
  });

  useEffect(() => {
    if (data?.userFindOne === null && !loading) {
      signOut();
    }
  }, [data, loading]);
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
