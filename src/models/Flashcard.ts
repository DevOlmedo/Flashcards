import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IFlashcard extends Document {
    question: string;
    answer: string;
    category: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    userId: Types.ObjectId; // Referencia al usuario dueño de la tarjeta
    createdAt: Date;
}

const FlashcardSchema: Schema<IFlashcard> = new Schema(
    {
        question: { type: String, required: true, trim: true },
        answer: { type: String, required: true, trim: true },
        category: { type: String, required: true, trim: true },
        difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now }
    },
    { collection: 'flashcards' }
);

const Flashcard: Model<IFlashcard> = mongoose.models.Flashcard || mongoose.model<IFlashcard>('Flashcard', FlashcardSchema);

export default Flashcard;