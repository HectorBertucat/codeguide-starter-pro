'use client';

import Link from "next/link";
import { 
  LayoutDashboard, 
  FileText, 
  Link2, 
  Wrench, 
  Users, 
  Settings,
  AlignLeft,
  User
} from "lucide-react";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
}

const NavItem = ({ href, icon, text }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={`flex items-center rounded-lg p-2 text-sm ${
        isActive
          ? "bg-seoptimizer-primary text-white"
          : "text-gray-600 hover:bg-seoptimizer-primary/10"
      }`}
    >
      <div className="mr-3">{icon}</div>
      <span>{text}</span>
    </Link>
  );
};

interface SidebarProps {
  userRole: string;
}

export default function Sidebar({ userRole }: SidebarProps) {
  return (
    <div className="hidden w-64 flex-shrink-0 border-r border-gray-200 bg-white md:block">
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="flex h-16 items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-seoptimizer-primary">Seoptimizer</h1>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {userRole === 'internal' ? (
            <>
              <NavItem
                href="/dashboard"
                icon={<LayoutDashboard size={18} />}
                text="Dashboard"
              />
              <NavItem
                href="/dashboard/articles"
                icon={<FileText size={18} />}
                text="Articles"
              />
              <NavItem
                href="/dashboard/backlinks"
                icon={<Link2 size={18} />}
                text="Backlinks"
              />
              <NavItem
                href="/dashboard/technical"
                icon={<Wrench size={18} />}
                text="Technical"
              />
              <NavItem
                href="/seo-tool"
                icon={<AlignLeft size={18} />}
                text="SEO Writing Tool"
              />
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-gray-500">
                  Admin
                </h3>
                <NavItem
                  href="/dashboard/users"
                  icon={<Users size={18} />}
                  text="User Management"
                />
                <NavItem
                  href="/dashboard/settings"
                  icon={<Settings size={18} />}
                  text="Settings"
                />
              </div>
            </>
          ) : (
            <>
              <NavItem
                href="/dashboard/client"
                icon={<User size={18} />}
                text="My Dashboard"
              />
              <NavItem
                href="/dashboard/settings"
                icon={<Settings size={18} />}
                text="Account Settings"
              />
            </>
          )}
        </nav>
      </div>
    </div>
  );
} 