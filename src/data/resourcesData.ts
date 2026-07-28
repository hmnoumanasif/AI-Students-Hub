import { Resource } from '../types';

export const predefinedResources: Resource[] = [
  // Programming
  {
    id: 'res-py-1',
    title: 'Python Official Documentation',
    description: 'The standard reference for Python language syntax, standard library modules, built-in functions, and language specifications.',
    category: 'Programming',
    officialUrl: 'https://docs.python.org/3/',
    tags: ['Python', 'Core', 'Documentation', 'Standard Library']
  },
  {
    id: 'res-py-2',
    title: 'Python Package Index (PyPI)',
    description: 'Official repository of software packages for Python developers to discover and install libraries.',
    category: 'Programming',
    officialUrl: 'https://pypi.org/',
    tags: ['Python', 'Libraries', 'Package Manager', 'pip']
  },
  {
    id: 'res-git-1',
    title: 'Git Official Documentation',
    description: 'Complete reference guide and Pro Git book covering distributed version control, branching strategies, and workflow concepts.',
    category: 'Programming',
    officialUrl: 'https://git-scm.com/doc',
    tags: ['Git', 'Version Control', 'DevOps', 'GitHub']
  },
  {
    id: 'res-mdn-1',
    title: 'MDN Web Docs',
    description: 'The premier open-source documentation for web technologies including HTML, CSS, JavaScript, Web APIs, and web security.',
    category: 'Programming',
    officialUrl: 'https://developer.mozilla.org/',
    tags: ['Web Development', 'JavaScript', 'HTML/CSS', 'APIs']
  },

  // Mathematics
  {
    id: 'res-math-1',
    title: 'Khan Academy Mathematics',
    description: 'Free, world-class interactive courses in Multivariable Calculus, Linear Algebra, Probability, and Statistics with exercises.',
    category: 'Mathematics',
    officialUrl: 'https://www.khanacademy.org/math',
    tags: ['Calculus', 'Linear Algebra', 'Probability', 'Interactive']
  },
  {
    id: 'res-math-2',
    title: '3Blue1Brown (Essence of Math)',
    description: 'Aesthetic visual animations explaining Linear Algebra, Neural Networks, Calculus, and Fourier Transforms intuitively.',
    category: 'Mathematics',
    officialUrl: 'https://www.3blue1brown.com/',
    tags: ['Visual Learning', 'Linear Algebra', 'Calculus', 'Neural Networks']
  },

  // Machine Learning
  {
    id: 'res-ml-1',
    title: 'Scikit-Learn Documentation',
    description: 'Comprehensive guides, code examples, and mathematical formulas for classification, regression, clustering, and model selection.',
    category: 'Machine Learning',
    officialUrl: 'https://scikit-learn.org/stable/',
    tags: ['Machine Learning', 'Python', 'Algorithms', 'Scikit-Learn']
  },
  {
    id: 'res-ml-2',
    title: 'TensorFlow Documentation & Tutorials',
    description: 'Official production guidelines, Keras API guides, TensorBoard visualizations, and deployment workflows for machine learning.',
    category: 'Machine Learning',
    officialUrl: 'https://www.tensorflow.org/learn',
    tags: ['TensorFlow', 'Keras', 'Deep Learning', 'Google']
  },
  {
    id: 'res-ml-3',
    title: 'PyTorch Documentation',
    description: 'Detailed API specs, tutorials, autograd mechanics, and distributed training guides for PyTorch deep learning research.',
    category: 'Machine Learning',
    officialUrl: 'https://pytorch.org/docs/stable/index.html',
    tags: ['PyTorch', 'Deep Learning', 'Tensors', 'Meta AI']
  },

  // Data Analysis
  {
    id: 'res-da-1',
    title: 'NumPy Official Documentation',
    description: 'User guides and API references for fast multidimensional array processing, linear algebra routines, and random number generators.',
    category: 'Data Analysis',
    officialUrl: 'https://numpy.org/doc/stable/',
    tags: ['NumPy', 'Arrays', 'Scientific Computing', 'Vectors']
  },
  {
    id: 'res-da-2',
    title: 'Pandas Official Documentation',
    description: 'Complete user guide for high-performance data structures like DataFrames, time series analysis, CSV/SQL IO, and data cleaning.',
    category: 'Data Analysis',
    officialUrl: 'https://pandas.pydata.org/docs/',
    tags: ['Pandas', 'DataFrames', 'Data Wrangling', 'ETL']
  }
];
