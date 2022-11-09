<?php

namespace App\Services;

use App\Http\Resources\OrderDetailResource;
use App\Repositories\OrderDetailRepository;
use Illuminate\Http\Request;

class OrderDetailService implements IService
{

  private $orderDetailRepository;

  public function __construct(OrderDetailRepository $orderDetailRepository)
  {
    $this->orderDetailRepository = $orderDetailRepository;
  }

  public function get(Request $request)
  {
    //call repo
    $param = $request->all();
    $orderDetails = $this->orderDetailRepository->get($param);
    foreach($orderDetails as $d)
      $d->Medicine;

    $orderDetailResources = OrderDetailResource::collection($orderDetails)->response()->getData(true);

    return $orderDetailResources;
  }

  public function find($id)
  {
    $orderDetail = ["orderDetail" => $this->orderDetailRepository->find($id)];

    return $orderDetail;
  }

  public function create(Request $request)
  {
    //call repo
    $orderDetail = $request->get("orderDetail");

    $response = $this->orderDetailRepository->create($orderDetail);

    return $response;
  }

  public function update($id, Request $request)
  {
    //call repo
    $orderDetail = $request->get("orderDetail");

    $response = $this->orderDetailRepository->update($id, $orderDetail);

    return $response;
  }

  public function delete($id)
  {
    //call repo
    $this->orderDetailRepository->delete($id);
  }
}
