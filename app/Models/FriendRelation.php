<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FriendRelation extends Model
{
    use HasFactory;

    protected $fillable = [
        'from_user_id',
        'to_user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'from_user_id');
    }
    public function profile()
    {
        return $this->belongsTo(Profile::class, 'from_user_id', 'user_id');
    }
}
