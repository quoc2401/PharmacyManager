<?php

namespace App\Repositories;

use App\Models\OrderDetail;

class OrderDetailRepository implements IRepository
{
  private $orderDetails;

  public function __construct(OrderDetail $orderDetails)
  {
    $this->orderDetails = $orderDetails;
  }

  public function get($param)
  {
    $orderDetails = $this->orderDetails->where(function ($query) use ($param) {
      foreach ($param as $key => $value) {
        if ($key !== 'page' && !empty($value))
          $query->orWhere($key, 'LIKE', '%' . $value . '%');
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
}
