import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { TaskList } from './components/tasks/TaskList';
import { useAuthStore } from './store/auth';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
    const { isAuthenticated, logout } = useAuthStore();

    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                {isAuthenticated && (
                    <nav className="bg-white shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                <div className="flex items-center">
                                    <h1 className="text-xl font-semibold">Task Manager</h1>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={logout}
                                        className="text-gray-600 hover:text-gray-800"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>
                )}

                <main className="py-6">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <TaskList />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                isAuthenticated ? <Navigate to="/" /> : <LoginForm />
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                isAuthenticated ? <Navigate to="/" /> : <RegisterForm />
                            }
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App; 