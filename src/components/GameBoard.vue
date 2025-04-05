<script setup>
import { onMounted, ref, nextTick } from 'vue';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';

// import Vue from 'vue';

    const gameBoard = ref([
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [2, 4, null, null]
    ]);

    const store = useStore();

    // const gameBoard = ref([
    //     [16, 4, null, 64],
    //     [4, 8, 4, 8],
    //     [8, 64, 8, 4],
    //     [128, 2, 128, 16]
    // ]);

    const getCellValue = (cell) => {
        return cell !== '' ? `cell cell-${cell}` : `cell`;
    };

    const moveLeft = () => {
        // console.log('left');
        gameBoard.value = gameBoard.value.map((row) => {
            let newRow = row.filter(num => num !== null); // Tao mang moi khong co null
            for (let i = 0; i < newRow.length - 1; i++) {
                if (newRow[i] === newRow[i + 1]) {
                    newRow[i] *= 2;
                    updateScore(newRow[i]);
                    newRow[i + 1] = null;
                };
                if (newRow[i] === undefined) newRow[i] = null;
            };
            return newRow.filter(num => num !== null).concat(new Array(4).fill(null)).slice(0,4);
        });
    };

    const moveRight = () => {
        // console.log('right');
        gameBoard.value = gameBoard.value.map((row) => {
            let newRow = row.filter(num => num !== null);
            for (let i = 0; i < newRow.length - 1; i++) {
                if (newRow[i] === newRow[i + 1]) {
                    newRow[i + 1] *= 2;
                    updateScore(newRow[i + 1]);
                    newRow[i] = null;
                };
                if (newRow[i] === undefined) newRow[i] = null;
            };
            return new Array(4).fill(null).concat(newRow.filter(num => num !== null)).slice(-4);
        });
    };

    const moveUp = () => {
        // console.log('up');
        let newBoard = [[], [], [], []];
        for (let col = 0; col < 4; col ++) {
            let column = gameBoard.value.map((row) => row[col]);
            column = shiftAndMergeUp(column);
            // Gán lại giá trị vào từng cột
            for (let row = 0; row < 4; row++) {
                newBoard[row][col] = column[row];
                if (newBoard[row][col] === undefined) newBoard[row][col] = null;
            };
        };
        gameBoard.value = newBoard;
    };

    const moveDown = () => {
        // console.log('down');
        let newBoard = [[], [], [], []];
        for (let col = 0; col < 4; col ++) {
            let column = gameBoard.value.map((row) => row[col]);
            column = shiftAndMergeDown(column);
            // Gán lại giá trị vào từng cột
            for (let row = 0; row < 4; row++) {
                newBoard[row][col] = column[row];
                if (newBoard[row][col] === undefined) newBoard[row][col] = null;
            };
        };
        gameBoard.value = newBoard;
    };

    const shiftAndMergeUp = (arr) => {
        let filtered = arr.filter(num => num !== null);
        for (let i = 0; i < filtered.length - 1; i++) {
            if (filtered[i] === filtered[i + 1]) {
                filtered[i] *= 2;
                updateScore(filtered[i]);
                filtered[i + 1] = null;
            };
        };
        return filtered.filter(num => num !== null).concat(new Array(4 - filtered.length).fill(null));
    };

    const shiftAndMergeDown = (arr) => {
        let filtered = arr.filter(num => num !== null);
        for (let i = filtered.length - 1; i > 0; i--) {
            if (filtered[i] === filtered[i - 1]) {
                filtered[i] *= 2;
                updateScore(filtered[i]);
                filtered[i - 1] = null;
            };
        };
        filtered = filtered.filter(num => num !== null);
        return new Array(4 - filtered.length).fill(null).concat(filtered.filter(num => num !== null));
    };

    const addNewNumber = () => {
        let emptyCells = [];
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (!gameBoard.value[row][col]) emptyCells.push({row, col});
            };
        };
        // console.log(emptyCells);
        if (emptyCells.length > 0) {
            let {row, col} = emptyCells[Math.floor(Math.random() * emptyCells.length)]; // Chọn ra ô random để push random number
            gameBoard.value[row][col] = Math.random < 9 ? 4 : 2;
        };

    };

    const updateScore  = (number) => {
        store.dispatch('incrementScore', number);
        // sessionStorage.setItem("current-score", score.value);
    };

    const checkGameOver = () => {
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                // console.log(`Checking row ${row}, col ${col}: ${gameBoard.value[row][col]}`);
                if (gameBoard.value[row][col] === null) {
                    // console.log("Có ô trống => chưa thua");
                    return false;
                }
                if (col < 3 && gameBoard.value[row][col] === gameBoard.value[row][col + 1]) {
                    // console.log("Có thể ghép ngang => chưa thua");
                    return false;
                }
                if (row < 3 && gameBoard.value[row][col] === gameBoard.value[row + 1][col]) {
                    // console.log("Có thể ghép dọc => chưa thua");
                    return false;
                }
            };
        };
        // console.log("Không còn nước đi => Game Over!");
        return true;
    };

    const newGameBoard = () => {
        const gameBoard2 = ref([
                [null, null, null, null],
                [null, null, null, null],
                [null, 2, 2, null],
                [null, null, null, null]
            ]);
        gameBoard.value = gameBoard2.value;
        sessionStorage.setItem('current-score', 0);
        store.dispatch('resetScore', 'RESET');
    };

    defineExpose({newGameBoard});

    const showAlert = () => {
        Swal.fire({
            title: 'GAME OVER!',
            text: 'Play Again !!!',
            icon: 'info',
        }).then(() => {
            newGameBoard();
        });
    };

    onMounted(() => {
        window.addEventListener("keyup", (e) => {
            // nextTick(() => {
            //     console.log('after nextTick: ',gameBoard.value);
            // });
            switch (e.key) {
                case 'ArrowLeft': 
                    moveLeft();
                    addNewNumber();
                    nextTick(() => {
                        if (checkGameOver()) {
                            setTimeout(() => {
                                showAlert();
                            }, 1000);
                        };
                    });
                    break;
                case 'ArrowRight': 
                    moveRight();
                    addNewNumber();
                    nextTick(() => {
                        if (checkGameOver()) {
                            setTimeout(() => {
                                showAlert();
                            }, 1000);
                        };
                    });
                    break;
                case 'ArrowUp': 
                    moveUp();
                    addNewNumber();
                    nextTick(() => {
                        if (checkGameOver()) {
                            setTimeout(() => {
                                showAlert();
                            }, 1000);
                        };
                    });
                    break;
                case 'ArrowDown': 
                    moveDown();
                    addNewNumber();
                    nextTick(() => {
                        if (checkGameOver()) {
                            setTimeout(() => {
                                showAlert();
                            }, 1000);
                        };
                    });
                    break;
            }
        });

        window.addEventListener("load", () => {
            sessionStorage.setItem('current-score',0);
        });
    });
