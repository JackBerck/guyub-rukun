import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
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
        <Form onSubmit={handleSubmit} className="space-y-4 rounded-md p-2 lg:p-6">
            <FormField>
                <FormItem>
                    <FormLabel htmlFor="name">
                        Nama <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Masukkan nama lengkap..."
                            required
                            value={data.name}
                            onChange={handleChange('name')}
                            disabled={processing}
                        />
                    </FormControl>
                    <FormMessage>{errors.name}</FormMessage>
                </FormItem>
            </FormField>
            <FormField>
                <FormItem>
                    <FormLabel htmlFor="email">
                        Email <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
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
                    </FormControl>
                    <FormMessage>{errors.email}</FormMessage>
                </FormItem>
            </FormField>
            <FormField>
                <FormItem>
                    <FormLabel htmlFor="message">
                        Pesan <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
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
                    </FormControl>
                    <FormMessage>{errors.message}</FormMessage>
                </FormItem>
            </FormField>
            <Button type="submit" disabled={processing}>
                Kirim
            </Button>
        </Form>
    );
}
