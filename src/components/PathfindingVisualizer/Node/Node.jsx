import React, { useState } from "react";
import styled from "styled-components";

const NodeElement = styled.div`
  height: 20px;
  width: 20px;
  border: 2px solid black;
`;

const Node = () => {
  return <NodeElement></NodeElement>;
};

export default Node;
