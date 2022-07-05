<?php

namespace App\Models;

use App\Notifications\ResetPasswordNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function profile()
    {
        return $this->hasOne( Profile::class );
    }

    public function toAdminMessages()
    {
        return $this->hasMany( ToAdminMessage::class );
    }

    public function reviews()
    {
        return $this->hasMany( Review::class );
    }

    public function posts()
    {
        return $this->hasMany( Post::class );
    }

    public function sendPasswordResetNotification( $token )
    {
        $url = url( "reset-password/${token}" );
        $this->notify( new ResetPasswordNotification( $url ) );
    }

    public static function boot()
    {
        parent::boot();

        static::deleting( function ( $user ) {
            $user->posts()->delete();
            $user->reviews()->delete();
            $user->toAdminMessages()->delete();
            $user->profile()->delete();
        } );
    }
}
