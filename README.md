# Chess Client Web App
A React-based interface for the Chess API.

## Getting Started

### Local Development
- Address: http://localhost:3001
- Start the development server: `docker-compose up`
- Simulate a production build locally: `yarn build && yarn start`

### Color Palette
Chess.com Board Color Palette:  
https://www.color-hex.com/color-palette/8548

## Common Issues & Fixes

- If you experience import/module resolution errors, reset containers with the following:
  ```bash
  docker-compose down -v
  docker-compose build --no-cache
  docker-compose up
  ```
