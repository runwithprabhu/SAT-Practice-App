// SAT Practice Questions - Reading/Writing and Math sections
export const sections = [
  {
    id: "reading-writing",
    title: "Reading and Writing",
    timeMinutes: 32,
    questions: [
      {
        id: 1,
        passage:
          "The giant panda's diet consists almost entirely of bamboo, yet its digestive system is that of a carnivore. Scientists have long puzzled over how the panda _______ enough nutrition from a food source that provides so little energy.",
        question: "Which choice completes the text with the most logical word?",
        options: ["derives", "converts", "manufactures", "distributes"],
        correct: 0,
        explanation:
          "'Derives' means to obtain something from a source, which fits the context of getting nutrition from bamboo.",
      },
      {
        id: 2,
        passage:
          "A recent study examined how urban green spaces affect mental health. Researchers found that participants who spent at least 20 minutes in a park reported significantly lower stress levels than those who spent the same amount of time walking on city streets.",
        question:
          "Which choice best states the main finding of the study described in the passage?",
        options: [
          "Walking is more beneficial than sitting for stress reduction.",
          "Time spent in urban parks is linked to reduced stress compared to time on city streets.",
          "Urban environments are inherently stressful for all residents.",
          "Twenty minutes is the minimum time needed to reduce stress.",
        ],
        correct: 1,
        explanation:
          "The passage directly compares park time vs. street time, finding that park time led to lower stress.",
      },
      {
        id: 3,
        passage:
          "Marine biologist Dr. Sylvia Earle has spent over 7,000 hours underwater. Her research has revealed the devastating effects of pollution and overfishing on ocean ecosystems. _______, she has become one of the most prominent advocates for ocean conservation.",
        question:
          "Which choice completes the text with the most logical transition?",
        options: [
          "Nevertheless",
          "For instance",
          "As a result",
          "In contrast",
        ],
        correct: 2,
        explanation:
          "'As a result' shows cause and effect — her research findings led her to become an advocate.",
      },
      {
        id: 4,
        passage:
          "The fermentation process used in making sourdough bread relies on wild yeast and bacteria naturally present in flour and the environment. Unlike commercial yeast, which produces uniform results, wild fermentation cultures vary by region, giving each bakery's sourdough its unique flavor profile.",
        question: "Based on the passage, what distinguishes sourdough from bread made with commercial yeast?",
        options: [
          "Sourdough requires higher temperatures during baking.",
          "Sourdough uses regionally variable wild cultures rather than standardized yeast.",
          "Sourdough bread is more nutritious than other bread types.",
          "Sourdough takes less time to produce than other breads.",
        ],
        correct: 1,
        explanation:
          "The passage explains that wild fermentation cultures vary by region, unlike uniform commercial yeast.",
      },
      {
        id: 5,
        passage:
          "While researching the migration patterns of monarch butterflies, entomologist Dr. Karen Oberhauser discovered that the insects navigate using a time-compensated sun compass. This means they adjust their flight direction based on the sun's position relative to the time of day.",
        question:
          "According to the passage, how do monarch butterflies navigate during migration?",
        options: [
          "By following Earth's magnetic field lines",
          "By using landmarks they memorize during previous trips",
          "By adjusting direction based on the sun's position and time of day",
          "By following other butterflies in their group",
        ],
        correct: 2,
        explanation:
          "The passage states they use a 'time-compensated sun compass,' adjusting flight direction based on the sun's position relative to time.",
      },
    ],
  },
  {
    id: "math",
    title: "Math",
    timeMinutes: 35,
    questions: [
      {
        id: 1,
        question: "If 3x + 7 = 22, what is the value of x?",
        options: ["3", "5", "7", "15"],
        correct: 1,
        explanation: "3x + 7 = 22 → 3x = 15 → x = 5",
      },
      {
        id: 2,
        question:
          "A circle has a radius of 6 cm. What is its area in terms of π?",
        options: ["12π cm²", "36π cm²", "6π cm²", "72π cm²"],
        correct: 1,
        explanation: "Area = πr² = π(6)² = 36π cm²",
      },
      {
        id: 3,
        question:
          "The function f(x) = 2x² - 8x + 6 has how many real zeros?",
        options: ["0", "1", "2", "3"],
        correct: 2,
        explanation:
          "Using the discriminant: b² - 4ac = 64 - 48 = 16 > 0, so there are 2 real zeros.",
      },
      {
        id: 4,
        question:
          "A store offers a 20% discount on a jacket originally priced at $85. What is the sale price?",
        options: ["$65", "$68", "$70", "$72"],
        correct: 1,
        explanation:
          "Discount = 20% of $85 = $17. Sale price = $85 - $17 = $68.",
      },
      {
        id: 5,
        question:
          "If the mean of five numbers is 12, and four of the numbers are 8, 10, 14, and 16, what is the fifth number?",
        options: ["10", "12", "14", "16"],
        correct: 1,
        explanation:
          "Sum = 5 × 12 = 60. Sum of four numbers = 8 + 10 + 14 + 16 = 48. Fifth number = 60 - 48 = 12.",
      },
    ],
  },
];
