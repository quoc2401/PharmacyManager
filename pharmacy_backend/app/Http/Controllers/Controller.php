<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function SuccessResponse($data="", $msg= "success",  $status = Response::HTTP_OK) {
        return response()->json([
            "data" => $data,
            "message" => $msg
        ], $status);
    }

    public function PaginateResponse($data="", $msg= "success",  $status = Response::HTTP_OK) {
        return response()->json([
            $data
        ], $status);
    }
}
