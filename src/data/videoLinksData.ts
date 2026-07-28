import { VideoLink } from '../types';

export const predefinedVideoLinks: VideoLink[] = [
  {
    id: 'vid-1',
    title: 'Neural Networks: Zero to Hero Series',
    channel: 'Andrej Karpathy',
    category: 'Deep Learning & LLMs',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLAqh13U4eq4C43M3qL7o_eQ41L3b0Oq3k',
    youtubeId: 'kCc8FmEb1nY',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    description: 'Building micrograd, makemore, GPT models from scratch in pure Python and PyTorch by former OpenAI and Tesla AI lead Andrej Karpathy.',
    duration: '2-4 hrs per episode',
    difficulty: 'Intermediate'
  },
  {
    id: 'vid-2',
    title: 'Essence of Linear Algebra',
    channel: '3Blue1Brown (Grant Sanderson)',
    category: 'Mathematics for AI',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab',
    youtubeId: 'fNk_zzaMoEg',
    playlistId: 'PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
    description: 'Visual geometric understanding of vectors, linear transformations, matrix multiplication, determinants, eigenvectors, and dot products.',
    duration: '15 mins per video',
    difficulty: 'Beginner'
  },
  {
    id: 'vid-3',
    title: 'Machine Learning & Statistics (StatQuest)',
    channel: 'StatQuest with Josh Starmer',
    category: 'Machine Learning',
    youtubeUrl: 'https://www.youtube.com/c/StatQuest',
    youtubeId: 'qBigTkBLU6g',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    description: 'Bite-sized, wonderfully clear breakdowns of Logistic Regression, Decision Trees, XGBoost, Neural Networks, PCA, and Transformers.',
    duration: '10-20 mins per topic',
    difficulty: 'Beginner'
  },
  {
    id: 'vid-4',
    title: 'MIT 6.S191: Introduction to Deep Learning',
    channel: 'Alexander Amini (MIT)',
    category: 'Deep Learning',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLtBw6njQRU-rwp5__7C0oIVt26ZgjG9NI',
    youtubeId: 'QDX-1M5Nj7s',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    description: 'Official MIT course covering Deep Learning, Computer Vision, Sequential Data, Generative AI, Reinforcement Learning, and AI Safety.',
    duration: '50 mins per lecture',
    difficulty: 'Intermediate'
  },
  {
    id: 'vid-5',
    title: 'PyTorch for Deep Learning in 10 Hours',
    channel: 'freeCodeCamp (Daniel Bourke)',
    category: 'Frameworks & Coding',
    youtubeUrl: 'https://www.youtube.com/watch?v=V_xro1bcAuA',
    youtubeId: 'V_xro1bcAuA',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    description: 'Complete hands-on beginner-to-advanced PyTorch tutorial building computer vision models, custom datasets, and model deployment.',
    duration: '10 hours',
    difficulty: 'Beginner'
  },
  {
    id: 'vid-6',
    title: 'Generative AI & LLM Architecture (DeepLearning.AI)',
    channel: 'Andrew Ng',
    category: 'Generative AI',
    youtubeUrl: 'https://www.youtube.com/watch?v=5p248yoa3oE',
    youtubeId: '5p248yoa3oE',
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
    description: 'Insightful lectures by Andrew Ng on foundational models, fine-tuning, RAG pipelines, and building autonomous agent workflows.',
    duration: '45 mins',
    difficulty: 'Intermediate'
  },
  {
    id: 'vid-7',
    title: 'Stanford CS229: Machine Learning Full Course',
    channel: 'Stanford Online',
    category: 'Machine Learning',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLA89DC42D73413723',
    youtubeId: 'jGwO_UgTS7I',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
    description: 'The legendary Stanford computer science course on supervised learning, learning theory, reinforcement learning, and convex optimization.',
    duration: '1 hour per lecture',
    difficulty: 'Advanced'
  },
  {
    id: 'vid-8',
    title: 'Hugging Face Transformers Tutorial',
    channel: 'Hugging Face',
    category: 'NLP & LLMs',
    youtubeUrl: 'https://www.youtube.com/watch?v=tiZFewofSLM',
    youtubeId: 'tiZFewofSLM',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    description: 'Learn how to use pre-trained transformer pipelines for text classification, named entity recognition, summarization, and tokenization.',
    duration: '1.5 hours',
    difficulty: 'Intermediate'
  }
];
