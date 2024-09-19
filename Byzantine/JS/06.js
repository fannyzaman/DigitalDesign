// Define constants
const numAmazons = 17;
const numPartners = 17;
const interval = 1000; // 1 second interval

// Function to generate a random position on the viewport
function generateRandomPosition() {
    const nodeWidth = 60; // Adjust this value based on the width of your nodes
    const nodeHeight = 60; // Adjust this value based on the height of your nodes
    const x = `${Math.random() * (window.innerWidth - nodeWidth)}px`;
    const y = `${Math.random() * (window.innerHeight - nodeHeight)}px`;
    return { x, y };
}

// Function to create and style Amazon nodes
function createAmazonNode() {
    const amazonNode = document.createElement('div');
    amazonNode.classList.add('amazon');
    amazonNode.style.borderBottomColor = 'green'; // Start with green color
    const { x, y } = generateRandomPosition(); // Generate random position
    amazonNode.style.left = x;
    amazonNode.style.top = y;
    return amazonNode;
}

// Function to create and style partner nodes
function createPartnerNode() {
    const partnerNode = document.createElement('div');
    partnerNode.classList.add('partner');
    // Add styling for partner nodes here
    const { x, y } = generateRandomPosition(); // Generate random position
    partnerNode.style.left = x;
    partnerNode.style.top = y;
    return partnerNode;
}

// Function to change Amazon color gradually from green to red
function changeAmazonColor(amazonNode, onColorChange) {
    let step = 0;
    const intervalId = setInterval(() => {
        const greenPercentage = (step + 1) * (100 / 17);
        const redPercentage = 100 - greenPercentage;
        const color = `rgb(${greenPercentage}%, ${redPercentage}%, 0%)`;
        
        amazonNode.style.borderBottomColor = color;
        step++; // Increment the step
        if (step >= 17) {
            clearInterval(intervalId); // Stop the interval after 17 steps
            onColorChange(); // Notify when the Amazon turns red
        }
    }, 1000); // Interval of 1 second for each step
}

// Function to initialize the simulation
function initializeSimulation() {
    const amazonContainer = document.getElementById('amazon-container');
    amazonContainer.innerHTML = ''; // Clear existing nodes before starting

    let redAmazonCount = 0;

    // Function to make grey partner nodes pop
    function makeGreyPartnersPop() {
        const greyPartnerNodes = document.querySelectorAll('.partner');
        greyPartnerNodes.forEach(partnerNode => {
            partnerNode.classList.add('pop');
        });
    }

    // Function to check if all Amazons are red
    function checkAllAmazonsRed() {
        redAmazonCount++;
        if (redAmazonCount === numAmazons) {
            makeGreyPartnersPop();

            // Restart the simulation after a delay (e.g., 3 seconds)
            setTimeout(() => {
                initializeSimulation();
            }, 3000);
        }
    }

    // Create and append Amazon nodes to the container
    for (let i = 0; i < numAmazons; i++) {
        const amazonNode = createAmazonNode();
        amazonContainer.appendChild(amazonNode);
        changeAmazonColor(amazonNode, checkAllAmazonsRed); // Apply gradual color change
    }

    // Create and append partner nodes to the container
    for (let i = 0; i < numPartners; i++) {
        const partnerNode = createPartnerNode();
        amazonContainer.appendChild(partnerNode);
    }
}

// Initialize the simulation when the page is loaded
document.addEventListener('DOMContentLoaded', initializeSimulation);
