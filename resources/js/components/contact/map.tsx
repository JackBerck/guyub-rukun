export default function ContactMap() {
    return (
        <section className="section-padding-x bg-gray-50 py-16">
            <div className="container max-w-screen-xl">
                <div className="mb-4 text-center">
                    <h2 className="font-bold">Lokasi Kami</h2>
                    <p className="text-gray-600">Temukan kantor PeduliRasa di Jakarta</p>
                </div>

                <div className="mx-auto max-w-4xl">
                    <div className="aspect-video overflow-hidden rounded-lg bg-gray-200">
                        {/* Placeholder untuk map - dalam implementasi nyata, gunakan Google Maps atau Mapbox */}
                        <div className="flex h-full items-center justify-center">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2753.160470654251!2d109.33678713000052!3d-7.428424157578697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6559814ade5b79%3A0xaef1b7bab5cba0f0!2sFakultas%20Teknik%20Universitas%20Jenderal%20Soedirman!5e0!3m2!1sid!2sid!4v1748228645392!5m2!1sid!2sid" 
                                style={{ border: 0 }} 
                                allowFullScreen={true} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
