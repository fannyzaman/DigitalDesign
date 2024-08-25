// Array to store the colors of each node
let nodes = [];

// Initialize the colors of the nodes
for (let i = 0; i < 6; i++) {
    // Assign random colors to each node
    nodes.push(getRandomColor());
}

// Function to generate a random color
function getRandomColor() {
    let colors = ['red', 'green'];

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
        nodeElement.style.borderBottomColor = color || 'transparent'; // Set border color for the triangle
        nodeElement.style.left = `${Math.random() * (window.innerWidth - 300)}px`; // Set random X position
        nodeElement.style.top = `${Math.random() * (window.innerHeight - 300)}px`; // Set random Y position

        // Randomly rotate the triangle with intervals of 45 degrees
        let rotation = Math.floor(Math.random() * 8) * 45; // 0, 45, 90, 135, 180, 225, 270, 315 degrees
        nodeElement.style.transform = `rotate(${rotation}deg)`;

        nodesContainer.appendChild(nodeElement);
    });
}


// Function to update nodes colors every second
function updateNodes() {
    // Change colors of all nodes every second
    nodes = nodes.map(() => getRandomColor());
    createNodes();

    // Check for consensus or joker color after 2 second
    setTimeout(checkConsensus, 2000);
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

    // If the maximum count is at least 4, we have consensus
    if (maxCount >= 4) {
        console.log('Consensus reached. Color: ' + maxColor);
        showMessage('Consensus reached. Color: ' + maxColor, 2000); // Display message for 1 second
        nodes = nodes.map(() => maxColor); // Set all nodes to the consensus color
    } else {
        console.log('No consensus. Using joker color: black');
        showMessage('No consensus. Using joker color: black', 2000); // Display message for 1 second
        nodes = nodes.map(() => 'black'); // Set all nodes to joker color (black)
    }

    // Update nodes visually
    createNodes();

    // Repeat the process after 2 second
    setTimeout(updateNodes, 2000);
}

// Function to display the consensus or joker message
function showMessage(message, duration) {
    let messageContainer = document.getElementById('message');
    messageContainer.innerText = message;
    
    // Show the message
    messageContainer.style.display = 'block';

    // Hide the message after the specified duration
    setTimeout(function() {
        messageContainer.style.display = 'none';
    }, duration);
}

// Call updateNodes function to start the process
updateNodes();
