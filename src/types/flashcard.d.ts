export interface IFlashcard {
  _id?: string;
  question: string;
  answer: string;
  category: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  userId: string;
}