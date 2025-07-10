<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateDonateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() != null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'phone_number' => 'nullable|string|max:20',
            'address' => 'required|string|max:255',
            'donation_category_id' => 'required|exists:donation_categories,id',
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpg,jpeg,png|max:2048',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Judul donasi wajib diisi.',
            'title.max' => 'Judul donasi maksimal 255 karakter.',
            'description.required' => 'Deskripsi donasi wajib diisi.',
            'phone_number.max' => 'Nomor telepon maksimal 20 karakter.',
            'address.required' => 'Alamat wajib diisi.',
            'address.max' => 'Alamat maksimal 255 karakter.',
            'donation_category_id.required' => 'Kategori donasi wajib dipilih.',
            'donation_category_id.exists' => 'Kategori donasi tidak valid.',
            'images.required' => 'Gambar donasi wajib diupload.',
            'images.array' => 'Format gambar tidak valid.',
            'images.*.image' => 'File harus berupa gambar.',
            'images.*.mimes' => 'Gambar harus berformat jpg, jpeg, atau png.',
            'images.*.max' => 'Ukuran gambar maksimal 2MB.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        // Convert empty string to null for nullable fields
        if ($this->phone_number === '') {
            $this->merge(['phone_number' => null]);
        }
    }
}
