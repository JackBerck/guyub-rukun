<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class DonationRequest extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'status',
        'urgency',
        'phone_number',
        'thumbnail',
        'address',
        'donation_category_id',
        'user_id',
    ];

    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    public function donationCategory() {
        return $this->belongsTo(DonationCategory::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
