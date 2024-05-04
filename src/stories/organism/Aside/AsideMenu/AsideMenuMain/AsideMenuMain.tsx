import { RootState } from "@/app/store/store";
import { AsideMenuItem } from "@/stories/molecules/Aside/AsideMenuItems/AsideMenuItem/AsideMenuItem";
import { AsideMenuItemWithSub } from "@/stories/molecules/Aside/AsideMenuItems/AsideMenuItemWithSub/AsideMenuItemWithSub";
import { useSelector } from "react-redux";

const AsideMenuMain = ({}) => {
  const menus = useSelector((state: RootState) => state.navigation.menus);
  return (
    <>
      {menus.map((menu, index) => (
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
