import { KTCard, KTCardBody, KTIcon } from '@/_metronic/helpers'
import { PageTitle } from '@/_metronic/layout/core'
import { Buttons } from '@/stories/molecules/Buttons/Buttons'
import { CheckBoxInput } from '@/stories/molecules/Forms/Advance/CheckBox/CheckBox'
import { Dropdown } from '@/stories/molecules/Forms/Dropdown/Dropdown'
import { TextField } from '@/stories/molecules/Forms/Input/TextField'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const navLinks = [
    {
        name: 'Facebook Pixel',
        href: "facebook-pixel"
    },
    {
        name: 'Tiktok Pixel',
        href: "tiktok-pixel"
    },
    {
        name: 'Google Tab Manager',
        href: "google-tab-manager"
    }
]

const FacebookPixel = ({
    follupValues,
    selectedFollupValue,
    handleFollupChange,
    tabsData,
}: {
    tabsData: any;
    follupValues: string[];
    selectedFollupValue: string;
    handleFollupChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const breadcrumbs = [
        {
            title: "Manajemen Produk",
            path: "/affiliate",
            isSeparator: false,
            isActive: false,
        },
        {
            title: "",
            path: "",
            isSeparator: true,
            isActive: false,
        },
    ];
    const [selectedTab, setSelectedTab] = useState(navLinks[0].href);
    return (
        <div>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Kupon Baru</PageTitle>
            <div className="row">
                <div className="col-3">
                    <KTCard>
                        <KTCardBody>
                            <h2 className="fw-bold text-gray-700 pb-4">
                                Status
                            </h2>
                            <div className="d-flex">
                                <Dropdown
                                    styleType="outline"
                                    props={{ id: "couponName" }}
                                    options={[
                                        { label: "Aktif", value: "status1" },
                                        { label: "Non-Aktif", value: "status2" },
                                    ]}
                                    onValueChange={() => { }}
                                />
                            </div>
                            <p className="fw-bold fs-5 text-muted pt-2">
                                Atur Status
                            </p>
                        </KTCardBody>
                    </KTCard>
                </div>
                <div className="col-9">
                    <div>
                        <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6">
                            {navLinks.map((nav: any) => {
                                const isActive = router.pathname === nav.href;
                                return (
                                    <li className={`nav-item ${isActive ? 'active' : ''}`} key={nav.href}>
                                        <Link
                                            href={`${nav.href}`}
                                            className={`nav-link ${selectedTab === nav.href ? "active" : ""} fw-bold fs-4`}
                                        >
                                            {nav.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                        {/* {isOpeningFacebookPixel && (
                        
                        <FacebookPixel
                            follupValues={follupValues}
                            selectedFollupValue={selectedFollupValue}
                            handleFollupChange={handleFollupChange}
                            tabsData={addNewCouponTabsData}
                        />
                    )} */}
                        <div>
                            <div>
                                <KTCard>
                                    <KTCardBody>
                                        <h2 className="pb-3">Informasi Kupon</h2>
                                        <div>
                                            <h4 className="required fw-bold text-gray-700">Kode Kupon</h4>
                                            <TextField
                                                styleType="outline"
                                                size="medium"
                                                placeholder="https://member.eksporyuk.com/aff/6267/6068/"
                                            />
                                            <p className="fw-bold fs-6 text-muted">Nama/Kode Kupon</p>
                                        </div>
                                        <h4 className="required fw-bold text-gray-700">Besar Potongan</h4>
                                        <div className="d-flex">
                                            <div className="w-50 pe-3">
                                                <TextField
                                                    classNames=""
                                                    styleType="outline"
                                                    size="medium"
                                                    placeholder="ID, isi dengan identifikasi apapun"
                                                />
                                            </div>
                                            <div className="w-50 ps-3">
                                                <Dropdown
                                                    styleType="outline"
                                                    props={{ id: "couponName" }}
                                                    options={[
                                                        { label: "Facebook", value: "akuisisi1" },
                                                        { label: "Instagram", value: "akuisisi2" },
                                                    ]}
                                                    onValueChange={() => { }}
                                                />
                                            </div>
                                        </div>
                                        <p className="fw-bold fs-6 text-muted">Besar dan jenis potongan yang didapatkan</p>
                                        <div className="mt-6">
                                            <CheckBoxInput
                                                className={selectedFollupValue === 'Aktifkan Parameter Kupon' ? "active" : ""}
                                                name="follup"
                                                value={'Aktifkan Parameter Kupon'}
                                                checked={selectedFollupValue === 'Aktifkan Parameter Kupon'}
                                                onChange={handleFollupChange}
                                            >
                                                {`Aktifkan Parameter Kupon`}
                                            </CheckBoxInput>
                                            <p className="fw-bold fs-6 text-muted ms-20 ps-4">
                                                Parameter kupon akan otomatis menggunakan kupon yang dipilih pada pembelian produk
                                            </p>
                                        </div>
                                        <div className="pt-4">
                                            <h4 className="required fw-bold text-gray-700">Batas Jumlah Penggunaan</h4>
                                            <TextField
                                                styleType="outline"
                                                size="medium"
                                                placeholder="Berapa kali kupon ini dapat digunakan"
                                            />
                                            <p className="fw-bold fs-6 text-muted">Masukkan 0 jika kupon ini dapat digunakan sampai berapa kalipun</p>
                                        </div>
                                        <div>
                                            <h4 className="required fw-bold text-gray-700">Batas Waktu Penggunaan</h4>
                                            <TextField
                                                styleType="outline"
                                                size="medium"
                                                placeholder="Pilih tanggal"
                                            />
                                            <p className="fw-bold fs-6 text-muted">Masukkan 0 jika kupon ini dapat digunakan sampai kapanpun</p>
                                        </div>
                                    </KTCardBody>
                                </KTCard>
                            </div>
                            <div className="mt-10">
                                <KTCard>
                                    <KTCardBody>
                                        <h2 className="pb-3">Pengaturan Afiliasi</h2>

                                        <div className="mt-6">
                                            <CheckBoxInput
                                                className={selectedFollupValue === 'Izinkan Affiliasi Menggunakan Kupon Ini' ? "active" : ""}
                                                name="follup"
                                                value={'Izinkan Affiliasi Menggunakan Kupon Ini'}
                                                checked={selectedFollupValue === 'Izinkan Affiliasi Menggunakan Kupon Ini'}
                                                onChange={handleFollupChange}
                                            >
                                                {`Izinkan Affiliasi Menggunakan Kupon Ini`}
                                            </CheckBoxInput>
                                            <p className="fw-bold fs-6 text-muted ms-20 ps-4">
                                                Apabila diaktifkan, maka affilasi dapat menggunakan kode ini dan membuat kode sendiri menggunakan kode ini
                                            </p>
                                        </div>
                                        <div className="pt-4">
                                            <h4 className="fw-bold text-gray-700">Batas Penggunaan Kupon oleh Affiliasi</h4>
                                            <TextField
                                                styleType="outline"
                                                size="medium"
                                                placeholder="Berapa kali kupon ini dapat digunakan sebagai base kupon affiliasi"
                                            />
                                            <p className="fw-bold fs-6 text-muted">Masukkan 0 jika kupon ini dapat digunakan berkali-kali oleh affiliasi</p>
                                        </div>
                                    </KTCardBody>
                                </KTCard>
                            </div>
                            <div className="mt-10">
                                <KTCard>
                                    <KTCardBody>
                                        <h2 className="pb-3">Pengaturan Afiliasi</h2>

                                        <div className="pt-4">
                                            <h4 className="fw-bold text-gray-700">Batas Penggunaan Kupon oleh Affiliasi</h4>
                                            <div className="d-flex">
                                                <Dropdown
                                                    styleType="outline"
                                                    props={{ id: "couponName" }}
                                                    options={[
                                                        { label: "Facebook", value: "akuisisi1" },
                                                        { label: "Instagram", value: "akuisisi2" },
                                                    ]}
                                                    onValueChange={() => { }}
                                                />
                                                <Buttons
                                                    mode="light"
                                                    classNames="ms-6"
                                                    buttonColor="danger"
                                                    size="small"
                                                >
                                                    <KTIcon iconName="cross" className="fs-2" />
                                                </Buttons>
                                            </div>
                                            <div className="d-flex pt-3">
                                                <Dropdown
                                                    styleType="outline"
                                                    props={{ id: "couponName" }}
                                                    options={[
                                                        { label: "Facebook", value: "akuisisi1" },
                                                        { label: "Instagram", value: "akuisisi2" },
                                                    ]}
                                                    onValueChange={() => { }}
                                                />
                                                <Buttons
                                                    mode="light"
                                                    classNames="ms-6"
                                                    buttonColor="danger"
                                                    size="small"
                                                >
                                                    <KTIcon iconName="cross" className="fs-2" />
                                                </Buttons>
                                            </div>
                                            <div className="pt-3">
                                                <Buttons
                                                    buttonColor="primary"
                                                    mode="light"
                                                ><KTIcon iconName="plus" className="fs-2" />Tambahkan Produk</Buttons>
                                            </div>
                                        </div>
                                    </KTCardBody>
                                </KTCard>
                            </div>
                        </div>


                    </div>
                </div>
                <div className="pt-10">
                    <div className="modal-footer d-flex justify-content-end">
                        <Buttons
                            buttonColor="secondary" classNames="fw-bold">
                            Batal
                        </Buttons>
                        <Buttons buttonColor="primary" classNames="fw-bold ms-6">Tambahkan Kupon</Buttons>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FacebookPixel