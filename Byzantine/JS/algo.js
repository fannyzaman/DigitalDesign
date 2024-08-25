// Array to store the colors of each node
let nodes = [];

// Initialize the colors of the nodes
for (let i = 0; i < 9; i++) {
    // Assign random colors to each node
    nodes.push(getRandomColor());
}

// Function to generate a random color
function getRandomColor() {
    let colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'magenta'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to create nodes visually
function createNodes() {
    let nodesContainer = document.getElementById('nodes');
    nodesContainer.innerHTML = ''; // Clear previous nodes

    // Create a node element for each color in the nodes array
    nodes.forEach(color => {
        let nodeElement = document.createElement('div');
        nodeElement.classList.add('node');
        nodeElement.style.backgroundColor = color; // Set background color
        nodesContainer.appendChild(nodeElement);
    });
}

// Function to update nodes colors every second
function updateNodes() {
    // Change colors of all nodes every second
    nodes = nodes.map(() => getRandomColor());
    createNodes();

    // Check for consensus or joker color after 1 second
    setTimeout(checkConsensus, 1000);
}

// Function to check consensus and joker color
function checkConsensus() {
    let colorCounts = {};
    nodes.forEach(color => {
        colorCounts[color] = (colorCounts[color] || 0) + 1;
    });

    // Find the color with the maximum count
    let maxCount = 0;
    let maxColor = '';
    for (let color in colorCounts) {
        if (colorCounts[color] > maxCount) {
            maxCount = colorCounts[color];
            maxColor = color;
        }
    }

    // If the maximum count is at least 3, we have consensus
    if (maxCount >= 3) {
        console.log('Consensus reached. Color: ' + maxColor);
        nodes = nodes.map(() => maxColor); // Set all nodes to the consensus color
    } else {
        console.log('No consensus. Using joker color: black');
        nodes = nodes.map(() => 'black'); // Set all nodes to joker color (black)
    }

    // Update nodes visually
    createNodes();

    // Repeat the process after 1 second
    setTimeout(updateNodes, 1000);
}

// Call updateNodes function to start the process
updateNodes();

