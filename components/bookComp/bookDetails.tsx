import { BookDetails } from '@/model/bookDetails'
import { renderStars } from '@/util/renderStars'
import { BookOpen } from 'lucide-react'
import React from 'react'

interface BookDetailsProps {
    bookDetail: BookDetails
}

const BookDetail: React.FC<BookDetailsProps> = ({ bookDetail }) => {

    return (
        <div className="grid md:grid-cols-2 gap-10">
            <div className="flex justify-center">
                <img
                    src={bookDetail?.image}
                    alt={bookDetail?.title}
                    className="max-w-full h-auto max-h-[500px] object-contain rounded-xl shadow-lg"
                />
            </div>

            <div>
                <h1 className="text-3xl font-bold mb-4">{bookDetail?.title}</h1>

                <div className="space-y-4 mb-6">
                    <div className="flex items-center text-gray-700">
                        <BookOpen className="mr-2 text-indigo-600" />
                        <span>{bookDetail?.author}</span>
                    </div>
                    <div className="flex items-center">
                        {renderStars(bookDetail?.rating)}
                        <span className="ml-2 text-gray-600">
                            {bookDetail?.rating} / 5
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div>
                        <p className="font-semibold">Gênero</p>
                        <p className="text-gray-600">{bookDetail?.genre}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Ano</p>
                        <p className="text-gray-600">{bookDetail?.publishYear}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Páginas</p>
                        <p className="text-gray-600">{bookDetail?.pageCount}</p>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mb-4">Descrição</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{bookDetail?.description}</p>

                <div className="flex space-x-4">
                    <button className="flex-1 bg-indigo-600 text-white py-3 rounded-full hover:bg-indigo-700 transition">
                        Comprar Livro
                    </button>
                    <button className="flex-1 border-2 border-indigo-600 text-indigo-600 py-3 rounded-full hover:bg-indigo-50 transition">
                        Adicionar à Wishlist
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookDetail