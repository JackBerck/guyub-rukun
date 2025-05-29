'use client';

import ContactHero from '@/components/contact/hero';
import ContactInformation from '@/components/contact/information';
import ContactMap from '@/components/contact/map';
import ContactSocialMedia from '@/components/contact/social-media';
import Layout from '@/layouts/layout';
import { Head } from '@inertiajs/react';

export default function ContactPage() {
    return (
        <Layout>
            <Head title="Kontak" />
            <ContactHero />
            <ContactInformation />
            <ContactSocialMedia />
            <ContactMap />
        </Layout>
    );
}
