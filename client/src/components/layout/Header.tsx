import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Menu, Bell, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [notifications] = useState(1); // Mock notification count
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex items-center">
        <h1 className="text-lg font-bold">Fleet Management Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
}
