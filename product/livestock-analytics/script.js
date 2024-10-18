function setupVideoFunctionality(videoId, buttonId, pauseTime) {
    const video = document.getElementById(videoId);
    const analyzeJointsBtn = document.getElementById(buttonId);

    console.log(`Setting up video: ${videoId}`);

    // Remove the loop attribute from the video to control playback manually
    video.removeAttribute("loop");

    // Event listener to stop the video at specified pauseTime and reset button
    video.addEventListener('timeupdate', function () {
        if (video.currentTime >= pauseTime && !analyzeJointsBtn.classList.contains('pressed')) {
            video.pause(); // Pause the video at the specified pause time
        }

        // Reset the button if the video is playing again
        if (video.currentTime < pauseTime && analyzeJointsBtn.classList.contains('pressed')) {
            analyzeJointsBtn.classList.remove('pressed');
            analyzeJointsBtn.style.backgroundColor = 'grey'; // Reset button to grey
        }
    });

    // Event listener for button to play the video till the end
    analyzeJointsBtn.addEventListener('click', function () {
        if (!analyzeJointsBtn.classList.contains('pressed')) {
            // Resume video and play till the end
            analyzeJointsBtn.classList.add('pressed'); // Set button to pressed state
            analyzeJointsBtn.style.backgroundColor = 'black'; // Change button color to black
            video.play();

            // Ensure video pauses at the last frame (just before the end)
            const pauseAtLastFrame = function () {
                if (video.currentTime >= video.duration) {
                    video.pause(); // Pause at the last frame
                    video.removeEventListener('timeupdate', pauseAtLastFrame); // Remove listener once video is paused
                }
            };

            video.addEventListener('timeupdate', pauseAtLastFrame);
        } else {
            // Reset the video and button
            analyzeJointsBtn.classList.remove('pressed');
            analyzeJointsBtn.style.backgroundColor = 'grey'; // Reset button to grey
            video.currentTime = 0; // Reset video to the beginning
            video.play(); // Start video again
        }
    });
}

// Apply the functionality to all three videos with different pause times
setupVideoFunctionality("videoBase-tracking-1", "toggleButton-tracking-1", 3.0);
setupVideoFunctionality("videoBase-tracking-2", "toggleButton-tracking-2", 1.8);
setupVideoFunctionality("videoBase-tracking-3", "toggleButton-tracking-3", 3.0);



// Data from the table
const data76 = [
    {model: 'GLIP-T', score: 62.6},
    {model: 'DyHead-Y', score: 63.2},
    {model: 'DINO-Swin-T', score: 66.7},
    {model: 'OmDet', score: 67.1},
    {model: 'DINO-Swin-L', score: 68.8},
    {model: 'Grounding DINO T', score: 70.7},
    {model: 'Ours', score: 76.7,},

];

const margin76 = { top: 20, right: 20, bottom: 40, left: 100 }; // Adjusted left margin for y-axis labels
const width76 = Math.min(window.screen.width, 700) - margin76.left - margin76.right;
const height76 = 300 - margin76.top - margin76.bottom;

const svg76 = d3.select("#PerformancePlot")
    .attr("width", width76 + margin76.left + margin76.right)
    .attr("height", height76 + margin76.top + margin76.bottom)
    .append("g")
    .attr("transform", `translate(${margin76.left},${margin76.top})`);

const x76 = d3.scaleLinear()
    .domain([50, 79])
    .range([0, width76]);

const y76 = d3.scaleBand()
    .domain(data76.map(d => d.model))
    .range([0, height76])
    .padding(0.2); // Adjusted padding for thinner bars

svg76.append("text")
    .attr("x", width76 / 2)
    .attr("y", (-margin76.top-10) / 4)  // Position the title above the plot
    .attr("text-anchor", function(d) { return window.screen.width > 800 ? "middle" : "middle"; })
    .attr("fill", "black")
    .text("Performance Comparison with Competing Models")
    .style("font-size", function(d) { return window.screen.width > 800 ? "15px" : "10px"; });

svg76.append("g")
    .attr("class", "x-axis76")
    .attr("transform", `translate(0,${height76})`)
    .call(d3.axisBottom(x76))
    .style("font-size", "10px");

svg76.append("g")
    .attr("class", "y-axis76")
    .call(d3.axisLeft(y76))
    .style("font-size", "10px");

const bars76 = svg76.selectAll(".bar76")
    .data(data76)
    .enter()
    .append("rect")
    .attr("class", "bar76")
    .attr("y", d => y76(d.model))
    .attr("x", 0)
    .attr("height", y76.bandwidth())
    .attr("width", 0)
    .attr("fill", d => d.model.includes("Ours") ? "black" : "grey"); // Highlight "Ours" model in black

// Function to trigger the animation
function animateBars76() {
    bars76.transition()
        .duration(1500)
        .attr("width", d => x76(d.score))
        .on("end", function() {
            const ours = data76.find(d => d.model === "Ours").score;

            const text = svg76.append("text")
                .attr("x", x76(ours) - 50) // Position the text slightly after the bar
                .attr("y", y76("Ours") + y76.bandwidth() - 32.5) // Center the text vertically within the bar
                .attr("text-anchor", "start")
                .attr("font-size", "10px")
                .attr("fill", "charcoal")
                .attr("opacity", 0)  // Start with text invisible
                .text("23% better");

            // Animate the appearance of the text
            text.transition()
                .duration(1000)
                .attr("opacity", 1);  // Fade in the text
        });
}

// Add x-axis label
svg76.append("text")
    .attr("x", width76 / 2)
    .attr("y", height76 + margin76.bottom - 5 )
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .attr("fill", "black")
    .text("Average Precision (AP)");

// Function to check if the section is in the viewport
function isInViewport76() {
    const rect76 = document.getElementById('PerformancePlot').getBoundingClientRect();
    return rect76.top >= 0 && rect76.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}

// Trigger the animation based on the viewport
window.addEventListener('scroll', function() {
    if (isInViewport76()) {
        animateBars76();
        // Remove event listener after animation is triggered
        window.removeEventListener('scroll', arguments.callee);
    }
});
 



document.addEventListener("DOMContentLoaded", () => {
let lastScrollTop = 0; // Variable to store the last scroll position
const navbar = document.getElementById('navbar'); // Get the navbar element

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Downscroll code
        navbar.style.top = "-15rem"; // Adjust this value to match the navbar's height
    } else {
        // Upscroll code
        navbar.style.top = "0px";
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Update lastScrollTop to current position
}, false);
});

    var nav_open = false
    let hidden_nav = document.getElementById("hidden-nav");

    document.addEventListener('click', (e) => {
        if (nav_open && !hidden_nav.contains(e.target)) {
            toggleNav();
        }
    });

    function toggleNav(e) {
        nav_open = hidden_nav.style.right == "0px";
        hidden_nav.style.right = nav_open ? "-300px" : "0px";
        nav_open = !nav_open;
        e?.stopPropagation();
    }

    function scrollEle(ele) {
        toggleNav();
        document.getElementById(ele).scrollIntoView({behavior: 'smooth', block: "center", inline: "nearest"});
    }


                                        // Reset scroll behavior when scrolled to top
                                        window.addEventListener('scroll', function() {
                                        if (window.scrollY <= 50) {
                                            allowScroll = true; // Re-enable scrolling when the user scrolls back to the top
                                        }
                                    });

                                    document.addEventListener('DOMContentLoaded', function() {
                                    var navbar = document.getElementById('navbar');
                                    window.addEventListener('scroll', function() {
                                        // Add 'scrolled' class to the navbar based on the scroll position
                                        if (window.pageYOffset > 250) {
                                            navbar.classList.add('scrolled');
                                        } else {
                                            navbar.classList.remove('scrolled');
                                        }
                                    });
                                });




//for truncated cards
const cards = document.querySelectorAll('.card-participant');
const maxLength = 100; // Adjust the character limit as needed

