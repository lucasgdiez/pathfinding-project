import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Node from "./Node/Node";

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

const PathfindingVisualizer = () => {
  const [nodesCount, setNodes] = useState([]);

  useEffect(() => {
    const nodes = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push([]);
      }
      nodes.push(currentRow);
    }
    setNodes({ nodes });
  }, []);

  return (
    <GridWrapper>
      {nodesCount.hasOwnProperty("nodes") === true ? (
        nodesCount.nodes.map((row, rowIdx) => {
          return (
            <GridNode key={rowIdx}>
              {row.map((node, nodeIdx) => (
                <Node key={nodeIdx} />
              ))}
            </GridNode>
          );
        })
      ) : (
        <h1>Loading...</h1>
      )}
    </GridWrapper>
  );
};

export default PathfindingVisualizer;
