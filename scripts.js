// State management
const state = {
    array: [],
    arraySize: 50,
    speed: 50,
    paused: false,
    sorting: false,
    soundEnabled: true,
    visualization: 'bar',
    stepMode: false,
    currentMoves: [],
    moveIndex: 0,
    stats: {
        comparisons: 0,
        swaps: 0
    },
    selectedAlgorithm: 'bubble'
};

// Algorithm information
const algorithmInfo = {
    bubble: {
        name: 'Bubble Sort',
        description: 'A simple comparison-based algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)'
    },
    selection: {
        name: 'Selection Sort',
        description: 'Divides the array into a sorted and unsorted region, and repeatedly selects the smallest element from the unsorted region and moves it to the sorted region.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)'
    },
    insertion: {
        name: 'Insertion Sort',
        description: 'Builds the sorted array one item at a time by shifting elements that are greater than the key to the right.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)'
    },
    merge: {
        name: 'Merge Sort',
        description: 'A divide-and-conquer algorithm that divides the array into equal halves, sorts them recursively, and then merges the sorted halves.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)'
    },
    quick: {
        name: 'Quick Sort',
        description: 'A divide-and-conquer algorithm that selects a pivot element and partitions the array around it, then recursively sorts the sub-arrays.',
        timeComplexity: 'O(n log n)', // Average case
        spaceComplexity: 'O(log n)'
    },
    heap: {
        name: 'Heap Sort',
        description: 'Uses a binary heap data structure to sort elements. It builds a max-heap first and then repeatedly extracts the maximum element.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(1)'
    }
};

// DOM Elements
const container = document.getElementById('container');
const algorithmSelect = document.getElementById('algorithm-select');
const arraySizeInput = document.getElementById('arraySize');
const speedInput = document.getElementById('speed');
const themeToggle = document.getElementById('theme-toggle');
const soundToggle = document.getElementById('sound-toggle');
const sortButton = document.getElementById('sort-btn');
const pauseButton = document.getElementById('pause-btn');
const stepButton = document.getElementById('step-btn');
const resetButton = document.getElementById('reset-btn');
const generateButton = document.getElementById('generate-btn');
const barModeButton = document.getElementById('bar-mode');
const dotsModeButton = document.getElementById('dots-mode');
const circleModeButton = document.getElementById('circle-mode');
const arraySizeValue = document.getElementById('array-size-value');
const speedValue = document.getElementById('speed-value');
const themeLabel = document.getElementById('theme-label');
const comparisonsCounter = document.getElementById('comparisons');
const swapsCounter = document.getElementById('swaps');
const timeComplexityDisplay = document.getElementById('time-complexity');
const spaceComplexityDisplay = document.getElementById('space-complexity');
const algorithmNameDisplay = document.getElementById('algorithm-name');
const algorithmDescriptionDisplay = document.getElementById('algorithm-description');
const stepExplanation = document.getElementById('step-explanation');
const currentStepDisplay = document.getElementById('current-step');

// Audio context
let audioCtx = null;

// Initialize the visualizer
function init() {
    resetStats();
    generateArray();
    updateAlgorithmInfo();
    showBars();
    updateSpeedLabel();
    updateSizeLabel();
}

// Generate a new random array
function generateArray() {
    state.array = [];
    for (let i = 0; i < state.arraySize; i++) {
        state.array[i] = Math.floor(Math.random() * 100) + 10;
    }
    showVisualization();
}

// Update algorithm information display
function updateAlgorithmInfo() {
    const algorithm = state.selectedAlgorithm;
    algorithmNameDisplay.textContent = algorithmInfo[algorithm].name;
    algorithmDescriptionDisplay.textContent = algorithmInfo[algorithm].description;
    timeComplexityDisplay.textContent = algorithmInfo[algorithm].timeComplexity;
    spaceComplexityDisplay.textContent = algorithmInfo[algorithm].spaceComplexity;
}

// Reset statistics
function resetStats() {
    state.stats.comparisons = 0;
    state.stats.swaps = 0;
    updateStatsDisplay();
}

// Update statistics display
function updateStatsDisplay() {
    comparisonsCounter.textContent = state.stats.comparisons;
    swapsCounter.textContent = state.stats.swaps;
}

// Update speed label
function updateSpeedLabel() {
    const speed = state.speed;
    let label = '';
    
    if (speed <= 20) label = 'Very Slow';
    else if (speed <= 40) label = 'Slow';
    else if (speed <= 60) label = 'Medium';
    else if (speed <= 80) label = 'Fast';
    else label = 'Very Fast';
    
    speedValue.textContent = label;
}

