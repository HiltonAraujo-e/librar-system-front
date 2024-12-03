import React from 'react';
import { Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CommentInput } from './commentInput';

interface Comment {
    id: string;
    text: string;
    author: string;
    timestamp: string;
    replies: Comment[];
}

interface CommentListProps {
    comments: Comment[];
    onReply: (commentId: string, text: string) => void;
}

export function CommentList({ comments, onReply }: CommentListProps) {
    const [replyingTo, setReplyingTo] = React.useState<string | null>(() => null);

    return (
        <div className="space-y-6">
            {comments.map((comment) => (
                <div key={comment.id} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-2">
                        <div className="font-semibold text-gray-800">{comment.author}</div>
                        <div className="text-sm text-gray-500">{comment.timestamp}</div>
                    </div>
                    <p className="text-gray-700 mb-3">{comment.text}</p>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                        onClick={() => setReplyingTo(comment.id)}
                    >
                        <Reply className="mr-1 w-4 h-4" /> Responder
                    </Button>

                    {comment.replies.length > 0 && (
                        <div className="mt-4 ml-6 border-l-2 border-gray-200 pl-4 space-y-4">
                            {comment.replies.map((reply) => (
                                <div key={reply.id} className="bg-gray-50 p-3 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="font-semibold text-gray-800">{reply.author}</div>
                                        <div className="text-sm text-gray-500">{reply.timestamp}</div>
                                    </div>
                                    <p className="text-gray-700">{reply.text}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {replyingTo === comment.id && (
                        <div className="mt-4 ml-6 border-l-2 border-gray-200 pl-4">
                            <CommentInput
                                onSubmit={(text) => {
                                    onReply(comment.id, text);
                                    setReplyingTo(null);
                                }}
                                onCancel={() => setReplyingTo(null)}
                                isReply
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
