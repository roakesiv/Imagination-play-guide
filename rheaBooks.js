// Chapter ranges use the PDF page numbers, including the contents on page 1.
const rheaVolumeChapters = {
  1: [
    ['Amor', 2, 11],
    ['Twinkle', 12, 21],
    ['Popstar', 22, 31],
    ['Bluebell', 32, 41],
    ['Dash', 42, 51],
    ['River Snow', 52, 61],
    ['Sara', 62, 71],
    ['Princess', 72, 81],
    ['Libre', 82, 91]
  ],
  2: [
    ['Archimedes', 2, 11],
    ['Nebula', 12, 21],
    ['Spot', 22, 31],
    ['Rene', 32, 41],
    ['Locke', 42, 51]
  ]
};

// Finished volumes that parents can download directly.
window.RHEA_BOOKS = [
  {
    id: "rhea-toddler-volume-1", title: "Rhea Volume 1, Age 1 - 2",
    file: "printables/rhea-toddler-volume-1.pdf", pages: 91, age: "Ages 1–2", downloadSize: "0.6 MB",
    chapters: rheaVolumeChapters[1],
    description: "Big shapes and simple pictures with nine Rhea friends."
  },
  {
    id: "rhea-toddler-volume-2", title: "Rhea Volume 2, Age 1 - 2",
    file: "printables/rhea-toddler-volume-2.pdf", pages: 51, age: "Ages 1–2", downloadSize: "0.3 MB",
    chapters: rheaVolumeChapters[2],
    description: "Big shapes and simple pictures with five Rhea friends."
  },
  {
    id: "rhea-daycare-volume-1", title: "Rhea Volume 1, Age 2 - 3",
    file: "printables/rhea-daycare-volume-1.pdf", pages: 91, age: "Ages 2–3", downloadSize: "1.6 MB",
    chapters: rheaVolumeChapters[1],
    description: "Nine friends, ten pages each. Point, play and make marks in this Daycare edition."
  },
  {
    id: "rhea-daycare-volume-2", title: "Rhea Volume 2, Age 2 - 3",
    file: "printables/rhea-daycare-volume-2.pdf", pages: 51, age: "Ages 2–3", downloadSize: "0.8 MB",
    chapters: rheaVolumeChapters[2],
    description: "Five friends, ten pages each. Point, play and make marks in this Daycare edition."
  },
  {
    id: "rhea-preschool-volume-1", title: "Rhea Volume 1, Age 3 - 4",
    file: "printables/rhea-preschool-volume-1.pdf", pages: 91, age: "Ages 3–4", downloadSize: "5.8 MB",
    chapters: rheaVolumeChapters[1],
    description: "Nine Rhea friends with ten coloring, counting, matching and drawing pages each."
  },
  {
    id: "rhea-preschool-volume-2", title: "Rhea Volume 2, Age 3 - 4",
    file: "printables/rhea-preschool-volume-2.pdf", pages: 51, age: "Ages 3–4", downloadSize: "2.8 MB",
    chapters: rheaVolumeChapters[2],
    description: "Five Rhea friends with ten coloring, counting, matching and drawing pages each."
  },
  {
    id: "rhea-tk-volume-1", title: "Rhea Volume 1, Age 4 - 5",
    file: "printables/rhea-tk-volume-1.pdf", pages: 91, age: "Ages 4–5", downloadSize: "5.9 MB",
    chapters: rheaVolumeChapters[1],
    description: "Count to five, find first letters and play with Rhea’s friends."
  },
  {
    id: "rhea-tk-volume-2", title: "Rhea Volume 2, Age 4 - 5",
    file: "printables/rhea-tk-volume-2.pdf", pages: 51, age: "Ages 4–5", downloadSize: "3.0 MB",
    chapters: rheaVolumeChapters[2],
    description: "Count to five, find first letters and play with Rhea’s friends."
  },
  {
    id: "rhea-kindergarten-volume-1", title: "Rhea Volume 1, Age 5 - 6",
    file: "printables/rhea-kindergarten-volume-1.pdf", pages: 91, age: "Ages 5–6", downloadSize: "47.7 MB",
    chapters: rheaVolumeChapters[1],
    description: "Color, count, match letters and solve picture puzzles with Rhea’s friends."
  },
  {
    id: "rhea-kindergarten-volume-2", title: "Rhea Volume 2, Age 5 - 6",
    file: "printables/rhea-kindergarten-volume-2.pdf", pages: 51, age: "Ages 5–6", downloadSize: "18.7 MB",
    chapters: rheaVolumeChapters[2],
    description: "Color, count, match letters and solve picture puzzles with Rhea’s friends."
  },
  {
    id: "rhea-first-grade-volume-1", title: "Rhea Volume 1, Age 6 - 7",
    file: "printables/rhea-first-grade-volume-1.pdf", pages: 91, age: "Ages 6–7", downloadSize: "37.8 MB",
    chapters: rheaVolumeChapters[1],
    description: "Read picture words, add and subtract, and play with Rhea’s friends."
  },
  {
    id: "rhea-first-grade-volume-2", title: "Rhea Volume 2, Age 6 - 7",
    file: "printables/rhea-first-grade-volume-2.pdf", pages: 51, age: "Ages 6–7", downloadSize: "15.2 MB",
    chapters: rheaVolumeChapters[2],
    description: "Read picture words, add and subtract, and play with Rhea’s friends."
  },
  {
    id: "rhea-second-grade-volume-1", title: "Rhea Volume 1, Age 7 - 8",
    file: "printables/rhea-second-grade-volume-1.pdf", pages: 91, age: "Ages 7–8", downloadSize: "29.5 MB",
    chapters: rheaVolumeChapters[1],
    description: "Read short stories, work with two-digit numbers, and read picture graphs."
  },
  {
    id: "rhea-second-grade-volume-2", title: "Rhea Volume 2, Age 7 - 8",
    file: "printables/rhea-second-grade-volume-2.pdf", pages: 51, age: "Ages 7–8", downloadSize: "12.2 MB",
    chapters: rheaVolumeChapters[2],
    description: "Read short stories, work with two-digit numbers, and read picture graphs."
  },
  {
    id: "rhea-third-grade-volume-1", title: "Rhea Volume 1, Age 8 - 9",
    file: "printables/rhea-third-grade-volume-1.pdf", pages: 91, age: "Ages 8–9", downloadSize: "15.0 MB",
    chapters: rheaVolumeChapters[1],
    description: "Read and explain, multiply and divide, explore fractions and write a scene."
  },
  {
    id: "rhea-third-grade-volume-2", title: "Rhea Volume 2, Age 8 - 9",
    file: "printables/rhea-third-grade-volume-2.pdf", pages: 51, age: "Ages 8–9", downloadSize: "6.2 MB",
    chapters: rheaVolumeChapters[2],
    description: "Read and explain, multiply and divide, explore fractions and write a scene."
  },
  {
    id: "rhea-fourth-grade-volume-1", title: "Rhea Volume 1, Age 9 - 10",
    file: "printables/rhea-fourth-grade-volume-1.pdf", pages: 91, age: "Ages 9–10", downloadSize: "6.0 MB",
    chapters: rheaVolumeChapters[1],
    description: "Solve multi-step problems, read a map grid, measure rectangles, and work with fractions."
  },
  {
    id: "rhea-fourth-grade-volume-2", title: "Rhea Volume 2, Age 9 - 10",
    file: "printables/rhea-fourth-grade-volume-2.pdf", pages: 51, age: "Ages 9–10", downloadSize: "2.9 MB",
    chapters: rheaVolumeChapters[2],
    description: "Solve multi-step problems, read a map grid, measure rectangles, and work with fractions."
  },
  {
    id: "rhea-fifth-grade-volume-1", title: "Rhea Volume 1, Age 10 - 11",
    file: "printables/rhea-fifth-grade-volume-1.pdf", pages: 91, age: "Ages 10–11", downloadSize: "6.0 MB",
    chapters: rheaVolumeChapters[1],
    description: "Compare accounts, solve with decimals and fractions, and measure box volumes."
  },
  {
    id: "rhea-fifth-grade-volume-2", title: "Rhea Volume 2, Age 10 - 11",
    file: "printables/rhea-fifth-grade-volume-2.pdf", pages: 51, age: "Ages 10–11", downloadSize: "2.9 MB",
    chapters: rheaVolumeChapters[2],
    description: "Compare accounts, solve with decimals and fractions, and measure box volumes."
  },
  {
    id: "rhea-sixth-grade-volume-1", title: "Rhea Volume 1, Age 11 - 12",
    file: "printables/rhea-sixth-grade-volume-1.pdf", pages: 91, age: "Ages 11–12", downloadSize: "6.0 MB",
    chapters: rheaVolumeChapters[1],
    description: "Explore ratios, equations, data, fraction division, and arguments using evidence."
  },
  {
    id: "rhea-sixth-grade-volume-2", title: "Rhea Volume 2, Age 11 - 12",
    file: "printables/rhea-sixth-grade-volume-2.pdf", pages: 51, age: "Ages 11–12", downloadSize: "2.9 MB",
    chapters: rheaVolumeChapters[2],
    description: "Explore ratios, equations, data, fraction division, and arguments using evidence."
  }
];
