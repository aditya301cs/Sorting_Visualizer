# Sorting_Visualizer

An interactive web application that visualizes various sorting algorithms in real-time with step-by-step animations. This tool helps users understand how different sorting algorithms work through vibrant visual representations.

![Sorting Visualizer Demo](https://user-images.githubusercontent.com/your-user-id/Sorting_Visualizer/assets/demo-image.png)

## 🌟 Features

- **Multiple Visualization Modes**: Bar, Scatter (Dots), and Circle visualizations
- **Real-time Algorithm Metrics**: Track comparisons and swaps as they happen
- **Step-by-Step Execution**: Follow each step with detailed explanations
- **Adjustable Parameters**: Customize array size and animation speed
- **Audio Feedback**: Optional sound effects corresponding to operations
- **Dark/Light Theme Toggle**: Choose your preferred visual theme
- **Algorithm Details**: Time and space complexity information for each algorithm
- **Responsive Design**: Works on devices of all sizes

## 🧮 Supported Algorithms

The visualizer includes implementations of these popular sorting algorithms:

| Algorithm | Time Complexity | Space Complexity | Description |
|-----------|----------------|------------------|-------------|
| Bubble Sort | O(n²) | O(1) | Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order |
| Selection Sort | O(n²) | O(1) | Divides the array into sorted and unsorted regions, selecting the smallest element from the unsorted region |
| Insertion Sort | O(n²) | O(1) | Builds the sorted array one item at a time by shifting elements greater than the key |
| Merge Sort | O(n log n) | O(n) | Divides the array into equal halves, sorts them recursively, and then merges the sorted halves |
| Quick Sort | O(n log n) avg, O(n²) worst | O(log n) | Selects a pivot element and partitions the array around it, then recursively sorts the sub-arrays |
| Heap Sort | O(n log n) | O(1) | Uses a binary heap data structure to sort elements, building a max-heap first |

## 🚀 Try It Out

You can try the live demo [here](https://aditya301cs.github.io/Sorting_Visualizer/) or clone the repository to run it locally.

## 🎮 Controls

- **Algorithm Select**: Choose which sorting algorithm to visualize
- **New Array**: Generate a new random array of the current size
- **Sort**: Start the sorting animation
- **Pause**: Temporarily stop the animation
- **Step**: Execute a single step of the algorithm
- **Reset**: Stop the current sort and reset to a new array
- **Array Size Slider**: Adjust the number of elements (10-150)
- **Animation Speed**: Control how quickly the visualization runs
- **Theme Toggle**: Switch between dark and light themes
- **Sound Toggle**: Enable/disable audio feedback
- **Visualization Modes**: Switch between Bar, Dots, and Circle views

## 🔄 Visualization Modes

### Bar View
The classic representation where each element's value is represented by the height of a vertical bar.

### Scatter View (Dots)
Elements are represented as dots positioned based on their index (x-axis) and value (y-axis).

### Circle View
Elements are arranged in a circle, with values represented by the size of each dot.

## 💻 Technology Stack

- **HTML5** for structure
- **CSS3** for styling with transitions and animations
- **JavaScript (ES6+)** for dynamic behavior and algorithm implementation
- **Tailwind CSS** for responsive design and styling
- **Web Audio API** for sound generation
- **Font Awesome** for UI icons

## 🛠️ Setup Instructions

### Method 1: Direct Download
1. Visit https://github.com/aditya301cs/Sorting_Visualizer
2. Click the green "Code" button and select "Download ZIP"
3. Extract the ZIP file to your desired location
4. Open `index.html` in your web browser

### Method 2: Using Git
1. Clone the repository:
   ```bash
   git clone https://github.com/aditya301cs/Sorting_Visualizer.git
