import React from 'react';

const ComparisonSection: React.FC = () => {
  return (
    <section className="py-16 bg-industrial-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-display font-bold text-white mb-8 text-center uppercase tracking-wider">
          Results Speak Louder
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Case 1: Dent Repair */}
          <div className="bg-industrial-900 p-4 rounded-lg border border-industrial-700">
            <h3 className="text-xl font-bold text-industrial-accent mb-4">PDR: Door Dent Removal</h3>
            <div className="relative group h-64 w-full overflow-hidden rounded-md">
              {/* This is a simple visual trick. In a real app, use a slider library. Here we use hover to reveal. */}
              <div className="absolute inset-0 w-full h-full flex">
                <div className="w-1/2 h-full relative border-r-2 border-white/20">
                    <img 
                      src="https://picsum.photos/400/300?random=1&grayscale" 
                      alt="Before" 
                      className="object-cover w-full h-full opacity-80"
                    />
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase">Before</span>
                </div>
                <div className="w-1/2 h-full relative">
                    <img 
                      src="https://picsum.photos/400/300?random=2" 
                      alt="After" 
                      className="object-cover w-full h-full"
                    />
                    <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 uppercase">After</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Complete removal of door ding without repainting. Preserves original factory finish.
            </p>
          </div>

          {/* Case 2: Glass Repair */}
          <div className="bg-industrial-900 p-4 rounded-lg border border-industrial-700">
            <h3 className="text-xl font-bold text-industrial-accent mb-4">Windshield Crack Repair</h3>
             <div className="relative group h-64 w-full overflow-hidden rounded-md">
              <div className="absolute inset-0 w-full h-full flex">
                <div className="w-1/2 h-full relative border-r-2 border-white/20">
                    <img 
                      src="https://picsum.photos/400/300?random=3&grayscale" 
                      alt="Before" 
                      className="object-cover w-full h-full opacity-80"
                    />
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase">Before</span>
                </div>
                <div className="w-1/2 h-full relative">
                    <img 
                      src="https://picsum.photos/400/300?random=4" 
                      alt="After" 
                      className="object-cover w-full h-full"
                    />
                    <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 uppercase">After</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Resin injection technique to stop long cracks from spreading and restore visibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
