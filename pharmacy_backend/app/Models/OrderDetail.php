<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    protected $table = "order_details";

    public $timestamps = false;

    protected $fillable = [
        'order_id',
        'medicine_id',
        'unit_price',
        'quantity',
        'discount'
    ];

    public function Order()
    {
        return $this->belongsTo(Order::class);
    }

    public function Medicine()
    {
        return $this->belongsTo(Medicine::class);
    }
}
