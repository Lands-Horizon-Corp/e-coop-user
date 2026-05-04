DESIGNER'S SANDBOX (DOWNLOADS APP)
Welcome. This is your dedicated space to code your designs.

This application is isolated from the main banking system (core or admin), so do not worry about breaking anything. You can experiment, break layouts, and try things out freely here.

QUICK START
To turn it on, open your terminal (Command Prompt or VS Code Terminal) and run the command: bun nx serve downloads

To see it live, open your browser and go to http://localhost:3003. If you make changes to the code, the browser will update automatically. You do not need to refresh.

WHERE DO I WORK
Here is a guide to the files you will care about. Ignore the rest for now.

apps/downloads/src/app/app.tsx is the main page. Start here.

apps/downloads/src/app/nx-welcome.tsx is a default file you can delete eventually.

apps/downloads/src/main.tsx turns the app on. Do not touch this.

apps/downloads/vite.config.mts contains settings. Port 3003 is set here.

HOW TO EDIT THE PAGE
Open src/app/app.tsx. You will see HTML-like code (this is called JSX). Delete everything inside the return (...) and start writing your HTML.

Example Code: export function App() { return ( <div className="bg-white min-h-screen p-10"> <h1 className="text-4xl font-bold text-blue-600"> My New Design </h1> <p className="mt-4 text-gray-500"> This is my first code implementation! </p> </div> ); } export default App;

HOW TO ADD IMAGES AND ICONS
We use a Shared Public Folder for all images. Go to the ROOT of the entire project (outside of apps/downloads). Find the folder named public. Drop your images there (for example, my-design.png).

To use it in code, you do not need path dots. Just use a slash.

Example Code: <img src="/logo.png" alt="Logo" className="w-20 h-20" />

STYLING (TAILWIND CSS)
We use Tailwind v4. Instead of writing a separate CSS file, you add classes directly to your elements using className (not class).

For Color, use classes like text-red-500, bg-blue-100, or border-gray-300. For Spacing, use classes like p-4 (padding), m-4 (margin), or gap-4. For Layout, use classes like flex, grid, hidden, or block. For Sizing, use classes like w-full, h-screen, or max-w-md. For Typography, use classes like font-bold, text-xl, or uppercase.

Tip: Install the Tailwind CSS IntelliSense extension in VS Code. It will autocomplete class names for you.

FAQ AND TROUBLESHOOTING
If you do not see your changes: Check if you saved the file (Ctrl+S or Cmd+S). Check the terminal to see if it crashed. If yes, look at the error message.

If the terminal is stuck or you cannot type: The terminal is busy keeping your app running. To stop the app, press Ctrl + C. To run commands, open a new terminal tab.

If Port 3003 is already in use: This means the app is already running somewhere else (maybe another tab). Find the other terminal running it and close it, or ask the dev team how to kill the process.

If you see red squiggly lines everywhere: If the code still runs in the browser, you can often ignore them while prototyping. If the page is white or blank, you might have a syntax error (like a missing closing tag).

NEED HELP
If you get stuck, ask the dev team. When asking for help, take a screenshot of your Terminal (if there are red errors) or your Browser (if it looks wrong).
