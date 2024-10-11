// Margin and dimensions
const margin = { top: 40, right: 10, bottom: 40, left: 60 };
const plotWidth = 280 - margin.left - margin.right;
const plotHeight = 300 - margin.top - margin.bottom;


// Data for Cost of Drug Discovery
const costData = [
    { year: 2000, cost: 1.6 },
    { year: 2005, cost: 1.8 },
    { year: 2010, cost: 2.0 },
    { year: 2015, cost: 2.2 },
    { year: 2020, cost: 2.41 },
    { year: 2025, cost: 2.62}
];

const cost2Data = [
    { year: 2015, cost: 0.9 },
    { year: 2020, cost: 1.0 },
    { year: 2025, cost: 1.2 },
    { year: 2030, cost: 1.4 },
    { year: 2035, cost: 1.6 },
    { year: 2040, cost: 1.8 },
    { year: 2050, cost: 2.1 }
];

const cost3Data = [
    { year: 2023, cost: 1.5 },
    { year: 2025, cost: 2.0 },
    { year: 2027, cost: 2.5 },
    { year: 2029, cost: 3.0 },
    { year: 2031, cost: 3.5 },
    { year: 2033, cost: 4.0 }
];

// Updated Data for Global Disorders YLDs (Parkinson's, Rheumatoid Arthritis, Multiple Sclerosis, Stroke, Osteo)
const globalData = [
    { year: 1990, 'Parkinson\'s': 8000000, 'Rheumatoid Arthiritis': 12000000, 'Multiple Sclerosis': 2300000, Stroke: 450000, Osteoarthiritis: 5000000 },
    { year: 1995, 'Parkinson\'s': 8500000, 'Rheumatoid Arthiritis': 12500000, 'Multiple Sclerosis': 2400000, Stroke: 500000, Osteoarthiritis: 5500000 },
    { year: 2000, 'Parkinson\'s': 9000000, 'Rheumatoid Arthiritis': 13000000, 'Multiple Sclerosis': 2500000, Stroke: 550000, Osteoarthiritis: 6000000 },
    { year: 2005, 'Parkinson\'s': 9500000, 'Rheumatoid Arthiritis': 13500000, 'Multiple Sclerosis': 2600000, Stroke: 600000, Osteoarthiritis: 6500000 },
    { year: 2010, 'Parkinson\'s': 10000000, 'Rheumatoid Arthiritis': 14000000, 'Multiple Sclerosis': 2700000, Stroke: 650000, Osteoarthiritis: 7000000 },
    { year: 2015, 'Parkinson\'s': 10500000, 'Rheumatoid Arthiritis': 14500000, 'Multiple Sclerosis': 2800000, Stroke: 700000, Osteoarthiritis: 7500000 },
    { year: 2020, 'Parkinson\'s': 11000000, 'Rheumatoid Arthiritis': 15000000, 'Multiple Sclerosis': 2900000, Stroke: 750000, Osteoarthiritis: 8000000 },
    { year: 2025, 'Parkinson\'s': 11500000, 'Rheumatoid Arthiritis': 15500000, 'Multiple Sclerosis': 3000000, Stroke: 800000, Osteoarthiritis: 8500000 }
];

// Updated Data for US Disorders YLDs (Parkinson's, 'Rheumatoid Arthiritis' Arthritis, Multiple Sclerosis, Stroke, Osteo)
const usData = [
    { year: 1990, 'Parkinson\'s': 700000, 'Rheumatoid Arthiritis': 900000, 'Multiple Sclerosis': 400000, Stroke: 250000, Osteoarthiritis: 300000 },
    { year: 1995, 'Parkinson\'s': 750000, 'Rheumatoid Arthiritis': 950000, 'Multiple Sclerosis': 420000, Stroke: 280000, Osteoarthiritis: 320000 },
    { year: 2000, 'Parkinson\'s': 800000, 'Rheumatoid Arthiritis': 1000000, 'Multiple Sclerosis': 440000, Stroke: 300000, Osteoarthiritis: 340000 },
    { year: 2005, 'Parkinson\'s': 850000, 'Rheumatoid Arthiritis': 1050000, 'Multiple Sclerosis': 460000, Stroke: 350000, Osteoarthiritis: 360000 },
    { year: 2010, 'Parkinson\'s': 900000, 'Rheumatoid Arthiritis': 1100000, 'Multiple Sclerosis': 480000, Stroke: 400000, Osteoarthiritis: 380000 },
    { year: 2015, 'Parkinson\'s': 950000, 'Rheumatoid Arthiritis': 1150000, 'Multiple Sclerosis': 500000, Stroke: 450000, Osteoarthiritis: 400000 },
    { year: 2020, 'Parkinson\'s': 1000000, 'Rheumatoid Arthiritis': 1200000, 'Multiple Sclerosis': 520000, Stroke: 479333, Osteoarthiritis: 420000 },
    { year: 2025, 'Parkinson\'s': 1050000, 'Rheumatoid Arthiritis': 1250000, 'Multiple Sclerosis': 540000, Stroke: 519619, Osteoarthiritis: 440000 }
];

