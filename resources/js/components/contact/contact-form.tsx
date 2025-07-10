import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { toast } from 'sonner';

type ContactFormData = {
    name: string;
    email: string;
    message: string;
};

export default function ContactForm() {
    const { data, setData, post, processing, errors } = useForm<ContactFormData>({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (field: keyof ContactFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(field, e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => {
                setData({ name: '', email: '', message: '' });
                toast.success('Pesan berhasil dikirim!');
            },
            onError: () => {
                toast.error('Gagal mengirim pesan. Silakan coba lagi.');
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-md p-2 lg:p-6">
            <div>
                <label htmlFor="name" className="mb-1 block font-medium">
                    Nama <span className="text-red-600">*</span>
                </label>
                <Input
                    id="name"
                    name="name"
                    placeholder="Masukkan nama lengkap..."
                    required
                    value={data.name}
                    onChange={handleChange('name')}
                    disabled={processing}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
                <label htmlFor="email" className="mb-1 block font-medium">
                    Email <span className="text-red-600">*</span>
                </label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Masukkan alamat email..."
                    required
                    value={data.email}
                    onChange={handleChange('email')}
                    disabled={processing}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div>
                <label htmlFor="message" className="mb-1 block font-medium">
                    Pesan <span className="text-red-600">*</span>
                </label>
                <Textarea
                    id="message"
                    name="message"
                    placeholder="Masukkan pesan..."
                    required
                    rows={4}
                    value={data.message}
                    onChange={handleChange('message')}
                    disabled={processing}
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>
            <Button type="submit" disabled={processing} className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
                Kirim
            </Button>
        </form>
    );
}
