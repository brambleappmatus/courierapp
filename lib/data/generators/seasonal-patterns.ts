"use client";

export const seasonalPatterns = {
  winter: { 
    Dec: 2.8, // Holiday season peak
    Jan: 0.6, // Post-holiday lull
    Feb: 0.7  // Still winter slow
  },
  spring: { 
    Mar: 1.1, // Beginning of pickup
    Apr: 1.4, // Spring shopping
    May: 1.5  // Pre-summer increase
  },
  summer: { 
    Jun: 1.2, // Steady summer
    Jul: 0.7, // Summer vacation drop
    Aug: 0.6  // Continued vacation period
  },
  fall: { 
    Sep: 1.8, // Back to school/work surge
    Oct: 2.0, // Pre-holiday buildup
    Nov: 2.2  // Early holiday shopping
  }
} as const;

export const yearEvents = {
  2024: { 
    Dec: 3.2, // Projected strong holiday season
    Nov: 2.8  // Black Friday/Cyber Monday
  },
  2023: { 
    Jul: 2.6, // Summer promotion success
    Aug: 2.4  // Extended summer campaign
  },
  2022: { 
    Mar: 2.9, // Major spring event
    Apr: 2.6  // Spring campaign continuation
  },
  2021: { 
    Sep: 2.8, // Historic fall promotion
    Oct: 2.5  // Halloween special
  }
} as const;

// Year-over-year growth pattern
export const yearMultipliers = {
  2024: 1.0,   // Current year baseline
  2023: 0.80,  // Last year
  2022: 0.65,  // Two years ago
  2021: 0.50   // Three years ago
} as const;