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

const NodeVisited = styled(NodeElement)`
  background-color: pink;
`;

const NodeIsWall = styled(NodeElement)`
  background-color: #d291bc;
`;

const Node = ({
  isStart,
  isFinish,
  isVisitedStyle,
  isWall,
  row,
  col,
  onMouseDown,
  onMouseEnter,
  onMouseUp
}) => {
  return (
    <Grid
      className={`row-${row} col-${col}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}>
      {isStart === true ? <NodeStart /> : ""}
      {isFinish === true ? <NodeFinish /> : ""}
      {isVisitedStyle === true ? <NodeVisited /> : ""}
      {isWall === true ? <NodeIsWall /> : ""}
    </Grid>
  );
};

Node.propTypes = {
  isStart: PropTypes.bool,
  isFinish: PropTypes.bool,
  isVisitedStyle: PropTypes.bool,
  isWall: PropTypes.bool,
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseUp: PropTypes.func
};

export default Node;
