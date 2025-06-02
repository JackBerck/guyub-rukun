'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useState } from 'react';

interface ImageGalleryProps {
    images: Array<{
        id: number;
        image: string;
    }>;
    title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (index: number) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const nextImage = () => {
        setSelectedImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!images || images.length === 0) {
        return (
            <div className="flex h-64 w-full items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
                <div className="text-center">
                    <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="mb-1 text-sm font-medium text-gray-600">Tidak ada gambar</p>
                    <p className="text-xs text-gray-400">Gambar akan ditampilkan jika tersedia</p>
                </div>
            </div>
        );
    }

    const renderImageGrid = () => {
        const imageCount = images.length;

        if (imageCount === 1) {
            return (
                <div className="relative group">
                    <div className="aspect-[16/10] w-full overflow-hidden rounded-xl">
                        <img
                            src={`/storage/${images[0].image}`}
                            alt={title}
                            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 cursor-pointer flex items-center justify-center"
                             onClick={() => openModal(0)}>
                            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 rounded-full p-3">
                                <ZoomIn className="h-6 w-6 text-gray-700" />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (imageCount === 2) {
            return (
                <div className="grid grid-cols-2 gap-3 h-80">
                    {images.map((image, index) => (
                        <div key={image.id} className="relative group overflow-hidden rounded-xl">
                            <img
                                src={`/storage/${image.image}`}
                                alt={`${title} ${index + 1}`}
                                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 cursor-pointer"
                                onClick={() => openModal(index)}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 rounded-full p-2">
                                    <ZoomIn className="h-5 w-5 text-gray-700" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (imageCount === 3) {
            return (
                <div className="grid grid-cols-4 gap-3 h-80">
                    <div className="col-span-2 relative group overflow-hidden rounded-xl">
                        <img
                            src={`/storage/${images[0].image}`}
                            alt={`${title} 1`}
                            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 cursor-pointer"
                            onClick={() => openModal(0)}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 rounded-full p-2">
                                <ZoomIn className="h-5 w-5 text-gray-700" />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 grid grid-rows-2 gap-3">
                        {images.slice(1, 3).map((image, index) => (
                            <div key={image.id} className="relative group overflow-hidden rounded-xl">
                                <img
                                    src={`/storage/${image.image}`}
                                    alt={`${title} ${index + 2}`}
                                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 cursor-pointer"
                                    onClick={() => openModal(index + 1)}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 rounded-full p-2">
                                        <ZoomIn className="h-4 w-4 text-gray-700" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // 4+ images
        return (
            <div className="grid grid-cols-4 gap-3 h-80">
                <div className="col-span-2 relative group overflow-hidden rounded-xl">
                    <img
                        src={`/storage/${images[0].image}`}
                        alt={`${title} 1`}
                        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 cursor-pointer"
                        onClick={() => openModal(0)}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 rounded-full p-2">
                            <ZoomIn className="h-5 w-5 text-gray-700" />
                        </div>
                    </div>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-3">
                    {images.slice(1, 4).map((image, index) => (
                        <div key={image.id} className="relative group overflow-hidden rounded-xl">
                            <img
                                src={`/storage/${image.image}`}
                                alt={`${title} ${index + 2}`}
                                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 cursor-pointer"
                                onClick={() => openModal(index + 1)}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 rounded-full p-2">
                                    <ZoomIn className="h-4 w-4 text-gray-700" />
                                </div>
                            </div>
                            {index === 2 && imageCount > 4 && (
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-black/70 transition-all duration-300"
                                     onClick={(e) => {
                                         e.stopPropagation();
                                         openModal(0);
                                     }}>
                                    <div className="text-center text-white">
                                        <div className="text-2xl font-bold mb-1">+{imageCount - 4}</div>
                                        <div className="text-xs opacity-90">foto lainnya</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            {renderImageGrid()}

            {/* Enhanced Modal with Swiper-like functionality */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-6xl p-0 bg-black/95 border-none">
                    <div className="relative h-[90vh] flex flex-col">
                        {/* Header */}
                        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-6">
                            <div className="flex items-center justify-between">
                                <div className="text-white">
                                    <h3 className="text-lg font-semibold">{title}</h3>
                                    <p className="text-sm text-gray-300">{selectedImageIndex + 1} dari {images.length} foto</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-white hover:bg-white/20 rounded-full"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>

                        {/* Main Image Container */}
                        <div className="flex-1 relative flex items-center justify-center p-6 pt-20">
                            <img
                                src={`/storage/${images[selectedImageIndex]?.image}`}
                                alt={`${title} ${selectedImageIndex + 1}`}
                                className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                            />

                            {/* Navigation Arrows */}
                            {images.length > 1 && (
                                <>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full w-12 h-12 backdrop-blur-sm"
                                        onClick={prevImage}
                                        disabled={selectedImageIndex === 0}
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full w-12 h-12 backdrop-blur-sm"
                                        onClick={nextImage}
                                        disabled={selectedImageIndex === images.length - 1}
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Bottom Thumbnail Swiper */}
                        {images.length > 1 && (
                            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-6">
                                <div className="flex space-x-3 overflow-x-auto scrollbar-hide justify-center">
                                    {images.map((image, index) => (
                                        <button
                                            key={image.id}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`flex-shrink-0 relative overflow-hidden rounded-lg transition-all duration-300 ${
                                                index === selectedImageIndex 
                                                    ? 'ring-2 ring-white shadow-xl scale-110' 
                                                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                                            }`}
                                        >
                                            <img
                                                src={`/storage/${image.image}`}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="h-16 w-16 object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                                
                                {/* Progress Dots */}
                                <div className="flex justify-center mt-4 space-x-2">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                index === selectedImageIndex 
                                                    ? 'bg-white scale-125' 
                                                    : 'bg-white/50 hover:bg-white/75'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}