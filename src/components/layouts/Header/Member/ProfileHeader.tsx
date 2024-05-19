/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTIcon } from '@/_metronic/helpers'
import { TabLink } from '@/stories/organism/Links/TabLink/TabLink'
import useProfileHeaderViewModel, { IMemberProfileHeaderViewModel } from './ProfileHeader-view-model'
import { PageTitle } from '@/_metronic/layout/core';
import { formatAddress } from '@/app/service/utils/addressFormatter';
import { formatCurrency } from '@/app/service/utils/currencyFormatter';

const ProfileHeader = ({id, data}: IMemberProfileHeaderViewModel) => {

    const {urls, breadcrumbs} = useProfileHeaderViewModel({
        id, data
    });

const totalOrdersAmount = data?.user?.orders?.reduce((total, order) => {
  const orderTotal = order?.invoices?.reduce((orderTotal, invoice) => orderTotal + invoice.amount, 0);
  return total + (orderTotal ?? 0);
}, 0);
const totalOrdersQuantity = data?.user?.orders?.reduce((total, order) => { 
  const orderQuantity = order?.cart.cartItems?.reduce((orderQuantity, cart) => orderQuantity + cart.quantity, 0);
  return total + (orderQuantity ?? 0);
} , 0);

  return (
   <>
    <PageTitle breadcrumbs={breadcrumbs}>Detail User</PageTitle>

<div className='card mb-5 mb-xl-10'>
  <div className='card-body pt-9 pb-0'>
    <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
      <div className='me-7 mb-4'>
        <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
          <img src={data?.user.avatarImageId ?? '/media/avatars/blank.png'} alt='Metornic' />
        </div>
      </div>

      <div className='flex-grow-1'>
        <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
          <div className='d-flex flex-column'>
            <div className='d-flex align-items-center mb-2'>
              <p className='text-gray-800 fs-2 fw-bolder me-1 mb-0'>
                {data?.user.name}
              </p>
            
            </div>

            <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
              <p
               
                className='d-flex align-items-center text-gray-400  me-5 mb-2'
              >
                <KTIcon iconName='profile-circle' className='fs-4 me-1' />
                Member
              </p>
              <p
                className='d-flex align-items-center text-gray-400  me-5 mb-2'
              >
                <KTIcon iconName='geolocation' className='fs-4 me-1' />
                {formatAddress(data?.user.addresses?.find((a) => a.isMain === true))}
              </p>
            </div>
          </div>

        </div>

        <div className='d-flex flex-wrap flex-stack'>
          <div className='d-flex flex-column flex-grow-1 pe-8'>
            <div className='d-flex flex-wrap'>
              <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                <div className='d-flex align-items-center'>
                  <div className='fs-2 fw-bolder'>{formatCurrency(totalOrdersAmount ?? 0)}</div>
                </div>

                <div className='fw-bold fs-6 text-gray-400'>Total Pembelian</div>
              </div>

              <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                <div className='d-flex align-items-center'>
                  <div className='fs-2 fw-bolder'>{totalOrdersQuantity}</div>
                </div>

                <div className='fw-bold fs-6 text-gray-400'>Kuantitas Pembelian</div>
              </div>

              <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                <div className='d-flex align-items-center'>
                  <div className='fs-2 fw-bolder'>{data?.enrollments?.length}</div>
                </div>

                <div className='fw-bold fs-6 text-gray-400'>Kelas Terdaftar</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div className='d-flex overflow-auto h-55px'>
      <TabLink links={urls}></TabLink>
    </div>
  </div>
</div>
   </>
  )
}

export default ProfileHeader
