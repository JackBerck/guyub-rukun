<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDonationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return request()->user() != null;
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
            'urgency' => 'nullable|in:low,medium,high',
            'phone_number' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'status' => 'required|boolean',
            'donation_category_id' => 'required|exists:donation_categories,id',
        ];
    }
}
