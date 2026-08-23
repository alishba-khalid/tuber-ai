'use client';

import { Play, Clock } from 'lucide-react';

const videos = [
  {
    category: 'HISTORY',
    title: 'The Rise & Fall of Rome',
    duration: '10:00:00',
    img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
    overlay: ''
  },
  {
    category: 'DOCUMENTARY',
    title: "Inside the World's Most Mysterious Civilization",
    duration: '2:14:20',
    img: 'https://images.unsplash.com/photo-1518638150341-db700688f60b?auto=format&fit=crop&w=800&q=80',
    overlay: 'contrast-[1.05]'
  },
  {
    category: 'EDUCATION',
    title: 'Quantum Physics Explained',
    duration: '45:12',
    img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    overlay: ''
  },
  {
    category: 'STORYTELLING',
    title: 'The Mystery That Changed Everything',
    duration: '1:15:00',
    img: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
    overlay: ''
  }
];

export default function Showcase() {
  return (
    <section id="showcase" className="py-24 bg-transparent border-t border-[#122823]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-indigo mb-4">
            <span>SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#ECFDF5] mb-4">
            What Can GenByGhost Create?
          </h2>
          <p className="text-sm sm:text-base text-[#8FAAA6] leading-relaxed">
            See actual long-form videos compiled by the GenByGhost engine. These represent the high production value that turns viewers into subscribers.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((vid, idx) => (
            <div 
              key={idx}
              className="bg-[#0A1412] border border-[#122823] hover:border-[#C5B49F]/40 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 group cursor-pointer"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-stone-950">
                <img 
                  src={vid.img} 
                  alt={vid.title} 
                  className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75 ${vid.overlay}`}
                />
                
                {/* Visual gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B0A]/95 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-black/10 z-0" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#C5B49F] text-[#030706] flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 z-20 bg-black/80 border border-[#122823] px-2.5 py-1 rounded-md text-[10px] font-mono-label font-bold text-[#ECFDF5] flex items-center gap-1.5 shadow-md">
                  <Clock className="w-3.5 h-3.5 text-[#C5B49F]" />
                  <span>{vid.duration}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20 bg-[#C5B49F]/15 border border-[#C5B49F]/30 text-[#C5B49F] text-[9px] px-2 py-0.5 rounded-full font-mono-label font-bold tracking-widest uppercase">
                  {vid.category}
                </div>
              </div>

              {/* Info Area */}
              <div className="p-6 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold font-serif-heading text-[#ECFDF5] group-hover:text-[#C5B49F] transition-colors leading-tight">
                  {vid.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-[#8FAAA6]">
                  <span>100% Autonomous compilation</span>
                  <span>·</span>
                  <span>4K Render</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
