import React from "react";
import { NextPage } from "next";
import ReminderFormHeader from "@/components/layouts/TabBarReminderFrom/ReminderFormHeader";
import InformasiPesan from "@/templates/Affiliate/TestReminderForm/InformasiPesan";

const InformasiBuyerPage: NextPage = () => {
    return (
        <>
        <ReminderFormHeader urlType="test-reminder-form" id="test-reminder-form">
            <InformasiPesan />
        </ReminderFormHeader>
        </>
    );
};

export default InformasiBuyerPage;
