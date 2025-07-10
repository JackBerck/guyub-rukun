import Footer from '@/components/footer';
import NavigationBar from '@/components/navigation-bar';
import { Toaster } from '@/components/ui/sooner';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavigationBar />
            {children}
            <Toaster />
            <Footer />
        </>
    );
}
