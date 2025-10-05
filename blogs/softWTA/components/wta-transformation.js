class WTATransformation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.isAnimating = false;
    this.currentStep = 0;
    this.animationInterval = null;

    this.datasets = [
      {
        name: 'MNIST-M',
        original: 'assets/b2.png',
        processed: 'assets/a2.png'
      },
      {
        name: 'SVHN',
        original: 'assets/b3.png',
        processed: 'assets/a3.png'
      },
      {
        name: 'USPS',
        original: 'assets/b4.png',
        processed: 'assets/a4.png'
      }
    ];

    this.init();
  }

  init() {
    this.container.innerHTML = '';
    this.container.style.cssText = `
      position: relative;
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 0px;
      min-height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ffffff;
      border-radius: 16px;
      overflow: visible;
    `;

    this.createInitialLayout();
    this.startAnimation();
  }

  createInitialLayout() {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'wta-grid-container';
    gridContainer.style.cssText = `
    display: flex;
    gap: 80px;
    align-items: center;
    justify-content: flex-start;  /* ← was 'left', use flex-start */
    flex-wrap: wrap;
    width: 100%;
  `;
  

    this.datasets.forEach((dataset, index) => {
      const itemContainer = document.createElement('div');
      itemContainer.className = `wta-item wta-item-${index}`;
      itemContainer.style.cssText = `
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        min-width: 200px;
      `;

      // Original image container
      const originalContainer = document.createElement('div');
      originalContainer.className = 'original-container';
      originalContainer.style.cssText = `
        position: relative;
        width: 97px;
        height: 97px;
        overflow: hidden;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      `;

      const originalImg = document.createElement('img');
      originalImg.src = dataset.original;
      originalImg.alt = `Original ${dataset.name}`;
      originalImg.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 0.5s ease;
        
      `;

      // Processed image (initially hidden and overlaid)
      const processedImg = document.createElement('img');
      processedImg.className = 'processed-image';
      processedImg.src = dataset.processed;
      processedImg.alt = `WTA Processed ${dataset.name}`;
      processedImg.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0;
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 2;
      `;

      // Processed image container (for final position)
      const processedContainer = document.createElement('div');
      processedContainer.className = 'processed-container';
      processedContainer.style.cssText = `
        position: absolute;
        top: 0;
        right: -90px;
        width: 97px;
        height: 97px;
        overflow: hidden;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        opacity: 0;
        transform: translateX(-20px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      `;

      const processedImgFinal = document.createElement('img');
      processedImgFinal.src = dataset.processed;
      processedImgFinal.alt = `WTA Processed ${dataset.name}`;
      processedImgFinal.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
      `;

      // Arrow
      const arrow = document.createElement('div');
      arrow.className = 'transformation-arrow';
      arrow.style.cssText = `
        position: absolute;
        top: 35%;
        left: 150px;
        width: 40px;
        height: 2px;
        background:rgb(235, 53, 37);
        opacity: 0;
        transform: translateY(-50%) scaleX(0);
        transform-origin: left;
        transition: all 0.6s ease;
        z-index: 3;
      `;

      // Arrow head
      const arrowHead = document.createElement('div');
      arrowHead.style.cssText = `
        position: absolute;
        right: -4px;
        top: -4px;
        width: 0;
        height: 0;
        border-left: 10px solid rgb(235, 53, 37);
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
      `;

      // Dataset label
      const label = document.createElement('div');
      label.className = 'dataset-label';
      label.textContent = dataset.name;
      label.style.cssText = `
        font-family: 'Inter Tight', sans-serif;
        font-weight: 600;
        font-size: 14px;
        color: #374151;
        text-align: center;
        opacity: 1;
        transition: opacity 0.5s ease;
      `;

      // Captions
      const originalCaption = document.createElement('div');
      originalCaption.className = 'original-caption';
      originalCaption.textContent = `Original Image`;
      originalCaption.style.cssText = `
        position: absolute;
        bottom: -35px;
        left: 50%;
        transform: translateX(-50%);
        font-family: 'Inter Tight', sans-serif;
        font-size: 12px;
        color: #6b7280;
        text-align: center;
        opacity: 0;
        transition: opacity 0.5s ease;
        white-space: nowrap;
      `;

      const processedCaption = document.createElement('div');
      processedCaption.className = 'processed-caption';
      processedCaption.textContent = `WTA Processed`;
      processedCaption.style.cssText = `
        position: absolute;
        bottom: -35px;
        right: -40px;
        transform: translateX(50%);
        font-family: 'Inter Tight', sans-serif;
        font-size: 12px;
        color: #6b7280;
        text-align: center;
        opacity: 0;
        transition: opacity 0.5s ease;
        white-space: nowrap;
      `;

      // Assemble elements
      originalContainer.appendChild(originalImg);
      originalContainer.appendChild(processedImg);
      processedContainer.appendChild(processedImgFinal);
      arrow.appendChild(arrowHead);

      itemContainer.appendChild(originalContainer);
      itemContainer.appendChild(processedContainer);
      itemContainer.appendChild(arrow);
      itemContainer.appendChild(label);
      itemContainer.appendChild(originalCaption);
      itemContainer.appendChild(processedCaption);

      gridContainer.appendChild(itemContainer);
    });

    this.container.appendChild(gridContainer);
  }

  startAnimation() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.currentStep = 0;

    // Reset to initial state
    this.resetAnimation();

    // Start the animation sequence
    this.animationInterval = setInterval(() => {
      this.nextAnimationStep();
    }, 1000); // 2 seconds between steps
  }

  resetAnimation() {
    const processedImages = this.container.querySelectorAll('.processed-image');
    const processedContainers = this.container.querySelectorAll('.processed-container');
    const arrows = this.container.querySelectorAll('.transformation-arrow');
    const captions = this.container.querySelectorAll('.original-caption, .processed-caption');

    processedImages.forEach(img => {
      img.style.opacity = '0';
    });

    processedContainers.forEach(container => {
      container.style.opacity = '0';
      container.style.transform = 'translateX(-20px)';
    });

    arrows.forEach(arrow => {
      arrow.style.opacity = '0';
      arrow.style.transform = 'translateY(-50%) scaleX(0)';
    });

    captions.forEach(caption => {
      caption.style.opacity = '0';
    });
  }

  nextAnimationStep() {
    switch (this.currentStep) {
      case 0:
        // Step 1: Show overlay (processed images appear on top)
        this.showOverlay();
        break;
      case 1:
        // Step 2: Move processed images to the right
        this.moveProcessedImages();
        break;
      case 2:
        // Step 3: Show arrows
        this.showArrows();
        break;
      case 3:
        // Step 4: Show captions
        this.showCaptions();
        break;
      case 4:
        // Step 5: Reset and restart
        this.resetAnimation();
        this.currentStep = -1; // Will be incremented to 0
        break;
    }

    this.currentStep++;
  }

  showOverlay() {
    const processedImages = this.container.querySelectorAll('.processed-image');
    processedImages.forEach((img, index) => {
      setTimeout(() => {
        img.style.opacity = '1';
      }, index * 200); // Stagger the appearance
    });
  }

  moveProcessedImages() {
    const processedImages = this.container.querySelectorAll('.processed-image');
    const processedContainers = this.container.querySelectorAll('.processed-container');

    processedImages.forEach((img, index) => {
      setTimeout(() => {
        // Fade out overlay image
        img.style.opacity = '0';

        // Show and animate final position
        setTimeout(() => {
          const container = processedContainers[index];
          container.style.opacity = '1';
          container.style.transform = 'translateX(0)';
        }, 400);
      }, index * 200);
    });
  }

  showArrows() {
    const arrows = this.container.querySelectorAll('.transformation-arrow');
    arrows.forEach((arrow, index) => {
      setTimeout(() => {
        arrow.style.opacity = '1';
        arrow.style.transform = 'translateY(-50%) scaleX(1)';
      }, index * 200);
    });
  }

  showCaptions() {
    const captions = this.container.querySelectorAll('.original-caption, .processed-caption');
    captions.forEach((caption, index) => {
      setTimeout(() => {
        caption.style.opacity = '1';
      }, index * 100);
    });
  }

  stopAnimation() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
    this.isAnimating = false;
  }

  destroy() {
    this.stopAnimation();
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  window.WTATransformation = WTATransformation;
}