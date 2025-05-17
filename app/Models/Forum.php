<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Forum extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'thumbnail',
        'forum_category_id',
        'user_id'
    ];

    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function forumCategory()
    {
        return $this->belongsTo(ForumCategory::class);
    }

}