// Update array size label
function updateSizeLabel() {
    arraySizeValue.textContent = state.arraySize;
}

// Play a sound based on the array value
function playNote(value) {
    if (!state.soundEnabled) return;
    
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const duration = 0.1;
    const oscillator = audioCtx.createOscillator();
    
    // Map the value to a frequency between 220Hz and 880Hz (A3 to A5)
    const frequency = 220 + (value / 100) * 660;
    oscillator.frequency.value = frequency;
    
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.1;
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
}

// Show appropriate visualization based on current mode
function showVisualization(move = null) {
    switch (state.visualization) {
        case 'bar':
            showBars(move);
            break;
        case 'dots':
            showDots(move);
            break;
        case 'circle':
            showCircle(move);
            break;
    }
}

// Display bars visualization
function showBars(move = null) {
    container.innerHTML = "";
    container.style.flexDirection = "row";
    
    const maxValue = Math.max(...state.array);
    const containerHeight = container.clientHeight - 10;
    
    for (let i = 0; i < state.array.length; i++) {
        const bar = document.createElement("div");
        const heightPercentage = (state.array[i] / maxValue) * 100;
        const height = (containerHeight * heightPercentage) / 100;
        
        bar.style.height = `${height}px`;
        bar.className = "bar bar-default";
        
        // Set width based on array size
        const width = Math.max(2, Math.min(8, 100 / state.arraySize));
        bar.style.width = `${width}px`;
        
        if (move && move.indices && move.indices.includes(i)) {
            if (move.type === "swap") {
                bar.className = "bar bar-swap";
            } else if (move.type === "comp" || move.type === "compare") {
                bar.className = "bar bar-compare";
            } else if (move.type === "pivot") {
                bar.className = "bar bar-pivot";
            } else if (move.type === "sorted") {
                bar.className = "bar bar-sorted";
            }
        }
        
        container.appendChild(bar);
    }
}

// Display dots visualization
function showDots(move = null) {
    container.innerHTML = "";
    container.style.position = "relative";
    container.style.height = "300px";
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    for (let i = 0; i < state.array.length; i++) {
        const dot = document.createElement("div");
        dot.className = "dot";
        
        // Position dot based on index (x) and value (y)
        const x = (i / state.array.length) * width;
        const y = height - ((state.array[i] / 100) * height);
        
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        dot.style.width = "8px";
        dot.style.height = "8px";
        
        // Set color based on move type
        if (move && move.indices && move.indices.includes(i)) {
            if (move.type === "swap") {
                dot.style.backgroundColor = "#10b981";
                dot.style.width = "10px";
                dot.style.height = "10px";
            } else if (move.type === "comp" || move.type === "compare") {
                dot.style.backgroundColor = "#ef4444";
            } else if (move.type === "pivot") {
                dot.style.backgroundColor = "#8b5cf6";
                dot.style.width = "12px";
                dot.style.height = "12px";
            } else if (move.type === "sorted") {
                dot.style.backgroundColor = "#f59e0b";
            }
        } else {
            dot.style.backgroundColor = "#4f46e5";
        }
        
        container.appendChild(dot);
    }
}

// Display circle visualization
function showCircle(move = null) {
    container.innerHTML = "";
    
    const circleContainer = document.createElement("div");
    circleContainer.className = "circle-container";
    
    const center = { x: container.clientWidth / 2, y: container.clientHeight / 2 };
    const radius = Math.min(center.x, center.y) - 20;
    
    for (let i = 0; i < state.array.length; i++) {
        const element = document.createElement("div");
        element.className = "dot";
        
        // Position in a circle
        const angle = (i / state.array.length) * Math.PI * 2;
        const x = center.x + radius * Math.cos(angle);
        const y = center.y + radius * Math.sin(angle);
        
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        
        // Size based on array value
        const size = 4 + (state.array[i] / 100) * 8;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // Set color based on move type
        if (move && move.indices && move.indices.includes(i)) {
            if (move.type === "swap") {
                element.style.backgroundColor = "#10b981";
                element.style.boxShadow = "0 0 8px #10b981";
            } else if (move.type === "comp" || move.type === "compare") {
                element.style.backgroundColor = "#ef4444";
                element.style.boxShadow = "0 0 8px #ef4444";
            } else if (move.type === "pivot") {
                element.style.backgroundColor = "#8b5cf6";
                element.style.boxShadow = "0 0 8px #8b5cf6";
            } else if (move.type === "sorted") {
                element.style.backgroundColor = "#f59e0b";
                element.style.boxShadow = "0 0 8px #f59e0b";
            }
        } else {
            element.style.backgroundColor = "#4f46e5";
        }
        
        circleContainer.appendChild(element);
    }
    
    container.appendChild(circleContainer);
}

