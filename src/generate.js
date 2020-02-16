export const generateMaze = (width, height) => {
    // initialize maze with all walls
    const maze = [[]]
    for (let i = 0; i < width; i++) {
            maze[i] = []
        for (let j = 0; j < height; j++){
            maze[i][j] = 0
        }
    }

    // generate random starting row/col starting positions
    let row = 0
    while (row % 2 === 0) row = Math.floor(Math.random() * height)

    let col = 0
    while (col % 2 === 0) col = Math.floor(Math.random() * width)


    maze[row][col] = 0 // starting point

    dfsGen(maze, row, col, width, height)

    console.log(maze)
    maze.shift()
    maze.pop()
    for (let arr of maze) {
        arr.shift()
        arr.pop()
    }
    return maze

}

// HACK TODO look into Fisher-Yates Shuffle 
const getRandomDirection = () => {
    let directions = []
    for (let i = 0; i < 4; i++){
        let nextDir = Math.floor(Math.random() * 4) + 1
        while (directions.includes(nextDir)){
            nextDir = Math.floor(Math.random() * 4) + 1
        }
        directions.push(nextDir)
    }
    return directions
}

const dfsGen = (m, r, c, width, height) => {
    let directions = getRandomDirection()

    for ( let i = 0; i < directions.length; i++ ){
        switch(directions[i]) {
            case 1: // up
                if (r - 2 <= 0) continue
                if(m[r-2][c] === 0){
                    m[r-2][c] = 1
                    m[r-1][c] = 1
                    dfsGen(m, r-2, c, width, height)
                }
                break
            case 2: // right
                if (c + 2 >= width - 1) continue
                if(m[r][c+2] === 0){
                    m[r][c+2] = 1
                    m[r][c+1] = 1
                    dfsGen(m, r, c+2, width, height)
                }
                break
            case 3: // down
                if (r + 2 >= height - 1) continue
                if(m[r+2][c] === 0){
                    m[r+2][c] = 1
                    m[r+1][c] = 1
                    dfsGen(m, r+2, c, width, height)
                }
                break
            case 4: // left
                if (c - 2 <= 0) continue
                if(m[r][c-2] === 0){
                    m[r][c-2] = 1
                    m[r][c-1] = 1
                    dfsGen(m, r, c-2, width, height)
                }
                break
        }
    }

}


