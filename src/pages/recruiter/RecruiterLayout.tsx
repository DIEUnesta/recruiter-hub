import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { RecruiterSidebar } from "@/components/recruiter/RecruiterSidebar";

const RecruiterLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <RecruiterSidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RecruiterLayout;
