import React,{useState} from "react";
import {
  Button,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogBody,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function SignOutModal({openModal, onClose}) {
  const cancelRef = React.useRef();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(openModal || false);
  const handleClick = ()=>{
    localStorage.clear();
    navigate("/signin");
  }
  const onHandleClose = ()=>{
    setIsOpen(false);
    onClose();
  }
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onHandleClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Oops</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to Signout from the device
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onHandleClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleClick}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
