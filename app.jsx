// Step 1: Setting Up the Project

// 1. Initialize a Next.js app with Tailwind CSS.
// Command to run:
// npx create-next-app@latest multi-step-form --typescript
// cd multi-step-form
// npx tailwindcss init

// 2. Update tailwind.config.js for dark mode:
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

// 3. Add Tailwind CSS and global styles in src/styles/globals.css:
@tailwind base;
@tailwind components;
@tailwind utilities;

// 4. Install dependencies:
// npm install @shadcn/ui tailwindcss-animate zustand framer-motion

// Step 2: Basic Layout

// src/components/Layout.tsx
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="p-4 bg-gray-200 dark:bg-gray-800">
          <h1 className="text-xl font-bold">Multi-Step Form</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mt-2 p-2 border rounded"
          >
            Toggle Dark Mode
          </button>
        </header>
        <main className="p-4">{children}</main>
        <footer className="p-4 text-center bg-gray-200 dark:bg-gray-800">
          &copy; 2024 Multi-Step Form Project
        </footer>
      </div>
    </div>
  );
}

// Step 3: Multi-Step Form Navigation

// src/components/Stepper.tsx
import React from 'react';

const steps = ['Personal Info', 'Address Details', 'Preferences', 'Review & Submit'];

export default function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex justify-between items-center mb-6">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 text-center">
          <div
            className={`p-2 rounded-full ${
              currentStep === index
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 dark:bg-gray-700'
            }`}
          >
            {index + 1}
          </div>
          <p className="text-sm mt-1">{step}</p>
        </div>
      ))}
    </div>
  );
}

// Step 4: Multi-Step Form Layout

// src/pages/index.tsx
import { useState } from 'react';
import Layout from '../components/Layout';
import Stepper from '../components/Stepper';
import Step1 from '../components/forms/Step1';
import Step2 from '../components/forms/Step2';
import Step3 from '../components/forms/Step3';
import Step4 from '../components/forms/Step4';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [<Step1 />, <Step2 />, <Step3 />, <Step4 />];

  return (
    <Layout>
      <Stepper currentStep={currentStep} />
      <div>{steps[currentStep]}</div>
      <div className="flex justify-between mt-4">
        <button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
          className="p-2 bg-gray-300 dark:bg-gray-700 rounded"
        >
          Back
        </button>
        <button
          disabled={currentStep === steps.length - 1}
          onClick={() => setCurrentStep(currentStep + 1)}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </Layout>
  );
}

// Step 5: Form Steps (Example for Step 1)

// src/components/forms/Step1.tsx
export default function Step1() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Personal Information</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800"
          />
        </div>
      </form>
    </div>
  );
}
