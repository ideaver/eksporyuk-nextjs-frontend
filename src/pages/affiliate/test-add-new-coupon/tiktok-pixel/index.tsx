import React from "react";
import { NextPage } from "next";
import AffiliateHeader from "@/components/layouts/TabBar/AffiliateHeader";
import { useRouter } from "next/router";
import TiktokPixel from "@/templates/Affiliate/TestAdminKupon/TabLink/TiktokPixel";
import useAddNewCouponViewModel from "@/templates/Affiliate/TestAdminKupon/AddNewCoupon-view.model";

interface Props {
    navLinks: any;
    follupValues: string[];
    selectedFollupValue: string;
    handleFollupChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TiktokPixelPage: NextPage<Props> = ({
    follupValues,
    selectedFollupValue,
    handleFollupChange,
    navLinks,
}: {
    navLinks: any;
    follupValues: string[];
    selectedFollupValue: string;
    handleFollupChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const addNewCouponTabsData = useAddNewCouponViewModel();
    return (
        <>
            <TiktokPixel
                follupValues={follupValues}
                selectedFollupValue={selectedFollupValue}
                handleFollupChange={handleFollupChange}
                tabsData={addNewCouponTabsData}
            />
        </>
    );
};

export default TiktokPixelPage;
