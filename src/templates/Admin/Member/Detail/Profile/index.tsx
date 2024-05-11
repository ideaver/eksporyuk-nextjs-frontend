/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTIcon } from '@/_metronic/helpers'
import Link from 'next/link'
import React from 'react'

const ProfilePage: React.FC = () => {

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Profile Details</h3>
          </div>

        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Nama Lengkap</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>Fajar Setiawan</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Username</label>

            <div className='col-lg-8 fv-row'>
            <span className='fw-bolder fs-6 text-dark'>fajar.setiawan</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Alamat</label>

            <div className='col-lg-4'>
              <span className='fw-bolder fs-6 text-dark '>Jl. Sumarwi, RT01/RW03, Wonosari Wonosari - Kabupaten Gunungkidul - Provinsi D.I. Yogyakarta 54321</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>E-Mail</label>

            <div className='col-lg-8 fv-row'>
            <span className='fw-bolder fs-6 text-dark'>fajar.setiawan@gmail.com</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>No. WhatsApp</label>

            <div className='col-lg-8 fv-row'>
            <span className='fw-bolder fs-6 text-dark'>081234567891</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Pekerjaan</label>

            <div className='col-lg-8 fv-row'>
            <span className='fw-bolder fs-6 text-dark'>Nelayan</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Tanggal Pendaftaran</label>

            <div className='col-lg-8 fv-row'>
            <span className='fw-bolder fs-6 text-dark'>10 Januari 2023</span>
            </div>
          </div>

          

          <div className='notice d-flex bg-light-primary rounded border-primary border border-dashed p-6'>
            <KTIcon iconName='lock' className='fs-2tx text-primary me-4' />
            <div className='d-flex flex-stack flex-grow-1'>
              <div className='fw-bold'>
                <h4 className='text-gray-800 fw-bolder'>Kirim Pengaturan Ulang Kata Sandi</h4>
                <div className='fs-6 text-gray-600'>
                  Kirim email kepada user untuk melakukan perubahan kata sandi
                 
                </div>
              </div>
            </div>
            <button className="btn btn-primary">Lupa Password</button>
          </div>
        </div>
      </div>

      
    </>
  )
}

export default ProfilePage
