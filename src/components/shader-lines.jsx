"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ShaderAnimation() {
  const containerRef = useRef(null);
  const sceneRef = useRef({
    camera: null,
    scene: null,
    renderer: null,
    uniforms: null,
    animationId: null,
  });
  const resizeHandlerRef = useRef(null);

  useEffect(() => {
    initThreeJS();

    return () => {
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose();
      }
      if (resizeHandlerRef.current) {
        window.removeEventListener("resize", resizeHandlerRef.current);
      }
    };
  }, []);

  const initThreeJS = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = "";

    const camera = new THREE.Camera();
    camera.position.z = 1;
    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    // 🎨 Passing your exact CSS palette as uniforms to the GPU
    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
      colorBg: { value: new THREE.Color("#262323") },
      colorOrange: { value: new THREE.Color("#eb5939") },
      colorCream: { value: new THREE.Color("#b7ab98") },
    };

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      
      uniform vec2 resolution;
      uniform float time;
      
      // Injecting our palette
      uniform vec3 colorBg;
      uniform vec3 colorOrange;
      uniform vec3 colorCream;
        
      float random (in float x) {
          return fract(sin(x)*1e4);
      }
      
      void main(void) {
        // Normalize coordinates
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        
        // The mosaic/pixelation effect from your original code
        vec2 fMosaicScal = vec2(4.0, 2.0);
        vec2 vScreenSize = vec2(256.0, 256.0);
        uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
        uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);       
          
        float t = time * 0.04 + random(uv.x) * 0.4;
        float lineWidth = 0.0008;

        // Calculate intensity for the primary orange lines
        float intensityOrange = 0.0;
        for(int i = 0; i < 5; i++){
          intensityOrange += lineWidth * float(i*i) / abs(fract(t + float(i)*0.003) * 1.0 - length(uv));
        }

        // Calculate a secondary intensity for the cream lines (slightly offset)
        float intensityCream = 0.0;
        for(int i = 0; i < 5; i++){
          intensityCream += (lineWidth * 0.5) * float(i*i) / abs(fract(t - 0.015 + float(i)*0.003) * 1.0 - length(uv));
        }

        // Blend the background with our two glowing line colors
        vec3 finalColor = colorBg + (colorOrange * intensityOrange * 0.6) + (colorCream * intensityCream * 0.8);
        
        // gl_FragColor = vec4(finalColor, 1.0);
        // 1. Get your vertical screen coordinate normalized from 0.0 (bottom) to 1.0 (top)
        float verticalPosition = gl_FragCoord.y / resolution.y;

        // 2. Create a smooth gradient mask that fades out at the bottom 20% of the container
        float edgeAlpha = smoothstep(0.0, 0.2, verticalPosition);

        // 3. Output color with the alpha mask applied
        gl_FragColor = vec4(finalColor, edgeAlpha);
    
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,  
    }); 

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    sceneRef.current = { camera, scene, renderer, uniforms, animationId: null };

    const onWindowResize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      uniforms.resolution.value.x = renderer.domElement.width;
      uniforms.resolution.value.y = renderer.domElement.height;
    };

    onWindowResize();
    resizeHandlerRef.current = onWindowResize;
    window.addEventListener("resize", onWindowResize, false);

    const animate = () => {
      sceneRef.current.animationId = requestAnimationFrame(animate);
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);
    };

    animate();
  };

  // Added z-0 to explicitly map its layer behavior inside your Hero component
  return <div ref={containerRef} className="w-full h-full absolute inset-0 z-0 " />;
} 