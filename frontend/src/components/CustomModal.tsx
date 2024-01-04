import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
} from "@chakra-ui/modal";
import React from "react";

type CustomModalProps = {
    children: any;
    isVisible: boolean;
    onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = (
    {
        children,
        isVisible,
        onClose,
    }) => {

    return (
        <>
            <Modal isOpen={isVisible} onClose={onClose}>
                <ModalOverlay
                    onClick={onClose}
                    className="bg-[#000] !opacity-30"
                    zIndex="2000"
                />
                <ModalContent
                    className="!m-auto !w-max min-w-[350px] !max-w-[50%] md:top-[30vh]"
                    containerProps={{
                        zIndex: "2000",
                    }}
                >
                    <ModalBody>
                        {children}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CustomModal;