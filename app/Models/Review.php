<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Review extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'post_id',
        'comment',
    ];

    public function user()
    {
        return $this->belongsTo( User::class );
    }

    public function post()
    {
        return $this->belongsTo( Post::class );
    }

    public function notification()
    {
        return $this->belongsTo( Notification::class );
    }

    public function toAdminMessage()
    {
        return $this->hasMany( ToAdminMessage::class );
    }
}
