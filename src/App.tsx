import { ErrorComponent, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerBindings, {
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from "react-router-dom";
import "./App.css";
import { Layout } from "./components/layout";
import { HomeIcon, ShoppingCartIcon, TagIcon } from "@heroicons/react/20/solid";
import { Dashboard } from "./pages/dashboard";

function App() {
    return (
        <BrowserRouter>
            {/* <GitHubBanner /> */}
            <RefineKbarProvider>
                <Refine
                    dataProvider={dataProvider(
                        "https://api.finefoods.refine.dev",
                    )}
                    routerProvider={routerBindings}
                    resources={[
                        {
                            name: "dashboard",
                            list: "/dashboard",
                            meta: {
                                icon: <HomeIcon className="h-4 w-4" />,
                            },
                        }
                    ]}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    <Routes>
                        <Route
                            element={
                                <Layout>
                                    <Outlet />
                                </Layout>
                            }
                        >
                            <Route
                                index
                                element={<Navigate to="/dashboard" />}
                            />
                            <Route path="/home">
                                <Route index element={<Dashboard />} />
                            </Route>
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                    <RefineKbar />
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
