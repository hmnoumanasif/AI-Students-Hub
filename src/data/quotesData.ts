export interface Quote {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export const motivationalQuotes: Quote[] = [
  {
    id: 'q1',
    quote: "Artificial intelligence is not a substitute for human intelligence; it is a tool to amplify human creativity and problem-solving.",
    author: "Fei-Fei Li",
    role: "Co-Director of Stanford Human-Centered AI Institute"
  },
  {
    id: 'q2',
    quote: "The magic of AI isn't in replacing programmers, but in elevating every programmer to solve problems at a higher level of abstraction.",
    author: "Andrej Karpathy",
    role: "AI Researcher & Educator"
  },
  {
    id: 'q3',
    quote: "Machine learning is the science of getting computers to act without being explicitly programmed.",
    author: "Andrew Ng",
    role: "Co-founder of Coursera & DeepLearning.AI"
  },
  {
    id: 'q4',
    quote: "Mathematics is the language with which God has written the universe; in AI, vectors and matrices are the brushstrokes.",
    author: "Geoffrey Hinton",
    role: "Turing Award Winner & Pioneer of Deep Learning"
  },
  {
    id: 'q5',
    quote: "Consistency is key in mastering AI. Studying 1 hour every day beats 10 hours once a week.",
    author: "Yann LeCun",
    role: "Chief AI Scientist at Meta"
  },
  {
    id: 'q6',
    quote: "The best way to predict the future is to invent it. Build projects, test hypotheses, and never stop learning.",
    author: "Alan Kay",
    role: "Computer Scientist"
  }
];
