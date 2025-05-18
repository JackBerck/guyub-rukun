<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Affair extends Model
{
    protected $fillable = [
        'thumbnail',
        'title',
        'description',
        'date',
        'time',
        'location',
        'affair_category_id',
        'user_id',
    ];

    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function affairCategory(): BelongsTo
    {
        return $this->belongsTo(AffairCateogory::class);
    }
}