</script>

<template>
    <div class="game-board">
        <div class="row" v-for="(row, rowIndex) in gameBoard" :key="rowIndex + 1">
            <div :class="getCellValue(cell)" v-for="(cell, cellIndex) in row" :key="cellIndex + 1">{{ cell || '' }}</div>
        </div>
    </div>
</template>

<style>
    @keyframes pop {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        50% {
            transform: scale(1.2);
            opacity: 1;
        }
        100% {
            transform: scale(1);
        }
    }

    .animate {
        animation: pop 0.5s ease-out;
    }

    .cell {
        color: rgb(35, 35, 35);
        background-color: #7799A3;
        border-radius: 5px;
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 20px;
        transition: 0.3s ease;
        opacity: 1;
        animation: pop 0.5s ease-out;
    }

    .cell-2 {
        background-color: #EFE5DA;
    }

    .cell-4 {
        background-color: #cdbea2;
    }

    .cell-8 {
        background-color: #F1B179;
        color: #FFF4DF;
    }

    .cell-16 {
        background-color: #F59563;
        color: #FFF4DF;
    }

    .cell-32 {
        background-color: #F67C60;
        color: #FFF4DF;
    }

    .cell-64 {
        background-color: #F65E3B;
        color: #FFF4DF;
    }

    .cell-128 {
        background-color: #EDCF73;
        color: #FFF4DF;
    }

    .cell-256 {
        background-color: #EDCC62;
        color: #FFF4DF;
    }

    .cell-512 {
        background-color: #EDC850;
        color: #FFF4DF;
    }

    .cell-1024 {
        background-color: #EDC53F;
        color: #FFF4DF;
        font-size: 15px;
    }

    .cell-2048 {
        background-color: #e1af0a;
        color: #FFF4DF;
        font-size: 15px;
    }

    .cell-4096 {
        background-color: #DE3400;
        color: #FFF4DF;
        font-size: 15px;
    }

    .cell-8192 {
        background-color: #2A61AF;
        color: #FFF4DF;
        font-size: 15px;
    }
    
    .row {
        display: flex;
        gap: 7px;
    }

    .game-board {
        background-color: #074054;
        border-radius: 5px;
        padding: 7px;
        display: grid;
        gap: 7px;
    }
</style>