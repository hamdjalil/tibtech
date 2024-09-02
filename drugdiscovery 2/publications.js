document.addEventListener("DOMContentLoaded", () => {
    const publications = [
        {
            id: 1,
            date: '2024',
            title: 'Segment AnyNeuron',
            authors: 'Taha Razzaq, Ahmed Qazi, Asim Iqbal',
            conference: 'bioRxiv',
            abstract: "Image segmentation plays an integral part in neuroimage analysis and is crucial for understanding brain disorders. Deep Learning (DL) models have shown exponential success in computer vision tasks over the years, including image segmentation. However, to achieve optimal performance, DL models require extensive annotated data for training, which is often the bottleneck to expediting brain-wide image analysis. For segmenting cellular structures such as neurons, the annotation process is cumbersome and time-consuming due to the inherent structural, intensity, and background variations present in the data caused by genetic markers, imaging techniques, etc. We propose an Active Learning-based neuron segmentation framework (Segment AnyNeuron), which incorporates state-of-the-art image segmentation modules - Detectron2 and HQ SAM, and requires minimal ground truth annotation to achieve high precision for brain-wide segmentation of neurons. Our framework can classify and segment completely unseen neuronal data by selecting the most representative samples for manual annotation, thus avoiding the cold-start problem common in Active Learning. We demonstrate the effectiveness of our framework for automated brain-wide segmentation of neurons on a variety of open-source neuron imaging datasets, acquired from different scanners and a variety of transgenic mouse lines.",
            url: 'https://www.biorxiv.org/content/10.1101/2024.08.24.609505v1.full.pdf'
        },
        {
            id: 2,
            date: '2024',
            title: 'NeuroAtlas: An Artificial Intelligence-based Framework for Annotation, <br> Segmentation and Registration of Large Scale Biomedical Imaging Data',
            authors: 'Hassan Mahmood, Farah Nawar, Syed Mohammed Shamsul Islam, Asim Iqbal',
            conference: 'bioRxiv',
            abstract: 'With increasing neuroimaging modalities and data diversity, mapping brain regions to a standard atlas template has become a challenging problem. Machine learning in general and deep learning, in particular, have been providing robust solutions for several neuroimaging tasks, including brain image registration and segmentation. However, these methods require a large amount of data for groundtruth labels, annotated by human experts, which is time-consuming. In this work, we introduce NeuroAtlas, an AI-based framework for atlas generation and brain region segmentation. We showcase an end-to-end solution for brain registration and segmentation by providing i) a deep learning modeling suite with a variety of high-performing model architectures to map a brain atlas onto the input brain section and ii) a Graphical User Interface (GUI)-based plugin for large-scale data annotation with a feature of modifying the predicted labels for active learning. We demonstrate a robust performance of our framework on the human brains, captured through various imaging modalities and age groups, and demonstrate its application for mouse brains as well. NeuroAtlas tool will be open-sourced and entirely compatible with both local as well as cloud-based computing so that users can easily adapt to their neuroimaging custom datasets.',
            url: 'https://www.biorxiv.org/content/10.1101/2024.08.24.609507v1.full.pdf'
        },
        {
            id: 3,
            date: '2024',
            title: 'Multimodal 3D Image Registration for Mapping Brain Disorders',
            authors: 'Hassan Mahmood, Syed Mohammed Shamsul Islam, Asim Iqbal',
            conference: 'bioRxiv',
            abstract: 'We introduce an AI-driven approach for robust 3D brain image registration, addressing challenges posed by diverse hardware scanners and imaging sites. Our model trained using an SSIM-driven loss function, prioritizes structural coherence over voxel-wise intensity matching, making it uniquely robust to inter-scanner and intra-modality variations. This innovative end-to-end framework combines global alignment and non-rigid registration modules, specifically designed to handle structural, intensity, and domain variances in 3D brain imaging data. Our approach outperforms the baseline model in handling these shifts, achieving results that align closely with clinical ground-truth measurements. We demonstrate its efficacy on 3D brain data from healthy individuals and dementia patients, with particular success in quantifying brain atrophy, a key biomarker for Alzheimer’s disease and other brain disorders. By effectively managing variability in multisite, multi-scanner neuroimaging studies, our approach enhances the precision of atrophy measurements for clinical trials and longitudinal studies. This advancement promises to improve diagnostic and prognostic capabilities for neurodegenerative disorders.',
            url: 'https://www.biorxiv.org/content/10.1101/2024.08.24.609508v1.full.pdf'
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
            id: 5,
            date: '2020',
            title: 'Exploring Intensity Invariance in Deep Neural Networks for Brain Image Registration',
            authors: 'Hassan Mahmood, Asim Iqbal, Syed Muhammad Shamsul Islam.',
            conference: 'ICML 2024',
            abstract: 'Image registration is a widely-used technique in analysing large scale datasets that are captured through various imaging modalities and techniques in biomedical imaging such as MRI, X-Rays, etc. These datasets are typically collected from various sites and under different imaging protocols using a variety of scanners. Such heterogeneity in the data collection process causes inhomogeneity or variation in intensity (brightness) and noise distribution. These variations play a detrimental role in the performance of image registration, segmentation and detection algorithms. Classical image registration methods are computationally expensive but are able to handle these artifacts relatively better. However, deep learning-based techniques are shown to be computationally efficient for automated brain registration but are sensitive to the intensity variations. In this study, we investigate the effect of variation in intensity distribution among input image pairs for deep learning-based image registration methods. We find a performance degradation of these models when brain image pairs with different intensity distribution are presented even with similar structures. To overcome this limitation, we incorporate a structural similarity-based loss function in a deep neural network and test its performance on the validation split separated before training as well as on a completely unseen new dataset. We report that the deep learning models trained with structure similarity-based loss seems to perform better for both datasets. This investigation highlights a possible performance limiting factor in deep learning-based registration models and suggests a potential solution to incorporate the intensity distribution variation in the input image pairs. Our code and models are available at https://github.com/hassaanmahmood/DeepIntense',
            url: 'https://arxiv.org/pdf/2009.10058'
        },
        {
            id: 7,
            date: '21 July 2024',
            title: 'Levels of AGI for Operationalizing Progress on the Path to AGI',
            authors: 'Meredith Ringel Morris, et al.',
            conference: 'ICML 2024',
            abstract: 'Conclusion of the series with a comprehensive review of AGI advancements and predictions for next-generation AI systems.',
            url: 'https://proceedings.icml.cc/paper/2024'
        },
        {
            id: 8,
            date: '21 July 2024',
            title: 'Levels of AGI for Operationalizing Progress on the Path to AGI',
            authors: 'Meredith Ringel Morris, et al.',
            conference: 'ICML 2024',
            abstract: 'Conclusion of the series with a comprehensive review of AGI advancements and predictions for next-generation AI systems.',
            url: 'https://proceedings.icml.cc/paper/2024'
        },
        {
            id: 9,
            date: '21 July 2024',
            title: 'Levels of AGI for Operationalizing Progress on the Path to AGI',
            authors: 'Meredith Ringel Morris, et al.',
            conference: 'ICML 2024',
            abstract: 'Conclusion of the series with a comprehensive review of AGI advancements and predictions for next-generation AI systems.',
            url: 'https://proceedings.icml.cc/paper/2024'
        },
        {
            id: 10,
            date: '21 July 2024',
            title: 'Levels of AGI for Operationalizing Progress on the Path to AGI',
            authors: 'Meredith Ringel Morris, et al.',
            conference: 'ICML 2024',
            abstract: 'Conclusion of the series with a comprehensive review of AGI advancements and predictions for next-generation AI systems.',
            url: 'https://proceedings.icml.cc/paper/2024'
        },
        {
            id: 11,
            date: '21 July 2024',
            title: 'Levels of AGI for Operationalizing Progress on the Path to AGI',
            authors: 'Meredith Ringel Morris, et al.',
            conference: 'ICML 2024',
            abstract: 'Conclusion of the series with a comprehensive review of AGI advancements and predictions for next-generation AI systems.',
            url: 'https://proceedings.icml.cc/paper/2024'
        },
        {
            id: 12,
            date: '21 July 2024',
            title: 'Levels of AGI for Operationalizing Progress on the Path to AGI',
            authors: 'Meredith Ringel Morris, et al.',
            conference: 'ICML 2024',
            abstract: 'Conclusion of the series with a comprehensive review of AGI advancements and predictions for next-generation AI systems.',
            url: 'https://proceedings.icml.cc/paper/2024'
        },
        {
            id: 13,
            date: '21 July 2024',
            title: 'Levels of AGI for Operationalizing Progress on the Path to AGI',
            authors: 'Meredith Ringel Morris, et al.',
            conference: 'ICML 2024',
            abstract: 'Conclusion of the series with a comprehensive review of AGI advancements and predictions for next-generation AI systems.',
            url: 'https://proceedings.icml.cc/paper/2024'
        }
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