// Start sorting with the selected algorithm
function sortArray() {
    if (state.sorting && !state.paused) return;
    
    if (!state.sorting) {
        // Reset state for new sort
        state.sorting = true;
        state.paused = false;
        resetStats();
        
        // Generate moves based on selected algorithm
        const copy = [...state.array];
        state.currentMoves = [];
        state.moveIndex = 0;
        
        switch (state.selectedAlgorithm) {
            case 'bubble':
                state.currentMoves = bubbleSort(copy);
                break;
            case 'selection':
                state.currentMoves = selectionSort(copy);
                break;
            case 'insertion':
                state.currentMoves = insertionSort(copy);
                break;
            case 'merge':
                state.currentMoves = mergeSort(copy);
                break;
            case 'quick':
                state.currentMoves = quickSort(copy, 0, copy.length - 1);
                break;
            case 'heap':
                state.currentMoves = heapSort(copy);
                break;
        }
        
        // Update UI
        updateStatsDisplay();
        sortButton.innerHTML = '<i class="fas fa-play"></i> Continue';
        pauseButton.disabled = false;
    }
    
    // Resume animation if paused
    if (state.paused) {
        state.paused = false;
        sortButton.innerHTML = '<i class="fas fa-play"></i> Continue';
    }
    
    // Start animation
    if (state.stepMode) {
        animateStep();
    } else {
        animate();
    }
}

// Pause the sorting animation
function pause() {
    if (!state.sorting) return;
    state.paused = true;
    sortButton.innerHTML = '<i class="fas fa-play"></i> Continue';
}

// Perform a single step in the sorting animation
function animateStep() {
    if (!state.sorting || state.moveIndex >= state.currentMoves.length) {
        finishSorting();
        return;
    }
    
    const move = state.currentMoves[state.moveIndex];
    applyMove(move);
    state.moveIndex++;
    
    // Update step explanation
    updateStepExplanation(move);
}

// Continuously animate the sorting process
function animate() {
    if (state.paused || !state.sorting) return;
    
    if (state.moveIndex >= state.currentMoves.length) {
        finishSorting();
        return;
    }
    
    const move = state.currentMoves[state.moveIndex];
    applyMove(move);
    state.moveIndex++;
    
    // Update step explanation
    updateStepExplanation(move);
    
    // Calculate delay based on speed (invert so higher values = faster)
    const delay = 500 - (state.speed * 4.5);
    setTimeout(() => animate(), delay);
}

// Apply a move to the current array
function applyMove(move) {
    const [i, j] = move.indices || [];

    // Update statistics
    if (move.type === "comp" || move.type === "compare") {
        state.stats.comparisons++;
    } else if (move.type === "swap") {
        state.stats.swaps++;
        [state.array[i], state.array[j]] = [state.array[j], state.array[i]];
    } else if (move.type === "overwrite") {
        state.array[i] = move.value;
    }
    
    // Update statistics display
    updateStatsDisplay();
    
    // Play sounds for array elements
    if (i !== undefined) {
        playNote(state.array[i]);
    }
    if (j !== undefined && j !== i) {
        playNote(state.array[j]);
    }
    
    // Update visualization
    showVisualization(move);
}

// Update step explanation based on the current move
function updateStepExplanation(move) {
    if (!move) return;
    
    const [i, j] = move.indices || [];
    let explanation = "";
    
    switch (move.type) {
        case "comp":
        case "compare":
            explanation = `Comparing elements at positions ${i} (${state.array[i]}) and ${j} (${state.array[j]})`;
            break;
        case "swap":
            explanation = `Swapping elements at positions ${i} (${state.array[j]}) and ${j} (${state.array[i]})`;
            break;
        case "overwrite":
            explanation = `Setting position ${i} to value ${move.value}`;
            break;
        case "pivot":
            explanation = `Selected pivot at position ${i} with value ${state.array[i]}`;
            break;
        case "sorted":
            explanation = `Element at position ${i} (${state.array[i]}) is now in its correct position`;
            break;
    }
    
    // Show the step explanation
    currentStepDisplay.textContent = explanation;
    stepExplanation.classList.remove("hidden");
}

