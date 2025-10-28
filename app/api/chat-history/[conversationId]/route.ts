import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import ChatHistory from '@/models/ChatHistory';

// GET: Load a specific conversation
export async function GET(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has premium access
    // TODO: Add premium check here
    
    await connectDB();
    
    const chatHistory = await ChatHistory.findOne({
      email: session.user.email,
      conversationId: params.conversationId
    });

    if (!chatHistory) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    // Update last active time
    chatHistory.lastActive = new Date();
    await chatHistory.save();

    return NextResponse.json({ chatHistory });
  } catch (error) {
    console.error('Error loading chat history:', error);
    return NextResponse.json({ error: 'Failed to load chat history' }, { status: 500 });
  }
}

// DELETE: Delete a specific conversation
export async function DELETE(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    await ChatHistory.findOneAndDelete({
      email: session.user.email,
      conversationId: params.conversationId
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting chat history:', error);
    return NextResponse.json({ error: 'Failed to delete chat history' }, { status: 500 });
  }
}

