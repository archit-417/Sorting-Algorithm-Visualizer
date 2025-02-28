// visualizations.js - Updated version
// Global variables for the sorting algorithms
var array_size;
var div_sizes = [];
var divs = [];
var margin_size;
var cont = document.getElementById("array_container");
var array_speed;

// Color constants
const c1 = "#4cc9f0"; // Default color
const c2 = "#ff4d6d"; // Swap color
const c3 = "#ff9f1c"; // Compare color
const c4 = "#06d6a0"; // Sorted color

// Variables for controlling animation
var delay_time = 1;
var c_delay = 0;

// Speed control
function vis_speed() {
    var speed_value = document.getElementById("a_speed").value;
    switch(parseInt(speed_value)) {
        case 1: delay_time = 50;
                break;
        case 2: delay_time = 30;
                break;
        case 3: delay_time = 20;
                break;
        case 4: delay_time = 10;
                break;
        case 5: delay_time = 5;
                break;
    }
}


// Update the visual representation of the array
function div_update(container, height, color) {
    window.setTimeout(function() {
        // Remove all state classes first
        container.className = "bar";
        
        // Add appropriate class based on color
        if (color === c2) {
            container.classList.add("swapping");
        } else if (color === c3) {
            container.classList.add("comparing");
        } else if (color === c4) {
            container.classList.add("sorted");
        }
        
        // Update the height
        container.style.height = height * 3 + "px";
    }, c_delay += delay_time);
}

// Enable all controls after sorting is done
function enable_buttons() {
    window.setTimeout(function() {
        document.querySelectorAll(".algo-btn").forEach(btn => {
            btn.disabled = false;
        });
        document.getElementById("a_size").disabled = false;
        document.getElementById("a_generate").disabled = false;
        document.getElementById("a_speed").disabled = false;
    }, c_delay += delay_time);
}

// Initialize the array
function init_array() {
    array_size = document.getElementById("a_size").value;
    div_sizes = [];
    divs = [];
    cont.innerHTML = "";
    

    for(var i=0; i<array_size; i++) {
        div_sizes[i] = Math.floor(Math.random() * 100) + 1;
        divs[i] = document.createElement("div");
        divs[i].className = "bar";
        divs[i].style.height = div_sizes[i] * 3 + "px";
        divs[i].style.width = `${10}px`;
        cont.appendChild(divs[i]);
    }
}

// Initialize the visualization
function init() {
    // Set up array size slider
    document.getElementById("a_size").addEventListener("input", function() {
        document.getElementById("size-value").textContent = this.value;
        init_array();
    });

    // Set up speed slider
    document.getElementById("a_speed").addEventListener("input", function() {
        document.getElementById("speed-value").textContent = this.value;
        vis_speed();
    });

    // Set up new array button
    document.getElementById("a_generate").addEventListener("click", init_array);

    // Set up algorithm buttons
    document.querySelectorAll(".algo-btn").forEach(button => {
        button.addEventListener("click", function() {
            // Remove active class from all buttons
            document.querySelectorAll(".algo-btn").forEach(btn => {
                btn.classList.remove("active");
            });
            
            // Add active class to clicked button
            this.classList.add("active");
            
            // Disable buttons during sorting
            document.querySelectorAll(".algo-btn").forEach(btn => {
                btn.disabled = true;
            });
            document.getElementById("a_size").disabled = true;
            document.getElementById("a_generate").disabled = true;
            document.getElementById("a_speed").disabled = true;
            
            // Reset delay counter
            c_delay = 0;
            
            // Run the selected algorithm
            const algorithm = this.getAttribute("data-algorithm");
            switch(algorithm) {
                case "bubble":
                    Bubble();
                    break;
                case "selection":
                    Selection_sort();
                    break;
                case "insertion":
                    Insertion();
                    break;
                case "merge":
                    Merge();
                    break;
                case "quick":
                    Quick();
                    break;
                case "heap":
                    Heap();
                    break;
            }
        });
    });

    // Initialize array on page load
    init_array();
}

// Call init when the window loads
window.onload = init;