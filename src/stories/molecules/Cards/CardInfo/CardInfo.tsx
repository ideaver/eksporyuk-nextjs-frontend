import { KTIcon } from "@/_metronic/helpers";
import { Badge } from "@/stories/atoms/Badge/Badge";
import { BorderList, ColorList } from "@/types/general/utilities";
import clsx from "clsx";

interface CardInfoProps {
  className?: string;
  color?: string;
  icon: string;
  iconColor?: string;
  title: string;
  titleColor?: string;
  description?: string;
  descriptionColor?: string;
  badgeText?: string;
  badgeColor?: ColorList;
  showBorder?: boolean;
  borderColor?: ColorList;
  borderType?: BorderList;
  borderWidth?: string;
  titleSize?: number;
  marginBottom?: number;
}

export const CardInfo = ({
  className,
  color,
  icon,
  iconColor,
  title,
  titleColor,
  description,
  descriptionColor,
  badgeText,
  badgeColor,
  showBorder,
  borderColor = "secondary",
  borderType = "dashed",
  borderWidth = "1",
  titleSize = 2,
  marginBottom = 2,
}: CardInfoProps) => {
  const borderHandler = () => {
    if (showBorder) {
      return `border border-${borderType} border-${borderColor} border-${borderWidth}`;
    }
  };
  return (
    <div
      className={clsx(
        `card bg-${color} hoverable ${className}`,
        borderHandler()
      )}
    >
      <div className="card-body">
        <KTIcon iconName={icon} className={`text-${iconColor} fs-3x ms-n1`} />

        <div className={`text-${titleColor} fw-bold fs-${titleSize} mb-${marginBottom} mt-5`}>
          {title}
        </div>

        <div className={`fw-semibold text-${descriptionColor}`}>
          {description}
        </div>
        <div>
          {badgeText && <Badge badgeColor={badgeColor} label={badgeText} />}
        </div>
      </div>
    </div>
  );
};
