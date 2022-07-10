<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'animal_kind',
        'post_kind',
        'img_url1',
        'img_url2',
        'img_url3',
        'content',
    ];

    public function reviews()
    {
        return $this->hasMany( Review::class );
    }

    public function likes()
    {
        return $this->hasMany( Like::class );
    }

    public function user()
    {
        return $this->belongsTo( User::class );
    }

    public static function boot()
    {
        parent::boot();

        static::deleting( function ( $post ) {
            $post->likes()->delete();
            $post->reviews()->delete();
        } );
    }
}
