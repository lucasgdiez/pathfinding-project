import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Grid = styled.div`
  display: flex;
  height: 20px;
  width: 20px;
  border: 1px solid black;
  margin: 1px 1px;
`;

const NodeElement = styled.span`
  height: auto;
  width: 100%;
`;
const NodeStart = styled(NodeElement)`
  background-color: green;
`;

const NodeFinish = styled(NodeElement)`
  background-color: red;
`;

const Node = ({ isStart, isFinish }) => {
  return (
    <Grid>
      {isStart === true ? <NodeStart /> : ""}
      {isFinish === true ? <NodeFinish /> : ""}
    </Grid>
  );
};

Node.propTypes = {
  isStart: PropTypes.bool,
  isFinish: PropTypes.bool
};

export default Node;
