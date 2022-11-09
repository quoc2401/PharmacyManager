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
}
