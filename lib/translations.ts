// Translations for the app
export type TranslationKey =
  | "appTitle"
  | "addTask"
  | "taskTitle"
  | "taskDescription"
  | "category"
  | "priority"
  | "date"
  | "time"
  | "cancel"
  | "save"
  | "delete"
  | "edit"
  | "complete"
  | "incomplete"
  | "search"
  | "filter"
  | "sort"
  | "all"
  | "today"
  | "upcoming"
  | "completed"
  | "high"
  | "medium"
  | "low"
  | "work"
  | "personal"
  | "health"
  | "learning"
  | "errands"
  | "addCategory"
  | "categoryName"
  | "color"
  | "deleteTask"
  | "deleteConfirmation"
  | "noTasks"
  | "totalTasks"
  | "completedTasks"
  | "progress"
  | "completionRate"
  | "calendar"
  | "analytics"
  | "settings"
  | "darkMode"
  | "lightMode"
  | "language"
  | "notifications"
  | "enableNotifications"
  | "disableNotifications"
  | "addTaskVoice"
  | "stopListening"
  | "listeningForTask"
  | "taskAdded"
  | "taskUpdated"
  | "taskDeleted"
  | "taskCompleted"
  | "searchPlaceholder"
  | "pickDate"
  | "optional"
  | "required"
  | "showCompleted"
  | "hideCompleted"
  | "deleteTaskConfirmation"
  | "tasks"
  | "share"
  | "shareTask"
  | "shareTaskDescription"
  | "shareVia"
  | "link"
  | "qrCode"
  | "scanQrToShare"
  | "close"
  | "3dTaskVisualization"
  | "3dTaskVisualizationDescription"
  | "3dVisualizationHelp"
  | "welcomeToPlanner"
  | "welcomeToPlannerDescription"
  | "addTasks"
  | "addTasksDescription"
  | "organizeTasks"
  | "organizeTasksDescription"
  | "trackProgress"
  | "trackProgressDescription"
  | "visualizeData"
  | "visualizeDataDescription"
  | "previous"
  | "next"
  | "getStarted"
  | "noDescription"
  | "distribution"
  | "due"
  | "titleRequired"
  | "categoryRequired"
  | "tags"
  | "addTag"
  | "pressEnterToAddTag"
  | "estimatedTime"
  | "minutes"
  | "attachment"
  | "attachmentName"
  | "basicInfo"
  | "advancedOptions"
  | "meetingTemplate"
  | "meetingDescription"
  | "deadlineTemplate"
  | "personalTemplate"
  | "welcomeTour"
  | "startWelcomeTour"
  | "help"
  | "helpAndTips"
  | "keyboardShortcuts"
  | "keyboardShortcutsDescription"
  | "productivityTips"
  | "productivityTipsDescription"
  | "general"
  | "views"
  | "openKeyboardShortcuts"
  | "closeDialogs"
  | "focusSearch"
  | "toggleDarkMode"
  | "openWelcomeTour"
  | "newTask"
  | "editSelectedTask"
  | "deleteSelectedTask"
  | "toggleTaskCompletion"
  | "navigateTasks"
  | "reorderTasks"
  | "switchToTasksView"
  | "switchToAnalyticsView"
  | "switchTo3DView"
  | "toggleFilters"
  | "toggleSort"
  | "toggleCompletedTasks"
  | "timeBlockingTip"
  | "timeBlockingDescription"
  | "categoriesTip"
  | "categoriesDescription"
  | "planAheadTip"
  | "planAheadDescription"
  | "voiceInputTip"
  | "voiceInputDescription"
  | "tagsTip"
  | "tagsDescription"
  | "analyticsTip"
  | "analyticsDescription"
  | "shareTip"
  | "shareDescription"
  | "readyToStart"
  | "readyToStartDescription"
  | "step"
  | "of"
  | "skipTour"
  | "closeTour"
  | "tourTip"
  | "dragAndDrop"
  | "dragAndDropDescription"
  | "voiceCommands"
  | "voiceCommandsDescription"
  | "darkModeDescription"
  | "new"
  | "categoryAdded"
  | "taskReordered"
  | "taskReorderedDescription"
  | "welcomeBack"
  | "welcomeBackMessage"
  | "addTaskForTomorrow"
  | "tomorrowTask"
  | "pressSlash"

