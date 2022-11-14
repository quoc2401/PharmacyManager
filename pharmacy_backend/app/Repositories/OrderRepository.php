<?php

namespace App\Repositories;

use App\Models\Order;

class OrderRepository implements IRepository
{
  private $orders;

  public function __construct(Order $orders)
  {
    $this->orders = $orders;
  }

  public function get($param)
  {
    $orders = $this->orders
      ->join('users', 'orders.user_id', '=', 'users.id')
      ->select('orders.*', 'users.first_name', 'users.last_name')
      ->where(function ($query) use ($param) {
      foreach ($param as $key => $value) {
        if (!empty($value))
          switch($key){
            case 'employee_name':
              $query->orWhereRaw(sprintf("concat(first_name, ' ', last_name) LIKE '%%%s%%'", $value));
              break;
            case 'page':
              continue 2;
              break;
            default:
              $query->orWhere('orders.'.$key, '=', $value);
              break;
          }
      }
    })
      ->paginate(env('PAGE_SIZE'));

    return $orders;
  }

  public function find($id)
  {
    $order = $this->orders->find($id);

    return $order;
  }

  public function create($data)
  {
    $order = new Order();
    $order->fill($data);
    $order->save();

    return $order;
  }

  public function update($id, $data)
  {
    $order = $this->orders->find($id);
    $order->update($data);
    $order->save();

    return $order;
  }

  public function delete($id)
  {
    $this->orders->destroy($id);

    return true;
  }

  public function count($timestamp=null) {
    $count = $this->orders->where(function($query) use($timestamp) {
      if ($timestamp)
        $query->where('order_date', '>=', $timestamp);
    })->count();

    return $count;
  }
}
