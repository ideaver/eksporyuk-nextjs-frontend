import { KTCard, KTCardBody, KTIcon } from '@/_metronic/helpers'
import { Buttons } from '@/stories/molecules/Buttons/Buttons'
import { CheckBoxInput } from '@/stories/molecules/Forms/Advance/CheckBox/CheckBox'
import { Dropdown } from '@/stories/molecules/Forms/Dropdown/Dropdown'
import { TextField } from '@/stories/molecules/Forms/Input/TextField'
import React from 'react'

const Demand = () => {
    return (
        <div>
            <div>
                <KTCard shadow>
                    <KTCardBody>
                        <div className="">
                            <h2 className="pb-3">Informasi Demand</h2>
                            <div>
                                <h4 className="required fw-bold text-gray-700 pt-2">Demand/Permintaan</h4>
                                <TextField
                                    styleType="outline"
                                    size="medium"
                                    placeholder="Coconut"
                                />
                                <p className="fw-bold fs-6 text-muted">Komoditas yang diinginkan buyer</p>
                            </div>
                        </div>
                        <div className="">
                            <h4 className="required fw-bold text-gray-700 pt-2">Quantity Required</h4>
                            <div className="d-flex">
                                <TextField
                                    classNames=""
                                    styleType="outline"
                                    size="medium"
                                    placeholder="1 Ton"
                                />
                            </div>
                            <p className="fw-bold fs-6 text-muted">Jumlah komoditas yang diinginkan buyer</p>
                        </div>
                        <div className="">
                            <h4 className="required fw-bold text-gray-700 pt-2">Shipping Terms</h4>
                            <div className="">
                                <Dropdown
                                    styleType="outline"
                                    props={{ id: "couponName" }}
                                    options={[
                                        { label: "FOB (Free On Board)", value: "fob" },
                                        { label: "Indonesia", value: "indonesia" },
                                        { label: "USA Amerika", value: "usa" },
                                        { label: "Belanda", value: "belanda" },
                                    ]}
                                    onValueChange={() => { }}
                                />
                                <p className="fw-bold fs-6 text-muted">Shipping terrm yang diinginkan buyer</p>
                            </div>
                        </div>
                        <div className="pt-2">
                            <h4 className="required fw-bold text-gray-700">Destination Port</h4>
                            <TextField
                                classNames="form-control"
                                styleType="outline"
                                size="medium"
                                placeholder="Sao Paulo, Brazil"
                            />
                            <p className="fw-bold fs-6 text-muted">Komoditas yang diinginkan buyer</p>
                        </div>
                    </KTCardBody>
                </KTCard>
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
    )
}

export default Demand