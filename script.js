// Global array to store card data
const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
let flippedCards = [];
let matchedPairs = 0;

// Function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to create game board
function createGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Clear existing content
    const shuffledCards = shuffleArray([...cardValues]);

    shuffledCards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="front"></div>
            <div class="back">${value}</div>
        `;
        card.addEventListener('click', () => flipCard(card, value));
        gameBoard.appendChild(card);
    });
}

// Function to handle card flip
function flipCard(card, value) {
    if (card.classList.contains('flipped') || flippedCards.length >= 2) return;

    card.classList.add('flipped');
    flippedCards.push({ card, value });

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Function to check if two flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.value === card2.value) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === cardValues.length / 2) {
            setTimeout(() => alert('Congratulations! You won!'), 500);
        }
    } else {
        card1.card.classList.add('shake');
        card2.card.classList.add('shake');
        setTimeout(() => {
            card1.card.classList.remove('flipped', 'shake');
            card2.card.classList.remove('flipped', 'shake');
            flippedCards = [];
        }, 1000);
    }
}

// Function to reset the game
function resetGame() {
    flippedCards = [];
    matchedPairs = 0;
    createGameBoard();
}

// Initialize game on page load
document.addEventListener('DOMContentLoaded', () => {
    createGameBoard();
    document.getElementById('resetButton').addEventListener('click', resetGame);
});
