import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

const VideoGallery = () => {
    // Placeholder videos - In real app, these could come from backend
    const [videos] = useState([
        {
            id: '1',
            title: 'Making of our Signature Black Forest Cake',
            thumbnail: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
            youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Rick Roll placeholder - change to real baking video if available, or generic baking
        },
        {
            id: '2',
            title: 'Behind the Scenes: Morning Baking',
            thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
            youtubeUrl: 'https://www.youtube.com/embed/3HkVD_2zLxg' // Generic baking video ID
        },
        {
            id: '3',
            title: 'Cookie Decorating Masterclass',
            thumbnail: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80',
            youtubeUrl: 'https://www.youtube.com/embed/JpCjeqRiSmw'
        }
    ]);

    const [activeVideo, setActiveVideo] = useState(null);

    return (
        <section className="py-20 bg-red-50 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl -ml-40 -mb-40"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="inline-block text-brand-red font-bold tracking-[0.3em] text-sm uppercase bg-white px-6 py-2 rounded-full shadow-sm mb-4">
                        Watch Us Work
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-red-950 mb-4">
                        Bakery In Action
                    </h2>
                    <p className="text-amber-900/70 text-lg max-w-2xl mx-auto">
                        See the love, care, and craftsmanship that goes into every single one of our creations.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            className="group relative rounded-3xl overflow-hidden shadow-premium bg-white cursor-pointer hover:-translate-y-2 transition-all duration-500"
                            onClick={() => setActiveVideo(video)}
                        >
                            {/* Thumbnail */}
                            <div className="aspect-video overflow-hidden relative">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>

                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-brand-yellow/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Play className="fill-brand-dark text-brand-dark ml-1" size={32} />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="font-display font-bold text-xl text-brand-dark group-hover:text-brand-red transition-colors">
                                    {video.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
                    <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
                        <button
                            onClick={() => setActiveVideo(null)}
                            className="absolute top-4 right-4 z-10 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all"
                        >
                            <X size={32} />
                        </button>
                        <div className="aspect-video w-full">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`${activeVideo.youtubeUrl}?autoplay=1`}
                                title={activeVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default VideoGallery;
