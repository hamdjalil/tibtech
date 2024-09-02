document.addEventListener("DOMContentLoaded", () => {
    const publications = [
        {
            id: 2,
            date: '2024',
            title: 'NeuroAtlas: An Artificial Intelligence-based Framework for Annotation,<br> Segmentation and Registration of Large Scale Biomedical Imaging Data',
            authors: 'Hassan Mahmood, Farah Nawar, Syed Mohammed Shamsul Islam, Asim Iqbal',
            conference: 'bioRxiv',
            abstract: 'With increasing neuroimaging modalities and data diversity, mapping brain regions to a standard atlas template has become a challenging problem. Machine learning in general and deep learning, in particular, have been providing robust solutions for several neuroimaging tasks, including brain image registration and segmentation. However, these methods require a large amount of data for groundtruth labels, annotated by human experts, which is time-consuming. In this work, we introduce NeuroAtlas, an AI-based framework for atlas generation and brain region segmentation. We showcase an end-to-end solution for brain registration and segmentation by providing i) a deep learning modeling suite with a variety of high-performing model architectures to map a brain atlas onto the input brain section and ii) a Graphical User Interface (GUI)-based plugin for large-scale data annotation with a feature of modifying the predicted labels for active learning. We demonstrate a robust performance of our framework on the human brains, captured through various imaging modalities and age groups, and demonstrate its application for mouse brains as well. NeuroAtlas tool will be open-sourced and entirely compatible with both local as well as cloud-based computing so that users can easily adapt to their neuroimaging custom datasets.',
            url: 'https://www.biorxiv.org/content/10.1101/2024.08.24.609507v1.full.pdf'
        },
        {
            id: 3,
            date: '2023',
            title: '3D Brain Registration with Intensity Shift Robustness',
            authors: 'Hassan Mahmood, Asim Iqbal, Syed Mohammed Shamsul Islam, Syed Afaq Ali Shah',
            conference: 'IEEE International Conference on Image Processing (ICIP)',
            abstract: 'Technological advances in medical imaging are enabling us to understand healthcare datasets in great detail. Machine Learning enabled methods, specifically, deep neural networks are continuously achieving benchmark performances in terms of accuracy and computational efficiency. However, the lack of agreed-upon standard procedures, variations in the devices by different vendors, and artifacts induced by the physical phenomenon in the sensors make the data inconsistent and noisy. These variations in the data are detrimental to the performance of learning-based methods. In this study, we analyze the behavior of traditional and deep learning-based image registration methods and explore strategies to handle the problem of intensity distributional shifts without compromising the performance. To achieve this, we propose an intensity-based loss function and demonstrate that the models trained with our proposed loss function are better at handling unseen data from different sites using machines from different vendors. In addition, our trained model is superior in preserving the boundaries of anatomical regions after registration.',
            url: 'https://ieeexplore.ieee.org/abstract/document/10222341'
        },

        {
            id: 5,
            date: '2020',
            title: 'Exploring Intensity Invariance in Deep Neural Networks for Brain Image Registration',
            authors: 'Hassan Mahmood, Asim Iqbal, Syed Muhammad Shamsul Islam.',
            conference: 'ICML 2024',
            abstract: 'Image registration is a widely-used technique in analysing large scale datasets that are captured through various imaging modalities and techniques in biomedical imaging such as MRI, X-Rays, etc. These datasets are typically collected from various sites and under different imaging protocols using a variety of scanners. Such heterogeneity in the data collection process causes inhomogeneity or variation in intensity (brightness) and noise distribution. These variations play a detrimental role in the performance of image registration, segmentation and detection algorithms. Classical image registration methods are computationally expensive but are able to handle these artifacts relatively better. However, deep learning-based techniques are shown to be computationally efficient for automated brain registration but are sensitive to the intensity variations. In this study, we investigate the effect of variation in intensity distribution among input image pairs for deep learning-based image registration methods. We find a performance degradation of these models when brain image pairs with different intensity distribution are presented even with similar structures. To overcome this limitation, we incorporate a structural similarity-based loss function in a deep neural network and test its performance on the validation split separated before training as well as on a completely unseen new dataset. We report that the deep learning models trained with structure similarity-based loss seems to perform better for both datasets. This investigation highlights a possible performance limiting factor in deep learning-based registration models and suggests a potential solution to incorporate the intensity distribution variation in the input image pairs. Our code and models are available at https://github.com/hassaanmahmood/DeepIntense',
            url: 'https://arxiv.org/pdf/2009.10058'
        },

        {
            id: 4,
            date: '2020',
            title: 'Developmental divergence of sensory stimulus representation in cortical interneurons',
            authors: 'Rahel Kastli, Rasmus Vighagen, Alexander van der Bourg, Ali Özgür Argunsah, Asim Iqbal, Fabian F. Voigt, ... ',
            conference: 'NATURE COMMUNICATIONS',
            abstract: 'Vasocative-intestinal-peptide (VIP+) and somatostatin (SST+) interneurons are involved in modulating barrel cortex activity and perception during active whisking. Here we identify a developmental transition point of structural and functional rearrangements onto these interneurons around the start of active sensation at P14. Using in vivo two-photon Ca2+ imaging, we find that before P14, both interneuron types respond stronger to a multi-whisker stimulus, whereas after P14 their responses diverge, with VIP+ cells losing their multi-whisker preference and SST+ neurons enhancing theirs. Additionally, we find that Ca2+ signaling dynamics increase in precision as the cells and network mature. Rabies virus tracings followed by tissue clearing, as well as photostimulation-coupled electrophysiology reveal that SST+ cells receive higher cross-barrel inputs compared to VIP+ neurons at both time points. In addition, whereas prior to P14 both cell types receive direct input from the sensory thalamus, after P14 VIP+ cells show reduced inputs and SST+ cells largely shift to motor-related thalamic nuclei.',
            url: 'https://www.nature.com/articles/s41467-020-19427-z.epdf?sharing_token=_A3i0M9DSZr8mjZoBciHZdRgN0jAjWel9jnR3ZoTv0O4nlEKn8gH8hYnpQyBThyJCelp_hJsCNAXEchOQ6MTj5Gmm-FuaOPipr0gwgobC07EJU6mzv8iXE7mX1VKMBEqM5HIzC8FoObblf7LkshCnJM4QoDxvFYERN3a9abjUXY%3D'
        },

        {
            id: 1,
            date: '2024',
            title: 'CellSeg3D: self-supervised 3D cell segmentation for microscopy',
            authors: 'Cyril Achard, Timokleia Kousi, Markus Frey, Maxime Vidal, Yves Paychere, Colin Hofmann, Asim Iqbal, Sebastien B Hausmann, Stephane Pages, Mackenzie W Mathis',
            conference: 'bioRxiv',
            abstract: 'Understanding the complex three-dimensional structure of cells is crucial across many disciplines in biology and especially in neuroscience. Here, we introduce a novel 3D self-supervised learning method designed to address the inherent complexity of quantifying cells in 3D volumes, often in cleared neural tissue. We offer a new 3D mesoSPIM dataset and show that CellSeg3D can match state-of-the-art supervised methods. Our contributions are made accessible through a Python package with full GUI integration in napari.',
            url: 'https://www.biorxiv.org/content/biorxiv/early/2024/05/17/2024.05.17.594691.full.pdf'
        },
        
        {
            id: 7,
            date: '2023',
            title: 'Domain-Invariant Brainstem Nuclei Segmentation and Signal Quantification',
            authors: 'Julia Kaiser, Dana Luong, Eunseo Sung, Asim Iqbal, Vibhu Sahni',
            conference: 'bioRxiv',
            abstract: 'Brainstem nuclei are hard to distinguish due to very few distinctive features which makes detecting them with high accuracy extremely difficult. We introduce StARQ that builds on SeBRe, a deep learning-based framework to segment regions of interest. StARQ provides new functionalities for automated segmentation of brainstem nuclei at high granularity, and quantification of underlying neural features such as axonal tracings, and synaptic punctae. StARQ will serve as a toolbox for generalized brainstem analysis, enabling reliable high-throughput computational analysis with open-source models.',
            url: 'https://www.biorxiv.org/content/biorxiv/early/2023/11/11/2023.11.07.566040.full.pdf'
        },
        {
            id: 8,
            date: '2020',
            title: 'Exploring intensity invariance in deep neural networks for brain image registration',
            authors: 'Hassan Mahmood, Asim Iqbal, Syed Mohammed Shamsul Islam',
            conference: 'IEEE Digital Image Computing: Techniques and Applications (DICTA)',
            abstract: "Image registration is a widely-used technique in analysing large scale datasets that are captured through various imaging modalities and techniques in biomedical imaging such as MRI, X-Rays, etc. These datasets are typically collected from various sites and under different imaging protocols using a variety of scanners. Such heterogeneity in the data collection process causes inhomogeneity or variation in intensity (brightness) and noise distribution. These variations play a detrimental role in the performance of image registration, segmentation and detection algorithms. Classical image registration methods are computationally expensive but are able to handle these artifacts relatively better. However, deep learning-based techniques are shown to be computationally efficient for automated brain registration but are sensitive to the intensity variations. In this study, we investigate the effect of variation in intensity distribution among input image pairs for deep learning-based image registration methods. We find a performance degradation of these models when brain image pairs with different intensity distribution are presented even with similar structures. To overcome this limitation, we incorporate a structural similarity-based loss function in a deep neural network and test its performance on the validation split separated before training as well as on a completely unseen new dataset. We report that the deep learning models trained with structure similarity-based loss seems to perform better for both datasets. This investigation highlights a possible performance limiting factor in deep learning-based registration models and suggests a potential solution to incorporate the intensity distribution variation in the input image pairs. Our code and models are available at https://github.com/hassaanmahmood/DeepIntense.",
            url: 'https://arxiv.org/pdf/2009.10058'
        },
        {
            id: 9,
            date: '2019',
            title: 'DeNeRD: high-throughput detection of neurons for brain-wide analysis with deep learning',
            authors: 'Asim Iqbal, Asfandyar Sheikh, Theofanis Karayannis',
            conference: 'Nature Publishing Group',
            abstract: "Mapping the structure of the mammalian brain at cellular resolution is a challenging task and one that requires capturing key anatomical features at the appropriate level of analysis. Although neuroscientific methods have managed to provide significant insights at the micro and macro level, in order to obtain a whole-brain analysis at a cellular resolution requires a meso-scopic approach. A number of methods can be currently used to detect and count cells, with, nevertheless, significant limitations when analyzing data of high complexity. To overcome some of these constraints, we introduce a fully automated Artificial Intelligence (AI)-based method for whole-brain image processing to Detect Neurons in different brain Regions during Development (DeNeRD). We demonstrate a high performance of our deep neural network in detecting neurons labeled with different genetic markers in a range of imaging planes and imaging modalities.",
            url: 'https://www.nature.com/articles/s41598-019-50137-9.pdf'
        },
        {
            id: 10,
            date: '2019',
            title: 'A deeply learned brain atlas',
            authors: 'Nina Vogt, Asim Iqbal, Chen Yuncong',
            conference: 'Nature Methods',
            abstract: "Segmenting and registration of brain imaging datasets can be a tedious and time-consuming task. Iqbal et al. now use a deep learning approach, which they call SeBRe, to facilitate this task for Nissl-stained, fluorescence, and even magnetic resonance image datasets. They trained a deep neural network to segment and classify eight different regions in the mouse brain. After training, SeBRe could segment and register other datasets with a precision of 0.84, and similar performance could be achieved even if the brains were stained for previously unseen markers or imaged with a different microscopy modality. While SeBRe registers the image datasets to an existing brain atlas such as the Allen Brain Atlas, Chen et al. went a step further. They used convolutional neural networks to build a mouse brain atlas from scratch. This brain atlas is active and can be augmented with additional datasets. Furthermore, it preserves information on the variance between datasets. Both pipelines automate the processing of anatomical brain datasets and should substantially speed up the mapping of neurons and brain regions.",
            url: 'https://www.nature.com/articles/s41592-019-0522-8.pdf'
        },
        {
            id: 11,
            date: '2019',
            title: 'Developing a brain atlas through deep learning',
            authors: 'Asim Iqbal, Romesa Khan, Theofanis Karayannis',
            conference: 'Nature Machine Intelligence',
            abstract: "Neuroscientists have devoted significant effort into the creation of standard brain reference atlases for high-throughput registration of anatomical regions of interest. However, variability in brain size and form across individuals poses a significant challenge for such reference atlases. To overcome these limitations, we introduce a fully automated deep neural networkbased method (SeBRe) for registration through Segmenting Brain Regions of interest with minimal human supervision. We demonstrate the validity of our method on brain images from different mouse developmental time points, across a range of neuronal markers and imaging modalities. We further assess the performance of our method on images from MR-scanned human brains. Our registration method can accelerate brain-wide exploration of region-specific changes in brain development and, by simply segmenting brain regions of interest for highthroughput brain-wide analysis, provides an alternative to existing complex brain registration techniques.",
            url: 'https://rdcu.be/b4DfW'
        },
        {
            id: 12,
            date: '2018',
            title: 'Exploring brain-wide development of inhibition through deep learning',
            authors: 'Asim Iqbal, Asfandyar Sheikh, Theofanis Karayannis',
            conference: 'arXiv',
            abstract: 'We introduce here a fully automated convolutional neural network-based method for brain image processing to Detect Neurons in different brain Regions during Development (DeNeRD). Our method takes a developing mouse brain as input and i) registers the brain sections against a developing mouse reference atlas, ii) detects various types of neurons, and iii) quantifies the neural density in many unique brain regions at different postnatal (P) time points. Our method is invariant to the shape, size and expression of neurons and by using DeNeRD, we compare the brain-wide neural density of all GABAergic neurons in developing brains of ages P4, P14 and P56. We discover and report 6 different clusters of regions in the mouse brain in which GABAergic neurons develop in a differential manner from early age (P4) to adulthood (P56). These clusters reveal key steps of GABAergic cell development that seem to track with the functional development of diverse brain regions as the mouse transitions from a passive receiver of sensory information (<P14) to an active seeker (>P14).',
            url: 'https://arxiv.org/pdf/1807.03238'
        },
        ];
    
    

    const listContainer = document.getElementById('publication-lists');
    const showMoreButton = document.getElementById('show-more');
    const showLessButton = document.getElementById('show-less');
    const initialVisibleCount = 3;
    let isExpanded = false;

    function createList(data) {
        const list = document.createElement('div');
        list.className = 'list';
        const authorsList = data.authors.split(', '); // Assuming authors are separated by ", "
        const displayedAuthors = authorsList.length > 5 ? authorsList.slice(0, 5).join(', ') + ', ...' : authorsList.join(', ');

        list.innerHTML = `
            <div class="inner-border"></div>
            <div class="date">${data.date}</div>
            <div class="list-body">
                <div class="list-title">${data.title}</div>
                <div class="authors">${displayedAuthors}</div>
                <div class="conference">${data.conference}</div>
            </div>
            <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16L16 12L12 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        listContainer.appendChild(list);

        list.addEventListener('click', () => {
            sessionStorage.setItem('selectedPublicationId', data.id);
            window.location.href = 'abstract.html';
        });
    }

    function displayPublications(count) {
        listContainer.innerHTML = '';
        publications.slice(0, count).forEach(pub => createList(pub));
        
        if (count >= publications.length) {
            showMoreButton.style.display = 'none';
            showLessButton.style.display = 'block';
        } else {
            showMoreButton.style.display = 'block';
            showLessButton.style.display = 'none';
        }
    }

    showMoreButton.addEventListener('click', () => {
        if (!isExpanded) {
            displayPublications(publications.length);
            isExpanded = true;
        }
    });

    showLessButton.addEventListener('click', () => {
        if (isExpanded) {
            displayPublications(initialVisibleCount);
            isExpanded = false;
        }
    });

    // Initial display
    displayPublications(initialVisibleCount);
});