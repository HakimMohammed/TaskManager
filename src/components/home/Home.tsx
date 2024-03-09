import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DataTable from "./DataTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className={`${isOpen ? "" : "toggle-sidebar"}`}>
          <Header close={toggleSidebar} />
          <Sidebar />
          <DataTable />
        </div>
      </QueryClientProvider>
    </>
  );
}
