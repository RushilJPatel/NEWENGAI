import mongoose, { Schema, models, Model } from 'mongoose';

export interface IMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface IChatHistory {
  email: string;
  conversationId: string;
  title: string;
  messages: IMessage[];
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}, { _id: false });

const ChatHistorySchema = new Schema<IChatHistory>({
  email: { type: String, required: true, index: true },
  conversationId: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  messages: [MessageSchema],
  lastActive: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

// Compound index for efficient queries
ChatHistorySchema.index({ email: 1, lastActive: -1 });

const ChatHistory: Model<IChatHistory> = models.ChatHistory || mongoose.model<IChatHistory>('ChatHistory', ChatHistorySchema);

export default ChatHistory;

