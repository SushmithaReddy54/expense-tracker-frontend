import React, { useState,useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import logo from '../../img/logo.png';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import { BASE_URL } from "../../context/globalContext";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  useEffect(()=>{
    if(localStorage.getItem('user')){
      navigate('/');
      return;
    }
  })
  const PostData = (event) => {
    event.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return toast({
        title: "Invalid Email",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    fetch(`${BASE_URL}signup`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast({
            title: data.error,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        } else {
          toast({
            title: data.message,
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          navigate("/signin");
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
        <Heading color="#F56692">Welcome</Heading>
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
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="User name"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="pink"
                width="full"
                onClick={PostData}
              >
                SignUp
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already a user?{" "}
        <Link color="#F56692" to="/signin">
          Login
        </Link>
      </Box>
    </Flex>
    </main>
  );
};

export default SignUp;