cards.forEach(card => {
    const fullText = card.getAttribute('data-full-text');
    
    if (fullText?.length > maxLength) {
        const truncatedText = fullText.substring(0, maxLength) + '...';
        card.textContent = truncatedText;
    }
});

 
document.addEventListener('DOMContentLoaded', function () {
const maxLength = 120; // Set the maximum number of characters

document.querySelectorAll('.card-participant').forEach(function(cardParticipant) {
    const fullText = cardParticipant.textContent.trim();

    if (fullText.length > maxLength) {
        const truncatedText = fullText.substring(0, maxLength) + '...';
        cardParticipant.innerHTML = truncatedText;
    }
});
});

    

 
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('controlled-video');
    let playedOnce = false;

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function playVideoOnce() {
        if (isInViewport(video) && !playedOnce) {
            video.play();
            playedOnce = true;

            video.addEventListener('ended', function() {
                video.pause();
                video.currentTime = video.duration - 0.2; // Set to last frame or slightly before
            });
        }
    }

    // Attach scroll and resize event listeners to check if the video is in the viewport
    window.addEventListener('scroll', playVideoOnce);
    window.addEventListener('resize', playVideoOnce);

    // Optionally, trigger the check when the page first loads
    playVideoOnce();
});
 


 
document.addEventListener('DOMContentLoaded', function () {
    // Data for the line chart with more scatter points
    const lineData = [
        {section: 0, modelA: 1.8, modelB: 2.2, modelC: 2.0},
        {section: 10, modelA: 2.0, modelB: 2.5, modelC: 2.3},
        {section: 20, modelA: 2.1, modelB: 2.8, modelC: 2.4},
        {section: 30, modelA: 1.9, modelB: 2.6, modelC: 2.2},
        {section: 50, modelA: 2.2, modelB: 2.9, modelC: 2.5},
        {section: 70, modelA: 2.3, modelB: 3.0, modelC: 2.7},
        {section: 100, modelA: 2.4, modelB: 3.1, modelC: 2.9},
        {section: 130, modelA: 2.3, modelB: 3.0, modelC: 2.8},
        {section: 160, modelA: 2.5, modelB: 3.2, modelC: 3.0},
        {section: 190, modelA: 2.5, modelB: 3.1, modelC: 3.2},
        {section: 200, modelA: 2.4, modelB: 3.0, modelC: 3.1}
    ];

    const margin = {top: 50, right: 20, bottom: 30, left: 200},
          width = Math.min(window.screen.width, 700)- margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;

    const svgLine = d3.select("#model-performance-line-chart")
                      .attr("width", width + margin.left + margin.right)
                      .attr("height", height + margin.top + margin.bottom)
                      .append("g")
                      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xLine = d3.scaleLinear()
                    .domain(d3.extent(lineData, d => d.section))
                    .range([0, width]);

    const yLine = d3.scaleLinear()
                    .domain([1.7, 3.8])
                    .range([height, 0]);

    const lineA = d3.line()
                    .x(d => xLine(d.section))
                    .y(d => yLine(d.modelA))
                    .curve(d3.curveMonotoneX);

    const lineB = d3.line()
                    .x(d => xLine(d.section))
                    .y(d => yLine(d.modelB))
                    .curve(d3.curveMonotoneX);

    const lineC = d3.line()
                    .x(d => xLine(d.section))
                    .y(d => yLine(d.modelC))
                    .curve(d3.curveMonotoneX);

    svgLine.append("g")
           .attr("transform", `translate(0,${height})`)
           .call(d3.axisBottom(xLine));

    svgLine.append("g")
           .call(d3.axisLeft(yLine));

    // Add the lines with stroke-dasharray for animation
    const pathA = svgLine.append("path")
           .datum(lineData)
           .attr("class", "lineA")
           .attr("d", lineA)
           .attr("stroke", "black")
           .attr("fill", "none")
           .attr("stroke-width", 2)
           .attr("stroke-dasharray", function () {
               return this.getTotalLength();
           })
           .attr("stroke-dashoffset", function () {
               return this.getTotalLength();
           });

    const pathB = svgLine.append("path")
           .datum(lineData)
           .attr("class", "lineB")
           .attr("d", lineB)
           .attr("stroke", "#d3d3d3")
           .attr("fill", "none")
           .attr("stroke-width", 2)
           .attr("stroke-dasharray", function () {
               return this.getTotalLength();
           })
           .attr("stroke-dashoffset", function () {
               return this.getTotalLength();
           });

    const pathC = svgLine.append("path")
           .datum(lineData)
           .attr("class", "lineC")
           .attr("d", lineC)
           .attr("stroke", "grey")
           .attr("fill", "none")
           .attr("stroke-width", 2)
           .attr("stroke-dasharray", function () {
               return this.getTotalLength();
           })
           .attr("stroke-dashoffset", function () {
               return this.getTotalLength();
           });

    // Add scatter points for each model with animation
    svgLine.selectAll(".dotA")
        .data(lineData)
        .enter().append("circle")
        .attr("class", "dotA")
        .attr("cx", d => xLine(d.section))
        .attr("cy", height) // Start from below
        .attr("r", 0)       // Start with radius 0
        .attr("fill", "black");

    svgLine.selectAll(".dotB")
        .data(lineData)
        .enter().append("circle")
        .attr("class", "dotB")
        .attr("cx", d => xLine(d.section))
        .attr("cy", height) // Start from below
        .attr("r", 0)       // Start with radius 0
        .attr("fill", "#d3d3d3");

    svgLine.selectAll(".dotC")
        .data(lineData)
        .enter().append("circle")
        .attr("class", "dotC")
        .attr("cx", d => xLine(d.section))
        .attr("cy", height) // Start from below
        .attr("r", 0)       // Start with radius 0
        .attr("fill", "grey");

    // Function to animate scatter points and lines
    function animateScatterAndLines() {
        svgLine.selectAll("circle")
            .transition()
            .duration(1000)
            .delay((d, i) => i * 50)
            .attr("cy", d => yLine(d.modelA))  // modelA is for dotA, similarly for dotB and dotC
            .attr("r", 6)
            .on("end", function (d, i) {
                if (i === lineData.length - 1) {
                    animateLines();
                }
            });

        svgLine.selectAll(".dotB")
            .transition()
            .duration(1000)
            .delay((d, i) => i * 50)
            .attr("cy", d => yLine(d.modelB))
            .attr("r", 6);

        svgLine.selectAll(".dotC")
            .transition()
            .duration(1000)
            .delay((d, i) => i * 50)
            .attr("cy", d => yLine(d.modelC))
            .attr("r", 6);
    }

    const legend = svgLine.selectAll(".legend")
                          .data(["Ours", "Model B", "Model C"])
                          .enter().append("g")
                          .attr("class", "legend")
                          .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", (d, i) => ["black", "#d3d3d3", "grey"][i]);

    legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(d => d);

    // Function to animate lines after scatter points
    function animateLines() {
        svgLine.selectAll("path")
            .transition()
            .duration(2000)
            .attr("stroke-dashoffset", 0);
    }

    // Function to handle scroll event for the line chart
    function handleScrollLine() {
        const chartPosition = document.getElementById("model-performance-line-chart").getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (chartPosition < windowHeight - 100) {
            animateScatterAndLines();
            window.removeEventListener("scroll", handleScrollLine);
        }
    }

    window.addEventListener("scroll", handleScrollLine);
});
 



 
function showSection(section, clickedButton) {
    var sections = document.getElementsByClassName("behavior-section");
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
        }
    
    document.getElementById(section).style.display = "block";
    
    var buttons = document.getElementsByClassName('navigate-button');
    console.log(buttons);
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('default-focused');
    }
    // Add active class to the clicked button
    clickedButton.classList.add('default-focused');
}
 


let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
showSlides(slideIndex = n);
}

