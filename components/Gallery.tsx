import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export const Gallery = ({ setFile }: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [recentImages, setRecentImages] = useState([]);

    useEffect(() => {
        const cookieValue = decodeURIComponent(document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith('recent-images='))?.split('=')[1] || '');

        if (cookieValue) {
            const images = JSON.parse(cookieValue);
            setRecentImages(images);
        }
    }, [document.cookie]);

    const handleOpen = () => {
        onOpen();
    }

    return (
        <>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                borderRadius: "100px",
                backgroundColor: "#393939",
                cursor: "pointer",
            }}
                onClick={handleOpen}
            >
                <img src="/gallery.svg" />
            </div>

            <Modal
                size="full"
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Recent Images</ModalHeader>
                            <ModalBody className="flex flex-col gap-1 overflow-y-auto">
                                <div className="gallery">
                                    {recentImages.slice().reverse().map((imageUrl, index) => (
                                        <img onClick={() => { setFile(imageUrl); onClose() }} key={index} src={imageUrl} alt={`Recent Image ${recentImages.length - index}`} />
                                    ))}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
