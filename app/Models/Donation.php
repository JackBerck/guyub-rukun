<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Donation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'status',
        'phone_number',
        'address',
        'donation_category_id',
        'user_id',
    ];

    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    public function donationCategory()
    {
        return $this->belongsTo(DonationCategory::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function donationImages()
    {
        return $this->hasMany(DonationImage::class);
    }

    public function DonationStatus()
    {
        return $this->belongsTo(DonationStatus::class);
    }
}
