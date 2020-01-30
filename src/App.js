import React from "react";
import styled from "styled-components";
import PathfindingVisualizer from "./components/PathfindingVisualizer/PathfindingVisualizer";

const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`;

function App() {
  return (
    <AppWrapper className='App'>
      <PathfindingVisualizer rows={10} cols={30} />
    </AppWrapper>
  );
}

export default App;
