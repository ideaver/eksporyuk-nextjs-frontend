import { useState } from "react";

export interface ReminderFormTableList {
    imageSrc: string;
    title: string;
}

const navLinks = [
    {
        name: 'Informasi Reminder',
        href: "test-add-new-coupon/informasi-reminder"
    },
    {
        name: 'Pesan',
        href: "test-add-new-coupon/pesan"
    },
]

const useReminderFormViewModel = () => {
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

export default useReminderFormViewModel;
