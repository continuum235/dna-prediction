import React from "react";

const Slider = () => {
  return (
    <div className="carousel carousel-center bg-neutral rounded-xl border h-full overflow-auto p-4">
      <div className="carousel-inner flex">
        <div className="carousel-item w-5/6 p-2">
          <img src="slide/gpcr.jpg" alt="GPCR" className="rounded-xl w-full h-full object-cover" />
        </div>
        <div className="carousel-item w-5/6 p-2">
          <img src="slide/ion_channel.jpg" alt="Ion Channel" className="rounded-xl w-full h-full object-cover" />
        </div>
        <div className="carousel-item w-5/6 p-2">
          <img src="slide/synthases.jpg" alt="Synthases" className="rounded-xl w-full h-full object-cover" />
        </div>
        <div className="carousel-item w-5/6 p-2">
          <img src="slide/synthetases.jpg" alt="Synthetases" className="rounded-xl w-full h-full object-cover" />
        </div>
        <div className="carousel-item w-5/6 p-2">
          <img src="slide/thyrosine_phosphate.jpg" alt="Thyrosine Phosphate" className="rounded-xl w-full h-full object-cover" />
        </div>
        <div className="carousel-item w-5/6 p-2">
          <img src="slide/transcription_factors.jpg" alt="Transcription Factors" className="rounded-xl w-full h-full object-cover" />
        </div>
        <div className="carousel-item w-5/6 p-2">
          <img src="slide/tyrosine_kinases.jpg" alt="Tyrosine Kinases" className="rounded-xl w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Slider;