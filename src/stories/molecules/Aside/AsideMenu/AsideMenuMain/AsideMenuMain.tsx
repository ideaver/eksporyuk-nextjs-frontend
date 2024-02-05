import { AsideMenuItemWithSub } from "@/_metronic/layout/components/aside/AsideMenuItemWithSub";
import { AsideMenuItem } from "../../AsideMenuItems/AsideMenuItem/AsideMenuItem";

const memberAffiliatorMenus = {
  menus: [
    {
      section: "Menu Member",
      items: [
        { title: "Dashboard Member", to: "/", icon: "category" },
        { title: "Order Saya", to: "/dwde", icon: "basket" },
        { title: "Langganan", to: "/dwde", icon: "timer" },
        { title: "Katalog Produk", to: "/dwde", icon: "cube-2" },
        {
          title: "Komunitas",
          to: "/dwde",
          icon: "abstract-39",
          subItems: [{ title: "Komunitas 1", to: "/dwde", icon: "cube-2" }],
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
        { title: "Dashboard Affiliasi", to: "/fef", icon: "category" },
        { title: "Komisi", to: "/dwde", icon: "bill" },
        { title: "Generate Link", to: "/dwde", icon: "fasten" },
        { title: "Bantuan Promosi", to: "/dwde", icon: "rescue" },
        { title: "Order Affiliasi", to: "/dwde", icon: "basket" },
        { title: "Kupon", to: "/dwde", icon: "barcode" },
        { title: "Pixel", to: "/dwde", icon: "data" },
        { title: "Leaderboard", to: "/dwde", icon: "ranking" },
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
