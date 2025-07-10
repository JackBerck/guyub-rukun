import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/layouts/layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

type EditForumForm = {
    title: string;
    slug: string;
    description: string;
    forum_category_id: number;
};

type ForumCategory = {
    id: number;
    name: string;
    slug: string;
};

export default function EditForumPage({ forum, forumCategories }: { forum: EditForumForm, forumCategories: ForumCategory[] }) {
    const { data, setData, put, processing, errors, reset } = useForm<EditForumForm>({
        title: forum.title || '',
        slug: forum.slug || '',
        description: forum.description || '',
        forum_category_id: forum.forum_category_id || 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('forum.update', data.slug), {
            onSuccess: () => {
                reset();
            },
        });
    };

    const cancelChanges = () => {
        router.get(route('settings.forums'));
    };

    return (
        <Layout>
            <Head title="Buat Forum Diskusi" />
            <section className="section-padding-x pt-4 pb-8 md:pb-12 lg:pt-4">
                <div className="container max-w-screen-xl">
                    <div className="mb-6 flex items-center">
                        <Link
                            href="/"
                            className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <h1 className="text-2xl font-bold">Buat Forum Diskusi</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Card className="bg-white text-gray-900">
                            <CardHeader>
                                <CardTitle>Informasi Forum</CardTitle>
                                <CardDescription>
                                    Buat forum diskusi untuk berbagi ide, pengalaman, atau pertanyaan dengan komunitas PeduliRasa
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Judul Forum */}
                                <div className="space-y-2">
                                    <Label htmlFor="title" className={errors.title ? 'text-red-600' : ''}>
                                        Judul Forum *
                                    </Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        disabled={processing}
                                        placeholder="Contoh: Tips Menyimpan Makanan Agar Tahan Lama"
                                        className={errors.title ? 'border-red-500 focus:border-red-500' : ''}
                                    />
                                    {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                                </div>

                                {/* Kategori Forum */}
                                <div className="space-y-2">
                                    <Label htmlFor="category" className={errors.forum_category_id ? 'text-red-600' : ''}>
                                        Kategori Forum *
                                    </Label>
                                    <Select disabled={processing} value={String(data.forum_category_id)} onValueChange={(value) => setData('forum_category_id', Number.parseInt(value))}>
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Pilih kategori forum" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white text-gray-900">
                                            {forumCategories.map((category) => (
                                                <SelectItem key={category.id} value={String(category.id)}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.forum_category_id && <p className="text-sm text-red-600">{errors.forum_category_id}</p>}
                                </div>

                                {/* Deskripsi */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description" className={errors.description ? 'text-red-600' : ''}>
                                        Konten Forum *
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        disabled={processing}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Tulis konten forum Anda di sini. Berikan informasi yang jelas dan lengkap untuk memulai diskusi yang bermanfaat."
                                        rows={8}
                                        className={errors.description ? 'border-red-500 focus:border-red-500' : ''}
                                    />
                                    {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="text-light-base w-full bg-emerald-600 py-4 hover:bg-emerald-700"
                                >
                                    {processing ? 'Memproses...' : 'Perbarui Donasi'}
                                </Button>
                                <Button type="button" variant="destructive" className="text-light-base w-full" onClick={cancelChanges}>
                                    Batalkan Perubahan
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </section>
        </Layout>
    );
}
