import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../../algorithms/dijkstra";

const GridWrapper = styled.div`
  width: 100%;
  height: 80%;
  max-width: 1200px;
  margin: 0 auto;
`;

const GridNode = styled.div`
  display: flex;
  flex-direction: row;
`;

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const PathfindingVisualizer = ({ rows, cols }) => {
  const [nodesCount, setNodes] = useState([]);
  const [mouseIsPressed, setMousePressed] = useState(false);
  //create grid on its own method odwn below
  useEffect(() => {
    const grid = getInitialGrid(rows, cols);
    setNodes(grid);
  }, [rows, cols]);

  const animateDijkstra = (nodes) => {
    for (let i = 0; i < nodes.length; i++) {
      setTimeout(() => {
        const node = nodes[i];
        const newGrid = nodesCount.slice();
        const newNode = {
          ...node,
          isVisitedStyle: true
        };

        newGrid[node.row][node.col] = newNode;
        setNodes(newGrid);
      }, 100 * i);
    }
  };

  const visualizeDjikstra = () => {
    const grid = nodesCount;
    const startNode = nodesCount[START_NODE_ROW][START_NODE_COL];
    const finishNode = nodesCount[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedInOrder);
  };

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(nodesCount, row, col);
    setNodes(newGrid);
    setMousePressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(nodesCount, row, col);
    setNodes(newGrid);
  };
  const handleMouseUp = () => {};

  return (
    <GridWrapper>
      <button
        onClick={() => {
          visualizeDjikstra();
        }}>
        Visualize Djikstra
      </button>
      {nodesCount.length > 0 ? (
        nodesCount.map((row, rowIdx) => {
          return (
            <GridNode key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const {
                  isStart,
                  isFinish,
                  distance,
                  isVisited,
                  isVisitedStyle,
                  isWall,
                  previousNode,
                  col,
                  row
                } = node;
                return (
                  <Node
                    isStart={isStart}
                    isFinish={isFinish}
                    distance={distance}
                    isVisited={isVisited}
                    isVisitedStyle={isVisitedStyle}
                    isWall={isWall}
                    previousNode={previousNode}
                    col={col}
                    row={row}
                    key={nodeIdx}
                  />
                );
              })}
            </GridNode>
          );
        })
      ) : (
        <h1>Loading...</h1>
      )}
    </GridWrapper>
  );
};

const getInitialGrid = (rows, cols) => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

//HARDCODED START / END NODE, REFACTORL LATER
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isVisitedStyle: false,
    isWall: false,
    previousNode: null
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = grid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

PathfindingVisualizer.propTypes = {
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired
};

export default PathfindingVisualizer;
