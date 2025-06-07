<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateAffairRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'min:10'],
            'date' => ['required', 'date', 'after_or_equal:today'],
            'time' => ['required', 'date_format:H:i'],
            'location' => ['required', 'string', 'max:255'],
            'affair_category_id' => ['required', 'exists:affair_categories,id'],
        ];
    }

    /**
     * Get custom validation messages.
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Judul acara wajib diisi',
            'title.max' => 'Judul acara maksimal 255 karakter',
            'description.required' => 'Deskripsi acara wajib diisi',
            'description.min' => 'Deskripsi acara minimal 10 karakter',
            'date.required' => 'Tanggal acara wajib diisi',
            'date.date' => 'Format tanggal tidak valid',
            'date.after_or_equal' => 'Tanggal acara tidak boleh di masa lampau',
            'time.required' => 'Waktu acara wajib diisi',
            'time.date_format' => 'Format waktu harus HH:MM (24 jam)',
            'location.required' => 'Lokasi acara wajib diisi',
            'location.max' => 'Lokasi acara maksimal 255 karakter',
            'affair_category_id.required' => 'Kategori acara wajib dipilih',
            'affair_category_id.exists' => 'Kategori acara tidak valid',
        ];
    }
}