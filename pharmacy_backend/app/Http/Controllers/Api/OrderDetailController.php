<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StatisticRequest;
use App\Services\OrderDetailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderDetailController extends Controller
{
    private $orderDetailService;

    public function __construct(OrderDetailService $orderDetailService)
    {
        $this->orderDetailService = $orderDetailService;
        $this->middleware('auth.role:ADMIN', ['only' => ['destroy', 'update']]);
        $this->middleware('auth.role:EMPLOYEE,ADMIN', ['only' => ['index', 'show', 'store']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $orders = $this->orderDetailService->get($request);

        return $this->QuerySuccessResponse($orders);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $orderDetail = $this->orderDetailService->create($request);

        return $this->UpdateSuccessResponse($orderDetail);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $orderDetail = $this->orderDetailService->find($id);

        return $this->QuerySuccessResponse($orderDetail);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    //get revenue since a timestamp
    public function revenue(StatisticRequest $request) {

        $data = $this->orderDetailService->revenue($request);

        return $this->QuerySuccessResponse($data);
    }

    //get count medicine sold since a timestamp
    public function countSale(StatisticRequest $request) {

        $data = $this->orderDetailService->countSale($request);

        return $this->QuerySuccessResponse($data);
    }

    //get revenue every month of a year
    public function revenueMonthly($year) {
        $data = $this->orderDetailService->revenueMonthly($year);

        return $this->QuerySuccessResponse($data);
    }

    //get count medicine sold every month of a year
    public function countSaleMonthly($year) {
        $data = $this->orderDetailService->countSaleMonthly($year);

        return $this->QuerySuccessResponse($data);
    }
}
