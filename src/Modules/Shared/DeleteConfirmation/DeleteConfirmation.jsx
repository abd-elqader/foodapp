import { Button, Modal } from "react-bootstrap";
import deleteConfirmationImage from "../../../assets/noData.png";
export default function DeleteConfirmation({ show, handleClose, deleteFunc, deleteItem }) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className="text-center">
                        <img className="w-25" src={deleteConfirmationImage} alt="no data" />
                    </div>
                    <h5>Delete this {deleteItem}</h5>
                    <p>are you sure you want to delete this item</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteFunc}>
                        Delete this {deleteItem}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}