function showSlides(n) {
let i;
let slides = document.getElementsByClassName("mySlides");
let dots = document.getElementsByClassName("dot");
if (n > slides.length) {slideIndex = 1}
if (n < 1) {slideIndex = slides.length}
for (i = 0; i < slides.length; i++) {
slides[i].style.display = "none";
}
for (i = 0; i < dots.length; i++) {
dots[i].className = dots[i].className.replace(" active", "");
}
slides[slideIndex-1].style.display = "block";
dots[slideIndex-1].className += " active";
}
 

 
document.addEventListener('DOMContentLoaded', function() {
    const toggleOverlayButton = document.getElementById('toggleOverlay');
    const overlayImage1 = document.getElementById('overlayImage1');
    const overlayImage2 = document.getElementById('overlayImage2');
    
    let isOverlayVisible = true; // Default to true

    // Set initial state to visible and apply the pressed style
    overlayImage1.style.opacity = '1';
    overlayImage2.style.opacity = '1';
    toggleOverlayButton.classList.add('pressed');

    toggleOverlayButton.addEventListener('click', function() {
        if (!isOverlayVisible) {  
            isOverlayVisible = true;
            overlayImage1.style.opacity = '1';
            overlayImage2.style.opacity = '1';
            toggleOverlayButton.classList.add('pressed');
            toggleOverlayButton.classList.remove('not-pressed');
        } else {
            isOverlayVisible = false;
            overlayImage1.style.opacity = '0';
            overlayImage2.style.opacity = '0';
            toggleOverlayButton.classList.remove('pressed');
            toggleOverlayButton.classList.add('not-pressed');
        }
    });
});
  

 
// Set up the SVG
const svg = d3.select("#customPlot");
const width = Math.min(window.screen.width, 800)
const height = 400

// Define the start, middle, and end points for the lines
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

const midX = width / 2.3;
const midY = height / 2;

// Define subtle colors representing 2D, 3D, and video, then change to darker after TibbTech
const initialLineColors = ["#D3D3D3", "#A9A9A9", "#808080"]; // Light Grey shades for before passing TibbTech
const finalLineColors = ["#000000", "#000000", "#000000"]; // Black after passing TibbTech

// Draw the lines without animating yet
const paths = startPoints.map((start, i) => {
const path = svg.append("path")
    .attr("d", `M${start.x},${start.y} 
                Q${midX},${midY - 50 + i * 50} 
                ${midX},${midY - 50 + i * 50}
                T${endPoints[i].x - 30},${endPoints[i].y}`)
    .attr("stroke", initialLineColors[i])
    .attr("stroke-width", 3)
    .attr("fill", "none");

const totalLength = path.node().getTotalLength();

path
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength); // Hide the path initially

return path;
});

// Function to trigger the animation
function animateLines() {
paths.forEach((path, i) => {
    const totalLength = path.node().getTotalLength();

    path.transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", totalLength / 2) // Animate to mid-point (TibbTech)
        .on("end", () => {
            // Pop effect on the logo
            d3.select("#logo")
                .transition()
                .duration(300)
                .attr("width", 180)   // Increase size
                .attr("height", 180)
                .attr("x", midX - 90) // Adjust position to keep centered
                .attr("y", midY - 90)
                .transition()
                .duration(300)
                .attr("width", 150)   // Return to original size
                .attr("height", 150)
                .attr("x", midX - 75) // Reset position
                .attr("y", midY - 75);

            // Continue the animation after the logo effect
            path.transition()
                .duration(1000)
                .ease(d3.easeLinear)
                .attr("stroke", finalLineColors[i]) // Change to black after passing TibbTech
                .attr("stroke-width", 5)
                .transition()
                .duration(800)
                .ease(d3.easeLinear)
                .attr("stroke-width", 3)
                .attr("stroke-dashoffset", 0)
                .on("end", () => {
                    // Show and play GIF after line reaches the end
                    d3.select(`#outputGif${i}`)
                        .attr("opacity", 1) // Make GIF visible
                        .attr("xlink:href", outputImages[i]); // Set the GIF source

                    if (i == 0){
                            svg.append("image")
                            .attr("id", `overlayGif${0}`)
                            .attr("xlink:href", "threshold visualization/yellow/876_mask.png") // Replace with the second image source
                            .attr("x", endPoints[i].x - 60)
                            .attr("y", endPoints[i].y - 20)
                            .attr("width", 120) // Same size as the first image
                            .attr("height", 60) // Same size as the first image
                            .attr("opacity", 0.5) // Set the opacity of the second image
                            .style("z-index", "11"); // Ensure this image is on top of the first one
                    
                        
                    }
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
    animateLines();
    // Remove event listener after animation is triggered
    window.removeEventListener('scroll', arguments.callee);
}
});

// Add images and small text labels
const inputImages = ["1.png", "2.png", "3.png"]; // Use PNGs for inputs
const outputImages = ["threshold visualization/yellow/876.png", "figs/smol br.png", "4dgiffy.gif"]; // Use GIFs for outputs
const inputLabels = ['data modality 1', 'data modality 2', 'data modality N']//["2D Data", "3D Data", "Video Data"];
const outputLabels = ["genetic features", "brainwide spatial genomics", "behavioral assays outcome"];
startPoints.forEach((start, i) => {
// Input images and text
svg.append("image")
    .attr("xlink:href", inputImages[i])
    .attr("x", start.x - 40)
    .attr("y", start.y - 20)
    .attr("width", 60) // Increased size
    .attr("height", 60); // Increased size

svg.append("text")
    .attr("x", start.x - 10)
    .attr("y", start.y - 25)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "#000")
    .text(inputLabels[i]);

// Output GIF placeholders and text

if (i === 1){

    svg.append("image")
    .attr("id", `outputGif${i}`)
    .attr("xlink:href", "") // Initially no source to keep it hidden
    .attr("x", endPoints[i].x - 68)
    .attr("y", endPoints[i].y - 30)
    .attr("width", 120) // Increased size
    .attr("height", 60) // Increased size
    .attr("opacity", 0); // Hide the GIF initially
}

else  {
    svg.append("image")
    .attr("id", `outputGif${i}`)
    .attr("xlink:href", "") // Initially no source to keep it hidden
    .attr("x", endPoints[i].x - 60)
    .attr("y", endPoints[i].y - 20)
    .attr("width", 120) // Increased size
    .attr("height", 60) // Increased size
    .attr("opacity", 0); // Hide the GIF initially
}

svg.append("text")
    .attr("x", endPoints[i].x+40)
    .attr("y", endPoints[i].y - 25)
    .attr("text-anchor", "end")
    .style("font-size", function(d) { return window.screen.width > 800 ? "12px" : "8px"; })        
    .attr("fill", "#000")
    .text(outputLabels[i])
    .style('z-index', "100");
});

// Add the image in the middle with pop effect on intersection
svg.append("image")
.attr("id", "logo")
.attr("xlink:href", "figs/logo8.svg")
.attr("x", midX - 75)  // Adjusted for new size
.attr("y", midY - 75)  // Adjusted for new size
.attr("width", 150)    // Original width
.attr("height", 150)   // Original height
.raise(); // Ensure the image is on top

 


 
// Margin and dimensions
const margin = { top: 40, right: 10, bottom: 40, left: 50 };
const plotWidth = 280 - margin.left - margin.right;
const plotHeight = 300 - margin.top - margin.bottom;

// Data for Cost of Drug Discovery
const data1 = [
    { year: 2000, cost: 1.0 },
    { year: 2005, cost: 1.2 },
    { year: 2010, cost: 1.5 },
    { year: 2015, cost: 2.0 },
    { year: 2020, cost: 2.4 },
    { year: 2025, cost: 2.7 }
];

// Data for Brain Disorders Worldwide (Prevalence)
const data2 = [
    { year: 1990, count: 1.8 },  // 1.8 billion
    { year: 1995, count: 1.9 },  // 1.9 billion
    { year: 2000, count: 2.0 },  // 2.0 billion
    { year: 2005, count: 2.2 },  // 2.2 billion
    { year: 2010, count: 2.4 },  // 2.4 billion
    { year: 2015, count: 2.5 },  // 2.5 billion
    { year: 2017, count: 2.62 }, // 2.62 billion
    { year: 2018, count: 2.7 },  // 2.7 billion
    { year: 2019, count: 2.78 }, // 2.78 billion
    { year: 2020, count: 2.87 }, // 2.87 billion
    { year: 2022, count: 2.95 }, // 2.95 billion
    { year: 2025, count: 3.0 }   // Estimated 3.0 billion
];


function createBarChart(svgId, data, xLabel, yLabel, color, title, annotation) {
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

    const x = d3.scaleBand().domain(data.map(d => d.year)).range([0, plotWidth]).padding(0.3);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d[yLabel])]).range([plotHeight, 0]);

    svg.append("g")
        .attr("transform", `translate(0,${plotHeight})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append("g").call(d3.axisLeft(y));

    const bars = svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.year))
        .attr("width", x.bandwidth())
        .attr("y", d => y(0))
        .attr("height", 0)
        .attr("fill", color);

    // Add labels
    const labels = svg.selectAll(".label")
        .data(data)
        .enter().append("text")
        .attr("class", "label")
        .attr("x", d => x(d.year) + x.bandwidth() / 2)
        .attr("y", d => y(0))
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", color)
        .text(d => `${d[yLabel]}B`);

    // Add annotation
    svg.append("text")
        .attr("x", plotWidth - 10)
        .attr("y", plotHeight + 30)  // Adjusted Y-position
        .attr("text-anchor", "end")
        .style("font-size", "10px")
        .style("fill", "gray")
        .text(annotation)
        .raise();

    // Create the animation function
    function animateBars() {
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

    // Observe when the element enters the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateBars(); // Trigger animation
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    });

    observer.observe(document.querySelector(svgId + " svg"));
}

function createLineChart(svgId, data, xLabel, yLabel, color, title, annotation) {
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
    const y = d3.scaleLinear().domain([1.7, 3.0]).range([plotHeight, 0]); // Adjusted Y-axis

    svg.append("g")
        .attr("transform", `translate(0,${plotHeight})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append("g").call(d3.axisLeft(y));

    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d[yLabel]));

    // Create path for the line
    const path = svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", line)
        .attr("stroke-dasharray", function() {
            return this.getTotalLength();
        })
        .attr("stroke-dashoffset", function() {
            return this.getTotalLength();
        });

    // Add annotation
    svg.append("text")
        .attr("x", plotWidth - 10)
        .attr("y", plotHeight + 30)
        .attr("text-anchor", "end")
        .style("font-size", "10px")
        .style("fill", "gray")
        .text(annotation)
        .raise();

    // Animation function
    function animateLine() {
        path.transition()
            .duration(4000)
            .attr("stroke-dashoffset", 0);
    }

    // Use IntersectionObserver to trigger animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateLine(); // Trigger animation
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    });

    observer.observe(document.querySelector(svgId + " svg"));
}

