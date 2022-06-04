import styled, { css } from "styled-components";
import { ReplyFill, Send, GearFill } from "react-bootstrap-icons";

function ChatRoom() {
  return (
    <div>
      <Header>
        <a href="/" className="p-1" title="離開聊天">
          <ReplyFill className="fs-3" color="#6b5103"></ReplyFill>
        </a>
        <h2 className="fs-2">聊天室</h2>
        <a href="/" className="p-1" title="設定">
          <GearFill className="fs-3" color="#6b5103"></GearFill>
        </a>
      </Header>
      <Body>
        <DialogWrapper>
          <Dialog received>
            對方傳的訊息對方傳的訊息對方傳的訊息對方傳的訊息對方傳的訊息對方傳的訊息對方傳的訊息對方傳的訊息對方傳的訊息
          </Dialog>
          <div className="ml-1">
            <Text>2022/6/4</Text>
            <Text>12:50</Text>
          </div>
        </DialogWrapper>
        <DialogWrapper sended>
          <div className="mr-1 text-end">
            <Text>2022/6/4</Text>
            <Text>12:50</Text>
          </div>
          <Dialog sended>
            我傳的訊息我傳的訊息我傳的訊息我傳的訊息我傳的訊息我傳的訊息我傳的訊息我傳的訊息我傳的訊息我傳的訊息我傳的訊息我傳的訊息我傳的訊息我傳的訊息我傳的訊息我傳的訊息
            我傳的訊息我傳的訊息我傳的訊息我傳的訊息我傳的訊息我傳的訊息我傳的訊息我傳的訊息
          </Dialog>
        </DialogWrapper>
        <DialogWrapper>
          <Dialog received>
            對方傳的訊息對方傳的訊息對方傳的訊息對方傳的訊息
          </Dialog>
          <div className="ml-1">
            <Text>2022/6/4</Text>
            <Text>12:51</Text>
          </div>
        </DialogWrapper>
      </Body>
      <Footer>
        <Input></Input>
        <a href="/" className="p-1" title="送出">
          <Send className="ml-2 fs-4" color="#6b5103"></Send>
        </a>
      </Footer>
    </div>
  );
}
const theme = {
  primary: "#d7c378",
  lightPrimary: "#faf7ec",
  warning: "#FBDF5A",
  lightWarning: "#fef1bd",
  info: "#1fb50c",
  white: "#fff",
};

const Header = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem;
  background: #fbdf5a;
  color: #6b5103;
`;
const Body = styled.div`
  padding: 10rem 2.5rem;
  background: #faf7ec;
`;
const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5rem;
  background: #fbdf5a;
`;
const Input = styled.input`
  display: block;
  width: 50%;
  border-radius: 0.25rem;
  border: #faf7ec;
  padding: 0.5rem 1rem;
  color: #1fb50c;
  background: #faf7ec;
  font-size: 1.25rem;
  &:hover {
    background: #fff;
  }
`;
const Text = styled.p`
  font-size: 0.875rem;
  color: #6b5103;
`;
const DialogWrapper = styled.div`
  max-width: 50%;
  margin: 3rem;
  display: flex;
  align-items: end;
  ${(props) =>
    props.sended &&
    css`
      margin-left: 50%;
    `}
`;
const Dialog = styled.div`
  width: fit-content;
  position: relative;
  background-color: #fef1bd;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
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
`;
export default ChatRoom;