export type Translations = {
  [key in TranslationKey]: string
}

export const translations: Record<string, Translations> = {
  en: {
    appTitle: "Daily Planner",
    addTask: "Add a new task...",
    taskTitle: "Task title",
    taskDescription: "Description (optional)",
    category: "Category",
    priority: "Priority",
    date: "Date",
    time: "Time",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    complete: "Complete",
    incomplete: "Incomplete",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    all: "All Tasks",
    today: "Today",
    upcoming: "Upcoming",
    completed: "Completed",
    high: "High",
    medium: "Medium",
    low: "Low",
    work: "Work",
    personal: "Personal",
    health: "Health",
    learning: "Learning",
    errands: "Errands",
    addCategory: "Add Category",
    categoryName: "Category Name",
    color: "Color",
    deleteTask: "Delete Task",
    deleteConfirmation: "Are you sure you want to delete this task? This action cannot be undone.",
    noTasks: "No tasks for this day. Add a task to get started!",
    totalTasks: "Total Tasks",
    completedTasks: "Completed",
    progress: "Progress",
    completionRate: "Completion Rate",
    calendar: "Calendar",
    analytics: "Analytics",
    settings: "Settings",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    language: "Language",
    notifications: "Notifications",
    enableNotifications: "Enable Notifications",
    disableNotifications: "Disable Notifications",
    addTaskVoice: "Add task with voice",
    stopListening: "Stop listening",
    listeningForTask: "Listening for task...",
    taskAdded: "Task added",
    taskUpdated: "Task updated",
    taskDeleted: "Task deleted",
    taskCompleted: "Task completed",
    searchPlaceholder: "Search tasks...",
    pickDate: "Pick a date",
    optional: "optional",
    required: "required",
    showCompleted: "Show Completed",
    hideCompleted: "Hide Completed",
    deleteTaskConfirmation: "Are you sure you want to delete this task? This action cannot be undone.",
    tasks: "Tasks for",
    share: "Share",
    shareTask: "Share Task",
    shareTaskDescription: "Share this task with others",
    shareVia: "Share via",
    link: "Link",
    qrCode: "QR Code",
    scanQrToShare: "Scan this QR code to share the task",
    close: "Close",
    "3dTaskVisualization": "3D Task Timeline",
    "3dTaskVisualizationDescription": "Visualize your tasks in an interactive 3D timeline",
    "3dVisualizationHelp": "Drag to rotate, scroll to zoom, click on tasks for details",
    welcomeToPlanner: "Welcome to Daily Planner",
    welcomeToPlannerDescription: "Your personal productivity assistant. Let's get you started with a quick tour!",
    addTasks: "Add Tasks",
    addTasksDescription: "Easily add new tasks with titles, descriptions, priorities, and due dates.",
    organizeTasks: "Organize Tasks",
    organizeTasksDescription: "Categorize your tasks and filter them to stay organized.",
    trackProgress: "Track Progress",
    trackProgressDescription: "Monitor your productivity with visual progress indicators.",
    visualizeData: "Visualize Data",
    visualizeDataDescription: "See your tasks and progress in beautiful 3D visualizations.",
    previous: "Previous",
    next: "Next",
    getStarted: "Get Started",
    noDescription: "No description",
    distribution: "Distribution",
    due: "Due",
    titleRequired: "Title is required",
    categoryRequired: "Category is required",
    tags: "Tags",
    addTag: "Add a tag...",
    pressEnterToAddTag: "Press Enter to add a tag",
    estimatedTime: "Estimated Time",
    minutes: "min",
    attachment: "Attachment",
    attachmentName: "Attachment name or URL",
    basicInfo: "Basic Info",
    advancedOptions: "Advanced Options",
    meetingTemplate: "Meeting",
    meetingDescription: "Discuss project updates and next steps",
    deadlineTemplate: "Deadline",
    personalTemplate: "Personal Task",
    welcomeTour: "Welcome Tour",
    startWelcomeTour: "Start the welcome tour to learn about Daily Planner",
    help: "Help",
    helpAndTips: "Help and productivity tips",
    keyboardShortcuts: "Keyboard Shortcuts",
    keyboardShortcutsDescription: "Use these keyboard shortcuts to work more efficiently",
    productivityTips: "Productivity Tips",
    productivityTipsDescription: "Tips to help you get the most out of Daily Planner",
    general: "General",
    views: "Views",
    openKeyboardShortcuts: "Open keyboard shortcuts",
    closeDialogs: "Close dialogs",
    focusSearch: "Focus search",
    toggleDarkMode: "Toggle dark mode",
    openWelcomeTour: "Open welcome tour",
    newTask: "New task",
    editSelectedTask: "Edit selected task",
    deleteSelectedTask: "Delete selected task",
    toggleTaskCompletion: "Toggle task completion",
    navigateTasks: "Navigate tasks",
    reorderTasks: "Reorder tasks",
    switchToTasksView: "Switch to tasks view",
    switchToAnalyticsView: "Switch to analytics view",
    switchTo3DView: "Switch to 3D view",
    toggleFilters: "Toggle filters",
    toggleSort: "Toggle sort",
    toggleCompletedTasks: "Toggle completed tasks",
    timeBlockingTip: "Use Time Blocking",
    timeBlockingDescription: "Allocate specific time blocks for your tasks to improve focus and productivity.",
    categoriesTip: "Organize with Categories",
    categoriesDescription: "Group similar tasks together with categories to better organize your workflow.",
    planAheadTip: "Plan Your Week Ahead",
    planAheadDescription: "Take a few minutes each Sunday to plan your tasks for the upcoming week.",
    voiceInputTip: "Use Voice Input",
    voiceInputDescription: "Add tasks quickly using voice commands when you're on the go.",
    tagsTip: "Use Tags for Context",
    tagsDescription: "Add tags to your tasks to provide additional context and make them easier to find.",
    analyticsTip: "Review Your Analytics",
    analyticsDescription: "Check your analytics regularly to identify patterns and improve your productivity.",
    shareTip: "Share Tasks with Others",
    shareDescription: "Share important tasks with colleagues or family members to keep everyone in sync.",
    readyToStart: "Ready to Get Started!",
    readyToStartDescription: "You're all set to boost your productivity with Daily Planner. Let's get organized!",
    step: "Step",
    of: "of",
    skipTour: "Skip tour",
    closeTour: "Close tour",
    tourTip: "You can access this tour anytime by clicking the Help button in the top right corner.",
    dragAndDrop: "Drag and Drop Tasks",
    dragAndDropDescription: "Easily reorder your tasks by dragging and dropping them into your preferred sequence.",
    voiceCommands: "Voice Commands",
    voiceCommandsDescription: "Add tasks hands-free using voice commands - perfect for when you're multitasking.",
    darkModeDescription: "Switch between light and dark themes to reduce eye strain and work comfortably day or night.",
    new: "NEW",
    categoryAdded: "Category added",
    taskReordered: "Task reordered",
    taskReorderedDescription: "Your task list has been reordered",
    welcomeBack: "Welcome back!",
    welcomeBackMessage: "Great to see you again. Your tasks are ready for you.",
    addTaskForTomorrow: "Add Task for Tomorrow",
    tomorrowTask: "New task for tomorrow",
    pressSlash: "Press / to search",
  },
  hi: {
    appTitle: "दैनिक योजनाकार",
    addTask: "एक नया कार्य जोड़ें...",
    taskTitle: "कार्य शीर्षक",
    taskDescription: "विवरण (वैकल्पिक)",
    category: "श्रेणी",
    priority: "प्राथमिकता",
    date: "तारीख",
    time: "समय",
    cancel: "रद्द करें",
    save: "सहेजें",
    delete: "हटाएं",
    edit: "संपादित करें",
    complete: "पूर्ण",
    incomplete: "अपूर्ण",
    search: "खोज",
    filter: "फ़िल्टर",
    sort: "क्रमबद्ध करें",
    all: "सभी कार्य",
    today: "आज",
    upcoming: "आगामी",
    completed: "पूर्ण किए गए",
    high: "उच्च",
    medium: "मध्यम",
    low: "निम्न",
    work: "काम",
    personal: "व्यक्तिगत",
    health: "स्वास्थ्य",
    learning: "सीखना",
    errands: "कामकाज",
    addCategory: "श्रेणी जोड़ें",
    categoryName: "श्रेणी का नाम",
    color: "रंग",
    deleteTask: "कार्य हटाएं",
    deleteConfirmation: "क्या आप वाकई इस कार्य को हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती है।",
    noTasks: "इस दिन के लिए कोई कार्य नहीं है। शुरू करने के लिए एक कार्य जोड़ें!",
    totalTasks: "कुल कार्य",
    completedTasks: "पूर्ण किए गए",
    progress: "प्रगति",
    completionRate: "पूर्णता दर",
    calendar: "कैलेंडर",
    analytics: "विश्लेषण",
    settings: "सेटिंग्स",
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    language: "भाषा",
    notifications: "सूचनाएं",
    enableNotifications: "सूचनाएं सक्षम करें",
    disableNotifications: "सूचनाएं अक्षम करें",
    addTaskVoice: "आवाज से कार्य जोड़ें",
    stopListening: "सुनना बंद करें",
    listeningForTask: "कार्य के लिए सुन रहा है...",
    taskAdded: "कार्य जोड़ा गया",
    taskUpdated: "कार्य अपडेट किया गया",
    taskDeleted: "कार्य हटाया गया",
    taskCompleted: "कार्य पूरा हुआ",
    searchPlaceholder: "कार्य खोजें...",
    pickDate: "तारीख चुनें",
    optional: "वैकल्पिक",
    required: "आवश्यक",
    showCompleted: "पूर्ण किए गए दिखाएं",
    hideCompleted: "पूर्ण किए गए छिपाएं",
    deleteTaskConfirmation: "क्या आप वाकई इस कार्य को हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती है।",
    tasks: "कार्य",
    share: "साझा करें",
    shareTask: "कार्य साझा करें",
    shareTaskDescription: "इस कार्य को दूसरों के साथ साझा करें",
    shareVia: "के माध्यम से साझा करें",
    link: "लिंक",
    qrCode: "क्यूआर कोड",
    scanQrToShare: "कार्य साझा करने के लिए इस क्यूआर कोड को स्कैन करें",
    close: "बंद करें",
    "3dTaskVisualization": "3D कार्य टाइमलाइन",
    "3dTaskVisualizationDescription": "अपने कार्यों को इंटरैक्टिव 3D टाइमलाइन में देखें",
    "3dVisualizationHelp": "घुमाने के लिए खींचें, ज़ूम करने के लिए स्क्रॉल करें, विवरण के लिए कार्यों पर क्लिक करें",
    welcomeToPlanner: "दैनिक योजनाकार में आपका स्वागत है",
    welcomeToPlannerDescription: "आपका व्यक्तिगत उत्पादकता सहायक। आइए आपको एक त्वरित टूर के साथ शुरू करें!",
    addTasks: "कार्य जोड़ें",
    addTasksDescription: "शीर्षक, विवरण, प्राथमिकताओं और नियत तारीखों के साथ आसानी से नए कार्य जोड़ें।",
    organizeTasks: "कार्य व्यवस्थित करें",
    organizeTasksDescription: "अपने कार्यों को वर्गीकृत करें और व्यवस्थित रहने के लिए उन्हें फ़िल्टर करें।",
    trackProgress: "प्रगति का निरीक्षण करें",
    trackProgressDescription: "दृश्य प्रगति संकेतकों के साथ अपनी उत्पादकता की निगरानी करें।",
    visualizeData: "डेटा का दृश्यांकन करें",
    visualizeDataDescription: "सुंदर 3D दृश्यों में अपने कार्यों और प्रगति को देखें।",
    previous: "पिछला",
    next: "अगला",
    getStarted: "शुरू करें",
    noDescription: "कोई विवरण नहीं",
    distribution: "वितरण",
    due: "नियत",
    titleRequired: "शीर्षक आवश्यक है",
    categoryRequired: "श्रेणी आवश्यक है",
    tags: "टैग",
    addTag: "एक टैग जोड़ें...",
    pressEnterToAddTag: "टैग जोड़ने के लिए एंटर दबाएं",
    estimatedTime: "अनुमानित समय",
    minutes: "मिनट",
    attachment: "अटैचमेंट",
    attachmentName: "अटैचमेंट नाम या URL",
    basicInfo: "मूल जानकारी",
    advancedOptions: "उन्नत विकल्प",
    meetingTemplate: "मीटिंग",
    meetingDescription: "प्रोजेक्ट अपडेट और अगले कदमों पर चर्चा करें",
    deadlineTemplate: "समय सीमा",
    personalTemplate: "व्यक्तिगत कार्य",
    welcomeTour: "स्वागत टूर",
    startWelcomeTour: "दैनिक योजनाकार के बारे में जानने के लिए स्वागत टूर शुरू करें",
  },
  es: {
    appTitle: "Planificador Diario",
    addTask: "Añadir una nueva tarea...",
    taskTitle: "Título de la tarea",
    taskDescription: "Descripción (opcional)",
    category: "Categoría",
    priority: "Prioridad",
    date: "Fecha",
    time: "Hora",
    cancel: "Cancelar",
    save: "Guardar",
    delete: "Eliminar",
    edit: "Editar",
    complete: "Completada",
    incomplete: "Incompleta",
    search: "Buscar",
    filter: "Filtrar",
    sort: "Ordenar",
    all: "Todas las tareas",
    today: "Hoy",
    upcoming: "Próximas",
    completed: "Completadas",
    high: "Alta",
    medium: "Media",
    low: "Baja",
    work: "Trabajo",
    personal: "Personal",
    health: "Salud",
    learning: "Aprendizaje",
    errands: "Recados",
    addCategory: "Añadir categoría",
    categoryName: "Nombre de categoría",
    color: "Color",
    deleteTask: "Eliminar tarea",
    deleteConfirmation: "¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se puede deshacer.",
    noTasks: "No hay tareas para este día. ¡Añade una tarea para empezar!",
    totalTasks: "Total de tareas",
    completedTasks: "Completadas",
    progress: "Progreso",
    completionRate: "Tasa de finalización",
    calendar: "Calendario",
    analytics: "Análisis",
    settings: "Configuración",
    darkMode: "Modo oscuro",
    lightMode: "Modo claro",
    language: "Idioma",
    notifications: "Notificaciones",
    enableNotifications: "Activar notificaciones",
    disableNotifications: "Desactivar notificaciones",
    addTaskVoice: "Añadir tarea con voz",
    stopListening: "Dejar de escuchar",
    listeningForTask: "Escuchando para tarea...",
    taskAdded: "Tarea añadida",
    taskUpdated: "Tarea actualizada",
    taskDeleted: "Tarea eliminada",
    taskCompleted: "Tarea completada",
    searchPlaceholder: "Buscar tareas...",
    pickDate: "Elegir fecha",
    optional: "opcional",
    required: "requerido",
    showCompleted: "Mostrar completadas",
    hideCompleted: "Ocultar completadas",
    deleteTaskConfirmation: "¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se puede deshacer.",
    tasks: "Tareas para",
    share: "Compartir",
    shareTask: "Compartir Tarea",
    shareTaskDescription: "Comparte esta tarea con otros",
    shareVia: "Compartir vía",
    link: "Enlace",
    qrCode: "Código QR",
    scanQrToShare: "Escanea este código QR para compartir la tarea",
    close: "Cerrar",
    "3dTaskVisualization": "Línea de tiempo 3D",
    "3dTaskVisualizationDescription": "Visualiza tus tareas en una línea de tiempo 3D interactiva",
    "3dVisualizationHelp": "Arrastra para rotar, desplázate para hacer zoom, haz clic en las tareas para ver detalles",
    welcomeToPlanner: "Bienvenido al Planificador Diario",
    welcomeToPlannerDescription: "Tu asistente de productividad personal. ¡Comencemos con un recorrido rápido!",
    addTasks: "Añadir Tareas",
    addTasksDescription:
      "Añade fácilmente nuevas tareas con títulos, descripciones, prioridades y fechas de vencimiento.",
    organizeTasks: "Organizar Tareas",
    organizeTasksDescription: "Categoriza tus tareas y fíltralas para mantenerte organizado.",
    trackProgress: "Seguir Progreso",
    trackProgressDescription: "Monitorea tu productividad con indicadores visuales de progreso.",
    visualizeData: "Visualizar Datos",
    visualizeDataDescription: "Ve tus tareas y progreso en hermosas visualizaciones 3D.",
    previous: "Anterior",
    next: "Siguiente",
    getStarted: "Comenzar",
    noDescription: "Sin descripción",
    distribution: "Distribución",
    due: "Vence",
    titleRequired: "El título es obligatorio",
    categoryRequired: "La categoría es obligatoria",
    tags: "Etiquetas",
    addTag: "Añadir una etiqueta...",
    pressEnterToAddTag: "Presiona Enter para añadir una etiqueta",
    estimatedTime: "Tiempo estimado",
    minutes: "min",
    attachment: "Adjunto",
    attachmentName: "Nombre del adjunto o URL",
    basicInfo: "Información básica",
    advancedOptions: "Opciones avanzadas",
    meetingTemplate: "Reunión",
    meetingDescription: "Discutir actualizaciones del proyecto y próximos pasos",
    deadlineTemplate: "Fecha límite",
    personalTemplate: "Tarea personal",
    welcomeTour: "Tour de Bienvenida",
    startWelcomeTour: "Inicia el tour de bienvenida para aprender sobre el Planificador Diario",
  },
  fr: {
    appTitle: "Planificateur Quotidien",
    addTask: "Ajouter une nouvelle tâche...",
    taskTitle: "Titre de la tâche",
    taskDescription: "Description (optionnel)",
    category: "Catégorie",
    priority: "Priorité",
    date: "Date",
    time: "Heure",
    cancel: "Annuler",
    save: "Enregistrer",
    delete: "Supprimer",
    edit: "Modifier",
    complete: "Terminée",
    incomplete: "Incomplète",
    search: "Rechercher",
    filter: "Filtrer",
    sort: "Trier",
    all: "Toutes les tâches",
    today: "Aujourd'hui",
    upcoming: "À venir",
    completed: "Terminées",
    high: "Haute",
    medium: "Moyenne",
    low: "Basse",
    work: "Travail",
    personal: "Personnel",
    health: "Santé",
    learning: "Apprentissage",
    errands: "Courses",
    addCategory: "Ajouter une catégorie",
    categoryName: "Nom de la catégorie",
    color: "Couleur",
    deleteTask: "Supprimer la tâche",
    deleteConfirmation: "Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action ne peut pas être annulée.",
    noTasks: "Pas de tâches pour ce jour. Ajoutez une tâche pour commencer !",
    totalTasks: "Total des tâches",
    completedTasks: "Terminées",
    progress: "Progrès",
    completionRate: "Taux d'achèvement",
    calendar: "Calendrier",
    analytics: "Analyses",
    settings: "Paramètres",
    darkMode: "Mode sombre",
    lightMode: "Mode clair",
    language: "Langue",
    notifications: "Notifications",
    enableNotifications: "Activer les notifications",
    disableNotifications: "Désactiver les notifications",
    addTaskVoice: "Ajouter une tâche avec la voix",
    stopListening: "Arrêter l'écoute",
    listeningForTask: "Écoute pour la tâche...",
    taskAdded: "Tâche ajoutée",
    taskUpdated: "Tâche mise à jour",
    taskDeleted: "Tâche supprimée",
    taskCompleted: "Tâche terminée",
    searchPlaceholder: "Rechercher des tâches...",
    pickDate: "Choisir une date",
    optional: "optionnel",
    required: "requis",
    showCompleted: "Afficher les terminées",
    hideCompleted: "Masquer les terminées",
    deleteTaskConfirmation: "Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action ne peut pas être annulée.",
    tasks: "Tâches pour",
    share: "Partager",
    shareTask: "Partager la tâche",
    shareTaskDescription: "Partagez cette tâche avec d'autres",
    shareVia: "Partager via",
    link: "Lien",
    qrCode: "Code QR",
    scanQrToShare: "Scannez ce code QR pour partager la tâche",
    close: "Fermer",
    "3dTaskVisualization": "Chronologie des tâches 3D",
    "3dTaskVisualizationDescription": "Visualisez vos tâches dans une chronologie 3D interactive",
    "3dVisualizationHelp":
      "Faites glisser pour pivoter, défilez pour zoomer, cliquez sur les tâches pour plus de détails",
    welcomeToPlanner: "Bienvenue dans le Planificateur Quotidien",
    welcomeToPlannerDescription: "Votre assistant de productivité personnel. Commençons par une visite rapide !",
    addTasks: "Ajouter des tâches",
    addTasksDescription: "Ajoutez facilement de nouvelles tâches avec titres, descriptions, priorités et échéances.",
    organizeTasks: "Organiser les tâches",
    organizeTasksDescription: "Catégorisez vos tâches et filtrez-les pour rester organisé.",
    trackProgress: "Suivre les progrès",
    trackProgressDescription: "Surveillez votre productivité avec des indicateurs visuels de progression.",
    visualizeData: "Visualiser les données",
    visualizeDataDescription: "Voyez vos tâches et votre progression dans de belles visualisations 3D.",
    previous: "Précédent",
    next: "Suivant",
    getStarted: "Commencer",
    noDescription: "Pas de description",
    distribution: "Distribution",
    due: "Échéance",
    titleRequired: "Le titre est requis",
    categoryRequired: "La catégorie est requise",
    tags: "Tags",
    addTag: "Ajouter un tag...",
    pressEnterToAddTag: "Appuyez sur Entrée pour ajouter un tag",
    estimatedTime: "Temps estimé",
    minutes: "min",
    attachment: "Pièce jointe",
    attachmentName: "Nom de la pièce jointe ou URL",
    basicInfo: "Informations de base",
    advancedOptions: "Options avancées",
    meetingTemplate: "Réunion",
    meetingDescription: "Discuter des mises à jour du projet et des prochaines étapes",
    deadlineTemplate: "Date limite",
    personalTemplate: "Tâche personnelle",
    welcomeTour: "Visite Guidée",
    startWelcomeTour: "Démarrer la visite guidée pour découvrir le Planificateur Quotidien",
  },
  de: {
    appTitle: "Tagesplaner",
    addTask: "Neue Aufgabe hinzufügen...",
    taskTitle: "Aufgabentitel",
    taskDescription: "Beschreibung (optional)",
    category: "Kategorie",
    priority: "Priorität",
    date: "Datum",
    time: "Zeit",
    cancel: "Abbrechen",
    save: "Speichern",
    delete: "Löschen",
    edit: "Bearbeiten",
    complete: "Abgeschlossen",
    incomplete: "Unvollständig",
    search: "Suchen",
    filter: "Filtern",
    sort: "Sortieren",
    all: "Alle Aufgaben",
    today: "Heute",
    upcoming: "Bevorstehend",
    completed: "Abgeschlossen",
    high: "Hoch",
    medium: "Mittel",
    low: "Niedrig",
    work: "Arbeit",
    personal: "Persönlich",
    health: "Gesundheit",
    learning: "Lernen",
    errands: "Besorgungen",
    addCategory: "Kategorie hinzufügen",
    categoryName: "Kategoriename",
    color: "Farbe",
    deleteTask: "Aufgabe löschen",
    deleteConfirmation:
      "Sind Sie sicher, dass Sie diese Aufgabe löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.",
    noTasks: "Keine Aufgaben für diesen Tag. Fügen Sie eine Aufgabe hinzu, um zu beginnen!",
    totalTasks: "Gesamtaufgaben",
    completedTasks: "Abgeschlossen",
    progress: "Fortschritt",
    completionRate: "Abschlussrate",
    calendar: "Kalender",
    analytics: "Analysen",
    settings: "Einstellungen",
    darkMode: "Dunkelmodus",
    lightMode: "Hellmodus",
    language: "Sprache",
    notifications: "Benachrichtigungen",
    enableNotifications: "Benachrichtigungen aktivieren",
    disableNotifications: "Benachrichtigungen deaktivieren",
    addTaskVoice: "Aufgabe mit Stimme hinzufügen",
    stopListening: "Zuhören beenden",
    listeningForTask: "Höre auf Aufgabe...",
    taskAdded: "Aufgabe hinzugefügt",
    taskUpdated: "Aufgabe aktualisiert",
    taskDeleted: "Aufgabe gelöscht",
    taskCompleted: "Aufgabe abgeschlossen",
    searchPlaceholder: "Aufgaben suchen...",
    pickDate: "Datum auswählen",
    optional: "optional",
    required: "erforderlich",
    showCompleted: "Abgeschlossene anzeigen",
    hideCompleted: "Abgeschlossene ausblenden",
    deleteTaskConfirmation:
      "Sind Sie sicher, dass Sie diese Aufgabe löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.",
    tasks: "Aufgaben für",
    share: "Teilen",
    shareTask: "Aufgabe teilen",
    shareTaskDescription: "Teilen Sie diese Aufgabe mit anderen",
    shareVia: "Teilen über",
    link: "Link",
    qrCode: "QR-Code",
    scanQrToShare: "Scannen Sie diesen QR-Code, um die Aufgabe zu teilen",
    close: "Schließen",
    "3dTaskVisualization": "3D-Aufgaben-Zeitleiste",
    "3dTaskVisualizationDescription": "Visualisieren Sie Ihre Aufgaben in einer interaktiven 3D-Zeitleiste",
    "3dVisualizationHelp": "Ziehen zum Drehen, Scrollen zum Zoomen, auf Aufgaben klicken für Details",
    welcomeToPlanner: "Willkommen beim Tagesplaner",
    welcomeToPlannerDescription: "Ihr persönlicher Produktivitätsassistent. Beginnen wir mit einer kurzen Tour!",
    addTasks: "Aufgaben hinzufügen",
    addTasksDescription:
      "Fügen Sie einfach neue Aufgaben mit Titeln, Beschreibungen, Prioritäten und Fälligkeitsdaten hinzu.",
    organizeTasks: "Aufgaben organisieren",
    organizeTasksDescription: "Kategorisieren Sie Ihre Aufgaben und filtern Sie sie, um organisiert zu bleiben.",
    trackProgress: "Fortschritt verfolgen",
    trackProgressDescription: "Überwachen Sie Ihre Produktivität mit visuellen Fortschrittsanzeigen.",
    visualizeData: "Daten visualisieren",
    visualizeDataDescription: "Sehen Sie Ihre Aufgaben und Fortschritte in schönen 3D-Visualisierungen.",
    previous: "Zurück",
    next: "Weiter",
    getStarted: "Loslegen",
    noDescription: "Keine Beschreibung",
    distribution: "Verteilung",
    due: "Fällig",
    titleRequired: "Titel ist erforderlich",
    categoryRequired: "Kategorie ist erforderlich",
    tags: "Tags",
    addTag: "Tag hinzufügen...",
    pressEnterToAddTag: "Drücken Sie Enter, um einen Tag hinzuzufügen",
    estimatedTime: "Geschätzte Zeit",
    minutes: "Min",
    attachment: "Anhang",
    attachmentName: "Anhangsname oder URL",
    basicInfo: "Grundinformationen",
    advancedOptions: "Erweiterte Optionen",
    meetingTemplate: "Besprechung",
    meetingDescription: "Projektaktualisierungen und nächste Schritte besprechen",
    deadlineTemplate: "Frist",
    personalTemplate: "Persönliche Aufgabe",
    welcomeTour: "Willkommenstour",
    startWelcomeTour: "Starten Sie die Willkommenstour, um den Tagesplaner kennenzulernen",
  },
}

// Default to English if the language is not supported
export function getTranslation(language: string, key: TranslationKey): string {
  return translations[language]?.[key] || translations.en[key]
}