function createMultiLineChart(svgId, data, color1, color2, color3, title, annotation, legendOffsetX = 10) {
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
    const y = d3.scaleLinear().domain([0, d3.max(data, d => Math.max(d.alzheimers, d.parkinsons, d.other)) / 1e6]).range([plotHeight, 0]);

    // Reduce the number of ticks on the x-axis, showing only every 5th year
    svg.append("g")
        .attr("transform", `translate(0,${plotHeight})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(Math.ceil(data.length / 5)));

    svg.append("g")
        .call(d3.axisLeft(y).tickFormat(d => `${d}M`)); // Format y-axis labels in millions

    // Line generators
    const line1 = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.alzheimers / 1e6));  // Convert to millions
    
    const line2 = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.parkinsons / 1e6));  // Convert to millions

    const line3 = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.other / 1e6));  // Convert to millions

    // Create paths for lines
    const path1 = svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color1)
        .attr("stroke-width", 2)
        .attr("d", line1)
        .attr("stroke-dasharray", function() {
            return this.getTotalLength();
        })
        .attr("stroke-dashoffset", function() {
            return this.getTotalLength();
        });

    const path2 = svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color2)
        .attr("stroke-width", 2)
        .attr("d", line2)
        .attr("stroke-dasharray", function() {
            return this.getTotalLength();
        })
        .attr("stroke-dashoffset", function() {
            return this.getTotalLength();
        });

    const path3 = svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color3)
        .attr("stroke-width", 2)
        .attr("d", line3)
        .attr("stroke-dasharray", function() {
            return this.getTotalLength();
        })
        .attr("stroke-dashoffset", function() {
            return this.getTotalLength();
        });

    // Animation function
    function animateLines() {
        path1.transition()
            .duration(4000)
            .attr("stroke-dashoffset", 0);

        path2.transition()
            .duration(4000)
            .attr("stroke-dashoffset", 0);

        path3.transition()
            .duration(4000)
            .attr("stroke-dashoffset", 0);
    }

    // Add legend in the top-left corner with adjustable x-offset
    const legendData = [
        { label: "Alzheimer's", color: color1 },
        { label: "Parkinson's", color: color2 },
        { label: "Other brain disorders", color: color3 }
    ];

    const legend = svg.selectAll(".legend")
        .data(legendData)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(${legendOffsetX},${i * 20})`); // Adjust legend position with legendOffsetX

    legend.append("rect")
        .attr("x", 0)  // Align to the left
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", d => d.color);

    legend.append("text")
        .attr("x", 24)  // Align text to the right of the rectangles
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")  // Align text to the left
        .style("font-size", "14px")
        .text(d => d.label);

    // Add annotation
    svg.append("text")
        .attr("x", plotWidth - 10)
        .attr("y", plotHeight + 30)
        .attr("text-anchor", "end")
        .style("font-size", "10px")
        .style("fill", "gray")
        .text(annotation)
        .raise();

    // Use IntersectionObserver to trigger animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateLines(); // Trigger animation
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    });

    observer.observe(document.querySelector(svgId + " svg"));
}
    
// Create the bar charts side by side
d3.select("#chartsContainer")
    .append("div")
    .attr("id", "costPlot")
    .attr("class", "chart")
    .style("width", plotWidth + margin.left + margin.right + "px");

d3.select("#chartsContainer")
    .append("div")
    .attr("id", "disorderPlot")
    .attr("class", "chart")
    .style("width", plotWidth + margin.left + margin.right + "px");

d3.select("#chartsContainer")
    .append("div")
    .attr("id", "usBrainDisorderPlot")
    .attr("class", "chart")
    .style("width", plotWidth + margin.left + margin.right + "px");

createBarChart("#costPlot", data1, 'year', 'cost', "black",
                "average cost to develop a new Drug",
                "projected cost of $2.7B by 2025");

createLineChart("#disorderPlot", data2, 'year', 'count', "black",
                "increase in brain disorders worldwide",
                "projected increase to 3B by 2025");

d3.json("us_brain2.json").then(data => {
    createMultiLineChart("#usBrainDisorderPlot", data, "#d3d3d3", "grey", "black", "increase in brain disorders in the US", "");
});

 

 
// Assuming the original image size
const originalWidth = 1600;  // Original image width
const originalHeight = 1200; // Original image height

// Displayed image size in your HTML/CSS
const displayedWidth = 350;  // Displayed image width
const displayedHeight = 350; // Displayed image height

// Calculate scale factors
const scaleFactorX = displayedWidth / originalWidth;
const scaleFactorY = displayedHeight / originalHeight;

// Initialize visualization
const svg_tv = d3.select("#intensity-layer-yellow");
const slider = d3.selectAll(".intensity-yellow").attr("value", 0);
const tooltip = d3.select("#umap-tooltip");

