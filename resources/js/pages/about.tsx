import DonateAbout from '@/components/about/donate';
import HeroAbout from '@/components/about/hero';
import PeduliRasaAbout from '@/components/about/peduli-rasa';
import ProgramsAbout from '@/components/about/programs';
import WhatWeDoAbout from '@/components/about/what-we-do';
import Layout from '@/layouts/layout';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <Layout>
            <Head title="Tentang Kami" />
            <HeroAbout />
            <PeduliRasaAbout />
            <ProgramsAbout />
            <WhatWeDoAbout />
            <DonateAbout />
        </Layout>
    );
}