// Finish the sorting process
function finishSorting() {
    state.sorting = false;
    state.paused = false;
    sortButton.innerHTML = '<i class="fas fa-play"></i> Sort';
    
    // Show completion message
    currentStepDisplay.textContent = `Sorting complete! ${state.stats.comparisons} comparisons and ${state.stats.swaps} swaps performed.`;
    
    // Mark all elements as sorted
    const finalMove = { type: "sorted", indices: state.array.map((_, index) => index) };
    showVisualization(finalMove);
}

// Reset the sorting process
function resetSorting() {
    state.sorting = false;
    state.paused = false;
    sortButton.innerHTML = '<i class="fas fa-play"></i> Sort';
    stepExplanation.classList.add("hidden");
    resetStats();
    generateArray();
}

// Bubble Sort Algorithm
function bubbleSort(arr) {
    const moves = [];
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            // Add comparison move
            moves.push({ indices: [j, j + 1], type: "comp" });
            
            if (arr[j] > arr[j + 1]) {
                // Add swap move
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                moves.push({ indices: [j, j + 1], type: "swap" });
                swapped = true;
            }
        }
        
        // Mark the last element of this pass as sorted
        moves.push({ indices: [n - i - 1], type: "sorted" });
        
        // Early termination if no swaps occurred
        if (!swapped) break;
    }
    
    // Mark the first element as sorted
    if (moves.length > 0) {
        moves.push({ indices: [0], type: "sorted" });
    }
    
    return moves;
}

// Selection Sort Algorithm
function selectionSort(arr) {
    const moves = [];
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            // Add comparison move
            moves.push({ indices: [minIndex, j], type: "comp" });
            
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Add swap move if needed
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            moves.push({ indices: [i, minIndex], type: "swap" });
        }
        
        // Mark element as sorted
        moves.push({ indices: [i], type: "sorted" });
    }
    
    // Mark the last element as sorted
    moves.push({ indices: [n - 1], type: "sorted" });
    
    return moves;
}

// Insertion Sort Algorithm
function insertionSort(arr) {
    const moves = [];
    const n = arr.length;
    
    // Mark first element as sorted initially
    moves.push({ indices: [0], type: "sorted" });
    
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        
        while (j >= 0) {
            // Add comparison move
            moves.push({ indices: [j, j + 1], type: "comp" });
            
            if (arr[j] > key) {
                arr[j + 1] = arr[j];
                moves.push({ indices: [j, j + 1], type: "swap" });
                j--;
            } else {
                break;
            }
        }
        
        arr[j + 1] = key;
        if (j + 1 !== i) {
            moves.push({ indices: [j + 1], type: "overwrite", value: key });
        }
        
        // Mark element as sorted
        moves.push({ indices: [i], type: "sorted" });
    }
    
    return moves;
}

// Merge Sort Algorithm
function mergeSort(arr) {
    const moves = [];
    const tempArray = [...arr];
    
    function mergeSortHelper(start, end) {
        if (start >= end) return;
        
        const mid = Math.floor((start + end) / 2);
        
        // Recursively sort left and right halves
        mergeSortHelper(start, mid);
        mergeSortHelper(mid + 1, end);
        
        // Merge the sorted halves
        merge(start, mid, end);
    }
    
    function merge(start, mid, end) {
        // Copy elements to temp array
        for (let i = start; i <= end; i++) {
            tempArray[i] = arr[i];
        }
        
        let i = start;
        let j = mid + 1;
        let k = start;
        
        while (i <= mid && j <= end) {
            // Add comparison move
            moves.push({ indices: [i, j], type: "comp" });
            
            if (tempArray[i] <= tempArray[j]) {
                arr[k] = tempArray[i];
                moves.push({ indices: [k], type: "overwrite", value: tempArray[i] });
                i++;
            } else {
                arr[k] = tempArray[j];
                moves.push({ indices: [k], type: "overwrite", value: tempArray[j] });
                j++;
            }
            k++;
        }
        
        // Copy remaining elements
        while (i <= mid) {
            arr[k] = tempArray[i];
            moves.push({ indices: [k], type: "overwrite", value: tempArray[i] });
            i++;
            k++;
        }
        
        while (j <= end) {
            arr[k] = tempArray[j];
            moves.push({ indices: [k], type: "overwrite", value: tempArray[j] });
            j++;
            k++;
        }
        
        // Mark section as sorted
        for (let i = start; i <= end; i++) {
            moves.push({ indices: [i], type: "sorted" });
        }
    }
    
    mergeSortHelper(0, arr.length - 1);
    return moves;
}

