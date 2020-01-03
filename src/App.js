import React from "react";
import "./App.css";

function App() {
  return (
    <AppWrapper className='App'>
      <PathfindingVisualizer rows={20} cols={50} />
    </AppWrapper>
  );
}

export default App;
