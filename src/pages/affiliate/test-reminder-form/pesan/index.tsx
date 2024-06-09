import React from "react";
import { NextPage } from "next";
import ReminderFormHeader from "@/components/layouts/TabBarReminderFrom/ReminderFormHeader";
import Pesan from "@/templates/Affiliate/TestReminderForm/Pesan";

const InformasiBuyerPage: NextPage = () => {
    return (
        <>
        <ReminderFormHeader urlType="test-reminder-form" id="test-reminder-form">
            <Pesan />
        </ReminderFormHeader>
        </>
    );
};

export default InformasiBuyerPage;