// Quick Sort Algorithm
function quickSort(arr, low, high, moves = []) {
    if (low < high) {
        // Partition the array
        const pivotIndex = partition(arr, low, high, moves);
        
        // Mark pivot as in correct position
        moves.push({ indices: [pivotIndex], type: "sorted" });
        
        // Recursively sort elements before and after pivot
        quickSort(arr, low, pivotIndex - 1, moves);
        quickSort(arr, pivotIndex + 1, high, moves);
    } else if (low === high) {
        // Single element is always sorted
        moves.push({ indices: [low], type: "sorted" });
    }
    
    return moves;
}

function partition(arr, low, high, moves) {
    // Select the pivot (last element)
    const pivot = arr[high];
    moves.push({ indices: [high], type: "pivot" });
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        // Compare with pivot
        moves.push({ indices: [j, high], type: "comp" });
        
        if (arr[j] <= pivot) {
            i++;
            // Swap elements
            [arr[i], arr[j]] = [arr[j], arr[i]];
            if (i !== j) {
                moves.push({ indices: [i, j], type: "swap" });
            }
        }
    }
    
    // Place pivot in its correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    moves.push({ indices: [i + 1, high], type: "swap" });
    
    return i + 1;
}

// Heap Sort Algorithm
function heapSort(arr) {
    const moves = [];
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i, moves);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [arr[0], arr[i]] = [arr[i], arr[0]];
        moves.push({ indices: [0, i], type: "swap" });
        
        // Mark the last element as sorted
        moves.push({ indices: [i], type: "sorted" });
        
        // Call heapify on reduced heap
        heapify(arr, i, 0, moves);
    }
    
    // Mark the first element as sorted
    moves.push({ indices: [0], type: "sorted" });
    
    return moves;
}

function heapify(arr, n, i, moves) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    // Check if left child is larger than root
    if (left < n) {
        moves.push({ indices: [left, largest], type: "comp" });
        if (arr[left] > arr[largest]) {
            largest = left;
        }
    }
    
    // Check if right child is larger than largest so far
    if (right < n) {
        moves.push({ indices: [right, largest], type: "comp" });
        if (arr[right] > arr[largest]) {
            largest = right;
        }
    }
    
    // If largest is not root
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        moves.push({ indices: [i, largest], type: "swap" });
        
        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest, moves);
    }
}

// Event Listeners
window.addEventListener('DOMContentLoaded', () => {
    // Initialize
    init();
    
    // Algorithm selection
    algorithmSelect.addEventListener('change', () => {
        state.selectedAlgorithm = algorithmSelect.value;
        updateAlgorithmInfo();
    });
    
    // Array size control
    arraySizeInput.addEventListener('input', () => {
        state.arraySize = parseInt(arraySizeInput.value);
        updateSizeLabel();
        generateArray();
    });
    
    // Speed control
    speedInput.addEventListener('input', () => {
        state.speed = parseInt(speedInput.value);
        updateSpeedLabel();
    });
    
    // Theme toggle
    themeToggle.addEventListener('change', () => {
        const body = document.body;
        if (themeToggle.checked) {
            body.classList.add('light-theme');
            themeLabel.textContent = 'Light';
        } else {
            body.classList.remove('light-theme');
            themeLabel.textContent = 'Dark';
        }
    });
    
    // Sound toggle
    soundToggle.addEventListener('change', () => {
        state.soundEnabled = soundToggle.checked;
    });
    
    // Action buttons
    sortButton.addEventListener('click', sortArray);
    pauseButton.addEventListener('click', pause);
    generateButton.addEventListener('click', generateArray);
    resetButton.addEventListener('click', resetSorting);
    
    // Step button
    stepButton.addEventListener('click', () => {
        state.stepMode = true;
        if (!state.sorting) {
            sortArray();
        } else {
            animateStep();
        }
    });
    
    // Visualization modes
    barModeButton.addEventListener('click', () => {
        state.visualization = 'bar';
        setActiveVisualizationButton(barModeButton);
        showVisualization();
    });
    
    dotsModeButton.addEventListener('click', () => {
        state.visualization = 'dots';
        setActiveVisualizationButton(dotsModeButton);
        showVisualization();
    });
    
    circleModeButton.addEventListener('click', () => {
        state.visualization = 'circle';
        setActiveVisualizationButton(circleModeButton);
        showVisualization();
    });
});

// Helper to set active visualization button
function setActiveVisualizationButton(activeButton) {
    [barModeButton, dotsModeButton, circleModeButton].forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}

// Initialize application
init();