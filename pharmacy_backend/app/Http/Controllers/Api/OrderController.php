<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Services\OrderDetailService;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    protected $orderService;
    protected $orderDetailService;

    public function __construct(OrderService $orderService, OrderDetailService $orderDetailService)
    {
        $this->orderService = $orderService;
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
        $orders = $this->orderService->get($request);

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
        $order = Order::create([
            'user_id' => $request->user_id,
            'order_date' => now(),
        ]);

        foreach ($request->order_details as $detail) {
            foreach ($detail as $d) {
                $orderDetail = OrderDetail::create([
                    'order_id' => $order->id,
                    'medicine_id' => $d->medicine->id,
                    'unit_price' => $d->medicine->unit_price,
                    'quantity' => $d->quantity,
                    'discount' => $d->medicine->discontinued,
                ]);
            }
        }

        return $this->UpdateSuccessResponse($order, "Tạo đơn hàng thành công");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order = $this->orderService->find($id);

        return $this->QuerySuccessResponse($order);
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
