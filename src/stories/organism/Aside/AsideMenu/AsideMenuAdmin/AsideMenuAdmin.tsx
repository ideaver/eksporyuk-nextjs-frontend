import { AsideMenuItem } from "@/stories/molecules/Aside/AsideMenuItems/AsideMenuItem/AsideMenuItem";
import { AsideMenuItemWithSub } from "@/stories/molecules/Aside/AsideMenuItems/AsideMenuItemWithSub/AsideMenuItemWithSub";

const memberAffiliatorMenus = {
    menus: [
        {
            section: "Menu Admin",
            items: [
                { title: "Dashboard", to: "/admin", icon: "category" },
                { title: "Manajemen Produk", to: "/dwde", icon: "basket" },
                {
                    title: "Manajemen Kelas", to: "/dwde", icon: "timer",
                    subItems: [
                        { title: "Semua Kelas", to: "/dwde/d", icon: "cube-2" },
                        { title: "Tambah Kelas Baru", to: "/dwde/d", icon: "cube-2" },
                        { title: "Siswa", to: "/dwde/d", icon: "cube-2" },
                        { title: "Pengumuman", to: "/dwde/d", icon: "cube-2" },
                        { title: "Pengaturan Kelas", to: "/dwde/d", icon: "cube-2" },
                    ]
                },
                {
                    title: "Reminders", to: "/dwde", icon: "cube-2",
                    subItems: [
                        { title: "Semua Reminder", to: "/dwde/d", icon: "cube-2" },
                        { title: "Tambah Reminder", to: "/dwde/d", icon: "cube-2" },
                        { title: "Riwayat Reminder", to: "/dwde/d", icon: "cube-2" },
                    ]
                },
                {
                    title: "Notifikasi",
                    to: "/dwde",
                    icon: "abstract-39",
                    subItems: [
                        { title: "Notifikasi Umum", to: "/dwde/d", icon: "cube-2" },
                        { title: "Notifikasi Massal", to: "/dwde/d", icon: "cube-2" },
                    ],
                },
                { title: "Marketing SMTP", to: "/dwde", icon: "timer" },
                { title: "Live Chat", to: "/dwde", icon: "cube-2" },
            ],
        },
        {
            section: "MEMBER EKSPORYUK",
            items: [
                {
                    title: "User", to: "/dwde", icon: "category",
                    subItems: [
                        { title: "Semua User", to: "/dwde/d", icon: "cube-2" },
                        { title: "Tambah User", to: "/dwde/d", icon: "cube-2" },
                    ]
                },
                {
                    title: "Buyer",
                    to: "/dwde",
                    icon: "book-open",
                    subItems: [
                        { title: "Semua Buyer", to: "/dwde/d", icon: "cube-2" },
                        { title: "Tambah Buyer Baru", to: "/dwde/d", icon: "cube-2" },
                    ],
                },
                {
                    title: "Supplier", to: "/dwde", icon: "star",
                    subItems: [
                        { title: "Semua Supplier", to: "/dwde/d", icon: "cube-2" },
                        { title: "Tambah Supplier Baru", to: "/dwde/d", icon: "cube-2" },
                    ]
                },
                {
                    title: "Eksportir", to: "/dwde", icon: "star",
                    subItems: [
                        { title: "Semua Eksportir", to: "/dwde/d", icon: "cube-2" },
                        { title: "Tambah Eksportir Baru", to: "/dwde/d", icon: "cube-2" },
                    ]
                },
                {
                    title: "Forwarder", to: "/dwde", icon: "note-2",
                    subItems: [
                        { title: "Semua Forwarder", to: "/dwde/d", icon: "cube-2" },
                        { title: "Tambah Forwarder Baru", to: "/dwde/d", icon: "cube-2" },
                    ]
                },
                { title: "Tanya Jawab", to: "/dwde", icon: "message-text-2" },
                { title: "Reviews", to: "/dwde", icon: "cube-2" },
            ],
        },
    ],
};

const AsideMenuMain = ({ }) => {
    return (
        <>
            {memberAffiliatorMenus.menus.map((menu, index) => (
                <div key={index}>
                    <div className="menu-item">
                        <div className="menu-content pt-8 pb-2">
                            <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                                {menu.section}
                            </span>
                        </div>
                    </div>
                    {menu.items.map((item, itemIndex) => {
                        if (item.subItems) {
                            return (
                                <AsideMenuItemWithSub
                                    key={itemIndex}
                                    title={item.title}
                                    to={item.to}
                                    icon={item.icon}
                                >
                                    {item.subItems.map((subItem, subItemIndex) => (
                                        <AsideMenuItem
                                            key={subItemIndex}
                                            title={subItem.title}
                                            to={subItem.to}
                                            icon={subItem.icon}
                                        />
                                    ))}
                                </AsideMenuItemWithSub>
                            );
                        } else {
                            return (
                                <AsideMenuItem
                                    key={itemIndex}
                                    title={item.title}
                                    to={item.to}
                                    icon={item.icon}
                                />
                            );
                        }
                    })}
                </div>
            ))}
        </>
    );
};

export default AsideMenuMain;
