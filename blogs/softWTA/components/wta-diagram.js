// Animated WTA Diagram Component
class WTADiagram {
    constructor(containerId) {
        this.containerId = containerId;
        this.svg = null;
        this.captionElement = null;
        this.animationPhase = 0;
        this.pulseIntensity = 0;
        this.animationId = null;
        this.isPlaying = true;
        this.dataParticles = [];
        this.flowPaths = [];
        this.currentCaptionIndex = 0;
        this.captionTimer = 0;
        this.captionDuration = 180; // Frames to show each caption (3 seconds at 60fps)

        // Dynamic captions explaining the neural state machine
        this.captions = [
            "State 1 actively maintained in working memory through excitatory activity",
            "Competitive inhibition suppresses alternative states to ensure single-state dominance",
            "Transition signals activate pointer neurons to switch between memory states",
            "State 2 becomes dominant while State 1 activity is suppressed",
            "Persistent neural activity maintains new state until next transition input",
            "Cross-inhibitory coupling ensures only one state remains active at a time"
        ];

        // Dynamic label states for different phases - layman-friendly
        this.labelStates = [
            // Phase 0: Mental workspace 1 active
            {
                s1: {desc: 'Active mental', desc2: 'workspace'},
                s2: {desc: 'Inactive mental', desc2: 'workspace'},
                p12: {desc: 'Switch to', desc2: 'workspace 2'},
                p21: {desc: 'Switch to', desc2: 'workspace 1'}
            },
            // Phase 1: Inhibition suppressing irrelevant info
            {
                s1: {desc: 'Being suppressed', desc2: 'losing focus'},
                s2: {desc: 'Getting attention', desc2: 'gaining focus'},
                p12: {desc: 'Switching thoughts', desc2: 'to workspace 2'},
                p21: {desc: 'Suppressing', desc2: 'irrelevant info'}
            },
            // Phase 2: Switching between thoughts/tasks
            {
                s1: {desc: 'Losing focus', desc2: 'switching out'},
                s2: {desc: 'Gaining focus', desc2: 'switching in'},
                p12: {desc: 'Task switching', desc2: 'in progress'},
                p21: {desc: 'Preparing next', desc2: 'task switch'}
            },
            // Phase 3: Mental workspace 2 active
            {
                s1: {desc: 'Inactive mental', desc2: 'workspace'},
                s2: {desc: 'Active mental', desc2: 'workspace'},
                p12: {desc: 'Task switch', desc2: 'completed'},
                p21: {desc: 'Switch back to', desc2: 'workspace 1'}
            },
            // Phase 4: Holding information persistently
            {
                s1: {desc: 'Quietly waiting', desc2: 'in background'},
                s2: {desc: 'Holding info', desc2: 'actively'},
                p12: {desc: 'Ready for next', desc2: 'task switch'},
                p21: {desc: 'Active switcher', desc2: 'for return'}
            },
            // Phase 5: Focusing by suppressing distractions
            {
                s1: {desc: 'Suppressed by', desc2: 'active focus'},
                s2: {desc: 'Focused by', desc2: 'suppressing others'},
                p12: {desc: 'Waiting until', desc2: 'focus shifts'},
                p21: {desc: 'Maintaining', desc2: 'current focus'}
            }
        ];

        this.init();
    }

    init() {
        this.createHTML();
        this.setupSVG();
        this.createFlowPaths();
        this.initializeDataParticles();
        this.startAnimation();
    }

