import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ImageSlider = ({ images }: {images: string[]}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="w-full h-96 rounded-lg object-cover"
      />
      
      {/* Left Arrow */}
      <button
        className="absolute top-1/2 left-4 text-white bg-gray-800 p-2 rounded-full transform -translate-y-1/2"
        onClick={prevSlide}
      >
        <FaArrowLeft size={20} />
      </button>
      
      {/* Right Arrow */}
      <button
        className="absolute top-1/2 right-4 text-white bg-gray-800 p-2 rounded-full transform -translate-y-1/2"
        onClick={nextSlide}
      >
        <FaArrowRight size={20} />
      </button>

      {/* Slide Indicators */}
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${
              index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
