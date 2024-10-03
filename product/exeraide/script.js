// Margin and dimensions
const margin = { top: 40, right: 10, bottom: 40, left: 60 };
const plotWidth = 280 - margin.left - margin.right;
const plotHeight = 300 - margin.top - margin.bottom;

// Data for Cost of Drug Discovery
const costData = [
    { year: 2000, cost: 1.0 },
    { year: 2005, cost: 1.2 },
    { year: 2010, cost: 1.5 },
    { year: 2015, cost: 2.0 },
    { year: 2020, cost: 2.4 },
    { year: 2025, cost: 2.7 }
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
function createBarChart(svgId, data, xLabel, yLabel, title, annotation) {
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
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d[yLabel]) + 0.5]).range([plotHeight, 0]);

    svg.append("g")
        .attr("transform", `translate(0,${plotHeight})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")))
        .selectAll("text")
        .style("font-size", "10px");

    svg.append("g").call(d3.axisLeft(y).tickFormat(d => `${d}B`))
        .append("text")
        .attr("fill", "black")
        .attr("x", -30)
        .attr("y", 0)
        .attr("text-anchor", "middle")
        .text("YLDs");

    const bars = svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.year))
        .attr("width", x.bandwidth())
        .attr("y", d => y(0))
        .attr("height", 0)
        .attr("fill", (d, i) => getColorShade(i, data.length));  // Set color progressively darker

    const labels = svg.selectAll(".label")
        .data(data)
        .enter().append("text")
        .attr("class", "label")
        .attr("x", d => x(d.year) + x.bandwidth() / 2)
        .attr("y", d => y(0))
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

// Function to create animated multi-line chart (Parkinson's, 'Rheumatoid Arthiritis' Arthritis, Multiple Sclerosis, Stroke, Osteo)
function createAnimatedLineChart(svgId, data, title, colorMap, annotation, yMax) {
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
    const y = d3.scaleLinear().domain([0, yMax + 1000000]).range([plotHeight, 0]);

    svg.append("g")
        .attr("transform", `translate(0,${plotHeight})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")))
        .selectAll("text")
        .style("font-size", "10px");

    svg.append("g").call(d3.axisLeft(y).tickFormat(d => `${d / 1000000}M`))
        .append("text")
        .attr("fill", "black")
        .attr("x", -30)
        .attr("y", -5)
        .attr("text-anchor", "middle")
        .text("YLDs");

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
    .attr("id", "costPlot")
    .attr("class", "chart");

d3.select("#chartsContainer")
    .append("div")
    .attr("id", "usDisordersPlot")
    .attr("class", "chart");

// Create the bar charts and animated line charts when they are in view
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'globalDisordersPlot') {
                createAnimatedLineChart("#globalDisordersPlot", globalData, "Global Disease YLDs", globalColorMap, "Years Lived with Disability (YLDs)", 18500000);
            } else if (entry.target.id === 'costPlot') {
                createBarChart("#costPlot", costData, 'year', 'cost', "Average Treatment Cost", "Projected cost of $2.7B by 2025");
            } else if (entry.target.id === 'usDisordersPlot') {
                createAnimatedLineChart("#usDisordersPlot", usData, "US Disease YLDs", usColorMap, "Years Lived with Disability (YLDs)", 550000);
            }
            // Unobserve after triggering the animation once
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Add observer to the plots
document.addEventListener('DOMContentLoaded', function() {
    const plots = ['#globalDisordersPlot', '#costPlot', '#usDisordersPlot'];
    plots.forEach(plot => {
        const element = document.querySelector(plot);
        if (element) observer.observe(element);
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    const videos = [
        { id: 'video1', headingId: 'heading1', speed: 15.0, headingText: 'Sports Rehabilitation' },
        { id: 'video2', headingId: 'heading2', speed: 15.0, headingText: 'Old Age' },
        { id: 'video3', headingId: 'heading3', speed: 15.0, headingText: 'Disease-based Therapy' }
    ];

    let currentVideoIndex = 0;
    const videoElements = videos.map(v => document.getElementById(v.id));
    const headingElements = videos.map(v => document.getElementById(v.headingId));

    // Function to play the next video and transition heading
    function playNextVideo() {
        const currentVideoElement = videoElements[currentVideoIndex];
        const currentHeadingElement = headingElements[currentVideoIndex];

        const nextVideoIndex = (currentVideoIndex + 1) % videos.length;
        const nextVideoElement = videoElements[nextVideoIndex];
        const nextHeadingElement = headingElements[nextVideoIndex];

        // Animate the current video moving out to the right
        currentVideoElement.classList.add('move-out-right');
        currentHeadingElement.classList.add('fade-out');

        nextVideoElement.classList.add('move-in-left');
        nextHeadingElement.classList.add('fade-in');

        // Wait for the fade-out animation to complete
        setTimeout(() => {
            // Remove the current video from view
            currentVideoElement.classList.remove('active', 'move-out-right');
            nextVideoElement.classList.add('active');
            nextVideoElement.classList.remove('move-in-left');

            // Remove the current heading from view and show the next heading
            currentHeadingElement.classList.remove('active', 'fade-out');
            nextHeadingElement.classList.add('active');
            nextHeadingElement.classList.remove('fade-in');

            // Play the next video
            nextVideoElement.playbackRate = videos[nextVideoIndex].speed;
            nextVideoElement.currentTime = 0;
            nextVideoElement.play();

            currentVideoIndex = nextVideoIndex;
        }, 1000); // Wait for animation to complete (matches the CSS transition time)
    }

    // Attach ended event listener to each video to play the next video when one ends
    videoElements.forEach((videoElement) => {
        videoElement.addEventListener('ended', playNextVideo);
    });

    // Play the first video with correct speed and heading
    const firstVideoElement = videoElements[0];
    const firstHeadingElement = headingElements[0];
    firstVideoElement.playbackRate = videos[0].speed;
    firstVideoElement.play();
    firstHeadingElement.classList.add('active');
});

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
        moveDown(".animate-subtitle", 0.55, 2); // Move subtitle down 55% of screen height

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

        // Handle navbar transparency at the top of the page
        if (scrollTop <= offsetThreshold) {
            navbar.style.backgroundColor = "rgba(255, 255, 255, 0)";
            navbar.style.top = "0";  // Make sure navbar is visible at the top
        } else {
            navbar.style.backgroundColor = "rgba(255, 255, 255, 1)"; // Add background color when scrolled
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
    if (videoBase.currentTime >= 1.5 && !analyzeJointsBtn.classList.contains('pressed')) {
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

            if (videoBase.currentTime >= videoBase.duration-1) {

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