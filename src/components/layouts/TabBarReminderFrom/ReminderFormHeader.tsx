import { TabLink } from "@/stories/organism/Links/TabLink/TabLink";
import { useRouter } from "next/router";
import { PageTitle } from "@/_metronic/layout/core";
import { Dropdown } from "@/stories/molecules/Forms/Dropdown/Dropdown";
import { KTCard, KTCardBody, KTIcon } from "@/_metronic/helpers";
import useReminderFormHeaderViewModel, { IReminderFormHeaderViewModel } from "./ReminderFromHeader-view-model";
import { useState } from "react";
import { usePathname } from "next/navigation";

const ReminderFormHeader = ({ urlType, id, children }: IReminderFormHeaderViewModel & { children?: React.ReactNode }) => {
    const {
        urls,
        handleFollupChange,
        selectedFollupValue,
        follupValues,
        breadcrumbs,
    } = useReminderFormHeaderViewModel({ urlType, id });
    const router = useRouter();
    const pathname = usePathname();

    const isOpeningFacebookPixel = router.pathname.startsWith('/test-reminder-form');

    return (
        <div>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Reminder Baru</PageTitle>
            <div className="row">
                <div className="col-3">
                    <div className="min-w-250px" style={{ position: 'fixed', top: 0, zIndex: 9999, marginTop: 120 }}>
                        <KTCard className="sticky-top">
                            <KTCardBody>
                                <h2 className="fw-bold text-gray-700 pb-4">
                                    Status
                                </h2>
                                <div className="d-flex">
                                    <Dropdown
                                        styleType="outline"
                                        props={{ id: "couponName" }}
                                        options={[
                                            { label: "Aktif", value: "status1" },
                                            { label: "Non-Aktif", value: "status2" },
                                        ]}
                                        onValueChange={() => { }}
                                    />
                                </div>
                                <p className="fw-bold fs-5 text-muted pt-2">
                                    Atur Status
                                </p>
                            </KTCardBody>
                        </KTCard>
                    </div>
                </div>
                <div className="col-9">
                    <div>
                        <TabLink className="mb-5" links={urls} />
                        {children}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReminderFormHeader;






