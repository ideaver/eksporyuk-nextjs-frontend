import {
  SortOrder,
  useAutomateTransferCommissionSettingCreateOneMutation,
  useAutomateTransferCommissionSettingDeleteOneMutation,
  useAutomateTransferCommissionSettingFindManyQuery,
  useAutomateTransferCommissionSettingUpdateOneMutation,
} from "@/app/service/graphql/gen/graphql";
import { Field, Formik, Form as FormikForm } from "formik";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

import { useSession } from "next-auth/react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { dateFormatter } from "../../AffiliatorManagement/Affiliator-view-model";

interface CommissionDateSettingsModalProps {
  show: boolean;
  handleClose: () => void;
}

const CommissionDateSettingsModal = ({
  show,
  handleClose,
}: CommissionDateSettingsModalProps) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { data: session, status } = useSession();
  const { data, loading, error, refetch } =
    useAutomateTransferCommissionSettingFindManyQuery({
      variables: {
        orderBy: {
          updatedAt: SortOrder.Desc,
        },
      },
    });
  const [
    automateTransferCommissionSettingCreateOneMutation,
    { data: createData, loading: createLoading, error: createError },
  ] = useAutomateTransferCommissionSettingCreateOneMutation();
  const [
    automateTransferCommissionSettingUpdateOneMutation,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useAutomateTransferCommissionSettingUpdateOneMutation();
  const [
    automateTransferCommissionSettingDeleteOneMutation,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useAutomateTransferCommissionSettingDeleteOneMutation();
  const handleCreate = async (data: any) => {
    try {
      await automateTransferCommissionSettingCreateOneMutation({
        variables: {
          data: {
            title: data.title,
            dateOfMonth: parseInt(data.dateOfMonth),
            createdBy: { connect: { id: session?.user.id } },
          },
        },
      });
      setShowCreateModal(false);
      refetch();
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Tanggal otomatis transfer komisi berhasil dibuat",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.message ?? "",
      });
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      await automateTransferCommissionSettingUpdateOneMutation({
        variables: {
          where: { id: selectedItem.id },
          data: {
            title: {
              set: data.title,
            },
            dateOfMonth: {
              set: parseInt(data.dateOfMonth),
            },
          },
        },
      });
      setShowUpdateModal(false);
      refetch();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Tanggal otomatis transfer komisi berhasil diperbarui",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.message ?? "",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await automateTransferCommissionSettingDeleteOneMutation({
        variables: {
          where: { id: selectedItem.id },
        },
      });
      setShowDeleteModal(false);
      refetch();
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Tanggal otomatis transfer komisi berhasil dihapus",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.message ?? "",
      });
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Pengaturan Transfer Komisi Otomatis</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
          className="mb-5"
            variant="success"
            onClick={() => {
              setShowCreateModal(true);
            }}
          >
            Buat Baru
          </Button>
 {data?.automateTransferCommissionSettingFindMany?.map((item) => (
  <Card key={item.id} className="mb-3 shadow-sm">
    <Card.Body>
      <Card.Title className="mb-3">{item.title}</Card.Title>
      <Card.Text className="mb-4">
        <strong>Tanggal dari Bulan:</strong> {item.dateOfMonth}
        <br />
        <strong>Dibuat sejak:</strong> {dateFormatter(item.createdAt)}
        <br />
        <strong>Diperbarui sejak:</strong> {dateFormatter(item.updatedAt)}
      </Card.Text>
      <div className="d-flex justify-content-end">
        <Button
          variant="primary"
          onClick={() => {
            setSelectedItem(item);
            setShowUpdateModal(true);
          }}
          className="me-2"
        >
          Perbarui
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            setSelectedItem(item);
            setShowDeleteModal(true);
          }}
        >
          Hapus
        </Button>
      </div>
    </Card.Body>
  </Card>
))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Keluar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Buat tanggal transfer otomatis baru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ title: "", dateOfMonth: "" }}
            onSubmit={handleCreate}
          >
            {({ setFieldValue }) => (
              <FormikForm>
                <Form.Group className="mb-3">
                  <Form.Label>Judul</Form.Label>
                  <Field
                    as={Form.Control}
                    type="text"
                    name="title"
                    placeholder="Masukkan Judul"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal dari Bulan</Form.Label>
                  <Field
                    as={Form.Control}
                    type="number"
                    min="1"
                    max="31"
                    name="dateOfMonth"
                    placeholder="Masukkan Tanggal dari Bulan (1-31)"
                    onChange={(e: { target: { value: string } }) => {
                      const value = parseInt(e.target.value);
                      if (value < 1) {
                        setFieldValue("dateOfMonth", "1");
                      } else if (value > 31) {
                        setFieldValue("dateOfMonth", "31");
                      } else {
                        setFieldValue("dateOfMonth", e.target.value);
                      }
                    }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Kirim
                </Button>
              </FormikForm>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      <Modal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Perbarui tanggal transfer otomatis baru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Formik
              initialValues={{
                title: selectedItem.title,
                dateOfMonth: selectedItem.dateOfMonth,
              }}
              onSubmit={handleUpdate}
            >
              {({ setFieldValue }) => (
                <FormikForm>
                  <Form.Group className="mb-3">
                    <Form.Label>Judul</Form.Label>
                    <Field
                      as={Form.Control}
                      type="text"
                      name="title"
                      placeholder="Masukkan Judul"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Tanggal dari Bulan</Form.Label>
                    <Field
                      as={Form.Control}
                      type="number"
                      min="1"
                      max="31"
                      name="dateOfMonth"
                      placeholder="Masukkan Tanggal dari Bulan (1-31)"
                      onChange={(e: { target: { value: string } }) => {
                        const value = parseInt(e.target.value);
                        if (value < 1) {
                          setFieldValue("dateOfMonth", "1");
                        } else if (value > 31) {
                          setFieldValue("dateOfMonth", "31");
                        } else {
                          setFieldValue("dateOfMonth", e.target.value);
                        }
                      }}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </FormikForm>
              )}
            </Formik>
          )}
        </Modal.Body>
      </Modal>

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Konformasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah anda yakin untuk menghapus tanggal ini?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommissionDateSettingsModal;