// Function to create a bar chart (Cost of Drug Discovery) with gradient color
// Function to create a bar chart (Cost of Drug Discovery) with progressively darker bars
function createBarChart(svgId, data, xLabel, yLabel, title, annotation, labely) {
    const svg = d3.select(svgId)
        .append("svg")
        .attr("width", plotWidth + margin.left + margin.right)
        .attr("height", plotHeight + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Helper function to calculate shades of grey (progressively darker)
    function getColorShade(index, totalBars) {
        const shade = Math.floor(((totalBars - index - 1) / totalBars) * 255);  // Reverse the index for darker on right
        return `rgb(${shade}, ${shade}, ${shade})`;  // Create grey color with the calculated shade
    }

    // Add title
    svg.append("text")
        .attr("x", plotWidth / 2)
        .attr("y", -25)
        .attr("text-anchor", "middle")
        .style("font-size", "13px")
        .text(title);

    const x = d3.scaleBand().domain(data.map(d => d.year)).range([0, plotWidth]).padding(0.3);
    const y = d3.scaleLinear().domain([1.2, d3.max(data, d => d[yLabel]) + 0.5]).range([plotHeight, 0]);

    svg.append("g")
        .attr("transform", `translate(0,${plotHeight})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")))
        .selectAll("text")
        .style("font-size", "10px");

    svg.append("g").call(d3.axisLeft(y).tickFormat(d => `${d}B`))
        .append("text")
        .attr("fill", "black")
        .attr("x", -plotHeight/2)
        .attr("y", -40)
        .attr("text-anchor", "middle")
        .text(labely)
        .attr("transform", "rotate(-90)");

    const bars = svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.year))
        .attr("width", x.bandwidth())
        .attr("y", d => y(1.2))
        .attr("height", 0)
        .attr("fill", (d, i) => getColorShade(i, data.length));  // Set color progressively darker

    const labels = svg.selectAll(".label")
        .data(data)
        .enter().append("text")
        .attr("class", "label")
        .attr("x", d => x(d.year) + x.bandwidth() / 2)
        .attr("y", d => y(1.2))
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "black")
        .text(d => `${d[yLabel]}B`);

    svg.append("text")
        .attr("x", plotWidth - 10)
        .attr("y", plotHeight + 30)
        .attr("text-anchor", "end")
        .style("font-size", "10px")
        .style("fill", "gray")
        .text(annotation)
        .raise();


    bars.transition()
        .duration(1500)
        .delay((d, i) => i * 300)
        .attr("y", d => y(d[yLabel]))
        .attr("height", d => plotHeight - y(d[yLabel]));

    labels.transition()
        .duration(1500)
        .delay((d, i) => i * 300)
        .attr("y", d => y(d[yLabel]) - 5);
}


const plotWidth2 = 500 - margin.left - margin.right;
const plotHeight2 = 350 - margin.top - margin.bottom;

// Function to create a bar chart (Cost of Drug Discovery) with progressively darker bars
function createBarChart2(svgId, data, xLabel, yLabel, title, annotation, labely) {
    const svg = d3.select(svgId)
        .append("svg")
        .attr("width", plotWidth2 + margin.left + margin.right)
        .attr("height", plotHeight2 + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Helper function to calculate shades of grey (progressively darker)
    function getColorShade(index, totalBars) {
        const shade = Math.floor(((totalBars - index - 1) / totalBars) * 255);  // Reverse the index for darker on right
        return `rgb(${shade}, ${shade}, ${shade})`;  // Create grey color with the calculated shade
    }

    // Add title
    svg.append("text")
        .attr("x", plotWidth2 / 2)
        .attr("y", -25)
        .attr("text-anchor", "middle")
        .style("font-size", "13px")
        .text(title);

    const x = d3.scaleBand().domain(data.map(d => d.year)).range([0, plotWidth2]).padding(0.3);
    const y = d3.scaleLinear().domain([0.4, d3.max(data, d => d[yLabel]) + 0.5]).range([plotHeight2, 0]);

    svg.append("g")
        .attr("transform", `translate(0,${plotHeight2})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")))
        .selectAll("text")
        .style("font-size", "10px");

    svg.append("g").call(d3.axisLeft(y).tickFormat(d => `${d}B`))
        .append("text")
        .attr("fill", "black")
        .attr("x", -plotHeight/2)
        .attr("y", -40)
        .attr("text-anchor", "middle")
        .text(labely)
        .attr("transform", "rotate(-90)");

    const bars = svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.year))
        .attr("width", x.bandwidth())
        .attr("y", d => y(0.4))
        .attr("height", 0)
        .attr("fill", (d, i) => getColorShade(i, data.length));  // Set color progressively darker

    const labels = svg.selectAll(".label")
        .data(data)
        .enter().append("text")
        .attr("class", "label")
        .attr("x", d => x(d.year) + x.bandwidth() / 2)
        .attr("y", d => y(0.4))
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "black")
        .text(d => `${d[yLabel]}B`);

    svg.append("text")
        .attr("x", plotWidth2 - 10)
        .attr("y", plotHeight2 + 30)
        .attr("text-anchor", "end")
        .style("font-size", "10px")
        .style("fill", "gray")
        .text(annotation)
        .raise();

    bars.transition()
        .duration(1500)
        .delay((d, i) => i * 300)
        .attr("y", d => y(d[yLabel]))
        .attr("height", d => plotHeight2 - y(d[yLabel]));

    labels.transition()
        .duration(1500)
        .delay((d, i) => i * 300)
        .attr("y", d => y(d[yLabel]) - 5);
}



