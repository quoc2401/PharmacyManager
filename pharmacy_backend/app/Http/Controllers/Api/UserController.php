<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
        $this->middleware('auth.role:ADMIN');
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = $this->userService->get($request);

        return $this->QuerySuccessResponse($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $user = $this->userService->create($request);

        return $this->UpdateSuccessResponse($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = $this->userService->find($id);

        return $this->QuerySuccessResponse($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update($id, UpdateUserRequest $request)
    {
        $user = $this->userService->update($id, $request);

        return $this->UpdateSuccessResponse($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->userService->delete($id);

        return $this->UpdateSuccessResponse("", "delete success", 200);
    }

    //patch deleting
    public function patchDelete(Request $request) {
        $this->userService->patchDelete($request);

        return $this->UpdateSuccessResponse("", "delete success");
    }
}
