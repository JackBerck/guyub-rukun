<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateForumRequest extends FormRequest
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
            'title' => 'required|string|max:255', // Judul wajib, berupa string, maksimal 255 karakter
            'description' => 'required|string', // Deskripsi wajib, berupa string, maksimal 1000 karakter
            'forum_category_id' => 'required|exists:forum_categories,id', // ID kategori wajib, harus ada di tabel forum_categoriess
        ];
    }
}
