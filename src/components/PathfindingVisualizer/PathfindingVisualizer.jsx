import React, { useState, useEffect } from "react";
import Node from "./Node/Node";

const PathfindingVisualizer = () => {
  const [nodes, setNodes] = useState([]);

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

  return <Node />;
};

export default PathfindingVisualizer;
