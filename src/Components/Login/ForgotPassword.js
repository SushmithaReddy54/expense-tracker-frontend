import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../img/logo.png';

import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Avatar,
  chakra,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import { BASE_URL } from "../../context/globalContext";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
   console.log(loading);
  },[loading]);
  useEffect(()=>{
    if(localStorage.getItem('user')){
      navigate('/');
    }
  })
  const PostData = (event) => {
    setLoading(true);
    event.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
    setLoading(false);
      return toast({
        title: "Invalid Email",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    fetch(`${BASE_URL}forgot-password`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then(res => {
        console.log("testing", res);
        setLoading(false);
        if(res.status === 200) {
            toast({
                title: "mail sent",
                status: "success",
                duration: 4000,
                isClosable: true,
              });
        }
    })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <main>
    <Flex
      flexDirection="column"
      width="100wh"
      height="100%"
      // backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <img src={logo} width="80" height="50" bg="linear-gradient(180deg, #F56692 0%, #F2994A 100%)"/>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    id="email-address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                  />
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                id="submit-btn"
                variant="solid"
                colorScheme="pink"
                width="full"
                isLoading={loading}
                onClick={PostData}
              >
                send mail
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
    </main>
  );
};

export default ForgotPassword;
