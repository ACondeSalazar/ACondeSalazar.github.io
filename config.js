const PORTFOLIO_CONFIG = {
    // Personal Information
    personal: {
        name: "Arthur Conde Salazar",
        title: "Computer Graphics Student in Montpellier",
        location: "",
        email: "arthur.condesalazar@gmail.com",
        resume: "assets/CV_Arthur_Conde_Salazar.pdf",
        
        internshipMessage: {
            text: "I am currently seeking a 6-month end-of-study internship in computer graphics starting january 2026 !",
            show: true
        },
        
        bio: {
            greeting: "",
            description: [""]
        },
        
        profile: {
            role: "Computer Graphics Student",
            interests: [
                "Real-time Rendering",
                "Image Processing"
            ],
            skills: {
                languages: ["C++","GLSL", "Python"],
                tools: [ "OpenGL", "Godot" ],
            },
            education: {
                degree: "Master IMAGINE",
                at : "Faculté des sciences de Montpellier",
                status: "On going (M2)"
            }
        }
    },

    social: {
        github: "https://github.com/ACondeSalazar",
        linkedin: "https://linkedin.com/in/arthur-conde-salazar",
    },
    projects: [
        {
            id: "asciiraster",
            title: "Rasterizer and ASCII renderer from scratch",
            shortDescription: "in Real Time Rasterizer from scratch, rendered in the terminal (on going)",
            fullDescription: "This project is made of 2 part : <br> - a CPU rasterizer from scratch with only a single image saving library <br> - a Terminal Renderer to print images in the terminal",
            detailedDescription: [],
            technologies: ["C++"],
            thumbnail: "assets/asciiraster/asciithumb2.png",
            media: [
                {
                    type: "image",
                    src: "assets/asciiraster/rasterbase.png",
                    caption: "Triangle Meshes rasterized"
                },
                {
                    type: "image",
                    src: "assets/asciiraster/asciithumb2.png",
                    caption: "Rasterized Triangles Meshes rendered in the terminal"
                }
            ],
            features: [
                "Triangle Mesh Rasterization",
                "Obj model loader",
                "Image processing",
                "Print Image in terminal using characters"
            ],
            references: [
                {
                    title: "Acerola - I Tried Turning Games Into Text",
                    url: "https://www.youtube.com/watch?v=gg40RWiaHRY",
                    type: "Youtube"
                },
                {
                    title: "Scratch a pixel - Rasterization",
                    url: "https://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation/overview-rasterization-algorithm.html",
                    type: "Article"
                }
            ],
            github: "https://github.com/ACondeSalazar/ascii_rasterizer",
            featured: true
        },
        {
            id: "blackhole",
            title: "Raymarched Blackhole",
            shortDescription: "A simple raymarched black hole simulation",
            fullDescription: "A black hole simulation to better understand raymarching. The rays are affected by the black hole mass to produce the space distortion effect.",
            detailedDescription: [],
            technologies: ["C++", "Raylib", "GLSL Shaders"],
            thumbnail: "assets/blackhole/thumbbh.png",
            media: [
                {
                    type: "video",
                    src: "assets/blackhole/bh.mp4",
                    caption: "Video"
                },
                {
                    type: "image",
                    src: "assets/blackhole/bh1.png",
                    caption: ""
                },
                {
                    type: "image",
                    src: "assets/blackhole/bh2.png",
                    caption: ""
                }
            ],
            features: [
                "Raymarching shader",
                "Gravity affected rays"
            ],
            references: [
                {
                    title: "Simulating Black Holes in C++",
                    url: "https://www.youtube.com/watch?v=8-B6ryuBkCM&t=531s",
                    type: "Youtube"
                },
                {
                    title: "Inigo Quilez Raymarching shader",
                    url: "https://www.shadertoy.com/view/Xds3zN",
                    type: "ShaderToy"
                }
            ],
            github: "https://github.com/ACondeSalazar/black-hole",
            featured: true
        },
        {
            id: "gameengine",
            title: "Luigi Engine",
            shortDescription: "A Game Engine made using C++ and OpenGL",
            fullDescription: "A custom OpenGL-based Game Engine featuring an Entity Component System (ECS), physically-based rendering (PBR), vehicle physics and a track editor. Built from scratch in C++ with modern OpenGL and ImGui. <br> I was in charge of the ECS and the physics.",
            detailedDescription: [],
            technologies: ["C++", "OpenGL", "GLSL Shaders"],
            thumbnail: "assets/luigiengine/playground.png",
            media: [
                {
                    type: "video",
                    src: "assets/luigiengine/pbr.mp4",
                    caption: "PBR materials showcase with different metallic and roughness values"
                },
                {
                    type: "video",
                    src: "assets/luigiengine/car_compressed.mp4",
                    caption: "Physics !"
                },
                {
                    type: "image",
                    src: "assets/luigiengine/rainbow.png",
                    caption: "The rainbow road using the track editor"
                }
            ],
            features: [
                "Entity Component System (ECS)",
                "Physically-Based Rendering (PBR)",
                "Vehicle and box physics",
                "Track editor using splines"
            ],
            collaborators: [
                {
                    name: "Mateusz Birembaut",
                    github: "https://github.com/Mateusz-Birembaut",
                    role: ""
                },
                {
                    name: "Rémy Guibert",
                    github: "https://github.com/Rashnain",
                    role: ""
                }
            ],
            references: [
                {
                    title: "Learn OpenGL",
                    url: "https://learnopengl.com/",
                    type: "Tutorial"
                },
                {
                    title: "Allen Chou - Game physics guide",
                    url: "https://allenchou.net/game-physics-series/",
                    type: "Tutorial"
                }
            ],
            github: "https://github.com/Rashnain/LuigiEngine",
            featured: true
        },
        {
            id: "ocean",
            title: "Better Ocean Simulation",
            shortDescription: "Implementation of a procedural texture generation technique to improve ocean simulations",
            fullDescription: "Oceans are often simulated through the creation of a heightmap using the Tessendorf method, however this method introduces periodicity to the ocean surface, breaking the immersion. <br> I implemented the tiling of blending of the ocean heightmap to procedurally increase the size of the heightmap and make it non periodic.",
            detailedDescription: [],
            technologies: ["Godot", "GLSL Compute Shaders"],
            thumbnail: "assets/ocean/thumb.png",
            media: [
                {
                    type: "image",
                    src: "assets/ocean/base.png",
                    caption: "Original ocean heightmap"
                },
                {
                    type: "image",
                    src: "assets/ocean/tb.png",
                    caption: "Heightmap after tiling and blending"
                },
                {
                    type: "video",
                    src: "assets/ocean/showcase.mp4",
                    caption: "Showcase"
                }
            ],
            features: [
                "Tiling and blending",
                "Wave orientation",
            ],
            collaborators: [
                {
                    name: "Théo Reynier",
                    github: "https://github.com/RTheoGH",
                    role: ""
                },
                {
                    name: "Andrew Mansour",
                    github: "https://github.com/Sloth-King",
                    role: ""
                },
                {
                    name: "Killian Viguier",
                    github: "https://github.com/VigKillian",
                    role: ""
                },
            ],
            references: [
                {
                    title: "Simulating Ocean Water - Jerry Tessendorf",
                    url: "https://people.computing.clemson.edu/~jtessen/reports/papers_files/coursenotes2004.pdf",
                    type: "Paper"
                },
                {
                    title: "Fast orientable aperiodic ocean synthesis using tiling and blending",
                    url: "assets/ocean/LSG24.pdf",
                    type: "Paper"
                }
            ],
            github: "https://github.com/RTheoGH/TER-Ocean",
            featured: true
        },
        {
            id: "raytracing",
            title: "CPU Raytracer",
            shortDescription: "A simple CPU raytracer implemented from scratch in C++",
            fullDescription: "",
            detailedDescription: [],
            technologies: ["C++", "OpenGL"],
            thumbnail: "assets/raytracing/raptor.png",
            media: [
                {
                    type: "image",
                    src: "assets/raytracing/two_light.png",
                    caption: "Multiple light sources with shadows"
                },
                {
                    type: "image",
                    src: "assets/raytracing/refrac.png",
                    caption: "Refraction"
                },
                {
                    type: "image",
                    src: "assets/raytracing/bunny_mirror.png",
                    caption: "Reflection"
                },
                {
                    type: "video",
                    src: "assets/raytracing/cornell.mp4",
                    caption: "Cornell box"
                },
                {
                    type: "image",
                    src: "assets/raytracing/interpolation.png",
                    caption: "Mesh normals interpolation"
                }
            ],
            features: [
                "Shadows",
                "Reflections",
                "Refractions",
                "Multiple light sources",
                "Mesh normals Interpolation",
                "Textures"
            ],
            collaborators: [],
            references: [],
            github: "https://github.com/ACondeSalazar/Raytracing_M1_S1",
            featured: true
        },
        {
            id: "compression",
            title: "Image Compression App",
            shortDescription: "Implementation of compression algorithms imitating JPEG and JPEG2000",
            fullDescription: "Implementation of compression methods imitating the algorithms used in JPEG and JPEG2000 files.",
            detailedDescription: [],
            technologies: ["C++", "SDL3", "ImGui"],
            thumbnail: "assets/compression/thumb.png",
            media: [
                
                {
                    type: "image",
                    src: "assets/compression/jpeg.png",
                    caption: "JPEG like compression results"
                },
                {
                    type: "image",
                    src: "assets/compression/jpeg2000.png",
                    caption: "JPEG 200 like compression results"
                },
                {
                    type: "image",
                    src: "assets/compression/compressionbest.png",
                    caption: "Algortihms comparison"
                }
            ],
            features: [
                "4K image compression",
                "Discrete Cosine Transform (DCT)",
                "Discrete Wavelet Transform (DWT)",
                "Huffman Encoding",
                "LZ77 Encoding"
                
            ],
            collaborators:[
                {
                    name: "Thimothée Bonetti",
                    github: "https://github.com/gubace",
                    role: ""
                }
            ],
            references: [
                {
                    title: "JPEG Image Compression Algorithm",
                    url: "https://www.researchgate.net/profile/Muzhir-Al-Ani/publication/268523100_THE_JPEG_IMAGE_COMPRESSION_ALGORITHM/links/549f251f0cf267bdb8fdbb89/THE-JPEG-IMAGE-COMPRESSION-ALGORITHM.pdf",
                    type: "Paper"
                },
                {
                    title: "JPEG2000 : Higly Scalable Image Compression",
                    url: "https://www2.engr.arizona.edu/~bilgin/publications/ITCC2001.pdf",
                    type: "Paper"
                }
            ],
            github: "https://github.com/ACondeSalazar/Projet_Compression_M1",
            featured: true
        }
    ],

    // Theme Configuration
    theme: {
        // Color scheme
        colors: {
            primary: "#0a0a0a",        // Main background
            secondary: "#111111",      // Secondary background
            accent: "#1a1a1a",         // Accent background
            terminal: "#0c1021",       // Terminal background
            matrixGreen: "#666666",        // Neutral gray accent color
            neonBlue: "#00d4ff",       // Secondary accent color
            neonPurple: "#a855f7",     // Tertiary accent color
            textPrimary: "#ffffff",    // Primary text
            textSecondary: "#b0b0b0",  // Secondary text
            textMuted: "#606060",      // Muted text
            border: "#333333"          // Border color
        },
        
        // Typography
        fonts: {
            mono: "'JetBrains Mono', monospace",
            sans: "'Inter', sans-serif"
        },
        

        animations: {
            duration: "0.3s",
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            reducedMotion: true
        },
        
        effects: {}
    },


    meta: {
        title: "Arthur Conde Salazar Portfolio",
        description: "",
        keywords: ["computer graphics", "3D rendering", "portfolio"],
        author: "ACondeSalazar",
        image: "assets/preview.png"
    }
};


if (typeof module !== 'undefined' && module.exports) {
    module.exports = PORTFOLIO_CONFIG;
}