    createHTML() {
        const container = document.getElementById(this.containerId);
        const svgId = `wtaSvg-${this.containerId}`;
        const captionId = `wtaCaption-${this.containerId}`;
        container.innerHTML = `
            <div class="wta-diagram-container" style="
                width: 100%;
                max-width: 600px;
                background-color: #ffffff;
                padding: 15px;
                border-radius: 8px;
                margin: 0 auto;
                position: relative;
                box-sizing: border-box;
            ">
                <svg id="${svgId}" width="100%" height="400" viewBox="0 0 600 400" style="
                    width: 100%;
                    height: 400px;
                    background-color: transparent;
                    max-width: 100%;
                    height: auto;
                    min-height: 300px;
                ">
                    <!-- SVG content will be added programmatically -->
                </svg>
                <div id="${captionId}" class="wta-dynamic-caption" style="
                    margin-top: 15px;
                    padding: 12px 16px;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    border-radius: 8px;
                    border-left: 4px solid #2563eb;
                    font-family: 'Inter Tight', sans-serif;
                    font-size: 14px;
                    line-height: 1.5;
                    color: #374151;
                    min-height: 60px;
                    display: flex;
                    align-items: center;
                    transition: all 0.5s ease;
                ">
                    <span class="caption-text">Neural State Machine with sWTA Dynamics: Managing working memory through competitive inhibition</span>
                </div>
                <style>
                    @media (max-width: 768px) {
                        .wta-diagram-container {
                            padding: 10px !important;
                        }
                        #${svgId} {
                            height: 300px !important;
                            min-height: 250px !important;
                        }
                        .wta-dynamic-caption {
                            font-size: 13px !important;
                            padding: 10px 12px !important;
                            min-height: 50px !important;
                        }
                    }
                    @media (max-width: 480px) {
                        .wta-diagram-container {
                            padding: 8px !important;
                        }
                        #${svgId} {
                            height: 250px !important;
                            min-height: 200px !important;
                        }
                        .wta-dynamic-caption {
                            font-size: 12px !important;
                            padding: 8px 10px !important;
                            min-height: 45px !important;
                        }
                    }
                </style>
            </div>
        `;
    }

    setupSVG() {
        const svgId = `wtaSvg-${this.containerId}`;
        const captionId = `wtaCaption-${this.containerId}`;
        this.svg = document.getElementById(svgId);
        this.captionElement = document.getElementById(captionId);

        // Create SVG defs for filters
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        
        // Glow filter
        const glowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        glowFilter.setAttribute('id', 'glow');
        glowFilter.setAttribute('x', '-50%');
        glowFilter.setAttribute('y', '-50%');
        glowFilter.setAttribute('width', '200%');
        glowFilter.setAttribute('height', '200%');
        
        const gaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
        gaussianBlur.setAttribute('stdDeviation', '3');
        gaussianBlur.setAttribute('result', 'coloredBlur');
        
        const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
        const mergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
        mergeNode1.setAttribute('in', 'coloredBlur');
        const mergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
        mergeNode2.setAttribute('in', 'SourceGraphic');
        
        merge.appendChild(mergeNode1);
        merge.appendChild(mergeNode2);
        glowFilter.appendChild(gaussianBlur);
        glowFilter.appendChild(merge);
        defs.appendChild(glowFilter);
        
        this.svg.appendChild(defs);
        
        this.createStaticElements();
    }

    createStaticElements() {
        // State WTA Pool Background
        const statePool = this.createSVGElement('rect', {
            x: '50', y: '50', width: '500', height: '120',
            rx: '60', ry: '60', fill: 'none',
            stroke: '#000000', 'stroke-width': '2'
        });
        this.svg.appendChild(statePool);
        
        // Pointer WTA Pool Background
        const pointerPool = this.createSVGElement('rect', {
            x: '50', y: '220', width: '500', height: '120',
            rx: '60', ry: '60', fill: 'none',
            stroke: '#000000', 'stroke-width': '2'
        });
        this.svg.appendChild(pointerPool);
        
        // Connection lines
        this.createConnectionLines();
        
        // Create nodes
        this.createNodes();
        
        // Create input sources at top
        this.createInputSources();
        
        // Create labels
        this.createLabels();
        
        // Create legend
        this.createLegend();
    }

    createInputSources() {
        // Input source indicators at top of diagram
        const input1 = this.createSVGElement('rect', {
            x: '130', y: '20', width: '40', height: '20',
            rx: '5', ry: '5', fill: '#4CAF50',
            opacity: '0.8', id: 'input1-source'
        });
        this.svg.appendChild(input1);
        
        const input2 = this.createSVGElement('rect', {
            x: '230', y: '20', width: '40', height: '20',
            rx: '5', ry: '5', fill: '#2196F3',
            opacity: '0.8', id: 'input2-source'
        });
        this.svg.appendChild(input2);
        
        // Input arrows
        const arrow1 = this.createSVGElement('path', {
            d: 'M150,40 L150,60 M145,55 L150,60 L155,55',
            stroke: '#4CAF50', 'stroke-width': '2',
            fill: 'none', id: 'input1-arrow'
        });
        this.svg.appendChild(arrow1);
        
        const arrow2 = this.createSVGElement('path', {
            d: 'M250,40 L250,60 M245,55 L250,60 L255,55',
            stroke: '#2196F3', 'stroke-width': '2',
            fill: 'none', id: 'input2-arrow'
        });
        this.svg.appendChild(arrow2);
    }

