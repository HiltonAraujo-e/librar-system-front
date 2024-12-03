import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { CommentInput } from '@/components/commentSection/commentInput';
import { CommentList } from '@/components/commentSection/commentList';

interface Comment {
    id: string;
    text: string;
    author: string;
    replies: Comment[];
}

interface CommentSectionProps {
    bookComments: Comment[];
}

export function CommentSection({ bookComments }: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>(bookComments);

    const handleAddComment = (text: string) => {
        console.log("textSubmit", text);
        // const newComment: Comment = {
        //     id: crypto.randomUUID(),
        //     text,
        //     author: "Usuário Teste",
        //     replies: [],
        // };
        // setComments((prev) => [...prev, newComment]);
    };

    const handleAddReply = (commentId: string, text: string) => {
        console.log("commentId", commentId, "text", text);

        // setComments((prev) =>
        //     prev.map((comment) =>
        //         comment.id === commentId
        //             ? {
        //                 ...comment,
        //                 replies: [
        //                     ...comment.replies,
        //                     {
        //                         id: crypto.randomUUID(),
        //                         text,
        //                         author: "Usuário Teste",
        //                         replies: [],
        //                     },
        //                 ],
        //             }
        //             : comment
        //     )
        // );
    };


    return (
        <div className="mt-8 bg-gray-50 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <MessageCircle className="mr-3 text-indigo-600" />
                Comentários ({bookComments?.length})
            </h2>
            <CommentInput onSubmit={handleAddComment} />
            <CommentList comments={bookComments ?? []} onReply={handleAddReply} />
        </div>
    );
}
