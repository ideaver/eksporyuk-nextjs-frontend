import { KTCard, KTCardBody } from '@/_metronic/helpers'
import React from 'react'

type Props = {
    classname?: string;
    title?: string;
    categories?: string;
    subCategories?: string;
    materialIncludes?: string;
    subMaterialIncludes: SubMaterial[];
    requirements?: string;
    subRequirements?: string;
    audience?: string;
    subAudience: SubAudience[];
}

type SubMaterial = {
    listMaterial?: string
}

type SubAudience = {
    listAudience?: string
}

export const CourseDetail: React.FC<Props> = ({
    classname,
    title,
    categories,
    subCategories,
    materialIncludes,
    subMaterialIncludes,
    requirements,
    subRequirements,
    audience,
    subAudience
}) => {
    return (
        <>
            <KTCard>
                <KTCardBody>
                    <h3 className='text-gray-800 pb-4'>{title}</h3>
                    <h5 className='text-gray-700 pt-2 pb-3'>{categories}</h5>
                    <p className='text-gray-500 lh-1'>- {subCategories}</p>
                    <h5 className='text-gray-700 pt-2 pb-3'>{materialIncludes}</h5>
                    {subMaterialIncludes.map((item, index) => (
                        <p key={index} className='text-gray-500 lh-1'>- {item.listMaterial}</p>
                    ))}
                    <h5 className='text-gray-700 pt-2 pb-3'>{requirements}</h5>
                    <p className='text-gray-500 lh-1'>- {subRequirements}</p>
                    <h5 className='text-gray-700 pt-2 pb-3'>{audience}</h5>
                    {subAudience.map((item, index) => (
                        <p key={index} className='text-gray-500 lh-1'>- {item.listAudience}</p>
                    ))}
                </KTCardBody>
            </KTCard>
        </>
    )
}
