// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.

export default function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);

  //recursion loop
  while (!!unvisitedNodes.length) {
    const closestNode = unvisitedNodes.shift();

    //if we encounter a wall, we should skip it.
    if (closestNode.isWall) {
      continue;
    }

    //if the closest node is at a distance of infinity
    //we must be trapped / out of reach, so we should stop the algorithm and return the visited nodes.
    if (closestNode.distance === Infinity) {
      return visitedNodesInOrder;
    }

    //otherwise, we mark the current node as visited
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode === finishNode) {
      return visitedNodesInOrder;
    }
    updateUnvisitedNeighbors(closestNode, grid);
  }
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

function updateNeighbors(closestNode, grid) {}
