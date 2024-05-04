// Define the menu item interface
export interface MenuItem {
  title: string;
  to: string;
  icon: string;
  subItems?: MenuItem[];
}

// Define the menu section interface
export interface MenuSection {
  section: string;
  items: MenuItem[];
}
