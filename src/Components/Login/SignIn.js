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

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);
  useEffect(()=>{
    if(localStorage.getItem('user')){
      navigate('/');
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
    fetch(`${BASE_URL}signin`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "incorrect password") {
          toast({
            title: "Invalid Credentials",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
          return;
        }
        if (data.error) {
          toast({
            title: data.error,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          toast({
            title: "SignIn Success",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          navigate("/");
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
                    type="email"
                    id="email-address"
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
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link></Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                id="submit-btn"
                variant="solid"
                colorScheme="pink"
                width="full"
                onClick={PostData}
              >
                Sign In
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="#F56692" to='/signup'>
          Sign Up
        </Link>
      </Box>
      <Box>
        <Link style={{textDecoration:'underline',}} to='/forgot-password'>
         Forgot password
        </Link>
      </Box>
    </Flex>
    </main>
  );
};

export default SignIn;
