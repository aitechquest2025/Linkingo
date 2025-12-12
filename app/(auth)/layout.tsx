export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="font-sans min-h-screen">
            {children}
        </div>
    );
}
