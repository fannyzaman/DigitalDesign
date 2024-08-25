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

// Function to check consensus
function checkConsensus() {
    let redCount = 0;
    let greenCount = 0;

    // Count the number of red and green nodes
    nodes.forEach(color => {
        if (color === 'red') {
            redCount++;
        } else if (color === 'green') {
            greenCount++;
        }
    });

    // Check for consensus
    if (redCount >= 4) {
        console.log('Consensus Attack');
        showMessage('Attack', 2000); // Display message for 2 seconds
        nodes = nodes.map(() => 'red'); // Set all nodes to red for the attack
    } else if (greenCount >= 4) {
        console.log('Consensus Retreat');
        showMessage('Retreat', 2000); // Display message for 2 seconds
        nodes = nodes.map(() => 'green'); // Set all nodes to green for the retreat
    } else {
        console.log('No consensus');
        showMessage('No Consensus', 2000); // Display message for 2 seconds
        nodes = nodes.map(() => 'black'); // Set all nodes to black when there's no consensus
    }

    // Update nodes visually
    createNodes();

    // Repeat the process after 2 seconds
    setTimeout(updateNodes, 2000);
}


// Function to display the consensus green or red
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
