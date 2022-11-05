<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    use HasFactory;

    protected $table = 'medicines';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'category_id',
        'unit_price',
        'unit_in_stock',
        'discontinued',
        'image',
        'describe',
        'uses',
        'trademark'
    ];

    public function Category()
    {
        return $this->belongsTo(Category::class);
    }

    public function OrderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
