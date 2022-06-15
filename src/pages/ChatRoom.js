import styled, { css } from "styled-components";
import { ReplyFill, Send, GearFill } from "react-bootstrap-icons";
import React, { useEffect, useState } from "react";
import { useGetWeather } from "../hooks/useGetWeather";
import axios from "axios";

let targetURL = `https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=${process.env.REACT_APP_URL}&format=JSON`;

function ChatRoom() {
  const [userName, setUserName] = useState("");
  const [time, setTime] = useState({
    year: "",
    month: "",
    date: "",
    hour: "",
    min: "",
  });
  // const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const [cityName, setCityName] = useState("臺北市");
  const weather = useGetWeather(cityName);

  useEffect(() => {
    setUserName(localStorage.getItem("talkUserName"));
  }, []);
  useEffect(() => {
    if (userName !== "") {
      getTime();
    }
  }, [userName]);
  useEffect(() => {
    if (isMounted && time.year !== "" && userName !== "") {
      setTimeout(() => {
        setMessages([
          {
            type: "received",
            date: `${time.year}/${time.month}/${time.date}`,
            time: `${time.hour}:${time.min}`,
            input: `嗨${userName}！有什麼能為您效勞的嗎？`,
            options: [],
          },
        ]);
      }, 500);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "received",
            date: `${time.year}/${time.month}/${time.date}`,
            time: `${time.hour}:${time.min}`,
            input: "",
            options: ["今日天氣", "等等吃什麼"],
          },
        ]);
      }, 1000);
      setIsMounted(false);
    }
  }, [isMounted, time, userName]);

  const getTime = () => {
    const year = new Date().getFullYear().toString();
    let month = (new Date().getMonth() + 1).toString();
    let date = new Date().getDate().toString();
    let hour = new Date().getHours().toString();
    let min = new Date().getMinutes().toString();
    const checkLengthArr = [month, date, hour, min];
    checkLengthArr.forEach((item, index) => {
      if (item.length === 1) {
        checkLengthArr[index] = `0${item}`;
      }
    });
    setTime({
      year,
      month: checkLengthArr[0],
      date: checkLengthArr[1],
      hour: checkLengthArr[2],
      min: checkLengthArr[3],
    });
  };

  const handleQuestion = (question) => {
    getTime();
    let input = "";
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
        date: `${time.year}/${time.month}/${time.date}`,
        time: `${time.hour}:${time.min}`,
        input,
        options: [],
      },
    ]);
    handleAns(input);
  };
  const handleAns = (sendMessage) => {
    getTime();
    let input = "";
    let options = [];
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
    } else if (sendMessage.includes("天氣")) {
      const cityName = sendMessage.split("的")[0];
      setCityName(cityName);
      input = `${weather.ci}的一天：${weather.wx}、${weather.temperature[0]} ~ ${weather.temperature[1]} 度、降雨機率 ${weather.pop}% 。`;
    } else if (sendMessage === "等等吃什麼") {
      input = "吃土吧你";
    }
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "received",
          date: `${time.year}/${time.month}/${time.date}`,
          time: `${time.hour}:${time.min}`,
          input,
          options,
        },
      ]);
    }, 1000);
  };
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
        {messages.map((message, messageKey) => {
          if (message.type === "received") {
            if (message.options.length === 0) {
              return (
                <DialogWrapper received key={`id${messageKey}`}>
                  <Dialog received>{message.input}</Dialog>
                  <div className="ml-1">
                    <Text>{message.date}</Text>
                    <Text>{message.time}</Text>
                  </div>
                </DialogWrapper>
              );
            } else {
              return (
                <DialogWrapper received key={`id${messageKey}`}>
                  <Dialog received>
                    <p className="mb-3">
                      {message.input !== "" ? message.input : "為您查詢："}
                    </p>
                    {message.options.map((option, optionKey) => (
                      <Button
                        type="button"
                        className={
                          optionKey !== message.options.length - 1
                            ? "mb-2"
                            : null
                        }
                        key={option}
                        onClick={(e) => handleQuestion(e.target.innerHTML)}
                      >
                        {option}
                      </Button>
                    ))}
                  </Dialog>
                  <div className="ml-1">
                    <Text>{message.date}</Text>
                    <Text>{message.time}</Text>
                  </div>
                </DialogWrapper>
              );
            }
          } else
            return (
              <DialogWrapper sended key={`id${messageKey}`}>
                <div className="mr-1 text-end">
                  <Text>{message.date}</Text>
                  <Text>{message.time}</Text>
                </div>
                <Dialog sended>{message.input}</Dialog>
              </DialogWrapper>
            );
        })}
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
  margin: 3rem;
  display: flex;
  align-items: end;
  ${(props) =>
    props.sended &&
    css`
      justify-content: flex-end;
    `}
`;
const Dialog = styled.div`
  max-width: 50%;
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
`;
export default ChatRoom;
