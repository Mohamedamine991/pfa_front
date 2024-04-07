import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal"

const IamModal = ({ ...props }) => {
  return (
    <Modal
      size={props.Size}
      isOpen={props.isOpen}
      onClose={props.onClose}
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col text-center gap-1">
              <h1 className="text-2xl py-5">{props.title}</h1>
            </ModalHeader>
            <ModalBody>{props.body}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
export default IamModal
