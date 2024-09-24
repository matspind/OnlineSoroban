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
                    // Can move up
                    const allDown = Array.from(lowerBeads).every(b => !b.classList.contains('active'));
                    if (index === 0 || lowerBeads[index - 1].classList.contains('active') || allDown) {
                        bead.classList.add('active');
                    } else {
                        alert("Move the bead above first!");
                    }
                } else {
                    // Can move down
                    if (index === lowerBeads.length - 1 || !lowerBeads[index + 1].classList.contains('active')) {
                        bead.classList.remove('active');
                    } else {
                        alert("Move the bead below first!");
                    }
                }
                updateCount(); // Update the count whenever a lower bead is clicked
            });
        });
    });
});
