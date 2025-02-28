// DOM Elements
const arraySizeSlider = document.getElementById('a_size');
const sizeValue = document.getElementById('size-value');
const arraySpeedSlider = document.getElementById('a_speed');
const speedValue = document.getElementById('speed-value');
const generateButton = document.getElementById('a_generate');
const algoButtons = document.querySelectorAll('.algo-btn');
const arrayContainer = document.getElementById('array_container');

// Time and Space complexity elements
const timeWorst = document.getElementById('Time_Worst');
const timeAverage = document.getElementById('Time_Average');
const timeBest = document.getElementById('Time_Best');
const spaceWorst = document.getElementById('Space_Worst');

// Variables
let arraySize = arraySizeSlider.value;
let sortingSpeed = parseInt(arraySpeedSlider.value);
const delayFactor = 10000; // Higher number = slower animations
let array = [];
let bars = [];
let activeAlgorithm = '';

// Initialize the array
generateNewArray();

// Event Listeners
arraySizeSlider.addEventListener('input', function() {
    arraySize = this.value;
    sizeValue.textContent = this.value;
    generateNewArray();
});

arraySpeedSlider.addEventListener('input', function() {
    sortingSpeed = parseInt(this.value);
    speedValue.textContent = this.value;
});

generateButton.addEventListener('click', generateNewArray);

// Add click listeners to algorithm buttons
algoButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        algoButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // Set active algorithm
        activeAlgorithm = this.getAttribute('data-algorithm');
        
        // Update complexity information
        updateAlgorithmInfo(activeAlgorithm);
        
        // Run the appropriate algorithm
        runSelectedAlgorithm();
    });
});

// Functions
// function generateNewArray() {
//     // Clear the array container
//     arrayContainer.innerHTML = '';
//     array = [];
//     bars = [];
    
//     // Generate random array
//     for (let i = 0; i < arraySize; i++) {
//         array.push(Math.floor(Math.random() * 100) + 1);
//     }
    
//     // Create bars for visualization
//     for (let i = 0; i < arraySize; i++) {
//         const bar = document.createElement('div');
//         bar.classList.add('bar');
//         bar.style.height = `${array[i] * 3}px`;
//         bar.style.width = `${100/arraySize-(2)}px`;
//         bar.style.margin = '0 10px';
//         arrayContainer.appendChild(bar);
//         bars.push(bar);
//     }
// }

function generateNewArray() {
    // Clear the array container
    arrayContainer.innerHTML = '';
    array = [];
    bars = [];
    
    // Generate random array
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    
    // Create bars for visualization - MODIFIED SECTION
    const barWidth = Math.max(8, 150/arraySize); // Increase minimum width and scale factor
    const barMargin = Math.max(1, 4/arraySize); // Reduce margins for larger arrays
    
    for (let i = 0; i < arraySize; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${array[i] * 3}px`;
        bar.style.width = `${barWidth}px`;
        bar.style.margin = `0 ${barMargin}px`; // Smaller margins
        arrayContainer.appendChild(bar);
        bars.push(bar);
    }
}


function updateAlgorithmInfo(algorithm) {
    // Set complexity information based on selected algorithm
    switch(algorithm) {
        case 'bubble':
            timeWorst.textContent = 'O(n²)';
            timeAverage.textContent = 'O(n²)';
            timeBest.textContent = 'O(n)';
            spaceWorst.textContent = 'O(1)';
            break;
        case 'selection':
            timeWorst.textContent = 'O(n²)';
            timeAverage.textContent = 'O(n²)';
            timeBest.textContent = 'O(n²)';
            spaceWorst.textContent = 'O(1)';
            break;
        case 'insertion':
            timeWorst.textContent = 'O(n²)';
            timeAverage.textContent = 'O(n²)';
            timeBest.textContent = 'O(n)';
            spaceWorst.textContent = 'O(1)';
            break;
        case 'merge':
            timeWorst.textContent = 'O(n log n)';
            timeAverage.textContent = 'O(n log n)';
            timeBest.textContent = 'O(n log n)';
            spaceWorst.textContent = 'O(n)';
            break;
        case 'quick':
            timeWorst.textContent = 'O(n²)';
            timeAverage.textContent = 'O(n log n)';
            timeBest.textContent = 'O(n log n)';
            spaceWorst.textContent = 'O(log n)';
            break;
        case 'heap':
            timeWorst.textContent = 'O(n log n)';
            timeAverage.textContent = 'O(n log n)';
            timeBest.textContent = 'O(n log n)';
            spaceWorst.textContent = 'O(1)';
            break;
        default:
            timeWorst.textContent = '-';
            timeAverage.textContent = '-';
            timeBest.textContent = '-';
            spaceWorst.textContent = '-';
    }
}

function runSelectedAlgorithm() {
    // Disable UI controls during sorting
    disableControls();
    
    switch(activeAlgorithm) {
        case 'bubble':
            bubbleSort();
            break;
        case 'selection':
            selectionSort();
            break;
        case 'insertion':
            insertionSort();
            break;
        case 'merge':
            mergeSort();
            break;
        case 'quick':
            quickSort();
            break;
        case 'heap':
            heapSort();
            break;
    }
}

function disableControls() {
    // Disable sliders and buttons during sorting
    arraySizeSlider.disabled = true;
    arraySpeedSlider.disabled = true;
    generateButton.disabled = true;
    algoButtons.forEach(btn => btn.disabled = true);
}

function enableControls() {
    // Re-enable controls after sorting is complete
    arraySizeSlider.disabled = false;
    arraySpeedSlider.disabled = false;
    generateButton.disabled = false;
    algoButtons.forEach(btn => btn.disabled = false);
}

// Helper visualization functions
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function markBars(indices, className) {
    for (let i of indices) {
        bars[i].classList.add(className);
    }
}

async function unmarkBars(indices, className) {
    for (let i of indices) {
        bars[i].classList.remove(className);
    }
}

async function updateBar(index, height) {
    bars[index].style.height = `${height * 3}px`;
}

// Note: The actual sorting algorithms will be imported from separate files
// This is just the main controller file