const DATA = {
  name: "Arthur Conde Salazar",
  headline: "Renderers and simulations, written in C++ and GLSL.",
  email: "arthur.condesalazar@gmail.com",
  github: "https://github.com/ACondeSalazar",
  linkedin: "https://linkedin.com/in/arthur-conde-salazar",
  cv: "assets/CV_Arthur_Conde_Salazar.pdf",

  specs: {
    Focus: "Rendering · Image processing",
    Languages: "C++ · GLSL · Python",
    Tools: "OpenGL · Godot",
    Available: "Looking for a job"
  },

  education: [
    { years: "2024 - 2026", what: "Master IMAGINE, Faculté des sciences de Montpellier" }
  ],

  projects: [
    {
      id: "asciiraster",
      category: "Software rendering",
      title: "Rasterizer and ASCII renderer",
      short: "A real-time CPU rasterizer with terminal output.",
      overview: [
        "The rasterizer uses one image-saving library. A terminal renderer converts each frame to text."
      ],
      tech: ["C++"],
      features: ["Triangle mesh rasterization", "OBJ model loader", "Image processing", "Terminal character output"],
      thumbnail: "assets/asciiraster/asciithumb2.png",
      media: [
        { type: "image", src: "assets/asciiraster/rasterbase.png", caption: "Triangle meshes rasterized" },
        { type: "image", src: "assets/asciiraster/asciithumb2.png", caption: "Rasterized meshes rendered in the terminal" }
      ],
      collaborators: [],
      references: [
        { title: "Acerola: I Tried Turning Games Into Text", url: "https://www.youtube.com/watch?v=gg40RWiaHRY", type: "Youtube" },
        { title: "Scratchapixel: Rasterization", url: "https://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation/overview-rasterization-algorithm.html", type: "Article" }
      ],
      repo: "https://github.com/ACondeSalazar/ascii_rasterizer"
    },
    {
      id: "blackhole",
      category: "Real-time shading",
      title: "Raymarched Black Hole",
      short: "A raymarched black hole where ray paths bend under the mass.",
      overview: [
        "I wrote this simulation to learn raymarching. The black hole's mass deflects each ray and distorts the image."
      ],
      tech: ["C++", "Raylib", "GLSL"],
      features: ["Raymarching shader", "Gravity-affected rays"],
      thumbnail: "assets/blackhole/thumbbh.png",
      media: [
        { type: "video", src: "assets/blackhole/bh.mp4", caption: "Lensing in motion" },
        { type: "image", src: "assets/blackhole/bh1.png" },
        { type: "image", src: "assets/blackhole/bh2.png" }
      ],
      collaborators: [],
      references: [
        { title: "Simulating Black Holes in C++", url: "https://www.youtube.com/watch?v=8-B6ryuBkCM", type: "Youtube" },
        { title: "Inigo Quilez: Raymarching primitives", url: "https://www.shadertoy.com/view/Xds3zN", type: "ShaderToy" }
      ],
      repo: "https://github.com/ACondeSalazar/black-hole"
    },
    {
      id: "gameengine",
      category: "Engine architecture",
      title: "Luigi Engine",
      short: "A C++ game engine using modern OpenGL.",
      overview: [
        "The engine includes an entity component system, physically based rendering, vehicle physics and a spline track editor.",
        "I implemented the ECS and physics."
      ],
      tech: ["C++", "OpenGL", "GLSL"],
      features: ["Entity component system", "Physically-based rendering", "Vehicle and box physics", "Spline track editor"],
      thumbnail: "assets/luigiengine/playground.png",
      media: [
        { type: "video", src: "assets/luigiengine/pbr.mp4", caption: "PBR materials across metallic and roughness values" },
        { type: "video", src: "assets/luigiengine/car_compressed.mp4", caption: "Vehicle physics" },
        { type: "image", src: "assets/luigiengine/rainbow.png", caption: "Rainbow road, built with the track editor" }
      ],
      collaborators: [
        { name: "Mateusz Birembaut", url: "https://github.com/Mateusz-Birembaut" },
        { name: "Rémy Guibert", url: "https://github.com/Rashnain" }
      ],
      references: [
        { title: "Learn OpenGL", url: "https://learnopengl.com/", type: "Tutorial" },
        { title: "Allen Chou: Game physics series", url: "https://allenchou.net/game-physics-series/", type: "Tutorial" }
      ],
      repo: "https://github.com/Rashnain/LuigiEngine"
    },
    {
      id: "ocean",
      category: "Procedural generation",
      title: "Better Ocean Simulation",
      short: "Removing the periodicity from Tessendorf ocean heightmaps.",
      overview: [
        "Tessendorf ocean simulations use repeating heightmaps. The repetition becomes visible over large surfaces.",
        "I tile and blend the heightmap to extend it without visible repetition."
      ],
      tech: ["Godot", "GLSL Compute"],
      features: ["Tiling and blending", "Wave orientation"],
      thumbnail: "assets/ocean/thumb.png",
      media: [
        { type: "image", src: "assets/ocean/base.png", caption: "Original ocean heightmap" },
        { type: "image", src: "assets/ocean/tb.png", caption: "After tiling and blending" },
        { type: "video", src: "assets/ocean/showcase.mp4", caption: "Ocean simulation" }
      ],
      collaborators: [
        { name: "Théo Reynier", url: "https://github.com/RTheoGH" },
        { name: "Andrew Mansour", url: "https://github.com/Sloth-King" },
        { name: "Killian Viguier", url: "https://github.com/VigKillian" }
      ],
      references: [
        { title: "Simulating Ocean Water by Jerry Tessendorf", url: "https://people.computing.clemson.edu/~jtessen/reports/papers_files/coursenotes2004.pdf", type: "Paper" },
        { title: "Fast orientable aperiodic ocean synthesis using tiling and blending", url: "assets/ocean/LSG24.pdf", type: "Paper" }
      ],
      repo: "https://github.com/RTheoGH/TER-Ocean"
    },
    {
      id: "raytracing",
      category: "Offline rendering",
      title: "CPU Raytracer",
      short: "A CPU raytracer written in C++.",
      overview: [],
      tech: ["C++", "OpenGL"],
      features: ["Shadows", "Reflections", "Refractions", "Multiple light sources", "Normal interpolation", "Textures"],
      thumbnail: "assets/raytracing/raptor.png",
      media: [
        { type: "image", src: "assets/raytracing/two_light.png", caption: "Multiple light sources with shadows" },
        { type: "image", src: "assets/raytracing/refrac.png", caption: "Refraction" },
        { type: "image", src: "assets/raytracing/bunny_mirror.png", caption: "Reflection" },
        { type: "video", src: "assets/raytracing/cornell.mp4", caption: "Cornell box" },
        { type: "image", src: "assets/raytracing/interpolation.png", caption: "Mesh normal interpolation" }
      ],
      collaborators: [],
      references: [],
      repo: "https://github.com/ACondeSalazar/Raytracing_M1_S1"
    },
    {
      id: "compression",
      category: "Image processing",
      title: "Image Compression App",
      short: "Compression algorithms rebuilt in the style of JPEG and JPEG2000.",
      overview: [
        "I implemented the main stages of JPEG and JPEG2000 and built a viewer for comparing their output."
      ],
      tech: ["C++", "SDL3", "ImGui"],
      features: ["4K image compression", "Discrete cosine transform", "Discrete wavelet transform", "Huffman encoding", "LZ77 encoding"],
      thumbnail: "assets/compression/thumb.png",
      media: [
        { type: "image", src: "assets/compression/jpeg.png", caption: "JPEG-like compression results" },
        { type: "image", src: "assets/compression/jpeg2000.png", caption: "JPEG2000-like compression results" },
        { type: "image", src: "assets/compression/compressionbest.png", caption: "Algorithm comparison" }
      ],
      collaborators: [
        { name: "Thimothée Bonetti", url: "https://github.com/gubace" }
      ],
      references: [
        { title: "The JPEG Image Compression Algorithm", url: "https://www.researchgate.net/profile/Muzhir-Al-Ani/publication/268523100_THE_JPEG_IMAGE_COMPRESSION_ALGORITHM/links/549f251f0cf267bdb8fdbb89/THE-JPEG-IMAGE-COMPRESSION-ALGORITHM.pdf", type: "Paper" },
        { title: "JPEG2000: Highly Scalable Image Compression", url: "https://www2.engr.arizona.edu/~bilgin/publications/ITCC2001.pdf", type: "Paper" }
      ],
      repo: "https://github.com/ACondeSalazar/Projet_Compression_M1"
    }
  ]
};
