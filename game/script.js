const canvas = document.getElementById('tetris-canvas');
const context = canvas.getContext('2d');
const nextPieceCanvas = document.getElementById('next-piece-canvas');
const nextPieceContext = nextPieceCanvas.getContext('2d');
const scoreElement = document.getElementById('score');

const row = 20;
const column = 10;
const squareSize = 30;
const vacant = "white"; // 空白方块的颜色

// 画方块
function drawSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
    context.strokeStyle = "black";
    context.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
}

// 创建板块
let board = [];
for (let r = 0; r < row; r++) {
    board[r] = [];
    for (let c = 0; c < column; c++) {
        board[r][c] = vacant;
    }
}

// 画整个板块
function drawBoard() {
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < column; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

drawBoard();

// 方块的构造函数
function Piece(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;

    this.tetrominoN = 0; // 我们从第一个图形开始
    this.activeTetromino = this.tetromino[this.tetrominoN];

    // 控制方块
    this.x = 3;
    this.y = -2;
}

// 填充函数
Piece.prototype.fill = function(color) {
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino.length; c++) {
            // 我们只画出有方块的地方
            if (this.activeTetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, color);
            }
        }
    }
}

// 绘制方块到板块上
Piece.prototype.draw = function() {
    this.fill(this.color);
}

// 从板块上清除方块
Piece.prototype.unDraw = function() {
    this.fill(vacant);
}

// 控制方块下落
Piece.prototype.moveDown = function() {
    if (!this.collision(0, 1, this.activeTetromino)) {
        this.unDraw();
        this.y++;
        this.draw();
    } else {
        // 我们将方块锁定在位置并生成新的方块
    }
}

// 控制方块移动
Piece.prototype.moveRight = function() {
    if (!this.collision(1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x++;
        this.draw();
    }
}

Piece.prototype.moveLeft = function() {
    if (!this.collision(-1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x--;
        this.draw();
    }
}

// 控制方块旋转
Piece.prototype.rotate = function() {
    // 旋转代码
}

// 检查碰撞
Piece.prototype.collision = function(x, y, piece) {
    // 碰撞检测代码
}

// 控制键盘输入
document.addEventListener("keydown", function(event) {
    if (event.keyCode == 37) {
        // 左键
        p.moveLeft();
    } else if (event.keyCode == 38) {
        // 上键
        p.rotate();
    } else if (event.keyCode == 39) {
        // 右键
        p.moveRight();
    } else if (event.keyCode == 40) {
        // 下键
        p.moveDown();
    }
});

// 创建新的方块
let p = new Piece(/* 方块形状和颜色 */);

// 游戏循环
function drop() {
    p.moveDown();
    requestAnimationFrame(drop);
}

drop();