    createSVGElement(type, attributes) {
        const element = document.createElementNS('http://www.w3.org/2000/svg', type);
        for (const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }
        return element;
    }

    createConnectionLines() {
        // Vertical connections
        const connections = [
            {x1: '150', y1: '170', x2: '150', y2: '220', id: 'conn1'},
            {x1: '250', y1: '170', x2: '250', y2: '220', id: 'conn2'},
            {x1: '150', y1: '170', x2: '250', y2: '220', id: 'conn3'},
            {x1: '250', y1: '170', x2: '150', y2: '220', id: 'conn4'},
        ];
        
        connections.forEach(conn => {
            const line = this.createSVGElement('line', {
                x1: conn.x1, y1: conn.y1, x2: conn.x2, y2: conn.y2,
                stroke: '#FF6B35', 'stroke-width': '2',
                opacity: '0.5', id: conn.id
            });
            this.svg.appendChild(line);
        });
        
        // Horizontal connections
        const hConnections = [
            {x1: '280', y1: '100', x2: '450', y2: '100', id: 'hconn1'},
            {x1: '280', y1: '130', x2: '450', y2: '130', id: 'hconn2'},
            {x1: '280', y1: '270', x2: '450', y2: '270', id: 'hconn3'},
        ];
        
        hConnections.forEach(conn => {
            const line = this.createSVGElement('line', {
                x1: conn.x1, y1: conn.y1, x2: conn.x2, y2: conn.y2,
                stroke: '#10B981', 'stroke-width': '2',
                opacity: '0.5', id: conn.id
            });
            this.svg.appendChild(line);
        });
    }

    createNodes() {
        // State WTA Pool nodes (S1)
        const s1Nodes = [
            {cx: '150', cy: '100', id: 's1-1'},
            {cx: '150', cy: '140', id: 's1-2'}
        ];
        
        s1Nodes.forEach(node => {
            const circle = this.createSVGElement('circle', {
                cx: node.cx, cy: node.cy, r: '20',
                fill: '#CD919E', stroke: '#8B4513', 'stroke-width': '2',
                id: node.id
            });
            this.svg.appendChild(circle);
        });
        
        // State WTA Pool nodes (S2)
        const s2Nodes = [
            {cx: '250', cy: '100', id: 's2-1'},
            {cx: '250', cy: '140', id: 's2-2'}
        ];
        
        s2Nodes.forEach(node => {
            const circle = this.createSVGElement('circle', {
                cx: node.cx, cy: node.cy, r: '20',
                fill: '#CD919E', stroke: '#8B4513', 'stroke-width': '2',
                id: node.id
            });
            this.svg.appendChild(circle);
        });
        
        // Inhibitory pools for state WTA
        const inhibNodes = [
            {cx: '470', cy: '100', id: 'inhib-1'},
            {cx: '470', cy: '130', id: 'inhib-2'}
        ];
        
        inhibNodes.forEach(node => {
            const circle = this.createSVGElement('circle', {
                cx: node.cx, cy: node.cy, r: '15',
                fill: '#87CEEB', id: node.id
            });
            this.svg.appendChild(circle);
        });
        
        // Pointer WTA Pool nodes
        const pointerNodes = [
            {cx: '150', cy: '270', id: 'p12'},
            {cx: '250', cy: '270', id: 'p21'}
        ];
        
        pointerNodes.forEach(node => {
            const circle = this.createSVGElement('circle', {
                cx: node.cx, cy: node.cy, r: '20',
                fill: '#CD919E', stroke: '#8B4513', 'stroke-width': '2',
                id: node.id
            });
            this.svg.appendChild(circle);
        });
        
        // Inhibitory pool for pointer WTA
        const pointerInhib = this.createSVGElement('circle', {
            cx: '470', cy: '270', r: '15',
            fill: '#87CEEB', id: 'pointer-inhib'
        });
        this.svg.appendChild(pointerInhib);
        
        // Dashed boxes around S1 and S2
        const s1Box = this.createSVGElement('rect', {
            x: '120', y: '80', width: '60', height: '80',
            rx: '5', ry: '5', fill: 'none',
            stroke: '#4CAF50', 'stroke-width': '2',
            'stroke-dasharray': '8,4', opacity: '0.6', id: 's1-box'
        });
        this.svg.appendChild(s1Box);
        
        const s2Box = this.createSVGElement('rect', {
            x: '220', y: '80', width: '60', height: '80',
            rx: '5', ry: '5', fill: 'none',
            stroke: '#2196F3', 'stroke-width': '2',
            'stroke-dasharray': '8,4', opacity: '0.6', id: 's2-box'
        });
        this.svg.appendChild(s2Box);
    }

