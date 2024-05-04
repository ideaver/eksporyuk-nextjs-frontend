import { KTCard, KTCardBody, KTIcon, toAbsoluteUrl } from "@/_metronic/helpers";
import { KTTable } from "@/_metronic/helpers/components/KTTable";
import { KTTableBody } from "@/_metronic/helpers/components/KTTableBody";
import { KTTableHead } from "@/_metronic/helpers/components/KTTableHead";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { CardInfo } from "@/stories/molecules/Cards/CardInfo/CardInfo";
import Image from "next/image";


interface Table {
    iconTable: string;
    nameInstructor: string;
}

type InstructorProps = {
    title?: string;
    className?: string;
    data: Table[];
};

export const Instructor: React.FC<InstructorProps> = (
    { className, data, title }
) => {
    return (
        <KTCard className={`rounded ${className}`}>
            <KTCardBody>
                <h3 className=''>
                    {title}
                </h3>
                <KTTable className="table mt-5"
                    dashed
                    rounded
                    color="gray-600"
                    utilityGY={2}
                >
                    {data.map((item, index) => (
                        <KTTableBody className=""
                            color="gray-600"
                            key={index}>
                            <td className="">
                                <div className="d-flex align-items-center">
                                    <div className='symbol symbol-45px'>
                                        <Image
                                            className="symbol symbol-50px me-4"
                                            src={item.iconTable}
                                            width={36}
                                            height={36}
                                            alt={`${item.nameInstructor}`}
                                        ></Image>
                                    </div>
                                    <div>
                                        <h3 className="text-dark my-auto">{item.nameInstructor}</h3>
                                    </div>
                                </div>
                            </td>
                        </KTTableBody>
                    ))}
                </KTTable>
            </KTCardBody>
        </KTCard>
    );
};