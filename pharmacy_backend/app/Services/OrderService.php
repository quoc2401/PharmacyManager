<?php

namespace App\Services;

use App\Http\Resources\OrderResource;
use App\Repositories\OrderRepository;
use Illuminate\Http\Request;

class OrderService implements IService
{

  private $orderRepository;
  private $auth;

  public function __construct(OrderRepository $orderRepository)
  {
    $this->orderRepository = $orderRepository;
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
    //call repo
    $order = $request->get("order");

    $response = $this->orderRepository->create($order);

    return $response;
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
