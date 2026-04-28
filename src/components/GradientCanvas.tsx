import React, { useEffect, useRef } from 'react';
import type { Preset } from '../data/presets';

interface GradientCanvasProps {
  preset: Preset;
  speed: number;
  distortion: number;
  softness: number;
}

const GradientCanvas: React.FC<GradientCanvasProps> = ({ preset, speed, distortion, softness }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      uniform float speed;
      uniform float distortion;
      uniform float softness;

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float smoothNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = noise(i);
        float b = noise(i + vec2(1.0, 0.0));
        float c = noise(i + vec2(0.0, 1.0));
        float d = noise(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        for(int i = 0; i < 5; i++) {
          value += amplitude * smoothNoise(p * frequency);
          frequency *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= resolution.x / resolution.y;

        float t = time * speed;
        vec2 warp = vec2(
          fbm(p * distortion + t * 0.3),
          fbm(p * distortion + t * 0.3 + 100.0)
        );
        p += warp * 0.5;

        float dist1 = length(p - vec2(sin(t * 0.5) * 0.8, cos(t * 0.3) * 0.6));
        float dist2 = length(p - vec2(cos(t * 0.4) * 0.7, sin(t * 0.6) * 0.8));
        float dist3 = length(p - vec2(sin(t * 0.7) * 0.6, cos(t * 0.5) * 0.7));

        float blend1 = smoothstep(1.5, 0.0, dist1 * softness);
        float blend2 = smoothstep(1.5, 0.0, dist2 * softness);
        float blend3 = smoothstep(1.5, 0.0, dist3 * softness);

        vec3 color = mix(
          mix(color1 * blend1, color2 * blend2, 0.5),
          color3 * blend3,
          0.33
        );

        float gradientY = smoothstep(0.0, 1.0, uv.y);
        color = mix(color, color * 0.8, gradientY * 0.3);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vertexShaderSource));
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fragmentShaderSource));
    gl.linkProgram(program);
    programRef.current = program;

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      const time = (Date.now() - startTimeRef.current) * 0.001;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      const posLoc = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(gl.getUniformLocation(program, 'resolution'), canvas.width, canvas.height);
      gl.uniform1f(gl.getUniformLocation(program, 'time'), time);
      gl.uniform3fv(gl.getUniformLocation(program, 'color1'), preset.color1);
      gl.uniform3fv(gl.getUniformLocation(program, 'color2'), preset.color2);
      gl.uniform3fv(gl.getUniformLocation(program, 'color3'), preset.color3);
      gl.uniform1f(gl.getUniformLocation(program, 'speed'), speed);
      gl.uniform1f(gl.getUniformLocation(program, 'distortion'), distortion);
      gl.uniform1f(gl.getUniformLocation(program, 'softness'), softness);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [preset, speed, distortion, softness]);

  return (
    <canvas
      ref={canvasRef}
      id="gradientCanvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
};

export default GradientCanvas;