// Load intensity data and scale the coordinates
d3.json("threshold visualization/yellow/intensity_data.json").then(data => {
// Apply the scaling
const scaledData = data.map(d => ({
    x: d.x * scaleFactorX,
    y: d.y * scaleFactorY,
    intensity: d.intensity
}));

// Create bounding boxes on the image
const rects = svg_tv.selectAll("rect")
    .data(scaledData)
    .enter().append("rect")
    .attr("x", d => d.x - 10)  // Adjust for bounding box positioning
    .attr("y", d => d.y - 10)  // Adjust for bounding box positioning
    .attr("width", 20)  // Size of the bounding box
    .attr("height", 20)  // Size of the bounding box
    .attr("fill", "none")
    .attr("stroke", "lightgrey")
    .attr("stroke-width", 1.5)
    .attr("class", "neuron-bbox")
    .on("mouseover", (event, d) => {
        d3.select(event.currentTarget).attr("stroke-width", 3);
        tooltip.style("display", "inline-block")
               .style("left", `${event.pageX + 10}px`)
               .style("top", `${event.pageY + 10}px`)
               .html(`x: ${d.x}, y: ${d.y}<br>Intensity: ${d.intensity.toFixed(2)}`);
    })
    .on("mouseout", () => {
        d3.select(event.currentTarget).attr("stroke-width", 1.5);
        tooltip.style("display", "none");
    });

// Update bounding boxes based on slider input
slider.on("input", function() {
    const threshold = parseFloat(this.value);
    rects.attr("visibility", d => d.intensity >= threshold ? "visible" : "hidden");
});
});
 

 
 // Assuming the original image size
const originalWidth2 = 1600;  // Original image width
const originalHeight2 = 1200; // Original image height

// Displayed image size in your HTML/CSS
const displayedWidth2 = 350;  // Displayed image width
const displayedHeight2 = 350; // Displayed image height

// Calculate scale factors
const scaleFactorX2 = displayedWidth2 / originalWidth2;
const scaleFactorY2 = displayedHeight2 / originalHeight2;

// Initialize visualization
const svg_tv2 = d3.select("#intensity-layer-green");
const slider2 = d3.selectAll(".intensity-green").attr("value", 0);
const tooltip2 = d3.select("#umap-tooltip");

// Load intensity data and scale the coordinates
d3.json("threshold visualization/green/intensity_data.json").then(data => {
 // Apply the scaling
 const scaledData2 = data.map(d => ({
     x: d.x * scaleFactorX2,
     y: d.y * scaleFactorY2,
     intensity: d.intensity
 }));

 // Create bounding boxes on the image
 const rects2 = svg_tv2.selectAll("rect")
     .data(scaledData2)
     .enter().append("rect")
     .attr("x", d => d.x - 10)  // Adjust for bounding box positioning
     .attr("y", d => d.y - 10)  // Adjust for bounding box positioning
     .attr("width", 20)  // Size of the bounding box
     .attr("height", 20)  // Size of the bounding box
     .attr("fill", "none")
     .attr("stroke", "lightgrey")
     .attr("stroke-width", 1.5)
     .attr("class", "neuron-bbox")
     .on("mouseover", (event, d) => {
         d3.select(event.currentTarget).attr("stroke-width", 3);
         tooltip2.style("display", "inline-block")
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY + 10}px`)
                .html(`x: ${d.x}, y: ${d.y}<br>Intensity: ${d.intensity.toFixed(2)}`);
     })
     .on("mouseout", () => {
         d3.select(event.currentTarget).attr("stroke-width", 1.5);
         tooltip2.style("display", "none");
     });

 // Update bounding boxes based on slider input
 slider2.on("input", function() {
     const threshold = parseFloat(this.value);
     rects2.attr("visibility", d => d.intensity >= threshold ? "visible" : "hidden");
 });
});
 

 
// Assuming the original image size
const originalWidth3 = 1600;  // Original image width
const originalHeight3 = 1200; // Original image height

// Displayed image size in your HTML/CSS
const displayedWidth3 = 350;  // Displayed image width
const displayedHeight3 = 350; // Displayed image height

// Calculate scale factors
const scaleFactorX3 = displayedWidth2 / originalWidth2;
const scaleFactorY3 = displayedHeight2 / originalHeight2;

// Initialize visualization
const svg_tv3 = d3.select("#intensity-layer-red");
const slider3 = d3.selectAll(".intensity-red").attr("value", 0);
const tooltip3 = d3.select("#umap-tooltip");

// Load intensity data and scale the coordinates
d3.json("threshold visualization/red/intensity_data.json").then(data => {
// Apply the scaling
const scaledData3 = data.map(d => ({
    x: d.x * scaleFactorX2,
    y: d.y * scaleFactorY2,
    intensity: d.intensity
}));

// Create bounding boxes on the image
const rects3 = svg_tv3.selectAll("rect")
    .data(scaledData3)
    .enter().append("rect")
    .attr("x", d => d.x - 10)  // Adjust for bounding box positioning
    .attr("y", d => d.y - 10)  // Adjust for bounding box positioning
    .attr("width", 20)  // Size of the bounding box
    .attr("height", 20)  // Size of the bounding box
    .attr("fill", "none")
    .attr("stroke", "lightgrey")
    .attr("stroke-width", 1.5)
    .attr("class", "neuron-bbox")
    .on("mouseover", (event, d) => {
        d3.select(event.currentTarget).attr("stroke-width", 3);
        tooltip3.style("display", "inline-block")
               .style("left", `${event.pageX + 10}px`)
               .style("top", `${event.pageY + 10}px`)
               .html(`x: ${d.x}, y: ${d.y}<br>Intensity: ${d.intensity.toFixed(2)}`);
    })
    .on("mouseout", () => {
        d3.select(event.currentTarget).attr("stroke-width", 1.5);
        tooltip3.style("display", "none");
    });

// Update bounding boxes based on slider input
slider3.on("input", function() {
    const threshold = parseFloat(this.value);
    rects3.attr("visibility", d => d.intensity >= threshold ? "visible" : "hidden");
});
});
 

 
const videoGif = document.getElementById('videoGif');
const videoTracking = document.getElementById('video11');

// Variable to adjust playback speed of the first video
const gifSpeedFactor = 5.0; // Adjust this value to speed up or slow down the first video
const trackingSpeedFactor = 3.87; // Adjust this value to speed up or slow down the second video

// Set playback speed for each video independently
videoGif.playbackRate = gifSpeedFactor;
videoTracking.playbackRate = trackingSpeedFactor;

videoGif.addEventListener('loadedmetadata', function() {
    // Log the actual durations after speed adjustment for reference
    console.log('Adjusted GIF Video Duration:', videoGif.duration / gifSpeedFactor);
});

videoTracking.addEventListener('loadedmetadata', function() {
    // Log the actual durations after speed adjustment for reference
    console.log('Adjusted Tracking Video Duration:', videoTracking.duration / trackingSpeedFactor);
});

 
// Set the initial state of mask layers to be visible
const maskLayers = ['yellow', 'green', 'red'].map(color => document.getElementById(`mask-layer-${color}`));
maskLayers.forEach(maskLayer => {
    maskLayer.style.opacity = '0.5';  // Show masks with 50% opacity by default
});

document.getElementById('toggle-mask').addEventListener('click', function() {
    const button = document.getElementById('toggle-mask');
    let masksVisible = false;

    maskLayers.forEach(maskLayer => {
        if (maskLayer.style.opacity === '0') {
            maskLayer.style.opacity = '0.5';  // Show masks with 50% opacity
            masksVisible = true;
        } else {
            maskLayer.style.opacity = '0';  // Hide masks
        }
    });

    // Update button color based on mask visibility
    if (masksVisible) {
        button.style.backgroundColor = 'black';
    } else {
        button.style.backgroundColor = 'grey';
    }
});
 

// Set up the SVG
const svg13 = d3.select("#customPlot2");
const width13 = +svg13.attr("width");
const height13 = +svg13.attr("height");

// Define the start, middle, and end points for the lines
const startPoints13 = [
    {x: 50, y: 100},
    {x: 50, y: 200},
    {x: 50, y: 300}
];

const endPoints13 = [
    {x: 450, y: 100},
    {x: 450, y: 200},
    {x: 450, y: 300}
];

const end2Points13 = [
    {x: 550, y: 100},
    {x: 550, y: 200},
    {x: 550, y: 300}
];

const convergencePoint13 = {x: width13 - 50, y: height13 / 2}; // Convergence point for the lines to the right

const midX13 = 250;  // Bring the logo more to the left
const midY13 = height13 / 2;

// Define subtle colors representing 2D, 3D, and video, then change to darker after TibbTech
const initialLineColors13 = ["#D3D3D3", "#A9A9A9", "#808080"]; // Light Grey shades for before passing TibbTech
const finalLineColors13 = ["#000000", "#000000", "#000000"]; // Black after passing TibbTech

// Draw the lines without animating yet
const paths13 = startPoints13.map((start, i) => {
    const path13 = svg13.append("path")
        .attr("d", `M${start.x},${start.y} 
                    Q${midX13},${midY13 - 50 + i * 50} 
                    ${midX13},${midY13 - 50 + i * 50}
                    T${endPoints13[i].x - 50},${endPoints13[i].y}`)
        .attr("stroke", initialLineColors13[i])
        .attr("stroke-width", 2)
        .attr("fill", "none");

    const totalLength13 = path13.node().getTotalLength();

    path13
        .attr("stroke-dasharray", totalLength13 + " " + totalLength13)
        .attr("stroke-dashoffset", totalLength13); // Hide the path initially

    return path13;
});

// Function to trigger the animation
function animateLines13() {
    paths13.forEach((path, i) => {
        const totalLength13 = path.node().getTotalLength();

        // Create final path and immediately lower it
        const finalPath = svg13.append("path")
            .attr("d", `M${endPoints13[i].x},${endPoints13[i].y} 
                        Q${end2Points13[i].x},${end2Points13[i].y} 
                        ${convergencePoint13.x},${convergencePoint13.y}`)
            .attr("stroke", finalLineColors13[i])
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .attr("stroke-dasharray", function() {
                const totalLengthFinal = this.getTotalLength();
                return totalLengthFinal + " " + totalLengthFinal;
            })
            .attr("stroke-dashoffset", function() {
                return this.getTotalLength();
            });

        // Lower the final path so it's behind the GIFs from the start
        finalPath.lower();

        // Animate the main path
        path.transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", totalLength13 / 2) // Animate to mid-point (TibbTech)
            .on("end", () => {
                // Pop effect on the logo
                d3.select("#logo13")
                    .transition()
                    .duration(300)
                    .attr("width", 150)   // Increase size
                    .attr("height", 150)
                    .attr("x", midX13 - 75) // Adjust position to keep centered
                    .attr("y", midY13 - 75)
                    .transition()
                    .duration(300)
                    .attr("width", 130)   // Return to original size
                    .attr("height", 130)
                    .attr("x", midX13 - 65) // Reset position
                    .attr("y", midY13 - 65);

                // Continue the animation after the logo effect
                path.transition()
                    .duration(300)
                    .ease(d3.easeLinear)
                    .attr("stroke", finalLineColors13[i]) // Change to black after passing TibbTech
                    .attr("stroke-width", 4)
                    .transition()
                    .duration(800)
                    .ease(d3.easeLinear)
                    .attr("stroke-width", 2)
                    .attr("stroke-dashoffset", 0)
                    .on("end", () => {
                        // Show and play GIF after line reaches the end
                        d3.select(`#outputGif13${i}`)
                            .attr("xlink:href", outputImages13[i]) // Set the GIF source
                            .attr("opacity", 1) // Make GIF visible
                            .transition()
                            .duration(50)
                            .ease(d3.easeLinear)
                            .on("end", () => {
                                // Animate the final path
                                finalPath.transition()
                                    .duration(1000)
                                    .ease(d3.easeLinear)
                                    .attr("stroke-dashoffset", 0);
                            });
                    });
            });
    });
}