    createLabels() {
        const labels = [
            // Input labels at top
            {x: '130', y: '15', text: 'Task A', fill: '#4CAF50', id: 'input1-label', size: '16'},
            {x: '230', y: '15', text: 'Task B', fill: '#2196F3', id: 'input2-label', size: '16'},

            // Simple static labels based on layman description
            {x: '60', y: '95', text: 'Memory', fill: '#4CAF50', id: 's1-label-line1', size: '12', weight: 'bold'},
            {x: '60', y: '110', text: 'State 1', fill: '#4CAF50', id: 's1-label-line2', size: '12', weight: 'bold'},
            {x: '290', y: '95', text: 'Memory', fill: '#2196F3', id: 's2-label-line1', size: '12', weight: 'bold'},
            {x: '290', y: '110', text: 'State 2', fill: '#2196F3', id: 's2-label-line2', size: '12', weight: 'bold'},
            // {x: '270', y: '110', text: 'Memory Workspace 2', fill: '#2196F3', id: 's2-label', size: '12', weight: 'bold'},

            {x: '100', y: '300', text: 'State Transition ', fill: '#000000', id: 'p12-label', size: '12', weight: 'bold'},
            {x: '130', y: '315', text: 'Pointer 1', fill: '#000000', id: 'p12-label', size: '12', weight: 'bold'},
            {x: '200', y: '300', text: 'State Transition', fill: '#000000', id: 'p21-label', size: '12', weight: 'bold'},
            {x: '230', y: '315', text: 'Pointer 2', fill: '#000000', id: 'p21-label', size: '12', weight: 'bold'},

            
            // Section labels
            {x: '350', y: '40', text: 'Memory State Pool', fill: '#000000', id: 'state-label', size: '12'},
            {x: '350', y: '210', text: 'Memory State Transition Pool', fill: '#000000', id: 'pointer-label', size: '12'},

            // Focus suppression label
            {x: '495', y: '100', text: 'Focus by', fill: '#87CEEB', id: 'inhibit-label1', size: '12'},
            {x: '482', y: '115', text: 'Suppressing', fill: '#87CEEB', id: 'inhibit-label2', size: '12'},
            {x: '495', y: '130', text: 'Irrelevant', fill: '#87CEEB', id: 'inhibit-label3', size: '12'},
            {x: '495', y: '145', text: 'Memory', fill: '#87CEEB', id: 'inhibit-label4', size: '12'}

        ];
        
        labels.forEach(label => {
            const text = this.createSVGElement('text', {
                x: label.x, y: label.y, fill: label.fill,
                'font-size': label.size || '14',
                'font-weight': label.weight || 'normal',
                'font-family': 'Inter Tight, Roboto, sans-serif', id: label.id
            });
            text.textContent = label.text;
            this.svg.appendChild(text);
        });
    }

    createLegend() {
        // Excitatory pool legend
        const excitatoryCircle = this.createSVGElement('circle', {
            cx: '350', cy: '360', r: '10', fill: '#CD919E'
        });
        this.svg.appendChild(excitatoryCircle);
        
        const excitatoryText = this.createSVGElement('text', {
            x: '370', y: '365', fill: '#000000', 'font-size': '12',
            'font-family': 'Inter Tight, Roboto, sans-serif'
        });
        excitatoryText.textContent = 'excitatory pool';
        this.svg.appendChild(excitatoryText);
        
        // Inhibitory pool legend
        const inhibitoryCircle = this.createSVGElement('circle', {
            cx: '480', cy: '360', r: '8', fill: '#87CEEB'
        });
        this.svg.appendChild(inhibitoryCircle);
        
        const inhibitoryText = this.createSVGElement('text', {
            x: '500', y: '365', fill: '#000000', 'font-size': '12',
            'font-family': 'Inter Tight, Roboto, sans-serif'
        });
        inhibitoryText.textContent = 'inhibitory pool';
        this.svg.appendChild(inhibitoryText);
    }

