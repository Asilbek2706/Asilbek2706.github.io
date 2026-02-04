import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; }

class ErrorBoundary extends Component<Props, State> {
    public state: State = { hasError: false };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Xatolik ushlandi:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="p-4 border rounded-4 bg-light text-center">
                    <p className="text-danger mb-0 small">Ushbu blokni yuklashda xatolik yuz berdi.</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;