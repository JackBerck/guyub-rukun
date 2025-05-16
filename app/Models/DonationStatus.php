<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DonationStatus extends Model
{
    protected $fillable = [
        "name",
        "slug",
        "type"
    ];

    public function donation(): BelongsTo {
        return $this->belongsTo( Donation::class);
    }
}
