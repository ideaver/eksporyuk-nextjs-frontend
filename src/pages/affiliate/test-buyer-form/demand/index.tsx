import React from "react";
import { NextPage } from "next";
import Demand from "@/templates/Affiliate/TestBuyerForm/Demand";
import BuyerFormHeader from "@/components/layouts/TabBarBuyerFormHeader/BuyerFormHeader";

const DemandPage: NextPage = () => {
    return (
        <>
        <BuyerFormHeader urlType="test-buyer-form" id="test-buyer-form">
            <Demand />
        </BuyerFormHeader>
        </>
    );
};

export default DemandPage;
