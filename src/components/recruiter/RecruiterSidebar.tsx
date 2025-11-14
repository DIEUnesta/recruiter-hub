import { Home, Users, BarChart3, HelpCircle, User, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Tableau de Bord", url: "/recruteur/dashboard", icon: Home },
  { title: "Gestion Candidats", url: "/recruteur/candidats", icon: Users },
  { title: "Statistiques", url: "/recruteur/statistiques", icon: BarChart3 },
  { title: "Questionnaires", url: "/recruteur/questionnaires", icon: HelpCircle },
  { title: "Mon Profil", url: "/recruteur/profil", icon: User },
];

export function RecruiterSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarContent>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-sidebar-foreground font-semibold text-lg">
                  Recruteur Panel
                </h2>
                <p className="text-sidebar-foreground/70 text-sm">
                  Gestion des candidatures
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <SidebarGroup className="flex-1 py-4">
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className="flex items-center gap-3 px-4 py-3 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors rounded-lg mx-2"
                        activeClassName="bg-primary text-primary-foreground font-medium hover:bg-primary hover:text-primary-foreground"
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Logout Button */}
          <div className="p-4 border-t border-sidebar-border">
            <button
              onClick={() => {
                // Handle logout
                console.log("Déconnexion");
              }}
              className="flex items-center gap-3 px-4 py-3 w-full text-destructive hover:bg-destructive/10 transition-colors rounded-lg"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
