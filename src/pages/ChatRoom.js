import styled, { css } from "styled-components";
import { ReplyFill, Send, GearFill } from "react-bootstrap-icons";
import React, { useEffect, useState } from "react";
import { useGetWeather } from "../hooks/useGetWeather";

const ReceivedMsg = (props) => {
  return (
    <DialogWrapper received>
      <Dialog received>
        <p className={props.msg.options.length > 0 ? "mb-3" : null}>
          {props.msg.input !== "" ? props.msg.input : "為您查詢："}
        </p>
        {props.msg.options &&
          props.msg.options.map((option, optionKey) => (
            <Button
              type="button"
              className={
                optionKey !== props.msg.options.length - 1 ? "mb-2" : null
              }
              key={option}
              onClick={(e) => props.handleQuestion(e.target.innerHTML)}
            >
              {option}
            </Button>
          ))}
      </Dialog>
      <div className="ml-1">
        <Text>{props.msg.date}</Text>
        <Text>{props.msg.time}</Text>
      </div>
    </DialogWrapper>
  );
};
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

const ChatRoom = () => {
  const [userName, setUserName] = useState("");
  // const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const [cityName, setCityName] = useState("臺北市");
  const weather = useGetWeather(cityName);

  useEffect(() => {
    setUserName(localStorage.getItem("talkUserName"));
  }, []);
  useEffect(() => {
    if (isMounted && userName !== "") {
      setTimeout(() => {
        const timestamp = new Date()
          .toLocaleTimeString("zh-Hans-CN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
          .split(" ");
        setMessages((prev) => [
          ...prev,
          {
            type: "received",
            date: timestamp[0],
            time: timestamp[1],
            // date: `${time.year}/${time.month}/${time.date}`,
            // time: `${time.hour}:${time.min}`,
            input:
              messages.length === 0
                ? `嗨${userName}！有什麼能為您效勞的嗎？`
                : "還有什麼能為您效勞的嗎？",
            options: [],
          },
        ]);
      }, 500);
      setTimeout(() => {
        const timestamp = new Date()
          .toLocaleTimeString("zh-Hans-CN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
          .split(" ");
        setMessages((prev) => [
          ...prev,
          {
            type: "received",
            date: timestamp[0],
            time: timestamp[1],
            // date: `${time.year}/${time.month}/${time.date}`,
            // time: `${time.hour}:${time.min}`,
            input: "",
            options: ["今日天氣", "等等吃什麼"],
          },
        ]);
      }, 1000);
      setIsMounted(false);
    }
  }, [isMounted, userName, messages]);

  const handleQuestion = (question) => {
    let input = "";
    const timestamp = new Date()
      .toLocaleTimeString("zh-Hans-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
      .split(" ");
    switch (question) {
      case "今日天氣":
        input = "今天天氣如何？";
        break;
      case "等等吃什麼":
        input = "中午要吃什麼好？";
        break;
      default:
        input = `${question}的天氣是？`;
        break;
    }
    setMessages([
      ...messages,
      {
        type: "sended",
        date: timestamp[0],
        time: timestamp[1],
        input,
        options: [],
      },
    ]);
    handleAns(input);
  };
  const handleAns = (sendMessage) => {
    let input = "";
    let options = [];
    let roundEnd = true;
    if (sendMessage === "今天天氣如何？") {
      input = "請選擇縣市";
      options = [
        "宜蘭縣",
        "花蓮縣",
        "臺東縣",
        "澎湖縣",
        "金門縣",
        "連江縣",
        "臺北市",
        "新北市",
        "桃園市",
        "臺中市",
        "臺南市",
        "高雄市",
        "基隆市",
        "新竹縣",
        "新竹市",
        "苗栗縣",
        "彰化縣",
        "南投縣",
        "雲林縣",
        "嘉義縣",
        "嘉義市",
        "屏東縣",
      ];
      roundEnd = false;
    } else if (sendMessage.includes("天氣")) {
      const cityName = sendMessage.split("的")[0];
      setCityName(cityName);
      input = `${weather.ci}的一天：${weather.wx}、${weather.temperature[0]} ~ ${weather.temperature[1]} 度、降雨機率 ${weather.pop}% 。`;
    } else if (sendMessage === "中午要吃什麼好？") {
      const menu = [
        "金仙",
        "晶饌",
        "孫家便當",
        "自己",
        "麥當當",
        "麥味登",
        "土",
        "珍香",
        "誠屋",
        "アツアツ",
        "雙連食堂",
        "百八",
        "壽司郎",
        "強尼兄弟",
        "摩斯",
      ];
      const menuKey = getRandom(menu.length);
      input = `吃${menu[menuKey]}如何？`;
    }
    setTimeout(() => {
      const timestamp = new Date()
        .toLocaleTimeString("zh-Hans-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
        .split(" ");
      setMessages((prev) => [
        ...prev,
        {
          type: "received",
          date: timestamp[0],
          time: timestamp[1],
          input,
          options,
        },
      ]);
      setIsMounted(roundEnd);
    }, 1000);
  };
  const getRandom = (max) => {
    return Math.floor(Math.random() * max);
  };
  return (
    <div>
      <Header>
        <a href="/talk" className="p-1" title="離開聊天">
          <ReplyFill className="fs-3" color="#6b5103"></ReplyFill>
        </a>
        <h2 className="fs-2">聊天室</h2>
        <a href="/talk" disabled className="p-1" title="設定">
          <GearFill className="fs-3" color="#6b5103"></GearFill>
        </a>
      </Header>
      <Body>
        {messages.map((message, messageKey) =>
          message.type === "received" ? (
            <ReceivedMsg
              msg={message}
              handleQuestion={handleQuestion}
              key={`id${messageKey}`}
            />
          ) : (
            <SendedMsg msg={message} key={`id${messageKey}`} />
          )
        )}
      </Body>
      {/* <Footer>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <a
          href="/"
          className="p-1"
          title="送出"
          onClick={(e) => sendMessage(e)}
        >
          <Send className="ml-2 fs-4" color="#6b5103" />
        </a>
      </Footer> */}
    </div>
  );
};

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
  padding: 1.5rem;
  background: #fbdf5a;
  color: #6b5103;
  @media screen and (min-width: 576px) {
    padding: 2.5rem;
  }
`;
const Body = styled.div`
  padding: 7.5rem 1.5rem;
  @media screen and (min-width: 576px) {
    padding: 10rem 2.5rem;
  }
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
const Button = styled.button`
  display: block;
  border-radius: 0.25rem;
  border: 1px solid #1fb50c;
  padding: 0.5rem;
  background: transparent;
  color: #1fb50c;
  &:hover {
    border: 1px solid transparent;
    color: white;
    background: #d7c378;
  }
`;

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
export default ChatRoom;
