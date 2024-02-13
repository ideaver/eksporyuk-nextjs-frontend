import React from "react";
import { NextPage } from "next";
import InformasiBuyer from "@/templates/TestBuyerForm/InformasiBuyer";
import BuyerFormHeader from "@/components/layouts/TabBarBuyerFormHeader/BuyerFormHeader";

const InformasiBuyerPage: NextPage = () => {
    return (
        <>
        <BuyerFormHeader urlType="test-buyer-form" id="test-buyer-form">
            <InformasiBuyer />
        </BuyerFormHeader>
        </>
    );
};

export default InformasiBuyerPage;
