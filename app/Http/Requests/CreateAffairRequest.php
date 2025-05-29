<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateAffairRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'thumbnail' => 'required|image|mimes:jpg,jpeg,png|max:2048', // Thumbnail opsional, harus berupa gambar dengan ukuran maksimal 2MB
            'title' => 'required|string|max:255', // Judul wajib, berupa string, maksimal 255 karakter
            'description' => 'required|string', // Deskripsi wajib, berupa string, maksimal 1000 karakter
            'date' => 'required|date|after_or_equal:today', // Tanggal wajib, harus berupa tanggal, dan tidak boleh sebelum hari ini
            'time' => 'required|date_format', // Waktu wajib, harus sesuai format HH:mm
            'location' => 'required|string|max:255', // Lokasi wajib, berupa string, maksimal 255 karakter
            'affair_category_id' => 'required|exists:affair_categories,id', // ID kategori wajib, harus ada di tabel affair_categories
        ];
    }
}
