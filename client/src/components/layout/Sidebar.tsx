import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Compass,
  Heart,
  BarChart,
  RouteOff,
  Truck,
  LayoutGrid,
  Users,
  Table,
  Calendar,
  UserRound,
  Settings,
  ChevronDown,
  Package,
  Boxes,
  Activity,
  BarChart3,
  Map,
  Navigation,
  LineChart,
  ShoppingCart,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type SidebarProps = {
  isMobile?: boolean;
  onClose?: () => void;
};

type NavItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

const navItems: NavItem[] = [
  {
    title: "Vehicle Inventory",
    icon: <Truck className="mr-2 h-4 w-4" />,
    href: "/vehicles/inventory",
  },
  {
    title: "Driver Performance",
    icon: <Users className="mr-2 h-4 w-4" />,
    href: "/vehicles/drivers",
  },
  {
    title: "Vehicle Maintenance",
    icon: <Settings className="mr-2 h-4 w-4" />,
    href: "/vehicles/maintenance",
  },
  {
    title: "Fuel Consumption",
    icon: <BarChart className="mr-2 h-4 w-4" />,
    href: "/vehicles/fuel",
  },
];

export default function Sidebar({ isMobile, onClose }: SidebarProps) {
  const [location] = useLocation();
  
  // Helper function to check if a path is active, accounting for query parameters
  const isPathActive = (path: string) => {
    // Special case for order management paths
    if (path === '/orders') {
      return location === '/orders' || location === '/orders/management';
    }
    
    if (path === '/orders/analytics') {
      return location === '/orders/analytics';
    }
    
    if (path === '/orders/performance') {
      return location === '/orders/performance';
    }
    
    if (path === '/orders/financials') {
      return location === '/orders/financials';
    }
    
    // For paths without query parameters
    if (!path.includes('?')) {
      // For the shipments paths with nested routes
      if (path === '/shipments') {
        return location === '/shipments';
      }
      
      if (path.startsWith('/shipments/')) {
        return location === path;
      }
      
      // For other paths, check exact match or if location starts with the path (for nested routes)
      return location === path || (location.startsWith(path) && location.includes('?'));
    }
    
    // For paths with query parameters
    const [basePath, queryString] = path.split('?');
    
    // If location doesn't start with base path, it's not active
    if (!location.startsWith(basePath)) return false;
    
    // If no query parameters in current location, it's not active
    if (!location.includes('?')) return false;
    
    // Extract query parameters
    const locationQueryString = location.split('?')[1];
    
    // For shipments page, check the tab parameter specifically
    if (basePath === '/shipments') {
      const tabInPath = new URLSearchParams(queryString).get('tab');
      const tabInLocation = new URLSearchParams(locationQueryString).get('tab');
      return tabInPath === tabInLocation;
    }
    
    // For other pages with query params, check if they are the same
    return queryString === locationQueryString;
  };
  
  // Check if the path is for Order Management section
  const isOrderLink = (href: string) => {
    return href === '/orders' || 
           href === '/orders/management' || 
           href === '/orders/analytics' || 
           href === '/orders/performance' || 
           href === '/orders/financials';
  };
  
  const isShipmentLink = (href: string) => {
    return href === '/shipments' ||
           href === '/shipments/tracking' ||
           href === '/shipments/exceptions' ||
           href === '/shipments/efficiency' ||
           href === '/shipments/environmental';
  };
  
  // Handle special navigation for client-side routing
  const handleSpecialNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Update URL without causing a page reload
    window.history.pushState({}, '', href);
    
    // Notify router that the location has changed
    window.dispatchEvent(new PopStateEvent('popstate'));
    
    // Close mobile sidebar if needed
    if (isMobile && onClose) {
      onClose();
    }
  };
  
  return (
    <aside className="flex flex-col w-64 border-r border-border bg-card text-card-foreground h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Truck className="text-primary" />
          <h1 className="text-lg font-bold">LogiDash</h1>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2 space-y-1">
          {navItems.map((item) => (
            <li key={item.href} className="mb-1">
              <Link
                href={item.href}
                onClick={(e) => {
                  if (isOrderLink(item.href) || isShipmentLink(item.href)) {
                    handleSpecialNavigation(e, item.href);
                  } else if (isMobile && onClose) {
                    onClose();
                  }
                }}
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                  isPathActive(item.href)
                    ? "bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground"
                    : "hover:bg-muted dark:hover:bg-muted/20 dark:text-foreground"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-muted mr-2 overflow-hidden">
            {/* We don't include actual images per the requirements */}
            <div className="w-full h-full bg-primary/30"></div>
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">Fleet Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
