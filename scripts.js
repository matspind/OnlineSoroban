document.addEventListener("DOMContentLoaded", function() {
    // Select all rods
    const rods = document.querySelectorAll('.rod');

    // Loop over each rod to apply bead movement logic independently
    rods.forEach((rod, rodIndex) => {
        const upperBead = rod.querySelector('.upper-bead');
        const lowerBeads = rod.querySelectorAll('.lower-bead');
        const countBox = document.getElementById(`count${rodIndex + 1}`);

        // Function to update the count based on bead positions
        function updateCount() {
            let count = 0;

            // Add 5 if the upper bead is down (active)
            if (upperBead.classList.contains('active')) {
                count += 5;
            }

            // Add 1 for each lower bead that is up (active)
            lowerBeads.forEach(bead => {
                if (bead.classList.contains('active')) {
                    count += 1;
                }
            });

            // Update the count box with the current count
            countBox.textContent = count;
        }

        // Add click event to upper bead
        upperBead.addEventListener('click', function() {
            if (!upperBead.classList.contains('active')) {
                upperBead.classList.add('active');
            } else {
                upperBead.classList.remove('active');
            }
            updateCount(); // Update the count whenever the upper bead is clicked
        });

        // Add click event to lower beads
        lowerBeads.forEach((bead, index) => {
            bead.addEventListener('click', function() {
                if (!bead.classList.contains('active')) {
                    // Allow moving up multiple beads together
                    for (let i = 0; i <= index; i++) {
                        lowerBeads[i].classList.add('active');
                    }
                } else {
                    // Allow moving down multiple beads together
                    for (let i = index; i < lowerBeads.length; i++) {
                        if (lowerBeads[i].classList.contains('active')) {
                            lowerBeads[i].classList.remove('active');
                        } else {
                            break; // Stop when finding a bead that is not active
                        }
                    }
                }
                updateCount(); // Update the count whenever a lower bead is clicked
            });
        });
    });

    // ---- START BUTTON LOGIC ----
    
    // Function to generate a valid random number that keeps the sum between 0 and +4
    function generateRandomNumber(currentSum) {
        const possibleNumbers = [+1, -1, +2, -2, +3, -3, +4, -4];
        let randomNumber;

        // Keep generating random numbers until a valid one is found
        do {
            randomNumber = possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)];
        } while ((currentSum + randomNumber) < 0 || (currentSum + randomNumber) > 4);

        return randomNumber;
    }

    let calculationIndex = 0;
    let interval;
    let currentSum = 0;
    let calculations = [];
    let finalResult = 0; // To store the final result

    // Get the button and display elements
    const startButton = document.getElementById('startButton');
    const calculationDisplay = document.getElementById('calculation');
    const resultDisplay = document.getElementById('result'); // Result display element

    // Function to format and show the next calculation with "+" for positive numbers
    function showNextCalculation() {
        if (calculationIndex < calculations.length) {
            const number = calculations[calculationIndex];
            // Format the number with + sign for positive numbers
            calculationDisplay.textContent = (number > 0 ? `+${number}` : `${number}`);
            currentSum += number; // Update the sum
            calculationIndex++; // Move to the next number
        } else {
            clearInterval(interval); // Stop the regular interval once all numbers are shown
            setTimeout(() => {
                calculationDisplay.textContent = "Finished!"; // Show "Finished!" after a 3-second delay
                resultDisplay.textContent = `Result: ${currentSum}`; // Display the final result
            }, 3000); // Wait 3 seconds before showing "Finished!" and result
        }
    }

    // Add event listener for the Start button
    startButton.addEventListener('click', function() {
        calculationIndex = 0; // Reset index
        currentSum = 0; // Reset sum
        finalResult = 0; // Reset final result
        calculationDisplay.textContent = "Get Ready..."; // Initial message
        resultDisplay.textContent = "Result: "; // Clear previous result
        calculations = []; // Reset the calculations array

        // Generate 4 random numbers that keep the sum within 0 to +4
        for (let i = 0; i < 4; i++) {
            const randomNumber = generateRandomNumber(currentSum);
            calculations.push(randomNumber);
            currentSum += randomNumber; // Update the current sum with the random number
        }

        // Reset the sum for display calculations
        currentSum = 0;

        // If there's already an interval running, clear it before starting a new one
        if (interval) {
            clearInterval(interval);
        }

        // Show first calculation after 3 seconds, then every 3 seconds
        setTimeout(() => {
            interval = setInterval(showNextCalculation, 3000); // Show numbers every 3 seconds
            showNextCalculation(); // Show the first calculation immediately
        }, 3000); // Initial 3-second delay before starting
    });
});
