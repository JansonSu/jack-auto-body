import React from 'react';
import { Star, Quote, MapPin, ExternalLink } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "Michael Chen",
    date: "2 weeks ago",
    rating: 5,
    text: "Jack is an absolute magician with PDR. I had a nasty door ding on my Model Y and other shops wanted to paint the whole door. Jack fixed it in under an hour for a fraction of the price. You can't even tell where it was.",
    avatar: "M"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    date: "1 month ago",
    rating: 5,
    text: "Came for the dent repair, stayed for the camping gear! I didn't know they were a Wild Land dealer. Jack helped me pick out a Pathfinder II for my 4Runner. Honest service and great quality work.",
    avatar: "S"
  },
  {
    id: 3,
    name: "David Rodriguez",
    date: "3 months ago",
    rating: 5,
    text: "Best auto body experience I've had in Chino. Professional, transparent pricing, and he actually cares about the result. The glass repair on my windshield is holding up perfectly.",
    avatar: "D"
  }
];

const GOOGLE_MAPS_LINK = "https://www.google.com/maps/place/%E6%B1%BD%E8%BD%A6%E5%87%B9%E9%99%B7%E4%BF%AE%E5%A4%8DAuto+Dent+Repair+%2F+Paintless+Dent+Repair+(PDR)/@34.0019031,-117.7207547,20.5z/data=!3m1!5s0x80c332ba07643adf:0xe0ea4ff9e3bd3f37!4m12!1m2!2m1!1s13851+Roswell+Ave+chino+CA+91710+D,+Chino,+CA+91710!3m8!1s0x80c33316872b81f7:0xfccaa72af1980c9e!8m2!3d34.0019062!4d-117.7203115!9m1!1b1!15sCjMxMzg1MSBSb3N3ZWxsIEF2ZSBjaGlubyBDQSA5MTcxMCBELCBDaGlubywgQ0EgOTE3MTBaMyIxMTM4NTEgcm9zd2VsbCBhdmUgY2hpbm8gY2EgOTE3MTAgZCBjaGlubyBjYSA5MTcxMJIBGWF1dG9fZGVudF9yZW1vdmFsX3NlcnZpY2WaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMnhyZDFkcVpGbGlWMVpPWTJwR1FsVkVSbEZWYm14TFUwTXhVV1JyUlJBQuABAPoBBAgAEA4!16s%2Fg%2F11xl69k7lz?entry=ttu&g_ep=EgoyMDI2MDEyNi4wIKXMDSoASAFQAw%3D%3D";

const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 bg-industrial-900 border-b border-industrial-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-industrial-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-yellow-500/10 text-yellow-500 text-xs font-bold px-2 py-1 rounded border border-yellow-500/20 flex items-center">
                <Star className="w-3 h-3 mr-1 fill-yellow-500" /> 5.0 RATING
              </span>
              <span className="text-gray-500 text-xs uppercase tracking-widest font-bold">Verified Customers</span>
            </div>
            <h2 className="text-4xl font-display font-bold text-white uppercase tracking-wider">
              Local Reviews
            </h2>
          </div>
          
          <a 
            href={GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors group"
          >
            <MapPin className="w-4 h-4 text-industrial-accent group-hover:animate-bounce" />
            View on Google Maps <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-industrial-800 p-6 rounded-xl border border-industrial-700 hover:border-industrial-accent transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold border border-gray-600">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm leading-tight">{review.name}</h4>
                    <span className="text-gray-500 text-xs">{review.date}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-industrial-700 opacity-50 transform -scale-x-100" />
                <p className="text-gray-300 text-sm leading-relaxed relative z-10 pl-4">
                  "{review.text}"
                </p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-industrial-700/50 flex items-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-4 h-4 opacity-70" />
                <span className="text-xs text-gray-500 font-medium">Posted on Google Maps</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a 
            href={GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-industrial-800 border border-industrial-700 rounded-lg text-white font-bold text-sm"
          >
             Read all reviews on Google <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
