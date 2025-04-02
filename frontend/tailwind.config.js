/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        typography: {
          DEFAULT: {
            css: {
              color: '#fff',
              h1: {
                color: '#fff',
              },
              h2: {
                color: '#fff',
              },
              h3: {
                color: '#fff',
              },
              strong: {
                color: '#fff',
              },
              a: {
                color: '#60a5fa',
                '&:hover': {
                  color: '#93c5fd',
                },
              },
              blockquote: {
                borderLeftColor: '#60a5fa',
                color: '#fff',
              },
              code: {
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                padding: '0.25rem 0.375rem',
                borderRadius: '0.25rem',
              },
              ul: {
                li: {
                  '&::marker': {
                    color: '#60a5fa',
                  },
                },
              },
            },
          },
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
  };