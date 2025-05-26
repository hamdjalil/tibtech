/*  broad.js  — lazy-animate vertical bar-plots + slider interactivity */

// Import common functions from main.js
import { initProgressBar } from '../../main.js';

document.addEventListener('DOMContentLoaded', () => {

  // Initialize blog-specific progress bar
  initProgressBar();

  // ─── helper: run once when ≥45% of element is in view ───
  const onceVisible = (el, fn) => {
    new IntersectionObserver(([e], obs) => {
      if (e.isIntersecting) {
        fn();
        obs.disconnect();
      }
    }, { threshold: 0.45 }).observe(el);
  };

  // ─── Get viewport dimensions ───
  function getViewportDimensions() {
    return {
      width: window.innerWidth || document.documentElement.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight
    };
  }

  // ─── Create responsive chart function ───
  function createChart(containerId, data, options = {}) {
    const viewport = getViewportDimensions();
    const isMobile = viewport.width <= 600;
    const isTablet = viewport.width <= 1024 && viewport.width > 600;
    
    // Calculate responsive dimensions
    const containerWidth = Math.min(viewport.width - 40, isMobile ? 350 : isTablet ? 500 : 700);
    const margin = {
      top: isMobile ? 20 : 30,
      right: isMobile ? 10 : 15,
      bottom: isMobile ? 60 : isTablet ? 50 : 45,
      left: isMobile ? 40 : isTablet ? 50 : options.leftMargin || 60
    };
    
    const width = containerWidth - margin.left - margin.right;
    const height = Math.min(
      isMobile ? 150 : isTablet ? 200 : 300,
      Math.max(120, viewport.height * (isMobile ? 0.18 : isTablet ? 0.25 : 0.3))
    ) - margin.top - margin.bottom;

    // Clear existing chart
    d3.select(containerId).selectAll('*').remove();

    // Create responsive SVG
    const svg = d3.select(containerId)
      .attr('viewBox', `0 0 ${containerWidth} ${height + margin.top + margin.bottom}`)
      .attr('width', '100%')
      .attr('height', 'auto')
      .style('max-width', `${containerWidth}px`)
      .style('height', 'auto')
      .style('display', 'block')
      .style('margin', '0 auto')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3.scaleBand()
      .domain(data.map(d => d[options.xKey || 'model']))
      .range([0, width])
      .padding(isMobile ? 0.25 : 0.35);

    const yMax = options.yMax || d3.max(data, d => d[options.yKey || 'performance'] || d.score);
    const y = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

    // Add axes
    svg.append('g')
       .attr('transform', `translate(0,${height})`)
       .call(d3.axisBottom(x))
       .selectAll('text')
       .style('fill', '#fff')
       .style('font-size', isMobile ? '7px' : isTablet ? '9px' : '11px')
       .attr('transform', isMobile ? 'rotate(-35)' : null)
       .style('text-anchor', isMobile ? 'end' : 'middle')
       .attr('dx', isMobile ? '-0.3em' : '0')
       .attr('dy', isMobile ? '0.2em' : '0.71em');

    svg.append('g')
       .call(d3.axisLeft(y).ticks(isMobile ? 3 : 5))
       .selectAll('text')
       .style('fill', '#fff')
       .style('font-size', isMobile ? '7px' : isTablet ? '9px' : '11px');

    // Add bars
    const yKey = options.yKey || 'performance';
    svg.selectAll('rect')
       .data(data)
       .enter().append('rect')
         .attr('x', d => x(d[options.xKey || 'model']))
         .attr('y', height)
         .attr('width', x.bandwidth())
         .attr('height', 0)
         .attr('fill', d => d[options.xKey || 'model'] === 'Ours' ? '#000' : options.barColor || '#c7c7c7')
       .transition().duration(1300)
         .attr('y', d => y(d[yKey] || d.score))
         .attr('height', d => height - y(d[yKey] || d.score));

    // Add bottom label if provided
    if (options.bottomLabel) {
      svg.append('text')
         .attr('x', width/2)
         .attr('y', height + (isMobile ? 45 : 35))
         .attr('text-anchor', 'middle')
         .attr('fill', '#fff')
         .style('font-size', isMobile ? '8px' : isTablet ? '10px' : '12px')
         .text(isMobile && options.shortLabel ? options.shortLabel : options.bottomLabel);
    }

    // Add special label if provided
    if (options.specialLabel && height > 60) {
      const ourData = data.find(d => d[options.xKey || 'model'] === 'Ours');
      if (ourData) {
        svg.append('text')
           .attr('x', x('Ours') + x.bandwidth()/2)
           .attr('y', y(ourData[yKey] || ourData.score) - (isMobile ? 4 : 6))
           .attr('text-anchor', 'middle')
           .attr('fill', '#fff')
           .style('font-size', isMobile ? '7px' : isTablet ? '8px' : '10px')
           .text(options.specialLabel);
      }
    }

    return { width: containerWidth, height: height + margin.top + margin.bottom };
  }

  // ─── 2-D segmentation (Inv-HD95) plot ───
  onceVisible(
    document.getElementById('model-performance-chart'),
    () => {
      // Data sorted in descending order with 'Ours' first
      const data = [
        {model:'Ours',performance:10.0},
        {model:'UNetr',performance:8.7},
        {model:'TransUNet',performance:7.2},
        {model:'UltraUNet',performance:6.6},
        {model:'SegDiff',performance:5.1},
        {model:'BAT',performance:4.1},
        {model:'MedSAM',performance:3.2},
        {model:'MT-SEG',performance:2.5},
        {model:'FAT-Net',performance:1.5},
        {model:'BEAL',performance:1.2},
        {model:'ResUNet',performance:0.8}
      ];

      createChart('#model-performance-chart', data, {
        yMax: 10,
        yKey: 'performance',
        leftMargin: 70,
        barColor: '#c7c7c7',
        bottomLabel: 'Inverted HD95 (lower is better)',
        shortLabel: 'Inverted HD95'
      });
    }
  );

  // ─── 3-D registration (DICE) plot ───
  onceVisible(
    document.getElementById('registration-performance'),
    () => {
      // Data sorted in descending order with 'Ours' first
      const data = [
        {model:'Ours',score:0.7771},
        {model:'SynthMorph',score:0.6605},
        {model:'Fourier Net',score:0.5991},
        {model:'TransMorph',score:0.5495},
        {model:'VoxelMorph',score:0.4729}
      ];

      createChart('#registration-performance', data, {
        yMax: 0.8,
        yKey: 'score',
        leftMargin: 60,
        barColor: '#888'
        // Removed specialLabel to remove the percentage
      });
    }
  );

  // Store rect data for each color
  const rectData = {};

  // ─── segmentation slider interactivity ───
  ['yellow','green','red'].forEach(color => {
    const svgLayer = d3.select(`#intensity-layer-${color}`);
    const slider = d3.select(`.intensity-${color}`);
    const jsonPath = `threshold visualization/${color}/intensity_data.json`;

    d3.json(jsonPath).then(data => {
      rectData[color] = data; // Store original data
      
      function renderRects() {
        // Clear existing rects
        svgLayer.selectAll('rect').remove();
        
        // Get current container dimensions
        const container = document.querySelector(`.visualization-container`);
        const containerWidth = container ? container.offsetWidth : 350;
        const scaleX = containerWidth / 1600;
        const scaleY = containerWidth / 1200;
        
        // Create scaled data
        const scaledData = data.map(d => ({
          x: d.x * scaleX,
          y: d.y * scaleY,
          intensity: d.intensity
        }));

        // Get viewport for responsive sizing
        const viewport = getViewportDimensions();
        const rectSize = viewport.width <= 600 ? 10 : viewport.width <= 1024 ? 14 : 16;
        const strokeWidth = viewport.width <= 600 ? 1 : 1.5;
        
        const rects = svgLayer.selectAll('rect')
          .data(scaledData)
          .enter().append('rect')
            .attr('x', d => d.x - rectSize/2)
            .attr('y', d => d.y - rectSize/2)
            .attr('width', rectSize)
            .attr('height', rectSize)
            .attr('fill', 'none')
            .attr('stroke', 'white')
            .attr('stroke-width', strokeWidth)
            .style('visibility', 'hidden');

        // Apply current slider value
        const currentValue = slider.node() ? +slider.node().value : 0;
        rects.style('visibility', d => d.intensity >= currentValue ? 'visible' : 'hidden');

        // Update slider event
        slider.on('input', function() {
          const t = +this.value;
          rects.style('visibility', d => d.intensity >= t ? 'visible' : 'hidden');
        });
      }

      renderRects();

      // Store render function for resize
      window[`renderRects_${color}`] = renderRects;
    }).catch(err => {
      console.log(`Could not load JSON data for ${color} channel:`, err);
    });
  });

  // ─── Track mask visibility state globally ───
  let masksVisible = true;

  // ─── Set initial state of mask layers to be visible ───
  const maskLayers = ['yellow', 'green', 'red'].map(color => document.getElementById(`mask-layer-${color}`));
  maskLayers.forEach(maskLayer => {
    if (maskLayer) maskLayer.style.opacity = '0.5';
  });

  // ─── Toggle button functionality ───
  const toggleButton = document.getElementById('toggle-mask');
  if (toggleButton) {
    // Set initial button text and state
    toggleButton.textContent = 'Toggle image features';
    
    toggleButton.addEventListener('click', function() {
      masksVisible = !masksVisible;
      
      maskLayers.forEach(maskLayer => {
        if (maskLayer) {
          maskLayer.style.opacity = masksVisible ? '0.5' : '0';
        }
      });

      // Update button text and class
      if (masksVisible) {
        toggleButton.textContent = 'Toggle image features';
        toggleButton.classList.remove('masks-off');
      } else {
        toggleButton.textContent = 'Toggle image features';
        toggleButton.classList.add('masks-off');
      }
    });
  }

  // Function to recreate charts on resize
  function recreateCharts() {
    // Recreate charts by triggering their creation functions
    const modelChart = document.getElementById('model-performance-chart');
    const regChart = document.getElementById('registration-performance');
    
    if (modelChart) {
      // Data in descending order with 'Ours' first
      const data = [
        {model:'Ours',performance:10.0},
        {model:'UNetr',performance:8.7},
        {model:'TransUNet',performance:7.2},
        {model:'UltraUNet',performance:6.6},
        {model:'SegDiff',performance:5.1},
        {model:'BAT',performance:4.1},
        {model:'MedSAM',performance:3.2},
        {model:'MT-SEG',performance:2.5},
        {model:'FAT-Net',performance:1.5},
        {model:'BEAL',performance:1.2},
        {model:'ResUNet',performance:0.8}
      ];

      createChart('#model-performance-chart', data, {
        yMax: 10,
        yKey: 'performance',
        leftMargin: 70,
        barColor: '#c7c7c7',
        bottomLabel: 'Inverted HD95 (lower is better)',
        shortLabel: 'Inverted HD95'
      });
    }
    
    if (regChart) {
      // Data in descending order with 'Ours' first
      const data = [
        {model:'Ours',score:0.7771},
        {model:'SynthMorph',score:0.6605},
        {model:'Fourier Net',score:0.5991},
        {model:'TransMorph',score:0.5495},
        {model:'VoxelMorph',score:0.4729}
      ];

      createChart('#registration-performance', data, {
        yMax: 0.8,
        yKey: 'score',
        leftMargin: 60,
        barColor: '#888'
        // Removed specialLabel to remove the percentage
      });
    }

    // Update bounding box overlays
    ['yellow','green','red'].forEach(color => {
      if (window[`renderRects_${color}`]) {
        window[`renderRects_${color}`]();
      }
    });
  }

  // Debounced resize handler that recreates charts
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      recreateCharts();
    }, 300);
  });

});

const video = document.getElementById('controlled-video');
  if (video) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Video is in viewport, play it
          video.play().catch(e => console.log('Video play failed:', e));
        }
      });
    }, { threshold: 0.5 }); // Play when 50% of video is visible
    
    videoObserver.observe(video);
    
    // Stop observing once video has ended
    video.addEventListener('ended', () => {
      videoObserver.unobserve(video);
    });
  }