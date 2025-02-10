interface cell {
  right: boolean;
  left: boolean;
  up: boolean;
  down: boolean;
}

export function makeMap(size: number, c: any, canvas: any) {
  const stack: number[][] = [];
  const cells = new Map<string, cell>();
  stack.push([0, 0, 0]);
  cells.set("0,0", { right: true, left: true, up: true, down: true });

  //stack [x,y,direction relative to start]
  //direction    0 = left 1 = right 2 = up 3 = down
  while (stack.length > 0) {
    const neighbors: number[][] = [];
    const x = stack[stack.length - 1][0];
    const y = stack[stack.length - 1][1];

    if (x - 1 >= 0 && !cells.has(`${x - 1},${y}`)) {
      neighbors.push([x - 1, y, 0]);
    }
    if (x + 1 < size && !cells.has(`${x + 1},${y}`)) {
      neighbors.push([x + 1, y, 1]);
    }
    if (y - 1 >= 0 && !cells.has(`${x},${y - 1}`)) {
      neighbors.push([x, y - 1, 2]);
    }
    if (y + 1 < size && !cells.has(`${x},${y + 1}`)) {
      neighbors.push([x, y + 1, 3]);
    }

    if (neighbors.length === 0) {
      stack.pop();
      continue;
    }

    const rand = Math.floor(Math.random()) * neighbors.length;

    let currWalls = cells.get(`${x},${y}`)!;
    let nextWalls: cell = {
      right: true,
      left: true,
      up: true,
      down: true,
    };

    switch (neighbors[rand][2]) {
      case 0:
        currWalls.left = false;
        nextWalls.right = false;
        break;
      case 1:
        currWalls.right = false;
        nextWalls.left = false;
        break;
      case 2:
        currWalls.up = false;
        nextWalls.down = false;
        break;
      case 3:
        currWalls.down = false;
        nextWalls.up = false;
        break;
    }

    stack.push(neighbors[rand]);
    cells.set(`${x},${y}`, currWalls);
    cells.set(`${neighbors[rand][0]},${neighbors[rand][1]}`, nextWalls);
  }
  console.log(cells);

  const map = Array<Array<number>>(size).fill(Array<number>(size).fill(0));

  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.beginPath();
  c.moveTo(0, 0);
  c.lineTo(canvas.width, canvas.height);
  c.stroke();
  const cellSize = 10;

  // for (let i = 0; i < size; i++) {
  //   for (let j = 0; j < size; j++) {
  //     const cellWalls = cells.get(`${i},${j}`)!;
  //     if (cellWalls.left) {
  //       c.beginPath();
  //       c.moveTo(i * cellSize, j * cellSize);
  //       c.lineTo(i * cellSize, (j + 1) * cellSize);
  //       c.strokeStyle = "black";
  //       c.stroke();
  //     }
  //     if (cellWalls.right) {
  //       c.beginPath();
  //       c.moveTo((i + 1) * cellSize, j * cellSize);
  //       c.lineTo((i + 1) * cellSize, (j + 1) * cellSize);
  //       c.strokeStyle = "black";
  //       c.stroke();
  //     }
  //   }
  // }
  return map;
}
