import { useEffect, useRef } from "react";
import * as THREE from "three";

export function TechnicalScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#f4f4f5");

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.6, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor("#f4f4f5", 1);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const mainGeometry = new THREE.TorusKnotGeometry(1.2, 0.28, 180, 18);
    const cyanMaterial = new THREE.MeshBasicMaterial({
      color: "#00A8E8",
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const goldMaterial = new THREE.MeshBasicMaterial({
      color: "#C9A92C",
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const graphiteMaterial = new THREE.MeshBasicMaterial({
      color: "#171A1D",
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });

    const knot = new THREE.Mesh(mainGeometry, cyanMaterial);
    group.add(knot);

    const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.05, 12, 120), goldMaterial);
    ringA.rotation.set(1.1, 0.5, 0.2);
    group.add(ringA);

    const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.9, 0.035, 8, 120), graphiteMaterial);
    ringB.rotation.set(0.4, 1.1, 0.7);
    group.add(ringB);

    const frame = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(5.2, 5.2, 5.2)),
      new THREE.LineBasicMaterial({ color: "#171A1D", transparent: true, opacity: 0.16 }),
    );
    scene.add(frame);

    const resize = () => {
      const { clientWidth, clientHeight } = mount;

      if (!clientWidth || !clientHeight) {
        return;
      }

      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    let frameId = 0;

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);

      group.rotation.y += 0.0045;
      group.rotation.x += 0.0015;
      knot.rotation.z += 0.003;
      ringA.rotation.y -= 0.002;
      ringB.rotation.x += 0.0015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      renderer.dispose();
      mainGeometry.dispose();
      cyanMaterial.dispose();
      goldMaterial.dispose();
      graphiteMaterial.dispose();
      frame.geometry.dispose();
      (frame.material as THREE.Material).dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="h-full w-full" ref={mountRef} />;
}
