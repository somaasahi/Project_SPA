<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'post_id',
        'review_id',
        'type',
        'about',
        'check_flg',
    ];

    public function reviews()
    {
        return $this->hasMany( Review::class );
    }
}
