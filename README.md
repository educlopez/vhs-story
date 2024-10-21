# Visual Story Generator

## Description

Visual Story Generator is an interactive web application that allows users to create and experience their own personalized horror stories. Users can upload their avatar, choose a story, and navigate through different scenes, making choices that affect the outcome of their adventure.

## Features

- User avatar upload and processing
- Multiple story options
- Interactive storytelling with choices
- Dynamic scene transitions
- Background removal for user avatars
- Monster transformation effects
- Final avatar generation based on story choices
- Downloadable and shareable final avatars

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Cloudinary for image processing and storage
- Radix UI for accessible components

## Key Components

- Story Context for managing global state
- Custom hooks for story logic
- API routes for image processing and Cloudinary integration
- Responsive design with mobile-first approach
- VHS-style visual effects

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. Run the development server: `npm run dev`

## Usage

1. Start the application and navigate to the home page
2. Click "Start Your Story" to begin
3. Enter your name and upload an avatar
4. Choose a story from the available options
5. Navigate through the story by making choices
6. Experience your transformation and reach the story's conclusion
7. Download or share your final avatar

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- [Cloudinary](https://cloudinary.com/) for image processing capabilities
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
