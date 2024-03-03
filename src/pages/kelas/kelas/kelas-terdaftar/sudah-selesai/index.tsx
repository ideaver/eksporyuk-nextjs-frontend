import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useAddNewCouponViewModel from "@/templates/Affiliate/TestAdminKupon/AddNewCoupon-view-model";
import KelasTerdaftar from "@/components/TabBarKelas/KelasTerdaftar/KelasTerdaftar";
import KelasTerdaftarPage from "@/templates/Kelas/KelasTerdaftar";

const SudahSelesaiPage: NextPage = () => {
    const addNewCouponTabsData = useAddNewCouponViewModel();
    const { query } = useRouter();
    const id = query.id;
    return (
        <>
            <KelasTerdaftar urlType="kelas/kelas-terdaftar" id={id} />
            <KelasTerdaftarPage />
            
        </>
    );
};

export default SudahSelesaiPage;