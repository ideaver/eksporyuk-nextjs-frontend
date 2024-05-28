import { KTCard, KTCardBody } from "@/_metronic/helpers";
import Image from "next/image";
import { Buttons } from "../../Buttons/Buttons";
import React from "react";
import clsx from "clsx";

interface IllustrationCardProps {
  image?: string;
  title: JSX.Element | string;
  description?: JSX.Element;
  color?: string;
  classNames?: string;
}

const IllustrationCard = ({
  image,
  title,
  description,
  color = "bg-gray-900",
  classNames,
}: IllustrationCardProps) => {
  return (
    <>
      <KTCard className={clsx("p-0", color)}>
        <KTCardBody className="p-0">
          <div
            className={`d-flex flex-wrap flex-md-nowrap align-content-center align-items-center ${classNames}`}
          >
            <div className="p-10">
              {typeof title === "string" && !React.isValidElement(title) ? (
                <h1 className="text-white w-75">{title}</h1>
              ) : (
                title
              )}

              {description}
            </div>
            {image && (
              <Image
                className="order-first order-md-last"
                src={image}
                width={190}
                height={190}
                alt=""
              />
            )}
          </div>
        </KTCardBody>
      </KTCard>
    </>
  );
};

export default IllustrationCard;