    createFlowPaths() {
        // Define flow paths for clearer data animation
        this.flowPaths = [
            // Input from TOP of diagram to State WTA Pool
            { path: [{x: 150, y: 30}, {x: 150, y: 100}], id: 'flow-input-s1', color: '#4CAF50' },
            { path: [{x: 250, y: 30}, {x: 250, y: 100}], id: 'flow-input-s2', color: '#2196F3' },
            
            // State WTA to Pointer WTA (cross connections)
            { path: [{x: 150, y: 170}, {x: 150, y: 270}], id: 'flow-s1-p12', color: '#FF6B35' },
            { path: [{x: 250, y: 170}, {x: 250, y: 270}], id: 'flow-s2-p21', color: '#FF6B35' },
            { path: [{x: 150, y: 170}, {x: 250, y: 220}, {x: 250, y: 270}], id: 'flow-s1-p21', color: '#FF9800' },
            { path: [{x: 250, y: 170}, {x: 150, y: 220}, {x: 150, y: 270}], id: 'flow-s2-p12', color: '#FF9800' },
            
            // To inhibitory pools
            { path: [{x: 350, y: 100}, {x: 470, y: 100}], id: 'flow-inhibit1', color: '#87CEEB' },
            { path: [{x: 350, y: 130}, {x: 470, y: 130}], id: 'flow-inhibit2', color: '#87CEEB' },
            { path: [{x: 350, y: 270}, {x: 470, y: 270}], id: 'flow-inhibit3', color: '#87CEEB' }
        ];
    }

    initializeDataParticles() {
        this.dataParticles = [];
        
        // Create particles for each flow path
        this.flowPaths.forEach((flowPath, pathIndex) => {
            const particle = this.createSVGElement('circle', {
                r: '4',
                fill: flowPath.color,
                opacity: '0.9',
                id: `particle-${pathIndex}`,
                filter: 'url(#glow)'
            });
            
            this.svg.appendChild(particle);
            
            this.dataParticles.push({
                element: particle,
                pathIndex: pathIndex,
                progress: pathIndex * 0.15, // Stagger particles
                speed: 0.008 // Slow speed
            });
        });
    }

