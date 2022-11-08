<?php

namespace App\Services;

use App\Http\Resources\UserResource;
use App\Repositories\CategoryRepository;
use Illuminate\Http\Request;
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
		$category = $request->get("category");

		$response = $this->categoryRepository->create($category);

		return $response;
	}

	public function update($id, Request $request)
	{
		//call repo
		$category = $request->get("category");

		$response = $this->categoryRepository->update($id, $category);

		return $response;
	}

	public function delete($id)
	{
		//call repo
		$this->categoryRepository->delete($id);
	}

	public function patchDelete(Request $request)
	{
		$categories = $request->all();
		$this->categoryRepository->patchDelete($categories);
	}
}
