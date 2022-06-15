import styled, { css } from "styled-components";
import React, { useState } from "react";

function Home() {
  const [userName, setUserName] = useState("主人");
  const saveLocalStorage = () => {
    localStorage.setItem("talkUserName", userName);
  };
  return (
    <Container>
      <Logo>TALK</Logo>
      <Input
        placeholder="輸入暱稱"
        onChange={(e) => setUserName(e.target.value)}
      />
      <Button
        warning
        theme={theme}
        href="https://vvvvvvii.github.io/talk/#/chat-room"
        onClick={() => saveLocalStorage()}
      >
        開始聊天
      </Button>
    </Container>
  );
}

const theme = {
  primary: "#d7c378",
  lightPrimary: "#faf7ec",
  darkPrimary: "#6b5103",
  warning: "#FBDF5A",
  info: "#1fb50c",
  white: "#fff",
};
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #d7c378;
`;
const Logo = styled.h1`
  font-weight: 900;
  font-size: 10rem;
  background: url(https://images.unsplash.com/photo-1513338072941-d682049e103a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632);
  background-size: contain;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px #fff;
`;
const Input = styled.input`
  display: block;
  width: 25%;
  border-radius: 0.25rem;
  border: #faf7ec;
  padding: 0.5rem 1rem;
  color: #1fb50c;
  background: #faf7ec;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  &:hover {
    background: #fff;
  }
`;
const Button = styled.a`
  border-radius: 0.25rem;
  padding: 0.5rem;
  font-size: 1.25rem;
  top: 0;
  color: #000;
  ${(props) =>
    props.warning &&
    css`
      background: ${(props) => props.theme.warning};
      border: 1px solid ${(props) => props.theme.darkPrimary};
    `};
  &:hover {
    color: #6b5103;
  }
`;
export default Home;
