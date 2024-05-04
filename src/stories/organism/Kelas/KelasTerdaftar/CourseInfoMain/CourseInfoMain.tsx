import { KTCard, KTCardBody } from '@/_metronic/helpers'
import { Buttons } from '@/stories/molecules/Buttons/Buttons';
import Image from 'next/image';
import React from 'react'

type Props = {
    title?: string;
    icon: string;
    image: string;
    widthImage: number;
    heightImage: number;
    categories: string;
    textButton?: string;
    subTitle?: string;
    aboutCourse?: string | JSX.Element
    subAboutCourse?: string;
    description?: string;
    subDescription?: string | JSX.Element
    listCourse?: string;
    subListCourse?: ListCourse[];
    subTitle2?: string;
    listSubTitle2?: ListLearn[];
}

type ListCourse = {
    listCourse?: string
}

type ListLearn = {
    listLearn?: string
}

export const CourseInfoMain: React.FC<Props> = (
    {
        title,
        icon,
        image,
        categories,
        textButton,
        subTitle,
        aboutCourse,
        subAboutCourse,
        description,
        subDescription,
        listCourse,
        subListCourse,
        subTitle2,
        listSubTitle2,
        widthImage,
        heightImage
    }
) => {
    return (
        <>
            <KTCard shadow>
                <KTCardBody>
                    <h3>{title}</h3>
                    <div className="pb-6 d-flex align-items-center w-100 justify-content-between">
                        <div className={`fw-bold text-end d-flex align-items-center pt-4`}>
                            <Image
                                className="symbol symbol-50px symbol-circle me-4"
                                src={icon}
                                width={36}
                                height={36}
                                alt={categories}
                            ></Image>
                            <h5 className="text-gray-600"><span className='fw-normal text-gray-500'>by</span> {categories}</h5>
                        </div>
                        <div>
                            <Buttons
                                classNames='fw-bold'
                                mode='light'
                                size='small'
                                buttonColor='primary'
                                onClick={() => { }}
                            >
                                {textButton}
                            </Buttons>
                        </div>
                    </div>
                    <div>
                        <div className="w-100">
                            <Image
                                className={`symbol w-100`}
                                src={image}
                                width={widthImage}
                                height={heightImage}
                                alt={"A"}
                            ></Image>
                        </div>
                        <div className="py-4">
                            <h2 className={` text-gray-800 cursor-pointer text-hover-primary`}>{subTitle}</h2>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className='col-xl-1'>
                            <Buttons
                                classNames='fw-bold'
                                mode='light'
                                size='small'
                                buttonColor='primary'
                                onClick={() => { }}
                            >&ndash;</Buttons>
                        </div>
                        <div className='col-xl-11'>
                            <h3 className='pt-3 text-gray-900'>{aboutCourse}</h3>
                            <div className='pt-2'>
                                <p className='text-gray-500'>{subAboutCourse}</p>
                            </div>
                            <div>
                                <h3 className='text-gray-900'>{description}</h3>
                                <p className='pt-2 text-gray-500'>{subDescription}</p>
                            </div>
                            <div>
                                <h3 className='pb-2 text-gray-900'>{listCourse}</h3>
                                <ul>
                                    {subListCourse?.map((list, index) => (
                                        <li className='text-gray-500' key={index}>{list.listCourse}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className='col-xl-1'>
                            <Buttons
                                classNames='fw-bold'
                                mode='light'
                                size='small'
                                buttonColor='primary'
                                onClick={() => { }}
                            >&ndash;</Buttons>
                        </div>
                        <div className='col-xl-11'>
                            <div>
                                <h3 className='pt-3 pb-2 text-gray-900'>{subTitle2}</h3>
                                <ul>
                                    {listSubTitle2?.map((list, index) => (
                                        <li className='text-gray-500' key={index}>{list.listLearn}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </KTCardBody>
            </KTCard>
        </>
    )
}
