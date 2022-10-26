<?php 

namespace App\Services;

use App\Http\Resources\UserResource;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserService implements IService {

    private $userRepository;
    private $auth;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function get(Request $request) {
        //auth

        //call repo
        $param = $request->all();
        $users = $this->userRepository->get($param);
        $userResources = UserResource::collection($users)->response()->getData(true);

        return $userResources;
    }

    public function find($id) {
        $user = ["user" => $this->userRepository->find($id)];
        
        return $user;
    }

    public function create(Request $request) {
        //auth

        //call repo
        $user = $request->get("user");
        $user["user_role"] = empty($user["user_role"]) ? "EMPLOYEE" : $user["user_role"];
        $user["password"] = Hash::make($user["password"]);

        $response = ["user" => $this->userRepository->create($user)];

        return $response;
    }

    public function update($id, Request $request) {
        //auth

        //call repo
        $user = $request->get("user");
        $user["user_role"] = empty($user["user_role"]) ? "EMPLOYEE" : $user["user_role"];
        $user["password"] = Hash::make($user["password"]);

        $response = ["user" => $this->userRepository->update($id, $user)];

        return $response;
    }

    public function delete($id) {
        //auth

        //call repo
        $this->userRepository->delete($id);
    }
}
?>