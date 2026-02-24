// Prevents OpenAI client from failing when route.ts is imported (openai.ts loads in cascade)
process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'sk-test-dummy';
process.env.BASE_URL = process.env.BASE_URL || 'https://swapi.dev/api';

// DOM matchers (e.g. toBeInTheDocument) for component tests
import '@testing-library/jest-dom/vitest';
