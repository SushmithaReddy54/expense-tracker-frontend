import React, { useState, useEffect } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import logo from '../../img/logo.png';
import {
  Flex,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  chakra,
  FormControl,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import { BASE_URL } from "../../context/globalContext";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const {id, token} = useParams()
const [loading, setLoading ] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(()=>{
    if(localStorage.getItem('user')){
      navigate('/');
    }
  })
  const PostData = (event) => {
    setLoading(true);
    event.preventDefault();
    if(password !== password1){
        setPassword('');
        setPassword1('');
        setLoading(false);
        return toast({
            title: "new password does't match",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
    }
    console.log(id, password);
    fetch(`${BASE_URL}reset-password/${id}/${token}`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    })
      .then(res => {
        console.log("testing", res);
        setLoading(false);
        if(res.status === 200) {
            toast({
                title: "password updated",
                status: "success",
                duration: 4000,
                isClosable: true,
              });
           navigate('/signin');
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
                    type="password"
                    id="password-address"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="enter password"
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
                    type="password"
                    id="password-address"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    placeholder="reenter password"
                  />
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                id="submit-btn"
                isLoading={loading}
                variant="solid"
                colorScheme="pink"
                width="full"
                onClick={PostData}
              >
                update password
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
    </main>
  );
};

export default ResetPassword;
