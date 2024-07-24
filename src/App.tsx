import "./App.css";
import UserHierarchyPage from "./pages/UserHierarchyPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/query-client";
import Header from "./components/layout/Header";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="h-screen flex flex-col">
          <Header/>
          <div className="flex flex-1 bg-gray-800 p-4 gap-4 mt-20 overflow-auto">
              <main className=" flex flex-col flex-1 bg-gray-900 rounded-lg p-4 overflow-auto">
                <div id="detail">
                  {/* <Outlet /> */}
                  <UserHierarchyPage></UserHierarchyPage>
                </div>
              </main>
            </div>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
