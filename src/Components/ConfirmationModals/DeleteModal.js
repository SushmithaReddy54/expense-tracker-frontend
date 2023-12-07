import React, { useState } from "react";
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
 import { useGlobalContext } from "../../context/globalContext";

export function DeleteModal({ openModal, onClose, id, type }) {
  const cancelRef = React.useRef();
  const [isOpen, setIsOpen] = useState(openModal || false);
  const { deleteIncome, deleteExpense } = useGlobalContext();

  const handleClick = () => {
    console.log("clicked");
    if (type === "EXPENSE") deleteExpense(id);
    else deleteIncome(id);
  };
  const onHandleClose = () => {
    setIsOpen(false);
    onClose();
  };
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
          <AlertDialogHeader>Delete</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to Delete this
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
