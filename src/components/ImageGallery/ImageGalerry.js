import React, { useState } from 'react';

function ImageGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 1));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      <img
        src={images[activeIndex]}
        alt={`Tutorial ${activeIndex + 1}`}
        style={{
        maxWidth: '100%', // Alterado para ocupar a largura total do contêiner
          height: 'auto', // Garante que a altura seja ajustada automaticamente
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center', // Alinha os botões horizontalmente ao centro
          marginTop: '10px', // Adicione margem superior para separar a imagem dos botões
        }}
      >
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Anterior
          </button>
          <button
            onClick={handleNext}
            disabled={activeIndex === images.length - 1}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageGallery;
