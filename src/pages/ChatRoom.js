import styled, { css } from "styled-components";
import { ReplyFill, Send, GearFill } from "react-bootstrap-icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReceivedMsg from "../components/ReceivedMsg";
import SendedMsg from "../components/SendedMsg";

const ChatRoom = () => {
  const [userName, setUserName] = useState("");
  // const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  let targetURL =
    "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=CWB-00139A44-161C-4C36-8071-0C0D26A80D86&format=JSON";

  // 取得 userName
  useEffect(() => {
    setUserName(localStorage.getItem("talkUserName"));
  }, []);
  // 系統初始發送訊息或新一輪訊息
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
            input: "",
            options: ["今日天氣", "等等吃什麼"],
          },
        ]);
      }, 1000);
      setIsMounted(false);
    }
  }, [isMounted, userName, messages]);

  const getApi = async (cityName) => {
    try {
      const res = await axios.get(targetURL);
      const citiesData = await res.data.cwbopendata.dataset.location;
      const cityData = await citiesData.filter(
        (city) => city.locationName === cityName
      )[0].weatherElement;
      return {
        cityName,
        wx: cityData[0].time[0].parameter.parameterName,
        temperature: [
          cityData[2].time[0].parameter.parameterName,
          cityData[1].time[0].parameter.parameterName,
        ],
        ci: cityData[3].time[0].parameter.parameterName,
        pop: cityData[4].time[0].parameter.parameterName,
      };
    } catch (err) {
      console.log(err);
    }
  };
  const handleQuestion = async (question) => {
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
    if (question === "今日天氣") {
      input = "今天天氣如何？";
    } else if (question.includes("市") || question.includes("縣")) {
      input = `${question}的天氣是？`;
    } else if (question === "等等吃什麼") {
      input = "中午要吃什麼好？";
    }
    setMessages((prev) => [
      ...prev,
      {
        type: "sended",
        date: timestamp[0],
        time: timestamp[1],
        input,
        options: [],
      },
    ]);
    setTimeout(() => {
      handleAns(input);
    }, 1000);
  };
  const handleAns = async (sendMessage) => {
    let input = "";
    let options = [];
    let roundEnd = true;
    if (sendMessage === "今天天氣如何？") {
      input = "請選擇縣市";
      roundEnd = false;
    } else if (sendMessage.includes("天氣")) {
      let cityName = sendMessage.split("的")[0];
      let weather = await getApi(cityName).then((res) => {
        return res;
      });
      input = `${weather.cityName}今天是${weather.ci}的一天：${weather.wx}、${weather.temperature[0]} ~ ${weather.temperature[1]} 度、降雨機率 ${weather.pop}% 。`;
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

export default ChatRoom;
