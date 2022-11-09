<?php

namespace App\Services;

use App\Http\Resources\OrderResource;
use App\Repositories\OrderDetailRepository;
use App\Repositories\OrderRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderService implements IService
{

  private $orderRepository;
  private $orderDetailRepository;

  public function __construct(OrderRepository $orderRepository, OrderDetailRepository $orderDetailRepository)
  {
    $this->orderRepository = $orderRepository;
    $this->orderDetailRepository = $orderDetailRepository;
  }

  public function get(Request $request)
  {
    //call repo
    $param = $request->all();
    $orders = $this->orderRepository->get($param);

    $orderResources = OrderResource::collection($orders)->response()->getData(true);

    return $orderResources;
  }

  public function find($id)
  {
    $order = ["order" => $this->orderRepository->find($id)];

    return $order;
  }

  public function create(Request $request)
  {
    $data = $request->order_details;
    DB::transaction(function() use ($request, $data){
      $order = [
          'user_id' => $request->user_id,
          'order_date' => now(),
      ];

      $order = $this->orderRepository->create($order);

      foreach ($data as $index=>$value) {
        $medicine = $value['medicine'];
        $orderDetail = [
          'order_id' => $order['id'],
          'medicine_id' =>$medicine['id'],
          'unit_price' => $medicine['unit_price'],
          'quantity' => $value['quantity'],
          'discount' => 0,
        ];
        
        $orderDetail = $this->orderDetailRepository->create($orderDetail);
      }

      return $order;
    });
  }

  public function update($id, Request $request)
  {
    //call repo
    $order = $request->get("order");

    $response = $this->orderRepository->update($id, $order);

    return $response;
  }

  public function delete($id)
  {
    //call repo
    $this->orderRepository->delete($id);
  }
}
