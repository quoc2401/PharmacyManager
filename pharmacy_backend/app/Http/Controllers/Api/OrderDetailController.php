<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\OrderDetailService;
use Illuminate\Http\Request;

class OrderDetailController extends Controller
{
    public function __construct(OrderDetailService $OrderDetailService)
    {
        $this->OrderDetailService = $OrderDetailService;
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
        $orders = $this->medicineService->get($request);

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
}
