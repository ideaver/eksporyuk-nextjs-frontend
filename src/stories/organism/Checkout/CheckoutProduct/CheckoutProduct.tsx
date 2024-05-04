import { AppLogo } from '@/stories/atoms/AppLogo/AppLogo'
import React, { PropsWithChildren } from 'react'
import { TabLink } from '../../Links/TabLink/TabLink'
import { KTCard, KTCardBody } from '@/_metronic/helpers'


type Props = {
    title?: string
    kupon?: string
    discount?: string
    list1?: string
    list2?: string
    list3?: string
    list4?: string
}
const CheckoutProduct: React.FC<Props & PropsWithChildren> = (props) => {
    const {
        title,
        kupon,
        discount,
        list1,
        list2,
        list3,
        list4,
        children
    } = props
    const links = [
        { label: "Login", to: "/" },
        { label: "Buat Akun Baru", to: "/account" },
    ]
    return (
        <>
            <KTCard>
                <KTCardBody>
                    <div className="min-w-700px">
                        <div className='text-center'>
                            <AppLogo size='small' />
                        </div>
                        <h1 className="text-center pt-4">{title}</h1>
                        <div className='text-start pt-6'>
                            <ul className='text-gray-600 fs-5'>
                                <li>{list1}</li>
                                <li>{list2}</li>
                                <li>{list3}</li>
                                <li>{list4}</li>
                            </ul>
                        </div>
                        {children}
                    </div>
                </KTCardBody>
            </KTCard>
        </>
    )
}

export default CheckoutProduct