    updateAnimation() {
        // Update dynamic captions
        this.updateCaptions();

        // Update existing node animations
        const flowPhase = Math.sin(this.animationPhase);
        const glowIntensity = 0.5 + 0.5 * Math.sin(this.animationPhase * 1.2);
        
        // Animate data particles along flow paths
        this.dataParticles.forEach(particle => {
            const path = this.flowPaths[particle.pathIndex];
            if (!path || path.path.length < 2) return;
            
            // Update particle progress (slower)
            particle.progress += particle.speed;
            if (particle.progress > 1) {
                particle.progress = 0;
            }
            
            // Calculate position along path
            const segmentIndex = Math.floor(particle.progress * (path.path.length - 1));
            const segmentProgress = (particle.progress * (path.path.length - 1)) % 1;
            
            const startPoint = path.path[segmentIndex];
            const endPoint = path.path[Math.min(segmentIndex + 1, path.path.length - 1)];
            
            const x = startPoint.x + (endPoint.x - startPoint.x) * segmentProgress;
            const y = startPoint.y + (endPoint.y - startPoint.y) * segmentProgress;
            
            particle.element.setAttribute('cx', x);
            particle.element.setAttribute('cy', y);
            
            // Gentler pulsing effect
            const pulseScale = 1 + 0.2 * Math.sin(this.animationPhase * 1.5 + particle.pathIndex);
            particle.element.setAttribute('r', 4 * pulseScale);
            
            // Smoother fade effect based on position
            const fadeOpacity = 0.6 + 0.4 * Math.sin(particle.progress * Math.PI);
            particle.element.setAttribute('opacity', fadeOpacity);
        });

        // Slower connection line animations
        const connectionIds = ['conn1', 'conn2', 'conn3', 'conn4', 'hconn1', 'hconn2', 'hconn3'];
        connectionIds.forEach((id, index) => {
            const element = document.getElementById(id);
            if (element) {
                const flowOpacity = 0.4 + 0.3 * Math.sin(this.animationPhase * 1.2 + index * 0.5);
                const strokeWidth = 2 + 0.5 * Math.sin(this.animationPhase * 1 + index * 0.3);
                element.setAttribute('opacity', flowOpacity);
                element.setAttribute('stroke-width', strokeWidth);
            }
        });

        // Animate nodes with slower, activity-based pulsing
        const nodeIds = ['s1-1', 's1-2', 's2-1', 's2-2', 'p12', 'p21'];
        nodeIds.forEach((id, index) => {
            const element = document.getElementById(id);
            if (element) {
                const activityPhase = this.animationPhase * 0.8 + index * 0.6;
                const pulseScale = 1 + 0.08 * Math.sin(activityPhase);
                const cx = element.getAttribute('cx');
                const cy = element.getAttribute('cy');
                
                element.style.transform = `scale(${pulseScale})`;
                element.style.transformOrigin = `${cx}px ${cy}px`;
                
                // Gentler glow effect during high activity
                const glowStrength = 0.5 + 0.5 * Math.sin(activityPhase);
                if (glowStrength > 0.8) {
                    element.setAttribute('filter', 'url(#glow)');
                } else {
                    element.removeAttribute('filter');
                }
            }
        });

        // Animate inhibitory nodes slower
        const inhibitoryIds = ['inhib-1', 'inhib-2', 'pointer-inhib'];
        inhibitoryIds.forEach((id, index) => {
            const element = document.getElementById(id);
            if (element) {
                const inhibPhase = this.animationPhase * 1.2 + index * 0.8;
                const pulseScale = 1 + 0.05 * Math.sin(inhibPhase);
                const cx = element.getAttribute('cx');
                const cy = element.getAttribute('cy');
                
                element.style.transform = `scale(${pulseScale})`;
                element.style.transformOrigin = `${cx}px ${cy}px`;
            }
        });
    }

    updateCaptions() {
        if (!this.captionElement) return;

        // Increment caption timer
        this.captionTimer++;

        // Check if it's time to change caption
        if (this.captionTimer >= this.captionDuration) {
            this.captionTimer = 0;
            this.currentCaptionIndex = (this.currentCaptionIndex + 1) % this.captions.length;

            // Update caption text with fade effect
            const captionTextElement = this.captionElement.querySelector('.caption-text');
            if (captionTextElement) {
                // Fade out
                this.captionElement.style.opacity = '0.5';
                this.captionElement.style.transform = 'translateY(5px)';

                // Change text after brief delay
                setTimeout(() => {
                    captionTextElement.textContent = this.captions[this.currentCaptionIndex];

                    // Fade back in
                    this.captionElement.style.opacity = '1';
                    this.captionElement.style.transform = 'translateY(0)';

                    // Change border color based on caption theme
                    const borderColors = [
                        '#4CAF50', // State 1 - green
                        '#FF6B35', // Inhibition - orange
                        '#2196F3', // Transition - blue
                        '#2196F3', // State 2 - blue
                        '#9C27B0', // Persistence - purple
                        '#FF5722'  // Coupling - red
                    ];
                    this.captionElement.style.borderLeftColor = borderColors[this.currentCaptionIndex];
                }, 200);
            }

        }

        // Add subtle pulsing effect to caption based on animation phase
        if (this.captionElement) {
            const pulse = 1 + 0.02 * Math.sin(this.animationPhase * 0.5);
            this.captionElement.style.transform = `scale(${pulse}) translateY(0)`;
        }
    }


    startAnimation() {
        const animate = () => {
            if (this.isPlaying) {
                this.animationPhase += 0.05; // Much slower overall animation
                this.pulseIntensity += 0.08;
                
                if (this.animationPhase > Math.PI * 4) {
                    this.animationPhase = 0;
                }
                if (this.pulseIntensity > Math.PI * 2) {
                    this.pulseIntensity = 0;
                }
                
                this.updateAnimation();
            }
            
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }

    toggleAnimation() {
        this.isPlaying = !this.isPlaying;
    }

    resetAnimation() {
        this.animationPhase = 0;
        this.pulseIntensity = 0;
        this.isPlaying = true;
        this.updateAnimation();
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Usage: new WTADiagram('your-container-id');
