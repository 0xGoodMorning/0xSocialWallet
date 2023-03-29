import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import twitter from "../assets/twitter-logo.svg";
import logo from "../assets/logo.svg";

export default function Home() {
  // TODO: Implement the API call and autocomplete logic here
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Check if the Twitter handle is valid and make the API call
    // If not found, show an error toast
    toast({
      title: "Error",
      description: "Twitter handle not found.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack
        minH="100vh"
        justifyContent="space-between"
        bgGradient="radial-gradient(circle at center, #E0E0E0, #C7C7C7)"
        color="#111111"
      >
        <Box as="header" py={4}>
          {/* TODO: Add your header content here */}
        </Box>

        <VStack as="main" spacing={6} maxWidth="400px" textAlign="center">
          <Image src={logo} width="100" height="100" alt="Logo" />
          <Text fontSize="4xl">0xSocialWallet</Text>
          <Text fontSize="2xl">True non-custodial social wallet!</Text>
          <Text>
            Secure, decentralized solution that seamlessly connects social media
            accounts to the world of Web3. Send anyone crypto by inputting their
            Twitter handle.
          </Text>

          <FormControl onSubmit={handleSubmit}>
            <InputGroup size="lg">
              <InputLeftAddon size="lg" p={1} borderLeftRadius="20">
                <Image
                  src={twitter}
                  width="40"
                  height="40"
                  alt="Twitter logo"
                />
              </InputLeftAddon>
              <Input
                id="twitterHandle"
                type="text"
                size="lg"
                borderWidth="1px"
                borderColor="gray.200"
                bg="#F0F0F0"
                borderRadius="10"
                focusBorderColor="blue.500"
              />
            </InputGroup>
            <Button
              type="submit"
              mt={4}
              colorScheme="blue"
              bg="#1DA1F2"
              _hover={{ bg: "blue.300", color: "white" }}
            >
              Get instructions
            </Button>
          </FormControl>
        </VStack>

        <Box as="footer" py={4}>
          {/* TODO: Add your footer content here */}
        </Box>
      </VStack>
    </>
  );
}
