import { useState } from "react";

export interface MailketingTableList {
    imageSrc: string;
    title: string;
}

const navLinks = [
    {
        name: 'Informasi Reminder',
        href: "test-mailketing/informasi-reminder"
    },
    {
        name: 'Pesan',
        href: "test-mailketing/pesan"
    },
]

const useMailketingViewModel = () => {
    const follupValues = ["Email", "WhatsApp", "SMS"];
    const [selectedFollupValue, setSelectedFollupValue] = useState<string[]>([]);


    const handleFollupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as string; 
        if (selectedFollupValue.includes(value)) {
            setSelectedFollupValue(selectedFollupValue.filter(item => item !== value));
        } else {
            setSelectedFollupValue([value]);
        }
    };
    
    const addNewCouponTabsData = navLinks;
    const breadcrumbs = [
        {
            title: "Manajemen Produk",
            path: "/affiliate",
            isSeparator: false,
            isActive: false,
        },
        {
            title: "",
            path: "",
            isSeparator: true,
            isActive: false,
        },
    ];

    return {
        breadcrumbs,
        addNewCouponTabsData,
        follupValues,
        selectedFollupValue,
        handleFollupChange,
    };
};

export default useMailketingViewModel;
