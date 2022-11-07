<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = "orders";

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'order_date',
    ];

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function OrderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
