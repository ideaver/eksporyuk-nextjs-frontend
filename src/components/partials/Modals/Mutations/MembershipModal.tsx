import { KTIcon } from "@/_metronic/helpers";
import { MembershipCategory, QueryMode, useMembershipCategoryFindManyQuery, useMembershipFindFirstQuery } from "@/app/service/graphql/gen/graphql";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { dateFormatter } from "@/templates/Admin/Affiliators/AffiliatorManagement/Affiliator-view-model";
import { OptionType } from "@/templates/Admin/Course/CreateOrEdit/Information/Information-view-model";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { GroupBase, OptionsOrGroups } from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";

interface IMembershipModal {
    userId: string | undefined;
    show: boolean;
    isLoading: boolean;
    error?: any;
    handleClose: () => void;
    handleSubmit: (membership: MembershipCategory | null) => void;
}

const MembershipModal = ({
    userId,
    handleClose,
    handleSubmit,
    isLoading,
    error,
    show,
}: IMembershipModal) => {
    const { data, loading, error: membershipFindFirstError } = useMembershipFindFirstQuery({
        variables: {
            where: {
                userId: {
                    equals: userId
                }
            }
        },
    });

    const { data: membershipCategoryFindManydata, loading: membershipCategoryFindManyLoading, error: membershipCategoryFindManyError, refetch: membershipCategoryFindManyRefetch } = useMembershipCategoryFindManyQuery({
        variables: {
            where: {
                isActive: {
                    equals: true
                }
            }
        }
    });

    async function loadOptions(
        search: string,
        prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>
    ) {
        const result =
            membershipCategoryFindManydata?.membershipCategoryFindMany?.map((membershipCategory) => ({
                value: membershipCategory.id.toString(),
                label: membershipCategory.name.toLocaleLowerCase(),
            })) ?? [];
        result.unshift({ value: "0", label: "Ubah Membership" });
        await membershipCategoryFindManyRefetch({
            skip: prevOptions.length,
            where: {
                name: {
                    contains: search,
                    mode: QueryMode.Insensitive,
                },
                isActive: {
                    equals: true
                }
            },
        });

        return {
            options: result,
            hasMore: false,
        };
    }

    const [selectedMembership, setSelectedMembership] = useState<MembershipCategory | null>(null);

    const membershipData = selectedMembership ?? data?.membershipFindFirst?.membershipCategory;

    const currentDate = new Date();
    const endDate = selectedMembership
        ? new Date(currentDate.getTime() + selectedMembership.durationDay * 24 * 60 * 60 * 1000)
        : data?.membershipFindFirst?.endDate;

    return (
        <Modal show={show} centered={true} >
            <div className="modal-header">
                <h2>Ubah Data Membership</h2>
                <div
                    className="btn btn-sm btn-icon btn-active-color-primary"
                    onClick={handleClose}
                >
                    <KTIcon className="fs-1" iconName="cross" />
                </div>
            </div>

            <div className="modal-body">
                {isLoading || loading ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <h5>Loading...</h5>
                    </div>
                ) : error ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <h5>{error.message}</h5>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center align-items-center">
                        {membershipData ? (
                            <div className="w-100">
                                <div className="d-flex flex-column ">
                                    <div className="d-flex justify-content-between">
                                        <div className="fw-bold">Membership: </div>
                                        <div className="fw-bold">{membershipData?.name}</div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="fw-bold">Tanggal Mulai: </div>
                                        <div className="fw-bold">{dateFormatter(selectedMembership ? currentDate : data?.membershipFindFirst?.startDate)}</div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="fw-bold">Tanggal Berakhir: </div>
                                        <div className="fw-bold">{dateFormatter(endDate)}</div>
                                    </div>
                                    {/* Might be used for future usage */}
                                    {/* <div className="d-flex justify-content-between">
                                        <div className="fw-bold">Status: </div>
                                        <div className="fw-bold">
                                            <Badge
                                                label={data?.membershipFindFirst?.isActive ? "Aktif" : "Non Aktif"}
                                                badgeColor={data?.membershipFindFirst?.isActive ? "success" : "danger"}
                                            />{" "}
                                        </div>
                                    </div> */}
                                    <div className="d-flex justify-content-between">
                                        <div className="fw-bold">Benefit Kelas: </div>
                                        <div className="fw-bold">
                                            <ul>
                                                {membershipData?.benefitCourses?.map((e, index) => (
                                                    <li key={index}>{e.title}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="fw-bold">Benefit Layanan: </div>
                                        <div className="fw-bold">
                                            <ul>
                                                {membershipData?.membershipBenefitServiceEnum?.map((e, index) => (
                                                    <li key={index}>{e}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <AsyncPaginate
                                    className="min-w-200px"
                                    loadOptions={loadOptions}
                                    onChange={(id) => {
                                        if (id?.value === "0") {
                                            setSelectedMembership(null);
                                            return;
                                        }
                                        const selectedMembership = membershipCategoryFindManydata?.membershipCategoryFindMany?.find((e) => e.id.toString() === id?.value);
                                        setSelectedMembership(selectedMembership as MembershipCategory ?? null);
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="w-100">
                                <AsyncPaginate
                                    className="min-w-200px"
                                    loadOptions={loadOptions}
                                    onChange={(id) => {
                                        if (id?.value === "0") {
                                            setSelectedMembership(null);
                                            return;
                                        }
                                        const selectedMembership = membershipCategoryFindManydata?.membershipCategoryFindMany?.find((e) => e.id.toString() === id?.value);
                                        setSelectedMembership(selectedMembership as MembershipCategory ?? null);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="modal-footer mx-auto">
                <Buttons buttonColor="secondary" classNames="btn-lg" onClick={handleClose}>
                    Batal
                </Buttons>
                <Buttons buttonColor="primary" classNames="btn-lg" onClick={() => handleSubmit(selectedMembership)}>
                    Kirim
                </Buttons>
            </div>
        </Modal>
    );
};

export default MembershipModal;