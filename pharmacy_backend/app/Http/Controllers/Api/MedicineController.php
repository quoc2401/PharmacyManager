<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\MedicineService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MedicineController extends Controller
{
    protected $medicineService;

    public function __construct(MedicineService $medicineService)
    {
        $this->medicineService = $medicineService;
        $this->middleware('auth.role:ADMIN', ['only' => ['store', 'destroy', 'update']]);
        $this->middleware('auth.role:EMPLOYEE,ADMIN', ['only' => ['index', 'show']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $medicines = $this->medicineService->get($request);

        return $this->QuerySuccessResponse($medicines);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Log::info("contentType: ".$request->getContentType());

        $medicine = $this->medicineService->create($request);
        return $this->UpdateSuccessResponse($medicine);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $medicine = $this->medicineService->find($id);

        return $this->QuerySuccessResponse($medicine);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $res = $this->medicineService->update($id, $request);

        return $this->UpdateSuccessResponse($res);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->medicineService->delete($id);

        return $this->UpdateSuccessResponse("", "delete success", 200);
    }

    public function patchDelete(Request $request) {
        $this->medicineService->patchDelete($request);

        return $this->UpdateSuccessResponse("");
    }
}
