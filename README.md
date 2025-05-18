# Daily Planner - Interactive Task Management Application

![Daily Planner](https://placeholder.svg?height=300&width=600&text=Daily+Planner)

Daily Planner is a feature-rich task management application built with React, Next.js, and TypeScript. It offers a modern, interactive interface for managing daily tasks with advanced features like 3D visualizations, drag-and-drop task reordering, and multilingual support.

## Features

### Core Functionality
- ✅ Create, edit, and delete tasks![Screenshot 2025-05-18 205624](https://github.com/user-attachments/assets/e6a5e55b-613c-4c35-84a7-f35ec9e5c7fb)
![Screenshot 2025-05-18 205306](https://github.com/user-attachments/assets/2f781731-409d-4599-9ae0-0303fd406ca2)
![Screenshot 2025-05-18 205333](https://github.com/user-attachments/assets/0e81bd3f-6da8-4ba5-a941-3a58023027dc)
![Screenshot 2025-05-18 205354](https://github.com/user-attachments/assets/3361302c-6e70-4782-992a-ca108f94d666)
![Screenshot 2025-05-18 205414](https://github.com/user-attachments/assets/7da7998f-5624-4fa6-868a-b55b27b20a67)
![Screenshot 2025-05-18 205431](https://github.com/user-attachments/assets/7aa01256-c167-4f5a-9bd5-fcb65a929bb0)
![Screenshot 2025-05-18 205450](https://github.com/user-attachments/assets/0af83a9b-8730-49fa-897d-8c34e1bce668)
![Screenshot 2025-05-18 205506](https://github.com/user-attachments/assets/1d4995c9-a227-423d-829c-0b054e558035)
![Screenshot 2025-05-18 205527](https://github.com/user-attachments/assets/a5ae2f75-fec0-4b52-a067-746dfcc765bf)
![Screenshot 2025-05-18 205601](https://github.com/user-attachments/assets/b0cb698f-2751-453a-8d5f-51911cd35556)

- ✅ Organize tasks by categories
- ✅ Set priorities (high, medium, low)
- ✅ Schedule tasks with dates and times
- ✅ Mark tasks as complete
- ✅ Filter and sort tasks
- ✅ Search functionality
- ✅ Local storage persistence

### Advanced Features
- 🔄 **Drag and Drop Task Reordering**: Easily reorganize tasks by dragging them
- 🌐 **Multilingual Support**: Available in English, Spanish, French, German, and Hindi
- 🔊 **Voice Input**: Add tasks using voice commands
- 🔔 **Notifications**: Get reminders for upcoming tasks
- 📊 **Interactive Analytics**: View task statistics and completion rates
- 🌓 **Dark/Light Mode**: Toggle between themes for comfortable viewing
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

### Visual Enhancements
- 🎮 **3D Task Visualization**: Interactive 3D timeline of tasks
- 📈 **3D Analytics**: Immersive data visualization
- 🎉 **Confetti Celebrations**: Visual feedback when completing tasks
- ✨ **Animated UI**: Smooth transitions and micro-interactions
- 🚀 **Guided Onboarding**: Interactive tour for new users
- 🔗 **Task Sharing**: Share tasks via links, QR codes, or social media

## Getting Started

### Prerequisites
- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/shreyansh-hacker/daily-planner.git
cd daily-planner
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Adding Tasks
1. Click on "Add a new task..." to expand the task form
2. Fill in the task details (title, description, category, priority, date, time)
3. Click "Save" to add the task

### Managing Tasks
- **Complete a task**: Click the checkbox next to the task
- **Edit a task**: Click the edit icon on a task
- **Delete a task**: Click the delete icon on a task
- **Reorder tasks**: Drag and drop tasks using the grip handle
- **Filter tasks**: Use the filter dropdown to view specific task groups
- **Sort tasks**: Use the sort dropdown to change the order of tasks
- **Search tasks**: Type in the search bar to find specific tasks

### Using Advanced Features
- **Voice Input**: Click the microphone icon and speak your task
- **3D Visualization**: Switch to the "3D" tab to see your tasks in 3D
- **Analytics**: Switch to the "Analytics" tab to view statistics
- **Share Tasks**: Click the share icon on a task to share it
- **Change Language**: Use the language selector in the top right
- **Toggle Theme**: Click the sun/moon icon to switch between light and dark mode

## Technologies Used

- **Frontend Framework**: React, Next.js
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: React Hooks
- **Animations**: Framer Motion
- **3D Rendering**: Three.js, React Three Fiber
- **Drag and Drop**: dnd-kit
- **Internationalization**: Custom translation system
- **Data Visualization**: Recharts
- **Special Effects**: Canvas Confetti
- **QR Code Generation**: qrcode.react

## Project Structure

\`\`\`
daily-planner/
├── app/                  # Next.js app directory
├── components/           # React components
│   ├── ui/               # UI components (shadcn)
│   ├── daily-planner.tsx # Main application component
│   ├── task-*.tsx        # Task-related components
│   └── ...               # Other components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and libraries
│   └── translations.ts   # Internationalization
├── public/               # Static assets
└── ...                   # Configuration files
\`\`\`

## Customization

### Adding a New Language
1. Edit `lib/translations.ts`
2. Add a new language object to the `translations` object
3. Translate all keys from the English version

### Adding a New Category
1. Categories can be added directly in the UI
2. Default categories can be modified in `components/daily-planner.tsx`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons from [Lucide Icons](https://lucide.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- 3D rendering with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
