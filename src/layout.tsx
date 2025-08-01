// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/ui/app-sidebar"

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <main>
//         <SidebarTrigger />
//         {children}
//       </main>
//     </SidebarProvider>
//   )
// }

import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        {/* <main className="flex-1 p-6 bg-gray-50 overflow-x-hidden"> */}
        <main className="flex-1 p-6 bg-gray-50 overflow-x-hidden overflow-y-auto max-h-screen">
          <SidebarTrigger />
          {children}
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
