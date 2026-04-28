import React, { useState } from 'react';
import GradientCanvas from './GradientCanvas';
import GradientControls from './GradientControls';
import GradientContent from './GradientContent';
import { presets } from '../data/presets';

const AnimatedGradient: React.FC = () => {
  const [currentPreset, setCurrentPreset] = useState('crystal');
  const [speed, setSpeed] = useState(0.3);
  const [distortion, setDistortion] = useState(3.5);
  const [softness, setSoftness] = useState(0.8);

  const preset = presets[currentPreset] || presets.crystal;

  return (
    <div className="animated-gradient-container">
      <GradientCanvas 
        preset={preset} 
        speed={speed} 
        distortion={distortion} 
        softness={softness} 
      />
      
      <GradientContent />
      
      <GradientControls 
        currentPreset={currentPreset}
        speed={speed}
        distortion={distortion}
        softness={softness}
        presets={presets}
        onPresetChange={setCurrentPreset}
        onSpeedChange={setSpeed}
        onDistortionChange={setDistortion}
        onSoftnessChange={setSoftness}
      />
    </div>
  );
};

export default AnimatedGradient;
