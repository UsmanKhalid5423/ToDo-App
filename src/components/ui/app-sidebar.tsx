// import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
// import { Link } from "react-router-dom";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";

// // Menu items.
// const items = [
//   {
//     title: "Home",
//     url: "dashboard",
//     icon: Home,
//   },
//   {
//     title: "Task Types",
//     url: "task-types",
//     icon: Inbox,
//   },
//   {
//     title: "Priorities",
//     url: "priorities",
//     icon: Calendar,
//   },
//   {
//     title: "Status",
//     url: "status",
//     icon: Search,
//   },
//   {
//     title: "Project",
//     url: "project",
//     icon: Settings,
//   },
// ];

// export function AppSidebar() {
//   return (
//     <Sidebar>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Application</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     {/* <a href={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </a> */}
//                     <Link to={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }
import { Calendar, Home, Inbox, Search, Settings, Folder } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { useGetAllProject } from "../../hooks/common/query/index";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type ProjectInterfance = {
  n_Id: number;
  s_Description: string;
};

// Regular menu items
const items = [
  {
    title: "Home",
    url: "dashboard",
    icon: Home,
  },
  {
    title: "Task Types",
    url: "task-types",
    icon: Inbox,
  },
  {
    title: "Priorities",
    url: "priorities",
    icon: Calendar,
  },
  {
    title: "Status",
    url: "status",
    icon: Search,
  },
];

// Hardcoded projects
const projectItems = [
  {
    title: "Project A",
    url: "project/a",
  },
  {
    title: "Project B",
    url: "project/b",
  },
  {
    title: "Project C",
    url: "project/c",
  },
];

export function AppSidebar() {
  const location = useLocation();
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState<ProjectInterfance[]>([]);

  const { data: projectsData } = useGetAllProject();

  // Automatically open project submenu if current route starts with /project
  useEffect(() => {
    if (projectsData) {
      setProjectDetails(projectsData);
    }
    if (location.pathname.startsWith("/project")) {
      setIsProjectOpen(true);
    }
  }, [projectsData, location.pathname]);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>To-Do</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={`/${item.url}`}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Projects parent item */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/project"
                    onClick={() => setIsProjectOpen((prev) => !prev)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Projects</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Collapsible Project Items */}
              {isProjectOpen &&
                projectDetails.map((project) => (
                  <SidebarMenuItem key={project.s_Description} className="ml-6">
                    <SidebarMenuButton asChild>
                      <Link to={`/project-details/${project.n_Id}`}>
                        {/* <Link to={`/project-details`}> */}
                        <Folder className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{project.s_Description}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