// Function to create animated multi-line chart (Parkinson's, 'Rheumatoid Arthiritis' Arthritis, Multiple Sclerosis, Stroke, Osteo)
function createAnimatedLineChart(svgId, data, title, colorMap, annotation, yMax, yLabel) {
    const svg = d3.select(svgId)
        .append("svg")
        .attr("width", plotWidth + margin.left + margin.right)
        .attr("height", plotHeight + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add title
    svg.append("text")
        .attr("x", plotWidth / 2)
        .attr("y", -25)
        .attr("text-anchor", "middle")
        .style("font-size", "13px")
        .text(title);

    const x = d3.scaleLinear().domain(d3.extent(data, d => d.year)).range([0, plotWidth]);
    const y = d3.scaleLinear().domain([0.1, yMax + 1000000]).range([plotHeight, 0]);

    svg.append("g")
        .attr("transform", `translate(0,${plotHeight})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")))
        .selectAll("text")
        .style("font-size", "10px");

    svg.append("g").call(d3.axisLeft(y).tickFormat(d => `${d / 1000000}M`))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("fill", "black")
        .attr("x", -plotHeight/2)
        .attr("y", -40)
        .attr("text-anchor", "middle")
        .text(yLabel);
        

    const lineGen = (disease) => d3.line().x(d => x(d.year)).y(d => y(d[disease]));

    const diseases = Object.keys(colorMap);

    diseases.forEach(disease => {
        const path = svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", colorMap[disease])
            .attr("stroke-width", 2)
            .attr("d", lineGen(disease))
            .attr("stroke-dasharray", function() {
                return this.getTotalLength();
            })
            .attr("stroke-dashoffset", function() {
                return this.getTotalLength();
            });

        // Animate the line drawing
        path.transition()
            .duration(4000)
            .attr("stroke-dashoffset", 0);
    });

    // Add legend
    const legend = svg.selectAll(".legend")
        .data(diseases)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(0,${i * 12})`);

    legend.append("rect")
        .attr("x", plotWidth - 110)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", d => colorMap[d]);

    legend.append("text")
        .attr("x", plotWidth - 115)
        .attr("y", 5)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .style("font-size", "10px")
        .text(d => d);

    // Add annotation
    svg.append("text")
        .attr("x", plotWidth - 10)
        .attr("y", plotHeight + 30)
        .attr("text-anchor", "end")
        .style("font-size", "10px")
        .style("fill", "gray")
        .text(annotation);
}

const plotWidth3 = 500 - margin.left - margin.right;
const plotHeight3 = 350 - margin.top - margin.bottom;

function createAnimatedLineChart2(svgId, data, title, colorMap, annotation, yMax, yLabel) {
    const svg = d3.select(svgId)
        .append("svg")
        .attr("width", plotWidth3 + margin.left + margin.right)
        .attr("height", plotHeight3 + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add title
    svg.append("text")
        .attr("x", plotWidth3 / 2)
        .attr("y", -25)
        .attr("text-anchor", "middle")
        .style("font-size", "13px")
        .text(title);

    const x = d3.scaleLinear().domain(d3.extent(data, d => d.year)).range([0, plotWidth3]);
    const y = d3.scaleLinear().domain([0.1, yMax + 1000000]).range([plotHeight3, 0]);

    svg.append("g")
        .attr("transform", `translate(0,${plotHeight3})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")))
        .selectAll("text")
        .style("font-size", "10px");

    svg.append("g").call(d3.axisLeft(y).tickFormat(d => `${d / 1000000}M`))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("fill", "black")
        .attr("x", -plotHeight3/2)
        .attr("y", -40)
        .attr("text-anchor", "middle")
        .text(yLabel);

    const lineGen = (disease) => d3.line().x(d => x(d.year)).y(d => y(d[disease]));

    const diseases = Object.keys(colorMap);

    diseases.forEach(disease => {
        const path = svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", colorMap[disease])
            .attr("stroke-width", 2)
            .attr("d", lineGen(disease))
            .attr("stroke-dasharray", function() {
                return this.getTotalLength();
            })
            .attr("stroke-dashoffset", function() {
                return this.getTotalLength();
            });

        // Animate the line drawing
        path.transition()
            .duration(4000)
            .attr("stroke-dashoffset", 0);
    });

    // Add legend
    const legend = svg.selectAll(".legend")
        .data(diseases)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(0,${i * 12})`);

    legend.append("rect")
        .attr("x", plotWidth3 - 325)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", d => colorMap[d]);

    legend.append("text")
        .attr("x", plotWidth3 - 330)
        .attr("y", 5)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .style("font-size", "10px")
        .text(d => d);

    // Add annotation
    svg.append("text")
        .attr("x", plotWidth3 - 10)
        .attr("y", plotHeight3 + 30)
        .attr("text-anchor", "end")
        .style("font-size", "10px")
        .style("fill", "gray")
        .text(annotation);
}


const globalColorMap = { 'Parkinson\'s': "black", 'Rheumatoid Arthiritis': "grey", 'Multiple Sclerosis': "purple", Stroke: "brown", Osteoarthiritis: "#d3d3d3" };
const usColorMap = { 'Parkinson\'s': "black", 'Rheumatoid Arthiritis': "grey", 'Multiple Sclerosis': "purple", Stroke: "brown", Osteoarthiritis: "#d3d3d3" };

// Create the bar charts and animated line charts
d3.select("#chartsContainer")
    .style("display", "flex")
    .style("justify-content", "center");

d3.select("#chartsContainer")
    .append("div")
    .attr("id", "globalDisordersPlot")
    .attr("class", "chart");

d3.select("#chartsContainer")
    .append("div")
    .attr("id", "sportsPlot")
    .attr("class", "chart");

d3.select("#chartsContainer")
    .append("div")
    .attr("id", "costPlot")
    .attr("class", "chart");


// Create the bar charts and animated line charts when they are in view
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'globalDisordersPlot') {
                createAnimatedLineChart("#globalDisordersPlot", globalData, "global disease YLDs", globalColorMap, "12M+ Years Lived with Disability (YLDs)", 18500000, "Years Lived with Disability (YLDs)");
            } else if (entry.target.id === 'costPlot') {
                createBarChart("#costPlot", costData, 'year', 'cost', "global physical rehabilitation needs", "Projected to increase to 2.6B people by 2025", "Number of people");
            } else if (entry.target.id === 'usDisordersPlot') {
                createAnimatedLineChart2("#usDisordersPlot", usData, "USA disease YLDs", usColorMap, "1M+ Years Lived with Disability (YLDs)", 550000, "Years Lived with Disability (YLDs)");
            }
            else if (entry.target.id === 'sportsPlot') {
                createBarChart("#sportsPlot", cost3Data, 'year', 'cost', "global market size of sports rehabilitation", "Projected to increase to $4B by 2033", "Cost of treatment");
            }
            else if (entry.target.id === 'oldagePlot') {
                createBarChart2("#oldagePlot", cost2Data, 'year', 'cost', "Global Growth in Old Age Rehabilitation Needs", "Projected to increase to 2.1B by 2050", "Number of people");
            }
            // Unobserve after triggering the animation once
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Add observer to the plots
document.addEventListener('DOMContentLoaded', function() {
    const plots = ['#globalDisordersPlot', '#costPlot', '#oldagePlot', '#usDisordersPlot', '#sportsPlot'];
    plots.forEach(plot => {
        const element = document.querySelector(plot);
        if (element) observer.observe(element);
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Hide the navbar initially and show when user scrolls
window.onscroll = function() { toggleNavbar() };

function toggleNavbar() {
    const navbar = document.getElementById("navbar");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navbar.style.top = "0";  // Show the navbar
    } else {
        navbar.style.top = "-100px";  // Hide the navbar
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to reset the elements to their original position (no animation)
function resetPosition(className) {
    const element = document.querySelector(className);
    element.style.animation = 'none'; // Remove any running animation
    element.style.transform = 'translateY(0)'; // Reset to original position
    element.style.color = 'white'; // Reset the color
    element.style.removeProperty('--move-distance'); // Remove the custom property
    element.style.removeProperty('animation'); // Make sure we reset the inline animation
}

// Function to restart the animations (re-apply classes)
function restartAnimations() {
    const heroContent = document.querySelector(".hero-content");
    heroContent.classList.remove("down-animation-triggered");

    // Wait for a short delay to let the browser apply the removal
    setTimeout(function() {
        heroContent.classList.add("down-animation-triggered");
    }, 100); // Short delay to re-apply the class and restart animations
}

// Function to move element down with dynamic ratio based on screen size
function moveDown(className, baseDistanceRatio, duration) {
    const element = document.querySelector(className);
    const screenHeight = window.innerHeight; // Get the viewport height
    const moveDistance = baseDistanceRatio * screenHeight; // Calculate move distance based on ratio and screen height

    element.style.animation = `move-down ${duration}s ease-in-out forwards`;
    element.style.setProperty('--move-distance', `${moveDistance}px`); // Apply dynamic distance in pixels
}

// Function to move element back to the original position (move up)
function moveUpToOriginalPosition(className, duration) {
    const element = document.querySelector(className);
    element.style.animation = `move-up ${duration}s ease-in-out forwards`;
    element.style.setProperty('--move-new-distance', `0px`); // Move back to original position
}

// Get the video element
const video = document.getElementById("DD_video");

// Add an event listener for time updates to trigger the animation
video.addEventListener('timeupdate', function() {
    // Trigger the downward animation at 22 seconds
    if (video.currentTime >= 22 && !document.querySelector(".hero-content").classList.contains("down-animation-triggered")) {
        document.querySelector(".hero-content").classList.add("down-animation-triggered");

        // Dynamically calculate distances based on screen size and move elements
        moveDown(".animate-title", -0.075, 2); // Move title down 7.5% of screen height
        moveDown(".animate-subtitle", 0.53, 2); // Move subtitle down 55% of screen height

        // Set timeout for moving them back up after 7 seconds
        setTimeout(function() {
            moveUpToOriginalPosition(".animate-title", 2); // Move title back to original position
            moveUpToOriginalPosition(".animate-subtitle", 2); // Move subtitle back to original position
        }, 7000); // 7 second delay before moving back to original position
    }
});

// Add an event listener for when the video ends
video.addEventListener('timeupdate', function() {
    if (video.currentTime < 22 && document.querySelector(".hero-content").classList.contains("down-animation-triggered")) {
        document.querySelector(".hero-content").classList.remove("down-animation-triggered");
}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


document.addEventListener("DOMContentLoaded", () => {
    let lastScrollTop = 0;
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar.offsetHeight;
    const offsetThreshold = 700; // The y offset threshold for triggering the background change

    window.addEventListener("scroll", function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Handle navbar transparency and shadow at the top of the page
        if (scrollTop <= offsetThreshold) {
            navbar.style.backgroundColor = "rgba(255, 255, 255, 0)";
            navbar.style.boxShadow = "none"; // Remove shadow when transparent
            navbar.style.top = "0";  // Make sure navbar is visible at the top
        } else {
            navbar.style.backgroundColor = "rgba(255, 255, 255, 1)"; // Add background color when scrolled
            navbar.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // Add subtle shadow when background is white
        }

        // Handle navbar hide/show on scroll
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            if (scrollTop > offsetThreshold) {
                navbar.style.top = `-${navbarHeight}px`; // Hide navbar
            }
        } else {
            // Scrolling up
            navbar.style.top = "0"; // Show navbar
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Update lastScrollTop to current position
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Get the video element and button
const videoBase = document.getElementById("videoBase-tracking");
const analyzeJointsBtn = document.getElementById("toggleButton-tracking");

// Event listener to stop the video at 1.5 seconds and reset button
videoBase.addEventListener('timeupdate', function () {
    if (videoBase.currentTime >= 1.4 && !analyzeJointsBtn.classList.contains('pressed')) {
        videoBase.pause(); // Pause the video at 1.5 seconds
    }
    
    // Ensure the button is reset if the video starts from the beginning
    if (videoBase.currentTime < 1.5 && analyzeJointsBtn.classList.contains('pressed')) {
        analyzeJointsBtn.classList.remove('pressed');
        analyzeJointsBtn.style.backgroundColor = 'grey'; // Reset button to grey
    }
});

// Event listener for button to play the video till the end
analyzeJointsBtn.addEventListener('click', function () {
    if (!analyzeJointsBtn.classList.contains('pressed')) {
        // If button is not pressed, resume the video and play till the end
        analyzeJointsBtn.classList.add('pressed'); // Set button to pressed state
        analyzeJointsBtn.style.backgroundColor = 'black'; // Change button color to black
        videoBase.play();

        // Ensure video pauses at the last frame (just before the end)
        const pauseAtLastFrame = function () {
            if (videoBase.currentTime >= videoBase.duration - 1) {
                videoBase.pause(); // Pause at the last frame
                videoBase.removeEventListener('timeupdate', pauseAtLastFrame); // Remove listener once video is paused
            }
        };

        videoBase.addEventListener('timeupdate', pauseAtLastFrame);
    } else {
        // If the button is pressed (black), reset the video to the beginning and pause at 1.5 again
        analyzeJointsBtn.classList.remove('pressed');
        analyzeJointsBtn.style.backgroundColor = 'grey'; // Reset button to grey
        videoBase.currentTime = 0; // Reset video to the beginning
        videoBase.play(); // Start video again
    }
});
videoBase.play();
// Create an IntersectionObserver to detect when the video enters or leaves the viewport
const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // When the video enters the viewport, resume playback if not at stop point
            if (videoBase.currentTime < 1.4 && !analyzeJointsBtn.classList.contains('pressed')) {
                videoBase.play();
            }
        } else {
            // When the video leaves the viewport, pause it
            videoBase.pause();
        }
    });
}, { threshold: 0.5 }); // Trigger the callback when 50% of the video is visible

// Observe the video element
observer2.observe(videoBase);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createArrowAnimation(svgId, inputImagePath, outputImagePath) {
    const svg = d3.select(`#${svgId}`);
    const width = Math.min(window.screen.width, 800);
    const height = 400;

    // Define the start and end points for the line
    const startPoint = { x: 50, y: 200 }; // Single start point
    const endPoint = { x: width - width * 0.18, y: 200 }; // Single end point

    const startPoints = [
        {x: 50, y: 100},
        {x: 50, y: 200},
        {x: 50, y: 300}
    ];
    
    const endPoints = [
        {x: width-(width*0.18), y: 100},
        {x: width-(width*0.18), y: 200},
        {x: width-(width*0.18), y: 300}
    ];

    const midX = width / 2;
    const midY = height / 2;

    // Define colors representing the before and after
    const initialLineColor = "#D3D3D3"; // Light grey for before passing
    const finalLineColor = "#000000"; // Black for after passing

    // Define arrowhead markers (light initially, black later)
    svg.append("defs").append("marker")
        .attr("id", `${svgId}-arrowStart`)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 5) // Adjusted to position the arrowhead properly
        .attr("refY", 5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("fill", initialLineColor); // Light color initially

    svg.append("defs").append("marker")
        .attr("id", `${svgId}-arrowEnd`)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 5) // Adjusted to position the arrowhead properly
        .attr("refY", 5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("fill", initialLineColor); // Light color initially

    // Draw the first arrow (before the logo)
    const pathBefore = svg.append("path")
        .attr("d", `M${startPoint.x+165},${startPoint.y} 
                    Q${midX-100},${midY} 
                    ${midX-40},${midY}`)
        .attr("stroke", initialLineColor)
        .attr("stroke-width", 3)
        .attr("fill", "none"); // No arrowhead initially

    const totalLengthBefore = pathBefore.node().getTotalLength();
    pathBefore
        .attr("stroke-dasharray", totalLengthBefore + " " + totalLengthBefore)
        .attr("stroke-dashoffset", totalLengthBefore); // Hide the path initially

    // Draw the second arrow (after the logo)
    const pathAfter = svg.append("path")
        .attr("d", `M${midX+50},${midY} 
                    T${endPoint.x - 70},${endPoint.y}`)
        .attr("stroke", initialLineColor)
        .attr("stroke-width", 3)
        .attr("fill", "none"); // No arrowhead initially

    const totalLengthAfter = pathAfter.node().getTotalLength();
    pathAfter
        .attr("stroke-dasharray", totalLengthAfter + " " + totalLengthAfter)
        .attr("stroke-dashoffset", totalLengthAfter); // Hide the path initially

    // Function to trigger the animation
    function animateArrows() {
        // Animate the first arrow (before the logo)
        pathBefore.transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0) // Animate to mid-point (first arrow)
            .on("end", () => {
                // Change the first arrow and line color to dark
                pathBefore.attr("stroke", finalLineColor)
                          .attr("marker-end", `url(#${svgId}-arrowStart)`); // Add the arrowhead at the end

                d3.select(`#${svgId}-arrowStart path`).attr("fill", finalLineColor); // Change arrow color

                // Pop effect on the logo
                d3.select(`#${svgId}-logo`)
                    .transition()
                    .duration(300)
                    .attr("width", 250) // Increase size
                    .attr("height", 250)
                    .attr("x", midX - 90) // Adjust position to keep centered
                    .attr("y", midY - 90)
                    .transition()
                    .duration(300)
                    .attr("width", 200) // Return to original size
                    .attr("height", 200)
                    .attr("x", midX - 75) // Reset position
                    .attr("y", midY - 75)
                    .on("end", () => {
                        // Animate the second arrow (after the logo) after the logo effect
                        pathAfter.transition()
                            .duration(1000)
                            .ease(d3.easeLinear)
                            .attr("stroke-dashoffset", 0)
                            .on("end", () => {
                                // Change the second arrow and line color to dark
                                pathAfter.attr("stroke", finalLineColor)
                                         .attr("marker-end", `url(#${svgId}-arrowEnd)`); // Add the arrowhead at the end
                                
                                d3.select(`#${svgId}-arrowEnd path`).attr("fill", finalLineColor); // Change arrow color

                                // Show and fade-in the output image after line reaches the end
                                d3.select(`#${svgId}-outputGif`)
                                    .attr("xlink:href", outputImagePath) // Set the GIF source
                                    .transition() // Fade-in effect
                                    .duration(500) // Duration of fade-in
                                    .style("opacity", 1); // Make GIF visible gradually
                            });
                    });
            });
    }

    // Function to check if the section is in the viewport
    function isInViewport() {
        const rect = svg.node().getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    }

    // Event listener to trigger animation on scroll
    window.addEventListener('scroll', function() {
        if (isInViewport()) {
            animateArrows();
            // Remove event listener after animation is triggered
            window.removeEventListener('scroll', arguments.callee);
        }
    });

    // Add images and small text labels
    // Input image and text
    svg.append("image")
        .attr("xlink:href", inputImagePath)
        .attr("x", startPoint.x - 40)
        .attr("y", startPoint.y - 80)
        .attr("width", 200) // Increased size
        .attr("height", 200); // Increased size

    // Output GIF placeholder and text
    svg.append("image")
        .attr("id", `${svgId}-outputGif`)
        .attr("xlink:href", "") // Initially no source to keep it hidden
        .attr("x", endPoint.x - 60)
        .attr("y", endPoint.y - 80)
        .attr("width", 200) // Increased size
        .attr("height", 200) // Increased size
        .style("opacity", 0); // Hide the GIF initially

    // Add the image in the middle with pop effect on intersection
    svg.append("image")
        .attr("id", `${svgId}-logo`)
        .attr("xlink:href", "exeraide diagram.svg")
        .attr("x", midX - 75)  // Adjusted for new size
        .attr("y", midY - 75)  // Adjusted for new size
        .attr("width", 200)    // Original width
        .attr("height", 200)   // Original height
        .raise(); // Ensure the image is on top
}

// Example usage
// createArrowAnimation("customPlot", "sports_injury.svg", "sports_fixed.svg");
// createArrowAnimation("customPlot2", "oldage_injury.svg", "oldage_fixed.svg");
// createArrowAnimation("customPlot3", "bb_injury.svg", "bb_fixed.svg");


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function navigateTopaper() {
    window.open('https://tibbtech.com/research/exeraide/',  '_blank'); // Replace with your desired URL
}

function navigateToCVPRpaper() {
    window.open('https://openaccess.thecvf.com/content/CVPR2024W/CVsports/papers/Qazi_ExerAIde_AI-assisted_Multimodal_Diagnosis_for_Enhanced_Sports_Performance_and_Personalised_CVPRW_2024_paper.pdf',  '_blank'); // Replace with your desired URL
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createArrowAnimation(svgId, inputImagePath, outputImagePath) {
    const scaleFactor = window.innerWidth < 800 ? 0.6 : 1;
    const svg = d3.select(`#${svgId}`);
    const width = Math.min(window.screen.width, 800);
    const height = 400;

    const startPoint = { x: 40, y: 200 };
    const endPoint = { x: width - width * 0.18, y: 200 };
    const midX = width / 2.1;
    const midY = height / 2;

    const initialLineColor = "#D3D3D3";
    const finalLineColor = "#000000";

    // Define arrowhead markers (light initially, black later)
    svg.append("defs").append("marker")
        .attr("id", `${svgId}-arrowStart`)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 5)
        .attr("refY", 5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("fill", initialLineColor);

    svg.append("defs").append("marker")
        .attr("id", `${svgId}-arrowEnd`)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 5)
        .attr("refY", 5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("fill", initialLineColor);

    // Draw the first arrow (before the logo)
    const pathBefore = svg.append("path")
        .attr("d", `M${startPoint.x+165*scaleFactor},${startPoint.y*0.9} 
                    Q${midX - 100*scaleFactor},${midY*0.9} 
                    ${midX - 40*scaleFactor},${midY*0.9}`)
        .attr("stroke", initialLineColor)
        .attr("stroke-width", 3)
        .attr("fill", "none");

    const totalLengthBefore = pathBefore.node().getTotalLength();
    pathBefore
        .attr("stroke-dasharray", totalLengthBefore + " " + totalLengthBefore)
        .attr("stroke-dashoffset", totalLengthBefore);

    // Draw the second arrow (after the logo)
    const pathAfter = svg.append("path")
        .attr("d", `M${midX + 80 *scaleFactor},${midY*0.9} 
                    T${endPoint.x - 70*scaleFactor},${endPoint.y*0.9}`)
        .attr("stroke", initialLineColor)
        .attr("stroke-width", 3)
        .attr("fill", "none");

    const totalLengthAfter = pathAfter.node().getTotalLength();
    pathAfter
        .attr("stroke-dasharray", totalLengthAfter + " " + totalLengthAfter)
        .attr("stroke-dashoffset", totalLengthAfter);

    // Function to trigger the animation
    function animateArrows() {
        pathBefore.transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0)
            .on("end", () => {
                pathBefore.attr("stroke", finalLineColor)
                    .attr("marker-end", `url(#${svgId}-arrowStart)`);
                d3.select(`#${svgId}-arrowStart path`)
                        .transition()
                        .attr("fill", finalLineColor); 

                // Pop effect on the logo
                d3.select(`#${svgId}-logo`)
                    .transition()
                    .duration(300)
                    .attr("width", 250 * scaleFactor)
                    .attr("height", 250 * scaleFactor)
                    .attr("x", midX - 90 * scaleFactor)
                    .attr("y", midY - 110)
                    .transition()
                    .duration(300)
                    .attr("width", 200 * scaleFactor)
                    .attr("height", 200 * scaleFactor)
                    .attr("x", midX - 75 * scaleFactor)
                    .attr("y", midY - 100);

                pathAfter.transition()
                    .duration(1000)
                    .ease(d3.easeLinear)
                    .attr("stroke-dashoffset", 0)
                    .on("end", () => {
                        // Change the second arrow and line color to dark
                        pathAfter.attr("stroke", finalLineColor)
                                 .attr("marker-end", `url(#${svgId}-arrowEnd)`); // Add the arrowhead at the end
                        
                        d3.select(`#${svgId}-arrowEnd path`)
                        .transition()
                        .duration(100)
                        .attr("fill", finalLineColor); // Change arrow color

                        // Show and fade-in the output image after line reaches the end
                        d3.select(`#${svgId}-outputGif`)
                            .attr("xlink:href", outputImagePath) // Set the GIF source
                            .transition() // Fade-in effect
                            .style("opacity", 1); // Make GIF visible gradually
                    });
            });
    }

    // Function to check if the section is in the viewport
    function isInViewport() {
        const rect = svg.node().getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    }

    // Event listener to trigger animation on scroll
    window.addEventListener('scroll', function () {
        if (isInViewport()) {
            animateArrows();
            window.removeEventListener('scroll', arguments.callee);
        }
    });

    // Add images and small text labels
    svg.append("image")
        .attr("xlink:href", inputImagePath)
        .attr("x", startPoint.x - 40)
        .attr("y", startPoint.y - 80)
        .attr("width", 200 * scaleFactor)
        .attr("height", 200 * scaleFactor);

    svg.append("image")
        .attr("id", `${svgId}-outputGif`)
        .attr("xlink:href", "")
        .attr("x", endPoint.x - 60)
        .attr("y", endPoint.y - 80)
        .attr("width", 200 * scaleFactor)
        .attr("height", 200 * scaleFactor)
        .attr("opacity", 0);

    // Add the image in the middle with a pop effect on intersection
    svg.append("image")
        .attr("id", `${svgId}-logo`)
        .attr("xlink:href", "exeraide diagram.svg")
        .attr("x", midX - 75 * scaleFactor)
        .attr("y", midY - 100)
        .attr("width", 200 * scaleFactor)
        .attr("height", 200 * scaleFactor)
        .raise();
}

// Example usage:
createArrowAnimation("customPlot3", "bb_injury.svg", "bb_fixed.svg");
createArrowAnimation("customPlot", "sports_injury.svg", "sports_fixed.svg");
createArrowAnimation("customPlot2", "oldage_injury.svg", "oldage_fixed.svg");