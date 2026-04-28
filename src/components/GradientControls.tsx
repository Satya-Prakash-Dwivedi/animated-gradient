import React from 'react';

interface GradientControlsProps {
  currentPreset: string;
  speed: number;
  distortion: number;
  softness: number;
  onPresetChange: (preset: string) => void;
  onSpeedChange: (speed: number) => void;
  onDistortionChange: (distortion: number) => void;
  onSoftnessChange: (softness: number) => void;
}

const GradientControls: React.FC<GradientControlsProps> = ({
  currentPreset,
  speed,
  distortion,
  softness,
  onPresetChange,
  onSpeedChange,
  onDistortionChange,
  onSoftnessChange,
}) => {
  return (
    <div className="controls">
      <h3>Customize</h3>
      
      <div className="control-group">
        <label htmlFor="preset">Preset</label>
        <select 
          id="preset" 
          value={currentPreset}
          onChange={(e) => onPresetChange(e.target.value)}
        >
          <optgroup label="🔲 SOLID STATE">
            <option value="crystal">Crystal</option>
            <option value="diamond">Diamond</option>
            <option value="metal">Metal</option>
            <option value="stone">Stone</option>
            <option value="marble">Marble</option>
            <option value="emerald">Emerald</option>
            <option value="ruby">Ruby</option>
            <option value="sapphire">Sapphire</option>
            <option value="obsidian">Obsidian</option>
            <option value="quartz">Quartz</option>
          </optgroup>
          <optgroup label="💧 LIQUID STATE">
            <option value="water">Water</option>
            <option value="ocean">Ocean</option>
            <option value="flow">Flow</option>
            <option value="mercury">Mercury</option>
            <option value="oil">Oil</option>
            <option value="honey">Honey</option>
            <option value="lava">Lava</option>
            <option value="blood">Blood</option>
            <option value="milk">Milk</option>
            <option value="wine">Wine</option>
          </optgroup>
          <optgroup label="☁️ GAS STATE">
            <option value="steam">Steam</option>
            <option value="smoke">Smoke</option>
            <option value="fog">Fog</option>
            <option value="cloud">Cloud</option>
            <option value="mist">Mist</option>
            <option value="vapor">Vapor</option>
            <option value="atmosphere">Atmosphere</option>
            <option value="nebula">Nebula</option>
          </optgroup>
          <optgroup label="⚡ PLASMA STATE">
            <option value="plasma">Plasma</option>
            <option value="lightning">Lightning</option>
            <option value="electric">Electric</option>
            <option value="aurora">Aurora</option>
            <option value="solar">Solar</option>
            <option value="fusion">Fusion</option>
            <option value="corona">Corona</option>
            <option value="neon">Neon</option>
            <option value="ionized">Ionized</option>
          </optgroup>
          <optgroup label="❄️ BOSE-EINSTEIN CONDENSATE">
            <option value="quantum">Quantum</option>
            <option value="absolute">Absolute Zero</option>
            <option value="superfluid">Superfluid</option>
            <option value="condensate">Condensate</option>
            <option value="zero">Zero Point</option>
            <option value="void">Void</option>
            <option value="ultracold">Ultracold</option>
            <option value="coherent">Coherent</option>
          </optgroup>
          <optgroup label="🌟 EXOTIC & NATURE">
            <option value="fire">Fire</option>
            <option value="ice">Ice</option>
            <option value="sunset">Sunset</option>
            <option value="forest">Forest</option>
            <option value="cosmic">Cosmic</option>
            <option value="midnight">Midnight</option>
            <option value="tropical">Tropical</option>
            <option value="candy">Candy</option>
            <option value="rose">Rose Gold</option>
            <option value="mint">Mint</option>
            <option value="purple">Purple Dream</option>
          </optgroup>
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="speed">Speed: <span>{speed.toFixed(1)}</span></label>
        <input 
          type="range" 
          id="speed" 
          min="0.1" 
          max="1" 
          step="0.1" 
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
        />
      </div>

      <div className="control-group">
        <label htmlFor="distortion">Distortion: <span>{distortion.toFixed(1)}</span></label>
        <input 
          type="range" 
          id="distortion" 
          min="1" 
          max="6" 
          step="0.5" 
          value={distortion}
          onChange={(e) => onDistortionChange(parseFloat(e.target.value))}
        />
      </div>

      <div className="control-group">
        <label htmlFor="softness">Softness: <span>{softness.toFixed(1)}</span></label>
        <input 
          type="range" 
          id="softness" 
          min="0.3" 
          max="1.5" 
          step="0.1" 
          value={softness}
          onChange={(e) => onSoftnessChange(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default GradientControls;
