import styled, { css } from "styled-components";
import React, { useState } from "react";
import WeatherMap from "../components/WeatherMap";

const ReceivedMsg = (props) => {
  const [weatherMapName, setWeatherMapName] = useState([]);
  const hoverWeatherMap = (name, enName) => {
    setWeatherMapName([name, enName]);
  };
  return (
    <DialogWrapper received>
      <Dialog received>
        <p className={props.msg.options.length > 0 ? "mb-3" : null}>
          {props.msg.input !== "" ? props.msg.input : "為您查詢："}
        </p>
        {props.msg.input === "請選擇縣市" && (
          <div>
            <svg className="svg">
              <WeatherMap
                msg={props.msg}
                hoverWeatherMap={hoverWeatherMap}
                handleQuestion={props.handleQuestion}
              />
              <text x="5%" y="20%" className="svg-title">
                {weatherMapName[0]}
              </text>
              <text x="5%" y="25%" className="svg-text">
                {weatherMapName[1]}
              </text>
            </svg>
          </div>
        )}
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
const Text = styled.p`
  font-size: 0.875rem;
  color: #6b5103;
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

export default ReceivedMsg;
