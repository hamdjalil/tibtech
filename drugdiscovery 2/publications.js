document.addEventListener("DOMContentLoaded", () => {
    const publications = [
        {
            id: 1,
            date: '2019',
            title: 'Developing Brain Atlas through Deep Learning ',
            authors: 'Rahel Kastli, Rasmus Vighagen, Alexander van der Bourg, Ali Özgür Argunsah, Asim Iqbal, Fabian F. Voigt, ... ',
            conference: 'Nature Publishing Group',
            abstract: "Neuroscientists have devoted significant effort into the creation of standard brain reference atlases for high-throughput registration of anatomical regions of interest. However, variability in brain size and form across individuals poses a significant challenge for such reference atlases. To overcome these limitations, we introduce a fully automated deep neural networkbased method (SeBRe) for registration through Segmenting Brain Regions of interest with minimal human supervision. We demonstrate the validity of our method on brain images from different mouse developmental time points, across a range of neuronal markers and imaging modalities. We further assess the performance of our method on images from MR-scanned human brains. Our registration method can accelerate brain-wide exploration of region-specific changes in brain development and, by simply segmenting brain regions of interest for highthroughput brain-wide analysis, provides an alternative to existing complex brain registration techniques.",
            url: 'https://arxiv.org/pdf/1807.03440'
        },
        {
            id: 2,
            date: '2020',
            title: 'Developmental divergence of sensory stimulus representation in cortical interneurons',
            authors: 'Rahel Kastli, Rasmus Vighagen, Alexander van der Bourg, Ali Özgür Argunsah, Asim Iqbal, Fabian F. Voigt, ... ',
            conference: 'NATURE COMMUNICATIONS',
            abstract: 'Vasocative-intestinal-peptide (VIP+) and somatostatin (SST+) interneurons are involved in modulating barrel cortex activity and perception during active whisking. Here we identify a developmental transition point of structural and functional rearrangements onto these interneurons around the start of active sensation at P14. Using in vivo two-photon Ca2+ imaging, we find that before P14, both interneuron types respond stronger to a multi-whisker stimulus, whereas after P14 their responses diverge, with VIP+ cells losing their multi-whisker preference and SST+ neurons enhancing theirs. Additionally, we find that Ca2+ signaling dynamics increase in precision as the cells and network mature. Rabies virus tracings followed by tissue clearing, as well as photostimulation-coupled electrophysiology reveal that SST+ cells receive higher cross-barrel inputs compared to VIP+ neurons at both time points. In addition, whereas prior to P14 both cell types receive direct input from the sensory thalamus, after P14 VIP+ cells show reduced inputs and SST+ cells largely shift to motor-related thalamic nuclei.',
            url: 'https://www.nature.com/articles/s41467-020-19427-z.epdf?sharing_token=_A3i0M9DSZr8mjZoBciHZdRgN0jAjWel9jnR3ZoTv0O4nlEKn8gH8hYnpQyBThyJCelp_hJsCNAXEchOQ6MTj5Gmm-FuaOPipr0gwgobC07EJU6mzv8iXE7mX1VKMBEqM5HIzC8FoObblf7LkshCnJM4QoDxvFYERN3a9abjUXY%3D'
        },
        {
            id: 3,
            date: '2020',
            title: 'Exploring Intensity Invariance in Deep Neural Networks for Brain Image Registration',
            authors: 'Hassan Mahmood, Asim Iqbal, Syed Muhammad Shamsul Islam.',
            conference: 'ICML 2024',
            abstract: 'Image registration is a widely-used technique in analysing large scale datasets that are captured through various imaging modalities and techniques in biomedical imaging such as MRI, X-Rays, etc. These datasets are typically collected from various sites and under different imaging protocols using a variety of scanners. Such heterogeneity in the data collection process causes inhomogeneity or variation in intensity (brightness) and noise distribution. These variations play a detrimental role in the performance of image registration, segmentation and detection algorithms. Classical image registration methods are computationally expensive but are able to handle these artifacts relatively better. However, deep learning-based techniques are shown to be computationally efficient for automated brain registration but are sensitive to the intensity variations. In this study, we investigate the effect of variation in intensity distribution among input image pairs for deep learning-based image registration methods. We find a performance degradation of these models when brain image pairs with different intensity distribution are presented even with similar structures. To overcome this limitation, we incorporate a structural similarity-based loss function in a deep neural network and test its performance on the validation split separated before training as well as on a completely unseen new dataset. We report that the deep learning models trained with structure similarity-based loss seems to perform better for both datasets. This investigation highlights a possible performance limiting factor in deep learning-based registration models and suggests a potential solution to incorporate the intensity distribution variation in the input image pairs. Our code and models are available at https://github.com/hassaanmahmood/DeepIntense',
            url: 'https://arxiv.org/pdf/2009.10058'
        },
        {
            id: 4,
            date: '21 July 2024',
            title: 'Levels of AGI for Operationalizing Progress on the Path to AGI',
            authors: 'Meredith Ringel Morris, et al.',
            conference: 'ICML 2024',
            abstract: 'Further discussion on methodological approaches to AGI development, emphasizing scalability and ethical considerations.',
            url: 'https://proceedings.icml.cc/paper/2024'
        },
        {
            id: 5,
            date: '21 July 2024',
            title: 'Levels of AGI for Operationalizing Progress on the Path to AGI',
            authors: 'Meredith Ringel Morris, et al.',
            conference: 'ICML 2024',
            abstract: 'Analysis of the impact of AGI technologies on various sectors, with proposals for future research directions.',
            url: 'https://proceedings.icml.cc/paper/2024'
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