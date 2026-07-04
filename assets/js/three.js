{
    "imports": {
        "three": "https://unpkg.com/three@0.128.0/build/three.module.js"
    }
}

import * as THREE from 'three';

        const container = document.getElementById('three-container');
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0e1a);

        const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 10);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        container.appendChild(renderer.domElement);

        // LIGHTS
        const ambientLight = new THREE.AmbientLight(0x404060, 0.6);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
        dirLight.position.set(5, 8, 5);
        scene.add(dirLight);

        const backLight = new THREE.DirectionalLight(0x3f6ef0, 0.8);
        backLight.position.set(-3, 0, -5);
        scene.add(backLight);

        const pointLight = new THREE.PointLight(0x6a9cff, 0.5, 20);
        pointLight.position.set(0, 2, 4);
        scene.add(pointLight);

        // MAIN OBJECT - Large Icosahedron with glow
        const geo1 = new THREE.IcosahedronGeometry(1.8, 2);
        const mat1 = new THREE.MeshPhysicalMaterial({
            color: 0x3f6ef0,
            metalness: 0.2,
            roughness: 0.3,
            wireframe: false,
            transparent: true,
            opacity: 0.85,
            emissive: 0x1a3a8a,
            emissiveIntensity: 0.15,
        });
        const mainMesh = new THREE.Mesh(geo1, mat1);
        mainMesh.position.set(-0.5, 0.2, 0);
        scene.add(mainMesh);

        // Wireframe overlay
        const wireMat = new THREE.MeshPhysicalMaterial({
            color: 0x7a9cff,
            wireframe: true,
            transparent: true,
            opacity: 0.25,
        });
        const wireMesh = new THREE.Mesh(geo1, wireMat);
        wireMesh.position.copy(mainMesh.position);
        wireMesh.scale.set(1.02, 1.02, 1.02);
        scene.add(wireMesh);

        // TORUS KNOT - floating
        const knotGeo = new THREE.TorusKnotGeometry(1.2, 0.4, 128, 16);
        const knotMat = new THREE.MeshPhysicalMaterial({
            color: 0x6a9cff,
            metalness: 0.1,
            roughness: 0.4,
            wireframe: false,
            transparent: true,
            opacity: 0.6,
            emissive: 0x2a4a8a,
            emissiveIntensity: 0.1,
        });
        const knot = new THREE.Mesh(knotGeo, knotMat);
        knot.position.set(2.5, -0.8, -1);
        scene.add(knot);

        // Small floating particles
        const particlesGeo = new THREE.BufferGeometry();
        const particleCount = 200;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 15;
        }
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMat = new THREE.PointsMaterial({
            color: 0x7a9cff,
            size: 0.04,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
        });
        const particles = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particles);

        // Ring / orbit
        const ringGeo = new THREE.TorusGeometry(2.5, 0.02, 32, 100);
        const ringMat = new THREE.MeshPhysicalMaterial({
            color: 0x4a7aff,
            transparent: true,
            opacity: 0.15,
            emissive: 0x2a4a8a,
            emissiveIntensity: 0.1,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(0, 0, 0);
        ring.rotation.x = Math.PI / 3;
        ring.rotation.z = 0.2;
        scene.add(ring);

        // Second ring
        const ring2Geo = new THREE.TorusGeometry(3.0, 0.015, 16, 100);
        const ring2Mat = new THREE.MeshPhysicalMaterial({
            color: 0x6a9cff,
            transparent: true,
            opacity: 0.1,
            emissive: 0x3a5a9a,
            emissiveIntensity: 0.05,
        });
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        ring2.position.set(0, 0.5, 0);
        ring2.rotation.x = Math.PI / 2.5;
        ring2.rotation.y = 0.5;
        scene.add(ring2);

        // MOUSE TRACKING
        let mouseX = 0, mouseY = 0;
        let targetRotX = 0, targetRotY = 0;

        document.addEventListener('mousemove', (event) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            mouseX = x * 0.3;
            mouseY = y * 0.2;
        });

        // Touch support
        document.addEventListener('touchmove', (event) => {
            if (event.touches.length > 0) {
                const touch = event.touches[0];
                const x = (touch.clientX / window.innerWidth) * 2 - 1;
                const y = -(touch.clientY / window.innerHeight) * 2 + 1;
                mouseX = x * 0.3;
                mouseY = y * 0.2;
            }
        });

        // ANIMATION LOOP
        let time = 0;
        function animate() {
            requestAnimationFrame(animate);
            time += 0.005;

            // Smooth follow mouse
            targetRotX += (mouseX - targetRotX) * 0.05;
            targetRotY += (mouseY - targetRotY) * 0.05;

            // Main mesh rotation
            mainMesh.rotation.x = time * 0.3 + targetRotY * 0.5;
            mainMesh.rotation.y = time * 0.5 + targetRotX * 0.5;
            wireMesh.rotation.x = mainMesh.rotation.x;
            wireMesh.rotation.y = mainMesh.rotation.y;

            // Knot rotation
            knot.rotation.x = time * 0.4 + targetRotX * 0.3;
            knot.rotation.y = time * 0.6 + targetRotY * 0.3;
            knot.position.x = 2.2 + Math.sin(time * 0.5) * 0.3;
            knot.position.y = -0.6 + Math.cos(time * 0.7) * 0.3;

            // Ring rotation
            ring.rotation.z = time * 0.15;
            ring.rotation.y = time * 0.2;
            ring2.rotation.x = time * 0.1 + 0.5;
            ring2.rotation.z = time * 0.08;

            // Particles drift
            particles.rotation.y = time * 0.02;
            particles.rotation.x = Math.sin(time * 0.01) * 0.05;

            // Camera subtle movement
            camera.position.x = Math.sin(time * 0.1) * 0.3 + targetRotX * 0.5;
            camera.position.y = Math.cos(time * 0.08) * 0.2 + targetRotY * 0.3;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        }
        animate();

        // RESIZE
        window.addEventListener('resize', () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        });

        // Theme change - update background
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
                const bgColor = isDark ? 0x0a0e1a : 0xf0f4ff;
                scene.background = new THREE.Color(bgColor);
            });
        }
        // Initial background
        scene.background = new THREE.Color(0x0a0e1a);