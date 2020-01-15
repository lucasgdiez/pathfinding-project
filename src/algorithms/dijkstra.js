// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.

export default function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  // startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
}

function getAllNodes(grid) {
  const nodes = [];

  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }

  return nodes;
}
