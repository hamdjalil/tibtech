document.addEventListener("DOMContentLoaded", () => {
    const publications = [
        {
            id: 1,
            date: '2024',
            title: 'An enhancer-AAV toolbox to target and manipulate distinct interneuron subtypes',
            authors: 'Elisabetta Furlanis, Min Dai, Brenda Leyva Garcia, Josselyn Vergara, Ana Pereira, Kenneth Pelkey, Thien Tran, Bram L Gorissen, Anna Vlacho, Ariel Hairston, Shuhan Huang, Deepanjali Dwivedi, Sarah Du, Sara Wills, Justin McMahon, Anthony T Lee, Edward F Chang, Taha Razzaq, Ahmed Qazi, Geoffrey Vargish, Xiaoqing Yuan, Adam Caccavano, Steven Hunt, Ramesh Chittajallu, Nadiya McLean, Lauren Hewit, Emily Paranzino, Haley Rice, Alex C Cummins, Anya Plotnikova, Arya Mohanty, Anne Claire Tangen, Jung Hoon Shin, Reza Azadi, Mark AG Eldridge, Veronica A Alvarez, Bruno B Averbeck, Mansour Alyahyay, Tania Reyes Vallejo, Mohammed Soheib, Lucas G Vattino, Cathryn P MacGregor, Emmie Banks, Viktor Janos Olah, Shovan Naskar, Sophie Hill, Sophie Liebergall, Rohan Badiani, Lili Hyde, Qing Xu, Kathryn C Allaway, Ethan M Goldberg, Tomasz J Nowakowski, Soohyun Lee, Anne E Takesian, Leena A Ibrahim, Asim Iqbal, Chris J McBain, Jordane Dimidschstein, Gord Fishell, Yating Wang',
            conference: 'bioRxiv',
            abstract: 'In recent years, we and others have identified a number of enhancers that, when incorporated into rAAV vectors, can restrict the transgene expression to particular neuronal populations. Yet, viral tools to access and manipulate fine neuronal subtypes are still limited. Here, we performed systematic analysis of single cell genomic data to identify enhancer candidates for each of the cortical interneuron subtypes. We established a set of enhancer-AAV tools that are highly specific for distinct cortical interneuron populations and striatal cholinergic neurons. These enhancers, when used in the context of different effectors, can target (fluorescent proteins), observe activity (GCaMP) and manipulate (opto- or chemo-genetics) specific neuronal subtypes. We also validated our enhancer-AAV tools across species. Thus, we provide the field with a powerful set of tools to study neural circuits and functions and to develop precise and targeted therapy',
            url: 'https://www.biorxiv.org/content/biorxiv/early/2024/07/22/2024.07.17.603924.full.pdf'
        },
        {
            id: 23,  
            date: '2024',
            title: 'Biologically Realistic Computational Primitives of Neocortex Implemented on<br>Neuromorphic Hardware Improve Vision Transformer Performance',
            authors: 'Asim Iqbal, Hassan Mahmood, Greg Stuart, Gordon Fishell, Suraj Honnuraiah',
            conference: 'bioRxiv',
            abstract: 'Understanding the computational principles of the brain and replicating them on neuromorphic hardware and modern deep learning architectures is crucial for advancing neuro-inspired AI (NeuroAI). Here, we develop an experimentally-constrained biophysical network model of neocortical circuit motifs, focusing on layers 2-3 of the primary visual cortex (V1). We investigate the role of four major cortical interneuron classes in a competitive-cooperative computational primitive and validate these circuit motifs implemented soft winner-take-all (sWTA) computation for gain modulation, signal restoration, and context-dependent multistability. Using a novel parameter mapping technique, we configured IBM\'s TrueNorth (TN) chip to implement sWTA computations, mirroring biological neural dynamics. Retrospectively, we observed a strong correspondence between the biophysical model and the TN hardware parameters, particularly in the roles of four key inhibitory neuron classes: Parvalbumin (feedforward inhibition), Somatostatin (feedback inhibition), VIP (disinhibition), and LAMP5 (gain normalization). Moreover, the sparse coupling of this sWTA motif was also able to simulate a two-state neural state machine on the TN chip, replicating working memory dynamics essential for cognitive tasks. Additionally, integrating the sWTA computation as a pre-processing layer in the Vision Transformer (ViT) enhanced its performance on the MNIST digit classification task, demonstrating improved generalization to previously unseen data and suggesting a mechanism akin to zero-shot learning.',
            url: 'https://www.biorxiv.org/content/10.1101/2024.10.06.616839v1.full'
        },
        {
            id: 22,
            date: '2024',
            title: 'Segment AnyNeuron',
            authors: 'Taha Razzaq, Ahmed Qazi, Asim Iqbal',
            conference: 'bioRxiv',
            abstract: 'Image segmentation plays an integral part in neuroimage analysis and is crucial for understanding brain disorders. Deep Learning (DL) models have shown exponential success in computer vision tasks over the years, including image segmentation. However, to achieve optimal performance, DL models require extensive annotated data for training, which is often the bottleneck to expediting brain-wide image analysis. For segmenting cellular structures such as neurons, the annotation process is cumbersome and time-consuming due to the inherent structural, intensity, and background variations present in the data caused by genetic markers, imaging techniques, etc. We propose an Active Learning-based neuron segmentation framework (Segment AnyNeuron), which incorporates state-of-the-art image segmentation modules - Detectron2 and HQ SAM, and requires minimal ground truth annotation to achieve high precision for brain-wide segmentation of neurons. Our framework can classify and segment completely unseen neuronal data by selecting the most representative samples for manual annotation, thus avoiding the cold-start problem common in Active Learning. We demonstrate the effectiveness of our framework for automated brain-wide segmentation of neurons on a variety of open-source neuron imaging datasets, acquired from different scanners and a variety of transgenic mouse lines.',
            url: 'https://www.biorxiv.org/content/10.1101/2024.08.24.609505v1.full.pdf'
        },

        {
            id: 24,
            date: '2024',
            title: 'NeuReg: Domain-invariant 3D Image Registration on Human and Mouse Brains',
            authors: 'Taha Razzaq, Asim Iqbal',
            conference: 'arXiv',
            abstract: 'Medical brain imaging relies heavily on image registration to accurately curate structural boundaries of brain features for various healthcare applications. Deep learning models have shown remarkable performance in image registration in recent years. Still, they often struggle to handle the diversity of 3D brain volumes, challenged by their structural and contrastive variations and their imaging domains. In this work, we present NeuReg, a Neuro-inspired 3D image registration architecture with the feature of domain invariance. NeuReg generates domain-agnostic representations of imaging features and incorporates a shifting window-based Swin Transformer block as the encoder. This enables our model to capture the variations across brain imaging modalities and species. We demonstrate a new benchmark in multi-domain publicly available datasets comprising human and mouse 3D brain volumes. Extensive experiments reveal that our model (NeuReg) outperforms the existing baseline deep learning-based image registration models and provides a high-performance boost on cross-domain datasets, where models are trained on "source-only" domain and tested on completely "unseen" target domains. Our work establishes a new state-of-the-art for domain-agnostic 3D brain image registration, underpinned by Neuro-inspired Transformer-based architecture.',
            url: 'https://arxiv.org/pdf/2411.06315'
        },

        {
            id: 25,
            date: '2024',
            title: 'MortX: A Domain Generalization Benchmark for Mouse Cortex Segmentation and Registration',
            authors: 'Asim Iqbal, Romesa Khan, Edith M. Schneider Gasser, Theofanis Karayannis',
            conference: 'bioRxiv',
            abstract: 'Mesoscale understanding of human brain development is crucial for understanding neurodevelopmental disorders. By applying AI techniques to analyze high-resolution, multi-modal brain imaging datasets across postnatal ages, researchers can study cortical development at the granular level. We introduce MortX, a benchmark dataset of the developing mouse cortex that captures multiple postnatal stages with annotations for distinct anatomical and functional subregions and layers. MortX features high-resolution imaging data including bright-field and fluorescence-labeled neuronal markers. We developed a standardized cortical atlas of genetic markers and manually registered it to brain section images for ground-truth labeling. The dataset serves as a benchmark for domain generalization in neuroimaging, enabling both classical and deep learning models to be trained on source brains and tested on unseen targets. Our results demonstrate generalized model performance and structural invariance across ages. We open-source MortX as a community resource for mouse brain segmentation and registration, emphasizing domain adaptation. This dataset addresses key challenges in mouse brain imaging and advances machine learning models that will help unravel neurodevelopmental disorders.',
            url: 'https://www.biorxiv.org/content/10.1101/2024.11.30.626208v1.full.pdf'
        },
        
        {
            id: 20,
            date: '2024',
            title: 'Multimodal 3D Image Registration for Mapping Brain Disorders',
            authors: 'Hassan Mahmood, Syed Mohammed Shamsul Islam, Asim Iqbal',
            conference: 'bioRxiv',
            abstract: 'We introduce an AI-driven approach for robust 3D brain image registration, addressing challenges posed by diverse hardware scanners and imaging sites. Our model trained using an SSIM-driven loss function, prioritizes structural coherence over voxel-wise intensity matching, making it uniquely robust to inter-scanner and intra-modality variations. This innovative end-to-end framework combines global alignment and non-rigid registration modules, specifically designed to handle structural, intensity, and domain variances in 3D brain imaging data. Our approach outperforms the baseline model in handling these shifts, achieving results that align closely with clinical ground-truth measurements. We demonstrate its efficacy on 3D brain data from healthy individuals and dementia patients, with particular success in quantifying brain atrophy, a key biomarker for Alzheimer’s disease and other brain disorders. By effectively managing variability in multisite, multi-scanner neuroimaging studies, our approach enhances the precision of atrophy measurements for clinical trials and longitudinal studies. This advancement promises to improve diagnostic and prognostic capabilities for neurodegenerative disorders.',
            url: 'https://www.biorxiv.org/content/10.1101/2024.08.24.609508v1.full.pdf'
        },

        {
            id: 21,
            date: '2024',
            title: 'NeuroAtlas: An Artificial Intelligence-based Framework for Annotation,<br> Segmentation and Registration of Large Scale Biomedical Imaging Data',
            authors: 'Hassan Mahmood, Farah Nawar, Syed Mohammed Shamsul Islam, Asim Iqbal',
            conference: 'bioRxiv',
            abstract: 'With increasing neuroimaging modalities and data diversity, mapping brain regions to a standard atlas template has become a challenging problem. Machine learning in general and deep learning, in particular, have been providing robust solutions for several neuroimaging tasks, including brain image registration and segmentation. However, these methods require a large amount of data for groundtruth labels, annotated by human experts, which is time-consuming. In this work, we introduce NeuroAtlas, an AI-based framework for atlas generation and brain region segmentation. We showcase an end-to-end solution for brain registration and segmentation by providing i) a deep learning modeling suite with a variety of high-performing model architectures to map a brain atlas onto the input brain section and ii) a Graphical User Interface (GUI)-based plugin for large-scale data annotation with a feature of modifying the predicted labels for active learning. We demonstrate a robust performance of our framework on the human brains, captured through various imaging modalities and age groups, and demonstrate its application for mouse brains as well. NeuroAtlas tool will be open-sourced and entirely compatible with both local as well as cloud-based computing so that users can easily adapt to their neuroimaging custom datasets.',
            url: 'https://www.biorxiv.org/content/10.1101/2024.08.24.609507v1.full.pdf'
        },

        {
            id: 2,
            date: '2024',
            title: 'AnimalFormer: Multimodal Vision Framework for Behavior-based Precision Livestock Farming',
            authors: 'Ahmed Qazi, Taha Razzaq, Asim Iqbal',
            conference: 'Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition',
            abstract: 'We introduce a multimodal vision framework for precision livestock farming, harnessing the power of GroundingDINO, HQSAM, and ViTPose models. This integrated suite enables comprehensive behavioral analytics from video data without invasive animal tagging. GroundingDINO generates accurate bounding boxes around livestock, while HQSAM segments individual animals within these boxes. ViTPose estimates key body points, facilitating posture and movement analysis. Demonstrated on a sheep dataset with grazing, running, sitting, standing, and walking activities, our framework extracts invaluable insights:activity and grazing patterns, interaction dynamics, and detailed postural evaluations. Applicable across species and video resolutions, this framework revolutionizes noninvasive livestock monitoring for activity detection, counting, health assessments, and posture analyses. It empowers data-driven farm management, optimizing animal welfare and productivity through AI-powered behavioral understanding.',
            url: 'https://openaccess.thecvf.com/content/CVPR2024W/Vision4Ag/papers/Qazi_AnimalFormer_Multimodal_Vision_Framework_for_Behavior-based_Precision_Livestock_Farming_CVPRW_2024_paper.pdf'
        },

        {
            id: 3,
            date: '2024',
            title: 'ExerAIde: AI-assisted Multimodal Diagnosis for Enhanced Sports Performance and Personalised Rehabilitation',
            authors: 'Ahmed Qazi, Asim Iqbal',
            conference: 'Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition',
            abstract: 'The quest for personalized sports therapy has long been a concern for practitioners and patients alike, aiming for recovery protocols that transcend the one-size-fits-all approach. In this study, we introduce a novel framework for personalized sports therapy through automated joint movement analysis. By synthesizing the analytical capabilities of a Random Forest Classifier (RFC) with a Vector Quantized Variational AutoEncoder (VQ-VAE), we systematically discern the nuanced kinematic differences between healthy and pathological exercise movements. The RFC prioritizes the joints by their discriminative influence on movement healthiness, which informs the VQ-VAE’s derivation of a distilled list of pivotal joints. This dual-model approach not only identifies a hierarchy of joint importance but also ascertains the minimal subset of joints critical for distinguishing between healthy and unhealthy movement patterns. The resultant data-driven insight into joint-specific dynamics underpins the development of targeted, individualized rehabilitation programs. Our results exhibit promising directions in sports therapy, showcasing the potential of machine learning in developing personalized therapeutic interventions.',
            url: 'https://openaccess.thecvf.com/content/CVPR2024W/CVsports/papers/Qazi_ExerAIde_AI-assisted_Multimodal_Diagnosis_for_Enhanced_Sports_Performance_and_Personalised_CVPRW_2024_paper.pdf'
        },
        {
            id: 4,
            date: '2024',
            title: 'CellSeg3D: self-supervised 3D cell segmentation for microscopy',
            authors: 'Cyril Achard, Timokleia Kousi, Markus Frey, Maxime Vidal, Yves Paychere, Colin Hofmann, Asim Iqbal, Sebastien B Hausmann, Stephane Pages, Mackenzie W Mathis',
            conference: 'eLife',
            abstract: 'Understanding the complex three-dimensional structure of cells is crucial across many disciplines in biology and especially in neuroscience. Here, we introduce a novel 3D self-supervised learning method designed to address the inherent complexity of quantifying cells in 3D volumes, often in cleared neural tissue. We offer a new 3D mesoSPIM dataset and show that CellSeg3D can match state-of-the-art supervised methods. Our contributions are made accessible through a Python package with full GUI integration in napari.',
            url: 'https://elifesciences.org/reviewed-preprints/99848v1'
        },
        {
            id: 5,
            date: '2023',
            title: '3D Brain Registration with Intensity Shift Robustness',
            authors: 'Hassan Mahmood, Asim Iqbal, Syed Mohammed Shamsul Islam, Syed Afaq Ali Shah',
            conference: 'IEEE International Conference on Image Processing (ICIP)',
            abstract: 'Technological advances in medical imaging are enabling us to understand healthcare datasets in great detail. Machine Learning enabled methods, specifically, deep neural networks are continuously achieving benchmark performances in terms of accuracy and computational efficiency. However, the lack of agreed-upon standard procedures, variations in the devices by different vendors, and artifacts induced by the physical phenomenon in the sensors make the data inconsistent and noisy. These variations in the data are detrimental to the performance of learning-based methods. In this study, we analyze the behavior of traditional and deep learning-based image registration methods and explore strategies to handle the problem of intensity distributional shifts without compromising the performance. To achieve this, we propose an intensity-based loss function and demonstrate that the models trained with our proposed loss function are better at handling unseen data from different sites using machines from different vendors. In addition, our trained model is superior in preserving the boundaries of anatomical regions after registration.',
            url: 'https://ieeexplore.ieee.org/abstract/document/10222341'
        },
        {
            id: 6,
            date: '2023',
            title: 'Domain-Invariant Brainstem Nuclei Segmentation and Signal Quantification',
            authors: 'Julia Kaiser, Dana Luong, Eunseo Sung, Asim Iqbal, Vibhu Sahni',
            conference: 'bioRxiv',
            abstract: 'Brainstem nuclei are hard to distinguish due to very few distinctive features which makes detecting them with high accuracy extremely difficult. We introduce StARQ that builds on SeBRe, a deep learning-based framework to segment regions of interest. StARQ provides new functionalities for automated segmentation of brainstem nuclei at high granularity, and quantification of underlying neural features such as axonal tracings, and synaptic punctae. StARQ will serve as a toolbox for generalized brainstem analysis, enabling reliable high-throughput computational analysis with open-source models.',
            url: 'https://www.biorxiv.org/content/biorxiv/early/2023/11/11/2023.11.07.566040.full.pdf'
        },
        {
            id: 8,
            date: '2022',
            title: 'Processing time-domain and frequency-domain representations of eeg data',
            authors: 'Asim Iqbal, Garrett Raymond Honke, Nina Thigpen, Vladimir Miskovic, Pramod Gupta',
            conference: 'US Patent',
            abstract: 'Methods, systems, and apparatus, including computer programs encoded on computer storage media, for processing representations of EEG measurements. One of the methods includes obtaining a plurality of EEG signal measurements corresponding to respective EEG trials of a user; generating a time-domain representation from the plurality of EEG signal measurements, where the time-domain representation includes a plurality of rows, and where each row corresponds to a different set of one or more EEG signal measurements; applying the time-domain representation as input to a neural network having a plurality of network parameters, final values of the network parameters having been determined by a transfer learning process where the neural network is initially trained to perform an image processing task and the neural network is subsequently trained to perform EEG analysis; and obtaining, from the neural network, a mental health prediction for the user.',
            url: 'https://patentimages.storage.googleapis.com/41/21/e2/62f11998fd2b54/US20220101997A1.pdf'
        },
        {
            id: 9,
            date: '2022',
            title: 'Processing time-frequency representations of eeg data using neural networks',
            authors: 'Asim Iqbal, Pramod Gupta, Garrett Raymond Honke, Vladimir Miskovic',
            conference: 'US Patent',
            abstract: 'Methods, systems, and apparatus, including computer programs encoded on computer storage media, for generating embeddings of EEG measurements. One of the methods includes obtaining a two-dimensional time-frequency electroencephalogram (EEG) representation corresponding to one or more EEG signal measurements of a user; processing the time-frequency EEG representation using a first neural network having a plurality of first network parameters to generate an embedding of the time-frequency EEG representation, wherein the first neural network has been trained using transfer learning; and providing the embedding of the time-frequency EEG representation to a downstream neural network to generate a mental health prediction for the user.',
            url: 'https://patentimages.storage.googleapis.com/03/34/73/6f833899313f8d/US20220015659A1.pdf'
        },
        {
            id: 10,
            date: '2021',
            title: 'An automatic multi-tissue human fetal brain segmentation benchmark using the fetal tissue annotation dataset',
            authors: 'Kelly Payette, Priscille de Dumast, Hamza Kebiri, Ivan Ezhov, Johannes C Paetzold, Suprosanna Shit, Asim Iqbal, Romesa Khan, Raimund Kottke, Patrice Grehten, Hui Ji, Levente Lanczi, Marianna Nagy, Monika Beresova, Thi Dao Nguyen, Giancarlo Natalucci, Theofanis Karayannis, Bjoern Menze, Meritxell Bach Cuadra, Andras Jakab',
            conference: 'Nature Scientific Data',
            abstract: "It is critical to quantitatively analyse the developing human fetal brain in order to fully understand neurodevelopment in both normal fetuses and those with congenital disorders. To facilitate this analysis, automatic multi-tissue fetal brain segmentation algorithms are needed, which in turn requires open datasets of segmented fetal brains. Here we introduce a publicly available dataset of 50 manually segmented pathological and non-pathological fetal magnetic resonance brain volume reconstructions across a range of gestational ages (20 to 33 weeks) into 7 different tissue categories (external cerebrospinal fluid, grey matter, white matter, ventricles, cerebellum, deep grey matter, brainstem/spinal cord). In addition, we quantitatively evaluate the accuracy of several automatic multi-tissue segmentation algorithms of the developing human fetal brain. Four research groups participated, submitting a total of 10 algorithms, demonstrating the benefits the dataset for the development of automatic algorithms.",
            url: 'https://www.nature.com/articles/s41597-021-00946-3.pdf'
        },
        {
            id: 12,
            date: '2020',
            title: 'Exploring intensity invariance in deep neural networks for brain image registration',
            authors: 'Hassan Mahmood, Asim Iqbal, Syed Mohammed Shamsul Islam',
            conference: 'IEEE Digital Image Computing: Techniques and Applications (DICTA)',
            abstract: "Image registration is a widely-used technique in analysing large scale datasets that are captured through various imaging modalities and techniques in biomedical imaging such as MRI, X-Rays, etc. These datasets are typically collected from various sites and under different imaging protocols using a variety of scanners. Such heterogeneity in the data collection process causes inhomogeneity or variation in intensity (brightness) and noise distribution. These variations play a detrimental role in the performance of image registration, segmentation and detection algorithms. Classical image registration methods are computationally expensive but are able to handle these artifacts relatively better. However, deep learning-based techniques are shown to be computationally efficient for automated brain registration but are sensitive to the intensity variations. In this study, we investigate the effect of variation in intensity distribution among input image pairs for deep learning-based image registration methods. We find a performance degradation of these models when brain image pairs with different intensity distribution are presented even with similar structures. To overcome this limitation, we incorporate a structural similarity-based loss function in a deep neural network and test its performance on the validation split separated before training as well as on a completely unseen new dataset. We report that the deep learning models trained with structure similarity-based loss seems to perform better for both datasets. This investigation highlights a possible performance limiting factor in deep learning-based registration models and suggests a potential solution to incorporate the intensity distribution variation in the input image pairs. Our code and models are available at https://github.com/hassaanmahmood/DeepIntense.",
            url: 'https://arxiv.org/pdf/2009.10058'
        },
        {
            id: 13,
            date: '2020',
            title: 'Developmental divergence of sensory stimulus representation in cortical interneurons',
            authors: 'Rahel Kastli, Rasmus Vighagen, Alexander van der Bourg, Ali Ozgur Argunsah, Asim Iqbal, Fabian F Voigt, Daniel Kirschenbaum, Adriano Aguzzi, Fritjof Helmchen, Theofanis Karayannis',
            conference: 'Nature Communications',
            abstract: "Vasocative-intestinal-peptide (VIP+) and somatostatin (SST+) interneurons are involved in modulating barrel cortex activity and perception during active whisking. Here we identify a developmental transition point of structural and functional rearrangements onto these interneurons around the start of active sensation at P14. Using in vivo two-photon Ca2+ imaging, we find that before P14, both interneuron types respond stronger to a multi-whisker stimulus, whereas after P14 their responses diverge, with VIP+ cells losing their multi-whisker preference and SST+ neurons enhancing theirs. Additionally, we find that Ca2+ signaling dynamics increase in precision as the cells and network mature. Rabies virus tracings followed by tissue clearing, as well as photostimulation-coupled electrophysiology reveal that SST+ cells receive higher cross-barrel inputs compared to VIP+ neurons at both time points. In addition, whereas prior to P14 both cell types receive direct input from the sensory thalamus, after P14 VIP+ cells show reduced inputs and SST+ cells largely shift to motor-related thalamic nuclei.",
            url: 'https://www.nature.com/articles/s41467-020-19427-z.pdf'
        },
        {
            id: 14,
            date: '2020',
            title: 'A comparison of automatic multi-tissue segmentation methods of the human fetal brain using the FeTA dataset',
            authors: 'Kelly Payette, Priscille de Dumast, Hamza Kebiri, Ivan Ezhov, Johannes C Paetzold, Suprosanna Shit, Asim Iqbal, Romesa Khan, Raimund Kottke, Patrice Grehten, Hui Ji, Levente Lanczi, Marianna Nagy, Monika Beresova, Thi Dao Nguyen, Giancarlo Natalucci, Theofanis Karayannis, Bjoern Menze, Meritxell Bach Cuadra, Andras Jakab',
            conference: 'arXiv',
            abstract: "It is critical to quantitatively analyse the developing human fetal brain in order to fully understand neurodevelopment in both normal fetuses and those with congenital disorders. To facilitate this analysis, automatic multi-tissue fetal brain segmentation algorithms are needed, which in turn requires open databases of segmented fetal brains. Here we introduce a publicly available database of 50 manually segmented pathological and non-pathological fetal magnetic resonance brain volume reconstructions across a range of gestational ages (20 to 33 weeks) into 7 different tissue categories (external cerebrospinal fluid, grey matter, white matter, ventricles, cerebellum, deep grey matter, brainstem/spinal cord). In addition, we quantitatively evaluate the accuracy of several automatic multi-tissue segmentation algorithms of the developing human fetal brain. Four research groups participated, submitting a total of 10 algorithms, demonstrating the benefits the database for the development of automatic algorithms.",
            url: 'https://www.arxiv.org/pdf/2010.15526'
        },
        {
            id: 15,
            date: '2019',
            title: 'DeNeRD: high-throughput detection of neurons for brain-wide analysis with deep learning',
            authors: 'Asim Iqbal, Asfandyar Sheikh, Theofanis Karayannis',
            conference: 'Nature Publishing Group',
            abstract: "Mapping the structure of the mammalian brain at cellular resolution is a challenging task and one that requires capturing key anatomical features at the appropriate level of analysis. Although neuroscientific methods have managed to provide significant insights at the micro and macro level, in order to obtain a whole-brain analysis at a cellular resolution requires a meso-scopic approach. A number of methods can be currently used to detect and count cells, with, nevertheless, significant limitations when analyzing data of high complexity. To overcome some of these constraints, we introduce a fully automated Artificial Intelligence (AI)-based method for whole-brain image processing to Detect Neurons in different brain Regions during Development (DeNeRD). We demonstrate a high performance of our deep neural network in detecting neurons labeled with different genetic markers in a range of imaging planes and imaging modalities.",
            url: 'https://www.nature.com/articles/s41598-019-50137-9.pdf'
        },
        {
            id: 16,
            date: '2019',
            title: 'A deeply learned brain atlas',
            authors: 'Nina Vogt, Asim Iqbal, Chen Yuncong',
            conference: 'Nature Methods',
            abstract: "Segmenting and registration of brain imaging datasets can be a tedious and time-consuming task. Iqbal et al. now use a deep learning approach, which they call SeBRe, to facilitate this task for Nissl-stained, fluorescence, and even magnetic resonance image datasets. They trained a deep neural network to segment and classify eight different regions in the mouse brain. After training, SeBRe could segment and register other datasets with a precision of 0.84, and similar performance could be achieved even if the brains were stained for previously unseen markers or imaged with a different microscopy modality. While SeBRe registers the image datasets to an existing brain atlas such as the Allen Brain Atlas, Chen et al. went a step further. They used convolutional neural networks to build a mouse brain atlas from scratch. This brain atlas is active and can be augmented with additional datasets. Furthermore, it preserves information on the variance between datasets. Both pipelines automate the processing of anatomical brain datasets and should substantially speed up the mapping of neurons and brain regions.",
            url: 'https://www.nature.com/articles/s41592-019-0522-8.pdf'
        },
        {
            id: 17,
            date: '2019',
            title: 'Decoding neural responses in mouse visual cortex through a deep neural network',
            authors: 'Asim Iqbal, Phil Dong, Christopher M Kim, Heeun Jang',
            conference: 'IEEE International Joint Conference on Neural Networks (IJCNN)',
            abstract: "Finding a code to unravel the population of neural responses that leads to a distinct animal behavior has been a long-standing question in the field of neuroscience. With the recent advances in machine learning, it is shown that the hierarchically Deep Neural Networks (DNNs) perform optimally in decoding unique features out of complex datasets. In this study, we utilize the power of a DNN to explore the computational principles in the mammalian brain by exploiting the Neuropixel data from Allen Brain Institute. We decode the neural responses from mouse visual cortex to predict the presented stimuli to the animal for natural (bear, trees, cheetah, etc.) and artificial (drifted gratings, orientated bars, etc.) classes. Our results indicate that neurons in mouse visual cortex encode the features of natural and artificial objects in a distinct manner, and such neural code is consistent across animals. We investigate this by applying transfer learning to train a DNN on the neural responses of a single animal and test its generalized performance across multiple animals. Within a single animal, DNN is able to decode the neural responses with as much as 100% classification accuracy. Across animals, this accuracy is reduced to 91%. This study demonstrates the potential of utilizing the DNN models as a computational framework to understand the neural coding principles in the mammalian brain.",
            url: 'https://arxiv.org/pdf/1911.05479'
        },
        {
            id: 18,
            date: '2019',
            title: 'Developing a brain atlas through deep learning',
            authors: 'Asim Iqbal, Romesa Khan, Theofanis Karayannis',
            conference: 'Nature Machine Intelligence',
            abstract: "Neuroscientists have devoted significant effort into the creation of standard brain reference atlases for high-throughput registration of anatomical regions of interest. However, variability in brain size and form across individuals poses a significant challenge for such reference atlases. To overcome these limitations, we introduce a fully automated deep neural networkbased method (SeBRe) for registration through Segmenting Brain Regions of interest with minimal human supervision. We demonstrate the validity of our method on brain images from different mouse developmental time points, across a range of neuronal markers and imaging modalities. We further assess the performance of our method on images from MR-scanned human brains. Our registration method can accelerate brain-wide exploration of region-specific changes in brain development and, by simply segmenting brain regions of interest for highthroughput brain-wide analysis, provides an alternative to existing complex brain registration techniques.",
            url: 'https://rdcu.be/b4DfW'
        },
        {
            id: 19,
            date: '2018',
            title: 'Exploring brain-wide development of inhibition through deep learning',
            authors: 'Asim Iqbal, Asfandyar Sheikh, Theofanis Karayannis',
            conference: 'arXiv',
            abstract: 'We introduce here a fully automated convolutional neural network-based method for brain image processing to Detect Neurons in different brain Regions during Development (DeNeRD). Our method takes a developing mouse brain as input and i) registers the brain sections against a developing mouse reference atlas, ii) detects various types of neurons, and iii) quantifies the neural density in many unique brain regions at different postnatal (P) time points. Our method is invariant to the shape, size and expression of neurons and by using DeNeRD, we compare the brain-wide neural density of all GABAergic neurons in developing brains of ages P4, P14 and P56. We discover and report 6 different clusters of regions in the mouse brain in which GABAergic neurons develop in a differential manner from early age (P4) to adulthood (P56). These clusters reveal key steps of GABAergic cell development that seem to track with the functional development of diverse brain regions as the mouse transitions from a passive receiver of sensory information (<P14) to an active seeker (>P14).',
            url: 'https://arxiv.org/pdf/1807.03238'
        },



];
    
    
    
const listContainer = document.getElementById('publication-lists');

function createList(data) {
const list = document.createElement('div');
list.className = 'list';

    const authorsList = data.authors.split(', '); // Assuming authors are separated by ", "
    const displayedAuthors = authorsList.length > 5 ? authorsList.slice(0, 5).join(', ') + ', ...' : authorsList.join(', ');


list.innerHTML = `
  <div class="inner-border"></div>
    <div class="date">${data.date}</div>
    <div class="list-body">
        <div class="title">${data.title}</div>
        <div class="authors">${displayedAuthors}</div>
        <div class="conference">${data.conference}</div>
    </div>
    <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16L16 12L12 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
`;
listContainer.appendChild(list);

// Update the event listener for each list to local store the publication ID and redirect
list.addEventListener('click', () => {
    sessionStorage.setItem('selectedPublicationId', data.id);  // Use sessionStorage instead of localStorage
    window.open('publications/abstract/', '_blank');  // Open abstract.html in a new tab
});

}

publications.forEach(pub => createList(pub));
});