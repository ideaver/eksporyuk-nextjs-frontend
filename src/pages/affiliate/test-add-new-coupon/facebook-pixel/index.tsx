import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import FacebookPixel from "@/templates/Affiliate/TestAdminKupon/TabLink/FacebookPixel";
import useAddNewCouponViewModel from "@/templates/Affiliate/TestAdminKupon/AddNewCoupon-view.model";
import AdminHeader from "@/components/layouts/TabBarCoupon/AdminHeader";

interface Props {
    navLinks: any;
    follupValues: string[];
    selectedFollupValue: string;
    handleFollupChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FacebookPixelPage: NextPage<Props> = ({
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
    const { query } = useRouter();
    const id = query.id;
    return (
        <>
            <AdminHeader urlType="test-add-new-coupon" id={id} >
            <FacebookPixel
                follupValues={follupValues}
                selectedFollupValue={selectedFollupValue}
                handleFollupChange={handleFollupChange}
                tabsData={addNewCouponTabsData}
            />
            </AdminHeader>
            
        </>
    );
};

export default FacebookPixelPage;
