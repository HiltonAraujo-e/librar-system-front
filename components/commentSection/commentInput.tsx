import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface CommentInputProps {
    onSubmit: (text: string) => void;
    onCancel?: () => void;
    isReply?: boolean;
}

export function CommentInput({ onSubmit, onCancel, isReply = false }: CommentInputProps) {
    const [text, setText] = useState('');

    const handleSubmit = () => {
        if (text.trim()) {
            onSubmit(text);
            setText('');
        }
    };

    return (
        <div className="mb-6">
            <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={isReply ? "Adicione uma resposta..." : "Adicione um comentário..."}
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
            />
            <div className="flex justify-end mt-2">
                <Button className="bg-indigo-600 text-white hover:bg-indigo-700" onClick={handleSubmit}>
                    {isReply ? 'Responder' : 'Comentar'}
                    <Send className="ml-2 w-4 h-4" />
                </Button>
                {onCancel && (
                    <Button variant="ghost" onClick={onCancel} className="ml-2">
                        Cancelar
                    </Button>
                )}
            </div>
        </div>
    );
}