// Trigger the animation based on the viewport
window.addEventListener('scroll', function() {
    if (isInViewport13()) {
        animateLines13();
        // Remove event listener after animation is triggered
        window.removeEventListener('scroll', arguments.callee);
    }
});

// Function to check if the section is in the viewport
function isInViewport13() {
    const rect13 = svg13.node().getBoundingClientRect();
    return rect13.top >= 0 && rect13.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}

// Add images and small text labels
const inputImages13 = ["1.png", "2.png", "3.png"]; // Use PNGs for inputs
const outputImages13 = ["threshold visualization/yellow/876.png", "figs/smol br.png", "4dgiffy.gif"]; // Use GIFs for outputs
const inputLabels13 = ["2D Data", "3D Data", "Video Data"];
const outputLabels13 = ["Spatial Genomics", "Brainwide Gene Expression", "Behavioral Assessment"];

startPoints13.forEach((start, i) => {
    // Input images and text
    svg13.append("image")
        .attr("xlink:href", inputImages13[i])
        .attr("x", start.x - 40)
        .attr("y", start.y - 20)
        .attr("width", 50) // Increased size
        .attr("height", 50); // Increased size

    svg13.append("text")
        .attr("x", start.x - 15)
        .attr("y", start.y - 25)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("fill", "#000")
        .text(inputLabels13[i]);

        if (i === 1) {
            svg13.append("image")
                .attr("id", `outputGif13${i}`)
                .attr("xlink:href", outputImages13[i]) // Set the image source
                .attr("x", endPoints13[i].x - 55) // Position to the left
                .attr("y", endPoints13[i].y - 50)
                .attr("width", 120) // Adjust width
                .attr("height", 110); // Adjust height

        } else {
            svg13.append("image")
                .attr("id", `outputGif13${i}`)
                .attr("xlink:href", outputImages13[i]) // Set the image source
                .attr("x", endPoints13[i].x - 50)
                .attr("y", (i === 2) ? endPoints13[i].y - 25 : endPoints13[i].y - 20)
                .attr("width", 100) // Increased size
                .attr("height", 70) // Increased size
                .style("z-index", "10");
        }

    if (i === 0) {
        svg13.append("image")
            .attr("id", `overlayGif13${i}`)
            .attr("xlink:href", "threshold visualization/yellow/876_mask.png") // Replace with the second image source
            .attr("x", endPoints13[i].x - 50)
            .attr("y", endPoints13[i].y - 20)
            .attr("width", 100) // Same size as the first image
            .attr("height", 70) // Same size as the first image
            .attr("opacity", 0.5) // Set the opacity of the second image
            .style("z-index", "11"); // Ensure this image is on top of the first one
    }

    svg13.append("text")
        .attr("x", endPoints13[i].x)
        .attr("y", endPoints13[i].y - 25)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("fill", "#000")
        .text(outputLabels13[i]);
});

// Add the image in the middle with pop effect on intersection
svg13.append("image")
    .attr("id", "logo13")
    .attr("xlink:href", "figs/logo7.svg")
    .attr("x", midX13 - 65)  // Adjusted for new size
    .attr("y", midY13 - 65)  // Adjusted for new size
    .attr("width", 130)    // Original width
    .attr("height", 130)   // Original height
    .raise(); // Ensure the image is on top

// Add text labels at the convergence point
svg13.append("text")
.attr("x", convergencePoint13.x)
.attr("y", convergencePoint13.y - 60)  // Adjust the y-position for the first line
.attr("text-anchor", "middle")
.attr("font-size", "15px")
.attr("fill", "#000")
.raise()
.html('<tspan x="' + (convergencePoint13.x) + '" dy="0">Multimodal</tspan><tspan x="' + (convergencePoint13.x) + '" dy="15">Insights</tspan>')
.raise();  // Raise the z-index of the text above the lines

