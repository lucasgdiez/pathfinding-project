// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.

export function dijkstra(grid, startNode, finishNode) {
  //checking edge case scenarios
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
}
