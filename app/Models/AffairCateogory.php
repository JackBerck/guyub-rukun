<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class AffairCateogory extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
    ];

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    public function affairs()
    {
        return $this->hasMany(Affair::class);
    }
}
