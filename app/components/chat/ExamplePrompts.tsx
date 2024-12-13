import React from 'react';

const EXAMPLE_PROMPTS = [
  { text: 'Eco-friendly insights module' },
  { text: 'Shopify Voice Assistant' },
  { text: 'Dynamic pricing engine' },
  { text: 'Conversion rate optimizer' },
  { text: 'Customer segmentation AI' },
  { text: 'Fake customer reviews poster' },
  { text: 'Themed box generator' },
  { text: 'Accidental purchase insurance' },
  { text: 'Product recommendation engine' },
  { text: 'Dance party planner' },
  { text: 'AI-powered shopping assistant' },
  { text: 'Meme your product tool' },
  { text: 'Silly tagline generator' },
  { text: 'Tarot card sales predictor' },
  { text: 'Daily giggle marketing prompt tool' },
  { text: 'Unobvious yet correct product name generator' },
  { text: 'Checkout grabbag generator' },
  { text: 'Obscene product name generator' },
  { text: 'Boring performance metrics dashboard' },
  { text: 'Global maxima finder' },
  { text: 'Load-bearing feature creator' },
];

export function ExamplePrompts(sendMessage?: { (event: React.UIEvent, messageInput?: string): void | undefined }) {
  return (
    <div id="examples" className="relative flex flex-col gap-9 w-full max-w-3xl mx-auto flex justify-center mt-6">
      <div
        className="flex flex-wrap justify-center gap-2"
        style={{
          animation: '.25s ease-out 0s 1 _fade-and-move-in_g2ptj_1 forwards',
        }}
      >
        {EXAMPLE_PROMPTS.map((examplePrompt, index: number) => {
          return (
            <button
              key={index}
              onClick={(event) => {
                sendMessage?.(event, examplePrompt.text);
              }}
              className="border border-bolt-elements-borderColor rounded-full bg-gray-950 hover:bg-gray-900 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary px-3 py-1 text-xs transition-theme"
            >
              {examplePrompt.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
