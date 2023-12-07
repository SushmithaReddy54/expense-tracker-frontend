import React, { useState } from "react";
import styled from "styled-components";
import { dateFormat } from "../../utils/dateFormat";
import {
  bitcoin,
  book,
  calender,
  card,
  circle,
  clothing,
  comment,
  food,
  freelance,
  medical,
  money,
  piggy,
  stocks,
  takeaway,
  trash,
  duplicate,
  tv,
  users,
  yt,
} from "../../utils/Icons";
import { DeleteModal } from "../ConfirmationModals/DeleteModal";
import {
  AccordionPanel,
  AccordionIcon,
  AccordionButton,
  Box,
  AccordionItem,
  Accordion,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
function IncomeItem({
  id,
  title,
  amount,
  date,
  category,
  description,
  indicatorColor,
  type,
  onDuplicateClicked
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const duplicateI = ()=>{
    onDuplicateClicked();
  }
  const toggleAccordion = () => {
    setShow(!show);
  };
  return (
    <IncomeItemStyled indicator={indicatorColor} >
      {isOpen && (
        <DeleteModal
          openModal={true}
          onClose={() => setIsOpen(false)}
          id={id}
          type={type === "expense" ? "EXPENSE" : "INCOME"}
        ></DeleteModal>
      )}

      <AccordionItem pos="relative" width="100%" onMouseEnter={() => setShow(true)} onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        <h2>
          <AccordionButton as='div' style={{ backgroundColor: "none" }} onClick={toggleAccordion}>
            <Box as="h5" textAlign="left" width="100%">
             {category} : {title} - ${amount}
            </Box>
          </AccordionButton>
          
        </h2>
        <div className="btn-con">
          <Button
            top="0"
            position="absolute"
            right="0"
            bg={"var(--primary-color"}
            leftIcon={trash}
            onClick={() => setIsOpen(true)}
            
          />
          <Button
            top="0"
            position="absolute"
            right="10"
            bg={"var(--primary-color"}
            leftIcon={duplicate}
            onClick={()=>duplicateI()}
          />
        </div>
        <AccordionPanel pb={4}  display={show ? 'block' : 'none'}>
          <p>
            {calender} {dateFormat(date)}
          </p>
          <p>
            {comment}
            {description}
          </p>
        </AccordionPanel>
      </AccordionItem>

    </IncomeItemStyled>
  );
}

const IncomeItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 0.4rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  width: 100%;
  color: #222260;
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    i {
      font-size: 2.6rem;
    }
  }
  .expanded-panel {
    display: block !important;
  }
  
  /* Additional styles for expanded state */
  .expanded {
    background-color: lightblue !important;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;
        }
      }
    }
  }
`;

export default IncomeItem;
