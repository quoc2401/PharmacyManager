<?php

namespace App\Repositories;

use App\Models\OrderDetail;
use DateTime;
use Illuminate\Support\Facades\DB;

class OrderDetailRepository implements IRepository
{
  private $orderDetails;

  public function __construct(OrderDetail $orderDetails)
  {
    $this->orderDetails = $orderDetails;
  }

  public function get($param)
  {
    $orderDetails = $this->orderDetails
      ->join('medicines', 'order_details.medicine_id', '=', 'medicines.id')
      ->select('order_details.*')
      ->where(function ($query) use ($param) {
      foreach ($param as $key => $value) {
        if(!empty($value) && $value !== 'null')
          switch($key) {
            case 'medicine_name':
              $query->orWhere('medicines.name', 'LIKE', '%'.$value.'%');
              break;
            case 'page':
              continue 2;
              break;
            default:
              $query->orWhere($key, '=', $value);
          }
      }
    })
      ->paginate(env('PAGE_SIZE'));

    return $orderDetails;
  }

  public function find($id)
  {
    $orderDetail = $this->orderDetails->find($id);

    return $orderDetail;
  }

  public function create($data)
  {
    $orderDetail = new OrderDetail();
    $orderDetail->fill($data);
    $orderDetail->save();

    return $orderDetail;
  }

  public function update($id, $data)
  {
    $orderDetail = $this->orderDetails->find($id);
    $orderDetail->update($data);
    $orderDetail->save();

    return $orderDetail;
  }

  public function delete($id)
  {
    $this->orderDetails->destroy($id);

    return true;
  }

  public function revenue($timestamp=null) {
    $revenue = $this->orderDetails
      ->join('orders', 'order_details.order_id', '=', 'orders.id')
      ->select('quantity', 'order_details.unit_price')
      ->where(function($query) use($timestamp) {
      if ($timestamp)
        $query->where('order_date', '>=', $timestamp);
    })->sum(DB::raw('quantity * unit_price'));

    return $revenue;
  }

  public function revenueMonthly($year) {
    if(!$year)
      $year = date('Y');
    $revenues = [];
    for($i = 1; $i <= 12; $i++) {
      $dateObj   = DateTime::createFromFormat('!m', $i);
      $monthName = $dateObj->format('F');

      $revenue = $this->orderDetails
      ->join('orders', 'order_details.order_id', '=', 'orders.id')
      ->select('quantity', 'order_details.unit_price')
      ->where(function($query) use($year, $i) {
      $query->whereYear('order_date', '=', $year);
      $query->whereMonth('order_date', $i);
    })->sum(DB::raw('quantity * unit_price'));

      $revenues[$monthName] = (int) $revenue;
    }

    return $revenues;
  }

  public function countSale($timestamp=null) {
    $count = $this->orderDetails
      ->join('orders', 'order_details.order_id', '=', 'orders.id')
      ->select('quantity')
      ->where(function($query) use($timestamp) {
      if ($timestamp)
        $query->where('order_date', '>=', $timestamp);
    })->sum('quantity');

    return $count;
  }

  public function countSaleMonthly($year) {
    if(!$year)
      $year = date('Y');

    $counts = [];

    for($i = 1; $i <= 12; $i++) {
      $dateObj   = DateTime::createFromFormat('!m', $i);
      $monthName = $dateObj->format('F');

      $count = $this->orderDetails
      ->join('orders', 'order_details.order_id', '=', 'orders.id')
      ->select('quantity')
      ->where(function($query) use($year, $i) {
      $query->whereYear('order_date', '=', $year);
      $query->whereMonth('order_date', $i);
    })->sum('quantity');

      $counts[$monthName] = (int) $count;
    }

    return $counts;
  }
}
