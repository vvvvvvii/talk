import styled, { css } from "styled-components";
import React from "react";

const SendedMsg = (props) => {
  return (
    <DialogWrapper sended>
      <div className="mr-1 text-end">
        <Text>{props.msg.date}</Text>
        <Text>{props.msg.time}</Text>
      </div>
      <Dialog sended>{props.msg.input}</Dialog>
    </DialogWrapper>
  );
};

const Text = styled.p`
  font-size: 0.875rem;
  color: #6b5103;
`;
const DialogWrapper = styled.div`
  margin-bottom: 3rem;
  display: flex;
  align-items: end;
  ${(props) =>
    props.sended &&
    css`
      justify-content: flex-end;
    `}
`;
const Dialog = styled.div`
  /* max-width: 50%; */
  position: relative;
  background-color: #fef1bd;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  word-wrap: break-word;
  &::after {
    content: "";
    border-style: solid;
    border-width: 16px;
    height: 0px;
    position: absolute;
    bottom: -15px;
    ${(props) =>
      (props.sended &&
        css`
          border-color: #fef1bd #fef1bd transparent transparent;
          right: 30px;
        `) ||
      (props.received &&
        css`
          border-color: #fef1bd transparent transparent transparent;
          border-width: 16px 16px 0 0;
          left: 30px;
        `)}
  }
  @media screen and (min-width: 576px) {
    max-width: 50%;
  }
`;

export default SendedMsg;
