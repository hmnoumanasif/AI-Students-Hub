import { CareerPath } from '../types';

export const careerRoadmapsData: CareerPath[] = [
  {
    id: 'mle',
    title: 'Machine Learning Engineer',
    tagline: 'Design, build, and optimize scalable ML algorithms for production environments.',
    overview: 'Machine Learning Engineers bridge data science and software engineering. They write clean code, select appropriate model architectures, optimize hyper-parameters, and deploy models into microservices.',
    salaryRange: '$120,000 - $185,000 / yr',
    demandLevel: 'Very High',
    requiredSkills: [
      { name: 'Python & OOP Principles', category: 'Programming' },
      { name: 'Scikit-Learn, PyTorch or TensorFlow', category: 'Frameworks' },
      { name: 'Feature Engineering & Data Preprocessing', category: 'Data' },
      { name: 'Model Optimization & Hyperparameter Tuning', category: 'ML' },
      { name: 'REST APIs (FastAPI/Flask) & Docker', category: 'Software' },
      { name: 'SQL & Distributed Computing (Spark)', category: 'Data' },
    ],
    recommendedCourses: [
      { title: 'Machine Learning Specialization', provider: 'DeepLearning.AI / Stanford' },
      { title: 'Full Stack Deep Learning', provider: 'UC Berkeley / FSDL' },
      { title: 'Machine Learning Engineering for Production (MLOps)', provider: 'DeepLearning.AI' }
    ],
    suggestedProjects: [
      { title: 'End-to-End Customer Churn Predictor', description: 'Train XGBoost model, log metrics with MLflow, containerize with Docker, serve REST API.' },
      { title: 'Real-Time Recommendation System', description: 'Build matrix factorization or neural collaborative filtering model served over Redis.' }
    ],
    learningSteps: [
      'Master Python data structures, algorithms, and SQL.',
      'Learn core linear algebra, calculus, and statistical hypothesis testing.',
      'Study classical supervised & unsupervised ML algorithms with Scikit-Learn.',
      'Learn deep learning basics with PyTorch or TensorFlow.',
      'Master model evaluation, cross-validation, and hyperparameter optimization.',
      'Build end-to-end API wrappers using FastAPI and package into Docker containers.'
    ]
  },
  {
    id: 'ai_eng',
    title: 'AI Engineer / LLM Specialist',
    tagline: 'Leverage foundation models, RAG architectures, and AI agents to solve user problems.',
    overview: 'AI Engineers focus on creating application layer software using state-of-the-art Generative AI, fine-tuned LLMs, vector databases, and multi-agent frameworks.',
    salaryRange: '$130,000 - $200,000 / yr',
    demandLevel: 'Very High',
    requiredSkills: [
      { name: 'Prompt Engineering & Chain-of-Thought', category: 'AI' },
      { name: 'Retrieval-Augmented Generation (RAG)', category: 'AI' },
      { name: 'Vector DBs (ChromaDB, Pinecone, Qdrant)', category: 'Database' },
      { name: 'LangChain / LlamaIndex / AutoGen Frameworks', category: 'Frameworks' },
      { name: 'Fine-Tuning (LoRA, QLoRA, PEFT)', category: 'Model Training' },
      { name: 'Evaluation Frameworks (Ragas, TruLens)', category: 'MLOps' }
    ],
    recommendedCourses: [
      { title: 'Generative AI with Large Language Models', provider: 'DeepLearning.AI & AWS' },
      { title: 'Building Systems with LLMs', provider: 'Hugging Face Academy' }
    ],
    suggestedProjects: [
      { title: 'Enterprise Academic Paper RAG Assistant', description: 'Ingest PDF textbooks into vector database, implement hybrid search and cited answer synthesis.' },
      { title: 'Multi-Agent Code Review Bot', description: 'Autonomous agent network analyzing GitHub PRs, checking linting, security, and test cases.' }
    ],
    learningSteps: [
      'Learn API interactions with OpenAI, Gemini, and Anthropic models.',
      'Understand text embeddings and semantic vector similarity search.',
      'Build basic and advanced RAG (Hybrid Search, Re-ranking, Context Compression).',
      'Study open-source LLMs (Llama 3, Mistral) and quantization techniques.',
      'Implement AI Agent workflows using tools, function calling, and memory buffers.',
      'Measure and benchmark LLM outputs for latency, accuracy, and hallucination rates.'
    ]
  },
  {
    id: 'ds',
    title: 'Data Scientist',
    tagline: 'Extract actionable insights, statistical models, and business intelligence from complex data.',
    overview: 'Data Scientists perform exploratory data analysis, run statistical experiments, design A/B test frameworks, and build predictive algorithms to guide product strategy.',
    salaryRange: '$110,000 - $165,000 / yr',
    demandLevel: 'High',
    requiredSkills: [
      { name: 'Advanced SQL & Window Functions', category: 'Database' },
      { name: 'Pandas, NumPy, and Data Wrangling', category: 'Data' },
      { name: 'A/B Testing & Experimental Design', category: 'Statistics' },
      { name: 'Statistical Modeling & Hypothesis Testing', category: 'Statistics' },
      { name: 'Data Visualization (Seaborn, Plotly, Tableau)', category: 'Visualization' },
      { name: 'Executive Storytelling & Reporting', category: 'Communication' }
    ],
    recommendedCourses: [
      { title: 'Google Data Analytics Professional Certificate', provider: 'Coursera / Google' },
      { title: 'Applied Data Science with Python', provider: 'University of Michigan' }
    ],
    suggestedProjects: [
      { title: 'E-commerce User Segmentation & Cohort Analysis', description: 'Analyze customer transactional data using RFM analysis and K-Means clustering.' },
      { title: 'A/B Test Conversion Rate Significance Calculator', description: 'Build interactive statistical testing dashboard with confidence intervals.' }
    ],
    learningSteps: [
      'Master SQL queries, aggregation, joins, subqueries, and window functions.',
      'Become fluid in Python data manipulation with Pandas and NumPy.',
      'Study probability distributions, sampling, t-tests, ANOVA, and p-value interpretations.',
      'Learn data storytelling through clean dashboards and visualizations.',
      'Practice predictive modeling on real-world noisy Kaggle datasets.'
    ]
  },
  {
    id: 'nlp',
    title: 'NLP Engineer',
    tagline: 'Enable computers to process, analyze, translate, and generate human language.',
    overview: 'NLP Engineers specialize in linguistic algorithms, text preprocessing, sentiment analysis, speech recognition, named entity recognition, and neural translation.',
    salaryRange: '$125,000 - $190,000 / yr',
    demandLevel: 'High',
    requiredSkills: [
      { name: 'Text Preprocessing (NLTK, spaCy)', category: 'Text Processing' },
      { name: 'Word Embeddings (Word2Vec, FastText, GloVe)', category: 'Embeddings' },
      { name: 'Transformers Architecture & Hugging Face', category: 'Deep Learning' },
      { name: 'Sequence Models (LSTM, GRU, Encoder-Decoder)', category: 'Architectures' },
      { name: 'Text Generation & Summarization Techniques', category: 'NLP' },
      { name: 'Tokenization Mechanics (BPE, WordPiece)', category: 'NLP' }
    ],
    recommendedCourses: [
      { title: 'Natural Language Processing Specialization', provider: 'DeepLearning.AI' },
      { title: 'Stanford CS224N: NLP with Deep Learning', provider: 'Stanford Online' }
    ],
    suggestedProjects: [
      { title: 'Multilingual Customer Support Classifier', description: 'Fine-tune BERT on customer query dataset to categorize urgency and department.' },
      { title: 'Abstractive Article Summarizer', description: 'Train T5 model on news articles to generate concise bullet-point summaries.' }
    ],
    learningSteps: [
      'Learn classic text analytics: tokenization, stemming, lemmatization, stop words.',
      'Study TF-IDF and count vectorizer representations.',
      'Understand dense vector embeddings (Word2Vec, GloVe).',
      'Master the Transformer paper ("Attention Is All You Need").',
      'Hands-on training with Hugging Face `transformers` and `datasets` libraries.',
      'Explore audio-to-text models like Whisper and speech synthesis engines.'
    ]
  },
  {
    id: 'cv',
    title: 'Computer Vision Engineer',
    tagline: 'Process, analyze, and extract high-level understanding from images and video streams.',
    overview: 'Computer Vision Engineers build visual perception systems for autonomous driving, medical imaging, robotics, surveillance, and spatial computing.',
    salaryRange: '$130,000 - $195,000 / yr',
    demandLevel: 'High',
    requiredSkills: [
      { name: 'OpenCV & Image Processing Filters', category: 'Image Processing' },
      { name: 'Convolutional Neural Networks (CNNs)', category: 'Architectures' },
      { name: 'Object Detection (YOLO, Faster R-CNN)', category: 'CV Tasks' },
      { name: 'Image Segmentation (U-Net, SAM)', category: 'CV Tasks' },
      { name: '3D Geometry, Point Clouds & NeRFs', category: '3D Vision' },
      { name: 'Edge AI Deployment (TensorRT, ONNX)', category: 'Optimization' }
    ],
    recommendedCourses: [
      { title: 'Stanford CS231n: CNNs for Visual Recognition', provider: 'Stanford' },
      { title: 'Deep Learning for Computer Vision', provider: 'PyImageSearch' }
    ],
    suggestedProjects: [
      { title: 'Real-Time PPE Detection System', description: 'Train YOLOv8 on safety helmet and vest detection in webcam video feed.' },
      { title: 'Medical MRI Tumor Segmentation', description: 'Implement U-Net in PyTorch to segment brain tumors from MRI scans.' }
    ],
    learningSteps: [
      'Learn digital image fundamentals: channels, color spaces (RGB/HSV), convolution filters.',
      'Master OpenCV library for transformation, thresholding, and contour detection.',
      'Build CNN architectures from scratch in PyTorch.',
      'Study state-of-the-art object detectors (YOLO, EfficientDet) and segmentation networks.',
      'Optimize vision models with ONNX Runtime or TensorRT for low-latency inference.'
    ]
  },
  {
    id: 'mlops',
    title: 'MLOps Engineer',
    tagline: 'Automate the deployment, monitoring, testing, and infrastructure of ML systems.',
    overview: 'MLOps Engineers combine DevOps discipline with machine learning. They ensure models in production are continuously integrated, tested, deployed, monitored for feature drift, and retrained automatically.',
    salaryRange: '$135,000 - $205,000 / yr',
    demandLevel: 'Very High',
    requiredSkills: [
      { name: 'Docker Containerization & Kubernetes', category: 'Infrastructure' },
      { name: 'CI/CD Pipelines (GitHub Actions, GitLab)', category: 'DevOps' },
      { name: 'Experiment Tracking (MLflow, WandB)', category: 'ML Tools' },
      { name: 'Feature Stores (Feast) & Data Versioning (DVC)', category: 'Data Infrastructure' },
      { name: 'Model Monitoring & Drift Detection (Evidently.ai)', category: 'Monitoring' },
      { name: 'Infrastructure as Code (Terraform)', category: 'Cloud' }
    ],
    recommendedCourses: [
      { title: 'Machine Learning Engineering for Production (MLOps)', provider: 'DeepLearning.AI' },
      { title: 'Made With ML (MLOps)', provider: 'Gokul Mohandas' }
    ],
    suggestedProjects: [
      { title: 'Automated Continuous Retraining Pipeline', description: 'GitHub Actions trigger when data drift is detected, automatically retraining model and updating endpoint.' },
      { title: 'Kubernetes Cluster for ML Serving', description: 'Deploy auto-scaling FastAPI model serving instances using K8s and Prometheus metrics.' }
    ],
    learningSteps: [
      'Master Docker packaging for Python data science environments.',
      'Build automated CI/CD workflows running linting, unit tests, and model regression tests.',
      'Learn data versioning with DVC linked to S3/GCS buckets.',
      'Set up experiment tracking server with MLflow.',
      'Implement real-time model telemetry logging and data drift alerts.'
    ]
  }
];
