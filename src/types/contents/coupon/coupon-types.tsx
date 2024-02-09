import { ColorList } from "@/types/general/utilities";

export interface CardProps {
  showBorder: boolean;
  className: string;
  icon: string;
  title: string;
  description?: string;
  descriptionColor?: string;
  badgeText?: string;
  badgeColor?: ColorList;
  iconColor: string;
}

export interface ProductProps {
  image: string;
  name: string;
}

export interface CouponProps {
  title: string;
  cards: CardProps[];
}
