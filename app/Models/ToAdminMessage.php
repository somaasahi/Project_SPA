<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToAdminMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'review_id',
        'about',
    ];

    public function user()
    {
        return $this->belongsTo( User::class );
    }

    public function review()
    {
        return $this->belongsTo( Review::class );
    }
}
