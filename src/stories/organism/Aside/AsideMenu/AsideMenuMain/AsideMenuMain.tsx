import { AsideMenuItem } from "@/stories/molecules/Aside/AsideMenuItems/AsideMenuItem/AsideMenuItem";
import { AsideMenuItemWithSub } from "@/stories/molecules/Aside/AsideMenuItems/AsideMenuItemWithSub/AsideMenuItemWithSub";

const memberAffiliatorMenus = {
  menus: [
    {
      section: "Menu Member",
      items: [
        { title: "Dashboard Member", to: "/home", icon: "category" },
        { title: "Order Saya", to: "/dwde", icon: "basket" },
        { title: "Langganan", to: "/dwde", icon: "timer" },
        { title: "Katalog Produk", to: "/dwde", icon: "cube-2" },
        {
          title: "Komunitas",
          to: "/dwde",
          icon: "abstract-39",
          subItems: [{ title: "Komunitas 1", to: "/dwde/d", icon: "cube-2" }],
        },
      ],
    },
    {
      section: "Menu Kelas",
      items: [
        { title: "Dashboard Kelas", to: "/dwde", icon: "category" },
        {
          title: "Kelas",
          to: "/dwde",
          icon: "book-open",
          subItems: [{ title: "Kelas 1", to: "/dwde", icon: "cube-2" }],
        },
        { title: "Reviews", to: "/dwde", icon: "star" },
        { title: "My Quiz Attempts", to: "/dwde", icon: "note-2" },
        { title: "Tanya Jawab", to: "/dwde", icon: "message-text-2" },
        { title: "Reviews", to: "/dwde", icon: "cube-2" },
      ],
    },
    {
      section: "Menu Affiliasi",
      items: [
        {
          title: "Dashboard Affiliasi",
          to: "/affiliate/dashboard",
          icon: "category",
        },
        { title: "Komisi", to: "/affiliate/commission", icon: "bill" },
        { title: "Bantuan Promosi", to: "/affiliate/promotion", icon: "rescue" },
        { title: "Generate Link", to: "/affiliate/generate-link", icon: "fasten" },
        { title: "Order Affiliasi", to: "/affiliate/order", icon: "basket" },
        { title: "Kupon", to: "/affiliate/coupon", icon: "barcode" },
        { title: "Pixel", to: "/affiliate/pixel", icon: "data" },
        { title: "Leaderboard", to: "/affiliate/leaderboard", icon: "ranking" },
        { title: "Tambah Kupon Baru", to: "/affiliate/test-add-new-coupon", icon: "barcode" },
        { title: "Buyer Form", to: "/affiliate/test-buyer-form", icon: "barcode" },
        { title: "Reminder Form", to: "/affiliate/test-reminder-form", icon: "barcode" },
      ],
    },
  ],
};

const AsideMenuMain = ({}) => {
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
