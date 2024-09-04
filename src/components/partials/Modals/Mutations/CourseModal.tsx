import { KTIcon } from "@/_metronic/helpers";
import { QueryMode, useCourseFindManyQuery, useEnrollmentFindManyQuery, useUserUpdateOneMutation } from "@/app/service/graphql/gen/graphql";
import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { TextField } from "@/stories/molecules/Forms/Input/TextField";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

interface ICourseModal {
    userId: string | undefined;
    show: boolean;
    isLoading: boolean;
    error?: any;
    handleClose: () => void;
    handleSubmit: () => void;
}
const CourseModal = ({
    userId,
    handleClose,
    handleSubmit,
    isLoading,
    error,
    show,
}: ICourseModal) => {
    const [showAddEnrollmentModal, setShowAddEnrollmentModal] = useState(false);


    const { data: enrollmentsData, loading: enrollmentsLoading, error: enrollmentsError, refetch: enrollmentsRefetch } = useEnrollmentFindManyQuery({
        variables: {
            where: {
                studentId: {
                    equals: userId
                }
            }
        },
    });

    const { data: coursesData, loading: coursesLoading, error: coursesError, refetch: coursesRefetch } = useCourseFindManyQuery({
        variables: {
            where: {
                id: {
                    notIn: enrollmentsData?.enrollmentFindMany?.map((enrollment) => enrollment.courseId)
                }
            }
        }
    })

    const [userUpdateOneMutation, { data: userUpdateData, loading: userUpdateLoading, error: userUpdateError }] = useUserUpdateOneMutation();

    const handleDeleteEnrollment = async (enrollmentId: number) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data kelas akan dihapus",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    Swal.showLoading();
                    const response = await userUpdateOneMutation({
                        variables: {
                            where: {
                                id: userId
                            },
                            data: {

                                student: {
                                    update: {
                                        where: {
                                            id: {
                                                equals: userId
                                            }
                                        },
                                        data: {
                                            enrollments: {
                                                disconnect: [
                                                    {
                                                        id: enrollmentId
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });
                    Swal.hideLoading();
                    if (response) {
                        await enrollmentsRefetch({

                            where: {
                                studentId: {
                                    equals: userId
                                }

                            },
                        })
                        Swal.fire({
                            title: "Berhasil",
                            text: "Kelas berhasil dihapus",
                            icon: "success",
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Gagal",
                        text: "Kelas gagal dihapus",
                        icon: "error",
                    });
                }
            }
        });
    }
    const handleAddEnrollment = async (enrollmentId: number) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data kelas akan ditambah ke pengguna",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    Swal.showLoading();
                    const response = await userUpdateOneMutation({
                        variables: {
                            where: {
                                id: userId
                            },
                            data: {

                                student: {
                                    update: {
                                        where: {
                                            id: {
                                                equals: userId
                                            }
                                        },
                                        data: {
                                            enrollments: {
                                                createMany: {
                                                    data: [
                                                        {
                                                            courseId: enrollmentId,
                                                        }
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });
                    Swal.hideLoading();
                    if (response) {
                        await enrollmentsRefetch({
                            where: {
                                studentId: {
                                    equals: userId
                                }

                            },
                        })
                        Swal.fire({
                            title: "Berhasil",
                            text: "Kelas berhasil ditambah",
                            icon: "success",
                            didClose() {
                                setShowAddEnrollmentModal(false);
                            }
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Gagal",
                        text: "Kelas gagal ditambah",
                        icon: "error",
                    });
                }
            }
        });
    }

    return (
        <>
            <Modal show={show} centered={true} size="lg" >
                <div className="modal-header">
                    <h2>Ubah Data Kelas</h2>
                    <div
                        className="btn btn-sm btn-icon btn-active-color-primary"
                        onClick={handleClose}
                    >
                        <KTIcon className="fs-1" iconName="cross" />
                    </div>

                </div>
                <div className="modal-body">

                    {isLoading || enrollmentsLoading ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <h5>Loading...</h5>
                        </div>
                    ) : error ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <h5>{error.message}</h5>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center">
                            {enrollmentsData ? (
                                <div className="w-100">
                                    <button className="btn btn-primary" onClick={() => setShowAddEnrollmentModal(true)}>Tambah Kelas</button>
                                    {enrollmentsData?.enrollmentFindMany?.map((enrollment) => (
                                        <div key={enrollment?.id} className="w-100">
                                            <CourseCard enrollmentsData={enrollment} onDelete={(id) => {
                                                handleDeleteEnrollment(id)
                                            }} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="d-flex justify-content-center align-items-center">
                                    <h5>Tidak ada data kelas</h5>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="modal-footer mx-auto">
                    <Buttons buttonColor="secondary" classNames="btn-lg" onClick={handleClose}>
                        Batal
                    </Buttons>
                    <Buttons buttonColor="primary" classNames="btn-lg" onClick={handleSubmit}>
                        Kirim
                    </Buttons>
                </div>
            </Modal>
            <Modal show={showAddEnrollmentModal} centered={true}
                onHide={() => setShowAddEnrollmentModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Kelas</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <TextField
                        styleType="solid"
                        preffixIcon="magnifier"
                        placeholder="Cari Nama Kelas"
                        props={{
                            onChange: async (e: any) => await coursesRefetch({
                                where: {
                                    AND: [{
                                        id: {
                                            notIn: enrollmentsData?.enrollmentFindMany?.map((enrollment) => enrollment.courseId)
                                        }
                                    },
                                    {
                                        OR: [
                                            {
                                                title: {
                                                    contains: e.target.value,
                                                    mode: QueryMode.Insensitive,
                                                }
                                            }
                                        ]
                                    }
                                    ]
                                }
                            }),
                        }}
                    />
                    {isLoading || coursesLoading ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <h5>Loading...</h5>
                        </div>
                    ) : error ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <h5>{error.message}</h5>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center">
                            {coursesData ? (
                                <div className="w-100">
                                    {coursesData?.courseFindMany?.map((course) => (
                                        <div key={course?.id} className="w-100">
                                            <CourseCard enrollmentsData={course} onAdd={(id) => {
                                                handleAddEnrollment(id)
                                            }} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="d-flex justify-content-center align-items-center">
                                    <h5>Tidak ada data kelas</h5>
                                </div>
                            )}
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CourseModal;


const CourseCard = ({ enrollmentsData, onDelete, onAdd }: {
    enrollmentsData: any;
    onDelete?: (id: number) => void;
    onAdd?: (id: number) => void;
}) => {
    return (
        <div className="card d-flex flex-row align-items-center p-3 justify-content-between">
            <img
                src={enrollmentsData?.course?.images?.[0].path ?? enrollmentsData?.images?.[0].path}
                alt=""
                className="rounded me-3"
                style={{ width: "95px", height: "auto" }}
            />
            <div className="flex-grow-1">
                <h3 className="mb-0">{enrollmentsData?.course?.title ?? enrollmentsData?.title}</h3>
            </div>
            {
                onDelete && <button
                    className="btn btn-light-danger btn-shadow ms-3"
                    onClick={() => onDelete?.(enrollmentsData?.id)}
                >
                    Hapus
                </button>
            }
            {
                onAdd && <button
                    className="btn btn-light-success btn-shadow ms-3"
                    onClick={() => onAdd?.(enrollmentsData?.id)}
                >
                    Tambah
                </button>
            }

        </div>
    );
};