svg13.append("image")
    .attr("id", "chord")
    .attr("xlink:href", "chordplot.png")
    .attr("x", convergencePoint13.x-40)  // Adjusted for new size
    .attr("y", convergencePoint13.y-45)  // Adjusted for new size
    .attr("width", 100)    // Original width
    .attr("height", 100)   // Original height
    .raise(); // Ensure the image is on top

 
document.querySelectorAll('.synced-video').forEach(video => {
    video.playbackRate = 4.0;  // Set all videos to play at double speed
});
 

 
// Load the data from JSON file
d3.json("synthetic_chord_data_mouse_neuroscience_v8.json").then(function(data) {
    const width = Math.min(window.screen.width, 850); 
    const height = width; 

    let innerRadius = 0
    let outerRadius = 0

    if (width < 800) {
        console.log("width less than 800")
        innerRadius = Math.min(width, 750) * 0.2;  // Multiply innerRadius by 0.3 if width is less than 850
        outerRadius = innerRadius * 1.2;  // Update outerRadius based on the new innerRadius
    } else {
        console.log("width more than 800")
        innerRadius =  Math.min(width, 750) * 0.3;
        outerRadius = innerRadius * 1.2;  // Maintain the outerRadius calculation
    }

    const svg = d3.select("#chordPlot")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`); 

    // Create tooltip
    const tooltip = d3.select("#tooltip-chord");

    // Categories with "Genetic Marker" changed to "Fluorescent Marker"
    //const categories = [
        //" ", " ", " ", " ", " ", " ",  // Spacer between markers and brain regions
        //"Biomarker A", "Biomarker B", "Biomarker C", 
        //"Biomarker D", "Biomarker E", "Biomarker F",
        //" ", " ", " ", " ", " ", " ",  // Spacer between markers and brain regions
        //"Hippocampus", "Prefrontal Cortex", "Amygdala", "Striatum", "Cerebellum", "Thalamus",
        //" ", " ", " ", " ", " ", " ",  // Spacer between brain regions and behavioral tasks
        //"Memory Recall", "Spatial Navigation", "Decision Making", "Attention", "Fear Response", 
      //  "Motor Coordination", "Motor Learning", "Sensory Processing"
    //];

    const categories = [
    " ", " ", " ", " ", " ", " "," ", " ",  // Spacer between markers and brain regions
    "Biomarker A", "Biomarker B", "Biomarker C", 
    "Biomarker D", "Biomarker E", "Biomarker F",
    " ", " ", " ", " ", " ", " ", " ", " ",  // Spacer between markers and brain regions
    "Hippocampus", "Thalamus", "Amygdala", 
    "Striatum", "Cerebellum", "Prefrontal Cortex",
    " ", " ", " ", " ", " ", " ", " ", " ", // Spacer between brain regions and behavioral tasks
    "Morris Water Maze", 
    "Fear Conditioning", 
    "Novel Object Recognition", 
    "Rotarod Test", 
    "Elevated Plus Maze", 
    "Open Field Test", 
    "Sensory Processing",
    "T-Maze"
];

    // Convert data to matrix form for chord diagram
    const index = {};
    categories.forEach((cat, i) => index[cat] = i);
    
    const matrix = Array(categories.length).fill(0).map(() => Array(categories.length).fill(0));
    data.forEach(d => {
        matrix[index[d.source]][index[d.target]] = d.value;
    });

    // Create the chord layout
    const chord = d3.chord()
        .padAngle(0.05)
        .sortSubgroups(d3.descending)
        (matrix);

    const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    const ribbon = d3.ribbon()
        .radius(innerRadius);

    const color = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(d3.range(categories.length));

    const biomarkerColor = d3.scaleSequential(d3.interpolateBlues).domain([0, 5]);
    const brainRegionColor = d3.scaleSequential(d3.interpolateRgb("yellow", "orange")).domain([6, 11]);
    const taskColor = d3.scaleSequential(d3.interpolateGreens).domain([12, 19]);
    
    // Function to assign color based on index
    function assignColor(index) {
        if (index >= 0 && index <= 5) {
            return biomarkerColor(index); // Biomarkers
        } else if (index >= 8 && index <= 13) {
            return brainRegionColor(index); // Brain Regions
        } else if (index >= 16 && index <= 23) {
            return taskColor(index); // Behavioral Tasks
        } else {
            return "#ccc"; // Default color for spacers or unassigned
        }
    }

    // Add group arcs with labels
    svg.append("g")
        .selectAll("g")
        .data(chord.groups)
        .enter().append("g")
        .append("path")
        .style("fill", d => color(d.index))
        .style("stroke", d => d3.rgb(color(d.index)).darker())
        .attr("d", arc);

    svg.append("g")
        .selectAll("text")
        .data(chord.groups)
        .enter().append("text")
        .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
        .attr("dy", ".45em")
        .attr("transform", function(d) {
            return `rotate(${d.angle * 180 / Math.PI - 90}) translate(${outerRadius + 5})` + 
                (d.angle > Math.PI ? "rotate(180)" : "");
        })
        .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
        .style("font-size", function(d) { return window.screen.width > 800 ? "15px" : "8px"; })
        .text((d, i) => categories[d.index])
        .text((d, i) => categories[d.index].replace("Biomarker", "Genetic Marker"));

    // Define color scales for each category type
    const colorBiomarker = d3.scaleOrdinal()
    .domain(["Biomarker A", "Biomarker B", "Biomarker C", "Biomarker D", "Biomarker E", "Biomarker F"])
    .range(d3.quantize(d3.interpolateYlOrBr, 6));  // Interpolates 6 shades of yellow

        const colorBrainRegion = d3.scaleOrdinal()
        .domain(["Hippocampus", "Prefrontal Cortex", "Amygdala", "Striatum", "Cerebellum", "Thalamus"])
        .range(d3.schemeGreens[7].slice(1));  // Example using shades of red

        const colorTask = d3.scaleOrdinal()
        .domain(["Morris Water Maze", "T-Maze", "Fear Conditioning", "Rotarod Test", "Elevated Plus Maze", "Open Field Test", "Novel Object Recognition", "Sensory Processing"])
        .range(d3.schemeBlues[9].slice(1));  // Example using shades of green

    // Function to assign colors based on category type
    function assignColor(d) {
    const category = categories[d.index];
    if (category.startsWith("Biomarker")) {
        return colorBiomarker(category);
    } else if (["Hippocampus", "Prefrontal Cortex", "Amygdala", "Striatum", "Cerebellum", "Thalamus"].includes(category)) {
        return colorBrainRegion(category);
    } else {
        return colorTask(category);
    }
    }

    function assignColor2(d) {
        const category = categories[d.index];
        if (category.startsWith("Biomarker")) {
            return colorBrainRegion(category);
        } else if (["Hippocampus", "Prefrontal Cortex", "Amygdala", "Striatum", "Cerebellum", "Thalamus"].includes(category)) {
            return colorTask(category);
        } else {
            return colorBiomarker(category);
        }
        }

    // Add the ribbons (chords)

    svg.append("g")
        .selectAll("g")
        .data(chord.groups)
        .enter().append("g")
        .append("path")
        .style("fill", d => assignColor2(d))
        .style("stroke", d => d3.rgb(assignColor2(d)).darker())
        .attr("d", arc);

    const ribbons = svg.append("g")
    .attr("fill-opacity", 0.67)
    .selectAll("path")
    .data(chord)
    .enter().append("path")
    .attr("d", ribbon)
    .style("fill", d => assignColor(d.target))
    .style("stroke", d => d3.rgb(assignColor(d.target)).darker())
    .on("mouseover", function(event, d) {
        // Dim all ribbons
        ribbons.style("opacity", 0.1);

        // Highlight only the connected chords
        ribbons.filter(r => {
            const isRelated = (r.source.index === d.source.index && r.target.index === d.target.index) ||
                            (r.source.index === d.target.index || r.target.index === d.target.index) ||
                            (r.source.index === d.source.index || r.target.index === d.source.index);
            return isRelated;
        }).style("opacity", 1);

        // Show tooltip with updated lingo
        const source = categories[d.source.index];
        const target = categories[d.target.index];
        const value = d.source.value;

        let tooltipContent = '';

        if (source.includes("Biomarker") && (target.includes("Hippocampus") || 
            target.includes("Striatum") || target.includes("Cerebellum") || 
            target.includes("Prefrontal Cortex") || target.includes("Amygdala") || target.includes("Thalamus"))) {
            tooltipContent = `
                <strong>${source.replace("Biomarker", "Genetic Marker")} is expressed at ${value}% in the ${target}</strong><br>
            `;
        } else if (source.includes("Hippocampus") || source.includes("Striatum") || source.includes("Cerebellum") ||
                source.includes("Prefrontal Cortex") || source.includes("Amygdala") || source.includes("Thalamus")) {
            tooltipContent = `
                <strong>${value}% increased activity in the ${source} during the ${target} task</strong><br>
            `;
        } else if (source.includes("Morris Water Maze") || source.includes("Fear Conditioning") || source.includes("Rotarod Test") ||
                source.includes("Elevated Plus Maze") || source.includes("Open Field Test") || 
                source.includes("Novel Object Recognition") || source.includes("Sensory Processing") || source.includes("T-Maze")) {
            tooltipContent = `
                <strong>Performance in ${source} improved by ${value}% due to the expression of ${target.replace("Biomarker", "Genetic Marker")}</strong><br>
            `;
        }

        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(tooltipContent)
.style("left", (event.pageX + 5) + "px")
.style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
        // Reset all ribbons to full opacity
        ribbons.style("opacity", 0.67);

        // Hide tooltip
        tooltip.transition().duration(500).style("opacity", 0);
    });

    const legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${-width / 2 + 20},${height / 2 - 50})`);  // Positioning it at the bottom left

// Data for the legend
const legendData = [
    { label: "Brain Regions", color: d3.interpolateBlues(0.5) },
    { label: "Behavioral Tasks", color: d3.interpolateYlOrBr(0.5) },
    { label: "Genetic Markers", color: d3.interpolateGreens(0.5) }
];

const itemSpacing = width / legendData.length - 10;  // Calculate spacing between legend item
// Append legend items
legend.selectAll("g")
    .data(legendData)
    .enter().append("g")
    .attr("class", "legend-item")
    .attr("transform", (d, i) => `translate(${(i * itemSpacing)}, 30)`);  // Dynamically positioning items    
    
// Append color boxes
legend.selectAll(".legend-item")
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 18)
    .attr("height", 20)
    .attr("fill", d => d.color);

