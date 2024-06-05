import { Modal } from "react-bootstrap";

import { Buttons } from "@/stories/molecules/Buttons/Buttons";
import { KTIcon } from "@/_metronic/helpers";

import useProductsViewModel from "../Products-view-model";

interface deleteProductModal {
  show: boolean;
  handleClose: () => void;
  productId: number;
  productIds: number[];
}

const DeleteProductModal = ({ show, handleClose, productId, productIds }: deleteProductModal) => {
  const { onDeleteOne, onDeleteMany } = useProductsViewModel();

  return (
    <Modal show={show} centered={true}>
      <div className="modal-header">
        <h2>Hapus {productIds.length > 1 ? "Semua" : undefined} Produk</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </div>

      <div className="modal-body">
        <h5 className="text-center">Apakah anda yakin untuk menghapus {productIds.length > 1 ? "semua" : undefined} produk ini?</h5>
      </div>

      <div className="modal-footer mx-auto">
      <Buttons
          buttonColor="secondary"
          classNames="btn-lg"
          onClick={handleClose}
        >
          Batal
        </Buttons>
        <Buttons
          buttonColor="danger"
          classNames="btn-lg"
          onClick={() => {
            if (productIds.length !== 0) {
              onDeleteMany(productIds);
            } else {
              onDeleteOne(productId);
            }
          }}
        >
          Iya
        </Buttons>
      </div>
    </Modal>
  );
}

export default DeleteProductModal;

