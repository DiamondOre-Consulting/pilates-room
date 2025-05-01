import { useState } from "react";
  import { Button } from "@/components/ui/button";
  
  export default function App() {
    const [showText, setShowText] = useState(false);
  
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-center space-y-4">
        <h1 className="text-4xl text-purple-500">Welcome to Your New Project</h1>
        <Button onClick={() => setShowText(true)} className="bg-blue-500 text-white px-4 py-2">
          Click Me
        </Button>
        {showText && <h2 className="text-2xl text-green-400">Welcome to Devi Support</h2>}
      </div>
    );
  }
  