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

const START_NODE_ROW = 2;
const START_NODE_COL = 3;
const FINISH_NODE_ROW = 8;
const FINISH_NODE_COL = 15;

const PathfindingVisualizer = ({ rows, cols }) => {
  const [nodesCount, setNodes] = useState([]);
  const [mouseIsPressed, setMousePressed] = useState(false);

  useEffect(() => {
    const grid = getInitialGrid(rows, cols);
    setNodes(grid);
  }, [rows, cols]);

  const animateDijkstra = (nodes, nodesInShortestPathOrder) => {
    for (let i = 0; i < nodes.length; i++) {
      setTimeout(() => {
        const node = nodes[i];
        const newGrid = nodesCount.slice();

        newGrid[node.row][node.col] = node;

        //dont judge me, setting nodes as a state takes too much resources from react
        //and reference wasnt working
        document.getElementById(`row-${node.row} col-${node.col}`).style.backgroundColor = "pink";

        //check for loop ending
        if (nodes.length - 1 === i) {
          //animate the shortest path
          animateShortestPath(nodesInShortestPathOrder);
        }
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodes) => {
    for (let i = 0; i < nodes.length; i++) {
      setTimeout(() => {
        const node = nodes[i];
        document.getElementById(`row-${node.row} col-${node.col}`).style.backgroundColor = "yellow";
      }, 50 * i);
    }
  };

  const visualizeDjikstra = () => {
    const grid = nodesCount;
    const startNode = nodesCount[START_NODE_ROW][START_NODE_COL];
    const finishNode = nodesCount[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedInOrder, nodesInShortestPathOrder);
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
  const handleMouseUp = () => {
    setMousePressed(false);
  };

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
                const { isStart, isFinish, distance, isWall, previousNode, col, row } = node;
                return (
                  <Node
                    isStart={isStart}
                    isFinish={isFinish}
                    distance={distance}
                    isWall={isWall}
                    previousNode={previousNode}
                    col={col}
                    row={row}
                    key={nodeIdx}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
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
