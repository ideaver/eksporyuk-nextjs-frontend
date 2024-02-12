import { KTCard, KTCardBody, KTIcon } from '@/_metronic/helpers'
import { Buttons } from '@/stories/molecules/Buttons/Buttons'
import { CheckBoxInput } from '@/stories/molecules/Forms/Advance/CheckBox/CheckBox'
import { Dropdown } from '@/stories/molecules/Forms/Dropdown/Dropdown'
import { TextField } from '@/stories/molecules/Forms/Input/TextField'
import React, { useState } from 'react'

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
    return (
        <div>
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
            <div className="modal-footer d-flex justify-content-end pt-10">
                <Buttons
                    buttonColor="secondary" classNames="fw-bold">
                    Batal
                </Buttons>
                <Buttons buttonColor="primary" classNames="fw-bold ms-6">Tambahkan Kupon</Buttons>
            </div>
        </div>
    )
}

export default FacebookPixel