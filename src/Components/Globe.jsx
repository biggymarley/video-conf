import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import ThreeGlobe from "three-globe";
const N = 20;
const arcsData = [...Array(N).keys()].map(() => ({
  startLat: (Math.random() - 0.5) * 180,
  startLng: (Math.random() - 0.5) * 360,
  endLat: (Math.random() - 0.5) * 180,
  endLng: (Math.random() - 0.5) * 360,
  color: ["#D9D990", "#D9D990", "#D9D990", "#D9D990"][
    Math.round(Math.random() * 3)
  ],
}));
const Globe = () => {
  const globeDivRef = useRef(null);
  const renderer = useRef(null);
  const scene = useRef(null);
  const camera = useRef(null);
  const tbControls = useRef(null);
  const [countriesData, setCountriesData] = useState(null);

  useEffect(() => {
    fetch("/map.geojson")
      .then((response) => response.json())
      .then((data) => {
        setCountriesData(data);
      })
      .catch((error) => {
        console.error("Error fetching countries data:", error);
      });
  }, []);
  useEffect(() => {
    if (countriesData) {
      const Globe = new ThreeGlobe()
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
        .hexPolygonsData(countriesData.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.3)
        .hexPolygonUseDots(true)
        .arcsData(arcsData)
        .arcColor("color")
        .arcDashLength(0.4)
        .arcDashGap(4)
        .arcDashInitialGap(() => Math.random() * 5)
        .arcDashAnimateTime(1000)
        // .hexPolygonColor(
        //   () =>
        //     `#${Math.round(Math.random() * Math.pow(2, 24))
        //       .toString(16)
        //       .padStart(6, "0")}`
        // );

      // Setup renderer
      renderer.current = new THREE.WebGLRenderer({ alpha: true });
      renderer.current.setSize(window.innerWidth, window.innerHeight);
      globeDivRef.current.appendChild(renderer.current.domElement);

      // Setup scene
      scene.current = new THREE.Scene();
      scene.current.add(Globe);
      scene.current.add(new THREE.AmbientLight(0xcccccc, Math.PI));
      scene.current.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));

      // Setup camera
      camera.current = new THREE.PerspectiveCamera();
      camera.current.aspect = window.innerWidth / window.innerHeight;
      camera.current.updateProjectionMatrix();
      camera.current.position.z = 400;
      // camera.current.position.y =  1500;

      // Add camera controls
      tbControls.current = new TrackballControls(
        camera.current,
        renderer.current.domElement
      );
      tbControls.current.minDistance = 101;
      // tbControls.current.rotateSpeed = 5;
      tbControls.current.noZoom = true; // Disable zoom
      tbControls.current.zoomSpeed = 0.8;

      // Animation loop
      const animate = () => {
        tbControls.current.update();
        renderer.current.render(scene.current, camera.current);
        requestAnimationFrame(animate);
      };
      animate();

      // Cleanup function
      return () => {
        renderer.current.dispose();
        tbControls.current.dispose();
      };
    }
  }, [countriesData]);

  return <div id="globeViz" ref={globeDivRef} className="z-[-1]"/>;
};

export default Globe;
