import styled, { css } from "styled-components";

function NotFound() {
  return (
    <Container>
      <p className="fs-1 fw-bold mb-3">Oops!</p>
      <p className="fs-2">這個分頁跟你的朋朋一樣揣袂著餒</p>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #d7c378;
`;

export default NotFound;