// Append labels
legend.selectAll(".legend-item")
    .append("text")
    .attr("x", 20)
    .attr("y", 15)  // Aligning text vertically with the rectangles
    .style("font-size", function(d) { return window.screen.width > 800 ? "14px" : "8px"; })
    .text(d => d.label);
});
 

 

 
document.addEventListener('DOMContentLoaded', function() {
    const overlayVideo = document.getElementById('videoOverlay-tracking');
    const toggleButton = document.getElementById('toggleButton-tracking');

    // Set initial state: Overlay is visible, button is in pressed state
    overlayVideo.style.opacity = '1';
    toggleButton.classList.add('pressed');
    toggleButton.style.backgroundColor = 'black'; 
    toggleButton.style.color = 'white';

    toggleButton.addEventListener('click', function() {
        if (overlayVideo.style.opacity == 1) {
            overlayVideo.style.opacity = 0; // Hide the overlay video
            toggleButton.classList.remove('pressed');
            toggleButton.style.backgroundColor = 'grey'; // Revert button background color
            toggleButton.style.color = ''; // Revert button text color
        } else {
            overlayVideo.style.opacity = 1; // Show the overlay video
            toggleButton.classList.add('pressed');
            toggleButton.style.backgroundColor = 'black'; // Change button color to black
            toggleButton.style.color = 'white'; // Optional: change text color to white for contrast
        }
    });
});
 

 
document.getElementById('DD_video').playbackRate = 2.0;
 

 
document.addEventListener("DOMContentLoaded", () => {
    // Prefetch video files when the page loads
    const videoUrls = ["priv11.mp4", "priv2.mp4", "exeraidy11_low.mp4", "exeraide animation.mp4"];
    videoUrls.forEach(url => {
        fetch(url); // Prefetch video
    });

    // Create an IntersectionObserver to load videos when in viewport
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                if (video.dataset.src) {
                    video.src = video.dataset.src; // Load the actual video source
                    video.load(); // Start loading the video
                    observer.unobserve(video); // Stop observing once loaded
                }
            }
        });
    }, { threshold: 0.1 });

    // Observe all lazy-loaded videos
    document.querySelectorAll("video[data-src]").forEach(video => {
        observer.observe(video);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const content = document.getElementById("content");

  window.onload = function () {
    // Hide loading screen after all resources are loaded
    loadingScreen.style.display = 'none';
    content.style.display = 'block'; // Show content
    document.body.classList.remove('loading');
  };

  // Optionally add a timeout if you want to remove the loading screen after a maximum wait time
  setTimeout(() => {
    loadingScreen.style.display = 'none';
    content.style.display = 'block';
  }, 20000); // 10-second fallback in case of slow loading
});
 

 
// List of files to load
const files = [
    "FINAL.mp4", "1.png", "figs/brain_sect_23.png", 
    "threshold visualization/yellow/876.png", "threshold visualization/yellow/876_mask.png",
    "threshold visualization/green/281.png", "threshold visualization/green/281_mask.png", 
    "threshold visualization/red/1924.png", "threshold visualization/red/1924_mask.png", 
    "figs/neuron_detection.svg", "figs/ns1.svg", "figs/ns3.svg", "figs/ns2.svg", "figs/ns4.svg",
    "2.png", "figs/reg/reg1.svg", "figs/reg/reg_1.svg", "figs/reg/reg2.svg", 
    "figs/reg/reg_2.svg", "figs/SeBRe_GIF3.mp4", "figs/brain_registration.svg",
    "3.png", "mouse-vid2.mp4", "4d video.mp4", "figs/smol br.png", "4dgiffy.gif"
];

// Function to load actual files
function loadFiles() {
    return new Promise((resolve, reject) => {
        let loadedFiles = 0;

        // Helper function to load image or video
        function loadFile(file) {
            return new Promise((resolve, reject) => {
                const extension = file.split('.').pop();
                
                if (["png", "jpg", "gif", "svg"].includes(extension)) {
                    // Handle images
                    const img = new Image();
                    img.src = file;
                    img.onload = resolve;
                    img.onerror = reject;
                } else if (["mp4", "webm"].includes(extension)) {
                    // Handle videos
                    const video = document.createElement('video');
                    video.src = file;
                    video.onloadeddata = resolve;
                    video.onerror = reject;
                } else {
                    // Handle other file types (just resolve for simplicity)
                    resolve();
                }
            });
        }

        // Load each file
        files.forEach((file) => {
            loadFile(file).then(() => {
                loadedFiles++;
                console.log(`Loaded: ${file}`);
                if (loadedFiles === files.length) {
                    resolve();
                }
            }).catch((err) => {
                console.error(`Failed to load: ${file}`, err);
            });
        });
    });
}

// Show spinner while loading files and reveal the blog content when done
window.addEventListener('load', async () => {
    await loadFiles();
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('blog-content').style.display = 'block';
    document.body.classList.remove('loading'); // Allow scrolling
});
 


function navigateTopaper() {
    window.open('https://tibbtech.com/research/animalformer/',  '_blank'); // Replace with your desired URL
}

function navigateToCVPRpaper() {
    window.open('https://openaccess.thecvf.com/content/CVPR2024W/Vision4Ag/papers/Qazi_AnimalFormer_Multimodal_Vision_Framework_for_Behavior-based_Precision_Livestock_Farming_CVPRW_2024_paper.pdf',  '_blank'); // Replace with your desired URL
}