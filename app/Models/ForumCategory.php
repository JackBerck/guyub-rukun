<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class ForumCategory extends Model
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

    public function forums()
    {
        return $this->hasMany(Forum::class);
    }
}
