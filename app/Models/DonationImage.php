<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DonationImage extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'image',
        'donation_id',
    ];

    public function donation()
    {
        return $this->belongsTo(Donation::class);
    }
}
