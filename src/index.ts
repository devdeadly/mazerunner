// import './firebase'
import {
  COLORS,
  MAZE_SPEED
} from './constants';

import { generateMaze } from './generate';

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

let maze;
let CANVAS_DIMENSION: number = 900;

canvas.height = CANVAS_DIMENSION;
canvas.width = CANVAS_DIMENSION;

let CANVAS_ROWS_COLS: number;
let CELL_DIMENSION: number;

const kickoff = () => {
  maze = generateMaze(77, 77)
  initializeBoard();
  CANVAS_ROWS_COLS = maze.length;
  CELL_DIMENSION = CANVAS_DIMENSION / CANVAS_ROWS_COLS;

  canvas.height = CANVAS_DIMENSION;
  canvas.width = CANVAS_DIMENSION;

  solve(maze)
}

const initializeBoard = () => {
  for (let i = 0; i < CANVAS_ROWS_COLS; i++) {
    for (let j = 0; j < CANVAS_ROWS_COLS; j++) {
      switch(maze[i][j]) {
        case 0:
          color([i,j], COLORS.WALL);
          break
        case 1:
          color([i,j], COLORS.PATH);
          break
        case 2:
          color([i,j], COLORS.GOOD);
          break
        case 3:
          color([i,j], COLORS.BAD);
          break
        default:
          console.log('encountered unexpected cell')
      }
    }
  }
};

const color = (coords: number[], color: string): void => {
  ctx.fillStyle = color;
  const [x,y] = coords
  /**
   * since HTML Canvas' coodinate system has (0,0) as upper left,
   * swapping x and y orients the board like we'd expect.
   */
    ctx.fillRect(
      y * CELL_DIMENSION,
      x * CELL_DIMENSION,
      CELL_DIMENSION,
      CELL_DIMENSION
    );
};

const solve = (maze, r = 0, c = 0, history = []) => {
  maze[r][c] = 2 // 2 === visited cell
  color([r, c], COLORS.GOOD)
  setTimeout(() => {
    if (hasFinished(maze, r, c)) return
    else if (isPath(r, c + 1) && !!history.push([r, c]))    return solve(maze, r, c + 1, history)
    else if (isPath(r + 1, c) && !!history.push([r, c]))    return solve(maze, r + 1, c, history)
    else if (isPath(r, c - 1) && !!history.push([r, c]))    return solve(maze, r, c - 1, history)
    else if (isPath(r - 1, c) && !!history.push([r, c]))    return solve(maze, r - 1, c, history)
    else {
        maze[r][c] = 3 // 3 === bad cell
        color([r, c], COLORS.BAD)
        const [lastRow, col] = history.pop()
        solve(maze, lastRow, col, history)
    }
  
  }, MAZE_SPEED)

  function isPath(nextr, nextc) { return maze[nextr] && maze[nextr][nextc] === 1 ? true : false }
  function hasFinished(maze, r, c) {
      if (r === maze.length - 1 && c === maze[r].length - 1) {
          return true
      } else return false
  }
}

kickoff()

document.getElementById('kickoff').addEventListener('click', kickoff)