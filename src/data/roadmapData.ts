import { RoadmapSection } from '../types';

export const initialRoadmapSections: RoadmapSection[] = [
  {
    id: 'prog',
    category: 'Programming',
    title: 'Foundational Programming',
    description: 'Master essential programming concepts, data structures, and tools required for AI development.',
    topics: [
      { id: 'p1', title: 'Python Basics & Syntax', description: 'Variables, loops, functions, lists, dicts, generators', completed: false, resourceLink: 'https://docs.python.org/3/tutorial/' },
      { id: 'p2', title: 'Object-Oriented Programming (OOP)', description: 'Classes, inheritance, polymorphism, abstraction, dunder methods', completed: false, resourceLink: 'https://realpython.com/python3-object-oriented-programming/' },
      { id: 'p3', title: 'SQL & Database Querying', description: 'SELECT, JOINs, aggregations, indexing, relational design', completed: false, resourceLink: 'https://www.sqltutorial.org/' },
      { id: 'p4', title: 'Git & GitHub Version Control', description: 'Commits, branching, pull requests, merge conflict resolution', completed: false, resourceLink: 'https://git-scm.com/doc' },
    ]
  },
  {
    id: 'math',
    category: 'Mathematics',
    title: 'Mathematics for AI & ML',
    description: 'Core mathematical concepts underpinning optimization, probability, and neural networks.',
    topics: [
      { id: 'm1', title: 'Calculus', description: 'Derivatives, gradients, partial derivatives, chain rule, Taylor series', completed: false, resourceLink: 'https://www.khanacademy.org/math/calculus-1' },
      { id: 'm2', title: 'Linear Algebra', description: 'Vectors, matrices, eigenvalues, eigenvectors, SVD, matrix multiplications', completed: false, resourceLink: 'https://www.3blue1brown.com/topics/linear-algebra' },
      { id: 'm3', title: 'Probability', description: 'Bayes Theorem, random variables, probability distributions (Gaussian, Bernoulli)', completed: false, resourceLink: 'https://www.khanacademy.org/math/statistics-probability' },
      { id: 'm4', title: 'Statistics', description: 'Hypothesis testing, confidence intervals, mean, variance, p-values', completed: false, resourceLink: 'https://openintro.org/book/os/' },
    ]
  },
  {
    id: 'da',
    category: 'Data Analysis',
    title: 'Data Wrangling & Analysis',
    description: 'Tools for processing, inspecting, and visualizing datasets before training models.',
    topics: [
      { id: 'd1', title: 'NumPy', description: 'N-dimensional arrays, broadcasting, vectorization, indexing', completed: false, resourceLink: 'https://numpy.org/doc/stable/' },
      { id: 'd2', title: 'Pandas', description: 'DataFrames, Series, cleaning missing data, grouping, merging', completed: false, resourceLink: 'https://pandas.pydata.org/docs/' },
      { id: 'd3', title: 'Matplotlib', description: 'Line graphs, scatter plots, histograms, customization', completed: false, resourceLink: 'https://matplotlib.org/stable/contents.html' },
      { id: 'd4', title: 'Seaborn', description: 'Statistical visualizations, heatmaps, pair plots, box plots', completed: false, resourceLink: 'https://seaborn.pydata.org/' },
    ]
  },
  {
    id: 'ml',
    category: 'Machine Learning',
    title: 'Traditional Machine Learning',
    description: 'Supervised and unsupervised learning algorithms and evaluation metrics.',
    topics: [
      { id: 'ml1', title: 'Regression Models', description: 'Linear, Polynomial, Ridge, Lasso, Logistic Regression', completed: false, resourceLink: 'https://scikit-learn.org/stable/modules/linear_model.html' },
      { id: 'ml2', title: 'Classification', description: 'Decision boundary, precision, recall, F1 score, ROC-AUC', completed: false, resourceLink: 'https://scikit-learn.org/stable/modules/model_evaluation.html' },
      { id: 'ml3', title: 'Clustering', description: 'K-Means, Hierarchical, DBSCAN, PCA dimensionality reduction', completed: false, resourceLink: 'https://scikit-learn.org/stable/modules/clustering.html' },
      { id: 'ml4', title: 'Decision Trees & Ensembles', description: 'Gini impurity, Entropy, Random Forests, Gradient Boosting (XGBoost)', completed: false, resourceLink: 'https://scikit-learn.org/stable/modules/tree.html' },
      { id: 'ml5', title: 'Support Vector Machines (SVM)', description: 'Kernels, hyperplanes, margin maximization, slack variables', completed: false, resourceLink: 'https://scikit-learn.org/stable/modules/svm.html' },
    ]
  },
  {
    id: 'dl',
    category: 'Deep Learning',
    title: 'Neural Networks & Deep Learning',
    description: 'Multi-layer perceptrons, deep architectures, and framework proficiency.',
    topics: [
      { id: 'dl1', title: 'Neural Network Fundamentals', description: 'Perceptrons, activation functions (ReLU, Softmax), forward & backpropagation', completed: false, resourceLink: 'https://www.deeplearning.ai/' },
      { id: 'dl2', title: 'TensorFlow & Keras', description: 'Sequential API, Functional API, custom layers, training loops', completed: false, resourceLink: 'https://www.tensorflow.org/learn' },
      { id: 'dl3', title: 'PyTorch Framework', description: 'Tensors, nn.Module, Autograd, DataLoaders, optimizer step', completed: false, resourceLink: 'https://pytorch.org/tutorials/' },
      { id: 'dl4', title: 'Convolutional Neural Networks (CNN)', description: 'Convolutions, pooling, ResNet, VGG, image classification', completed: false, resourceLink: 'https://cs231n.github.io/' },
      { id: 'dl5', title: 'Recurrent Neural Networks (RNN & LSTM)', description: 'Sequence modeling, vanishing gradients, LSTM, GRU', completed: false, resourceLink: 'https://colah.github.io/posts/2015-08-Understanding-LSTMs/' },
      { id: 'dl6', title: 'Transformers Architecture', description: 'Self-attention, Positional encoding, Encoder-Decoder, BERT, GPT', completed: false, resourceLink: 'https://jalammar.github.io/illustrated-transformer/' },
    ]
  },
  {
    id: 'ai_spec',
    category: 'AI Specialisations',
    title: 'Advanced AI & Cutting-Edge Domains',
    description: 'Specialized industries and state-of-the-art AI systems.',
    topics: [
      { id: 'a1', title: 'Natural Language Processing (NLP)', description: 'Tokenization, TF-IDF, Word Embeddings, HuggingFace, Sentiment analysis', completed: false, resourceLink: 'https://huggingface.co/learn' },
      { id: 'a2', title: 'Computer Vision (CV)', description: 'Object detection (YOLO), Segmentation (Segment Anything), OpenCV', completed: false, resourceLink: 'https://docs.opencv.org/' },
      { id: 'a3', title: 'Reinforcement Learning (RL)', description: 'Q-Learning, Policy Gradients, MDPs, OpenAI Gym / Farama Gymnasium', completed: false, resourceLink: 'https://spinningup.openai.com/' },
      { id: 'a4', title: 'Large Language Models (LLMs)', description: 'Prompt engineering, RAG, Fine-tuning (LoRA, QLoRA), LangChain / LlamaIndex', completed: false, resourceLink: 'https://www.deeplearning.ai/short-courses/' },
      { id: 'a5', title: 'MLOps & Deployment', description: 'Docker, FastAPI, Model monitoring, MLflow, CI/CD pipelines', completed: false, resourceLink: 'https://mlops.community/' },
    ]
  }
];
