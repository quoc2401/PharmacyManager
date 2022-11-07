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
    $orders = $this->orders->where(function ($query) use ($param) {
      foreach ($param as $key => $value) {
        if ($key !== 'page' && !empty($value))
          $query->orWhere($key, 'LIKE', '%' . $value . '%');
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
}
