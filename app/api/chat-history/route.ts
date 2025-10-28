import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import ChatHistory from '@/models/ChatHistory';

// GET: Retrieve all chat histories for user (Premium feature)
export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has premium access (you can integrate with your subscription system)
    // For now, we'll allow all authenticated users
    // TODO: Add premium check here
    
    await connectDB();
    
    const histories = await ChatHistory.find({ email: session.user.email })
      .sort({ lastActive: -1 })
      .select('-messages') // Don't send messages, just metadata
      .limit(50);

    return NextResponse.json({ histories });
  } catch (error) {
    console.error('Error fetching chat histories:', error);
    return NextResponse.json({ error: 'Failed to fetch chat histories' }, { status: 500 });
  }
}

// POST: Save or update a chat conversation
export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { conversationId, messages, title } = await request.json();

    if (!conversationId || !messages || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if user has premium access
    // TODO: Add premium check here
    // For now, we'll check if they have access to this feature
    
    await connectDB();
    
    const chatHistory = await ChatHistory.findOneAndUpdate(
      { 
        email: session.user.email,
        conversationId: conversationId 
      },
      {
        email: session.user.email,
        conversationId: conversationId,
        title: title,
        messages: messages,
        lastActive: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, chatHistory });
  } catch (error) {
    console.error('Error saving chat history:', error);
    return NextResponse.json({ error: 'Failed to save chat history' }, { status: 500 });
  }
}

