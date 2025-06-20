# **F1 Dashboard**

🚧 **In Development** 🚧: This project is being developed.

A Formula 1 dashboard web application built with [Next.js](https://nextjs.org). This project provides F1 fans with a quick and interactive overview of the current season, featuring live driver and constructor standings, a responsive and modern user interface, and a world map displaying track locations. Each race includes a button to open the track location in Google Earth, and users can personalize their experience with a theme switcher that supports team colors.

## Features

- Live F1 driver standings
- Live constructor standings
- Responsive and modern UI
- Map that shows the track location in the world
- Buttons for each race that open the track location in Google Earth
- Theme switcher with team colors

## Data Source

This project uses the [jolpica-f1 API](https://github.com/jolpica/jolpica-f1) for Formula 1 data.

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/f1-dashboard.git
    cd f1-dashboard
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3. Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard.

## Project Structure

- `src/app/` - Main Next.js app directory
- `src/components/Constructors` - Constructor standings components
- `src/components/Drivers` - Driver standings components
- `src/components/Map` - Map components
- `src/components/Races` - Race components
- `public/` - Static assets

## Customization

- To add new features or modify the UI, edit the components in `src/components/`.
- For theming or styling, update Tailwind CSS classes or add your own styles.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

---

*This project is not affiliated with Formula 1 or its partners. Data sources and APIs are used for educational purposes only.*