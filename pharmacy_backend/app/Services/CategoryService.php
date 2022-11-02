<?php

namespace App\Services;

use App\Http\Resources\UserResource;
use App\Repositories\CategoryRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class CategoryService implements IService
{
	private $categoryRepository;

	public function __construct(CategoryRepository $categoryRepository)
	{
		$this->categoryRepository = $categoryRepository;
	}

	public function get(Request $request)
	{
		//call repo
		$param = $request->all();
		$categories = $this->categoryRepository->get($param);
		$categoryRepository = UserResource::collection($categories)->response()->getData(true);

		return $categoryRepository;
	}

	public function find($id)
	{
		$user = ["user" => $this->userRepository->find($id)];

		return $user;
	}

	public function create(Request $request)
	{
		//call repo
		$user = $request->get("user");
		$user["user_role"] = empty($user["user_role"]) ? "EMPLOYEE" : $user["user_role"];
		$user["password"] = Hash::make($user["password"]);

		$response = $this->userRepository->create($user);

		return $response;
	}

	public function update($id, Request $request)
	{
		//call repo
		$user = $request->get("user");
		$user["user_role"] = empty($user["user_role"]) ? "EMPLOYEE" : $user["user_role"];
		// $user["password"] = Hash::make($user["password"]);

		$response = $this->userRepository->update($id, $user);

		return $response;
	}

	public function delete($id)
	{
		//call repo
		$this->userRepository->delete($id);
	}

	public function patchDelete(Request $request)
	{
		$users = $request->all();
		$this->userRepository->patchDelete($users);
	}
}
