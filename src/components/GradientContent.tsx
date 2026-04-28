import React from 'react';

/**
 * Layer 4: Secure UI Components
 * Fragments strings and reorders them via CSS to prevent simple scraping.
 */
const ObfuscatedText: React.FC<{ text: string; as?: 'h1' | 'p' }> = ({ text, as = 'p' }) => {
  const parts = text.split('').map((char, index) => ({
    char,
    order: Math.random(),
    id: index
  }));

  const sortedParts = [...parts].sort((a, b) => a.order - b.order);

  const Tag = as;

  return (
    <Tag style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      {sortedParts.map((part) => (
        <span 
          key={part.id} 
          style={{ order: parts.indexOf(parts.find(p => p.id === part.id)!) }}
        >
          {part.char === ' ' ? '\u00A0' : part.char}
        </span>
      ))}
    </Tag>
  );
};

const GradientContent: React.FC = () => {
  return (
    <div className="content">
      <ObfuscatedText text="Animated Gradient" as="h1" />
      <ObfuscatedText text="WebGL shader-based gradient with fluid, organic movement" as="p" />
    </div>
  );
};

export default GradientContent;
