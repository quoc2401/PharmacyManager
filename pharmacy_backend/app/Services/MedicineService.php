<?php

namespace App\Services;

use App\Http\Resources\MedicineResource;
use App\Repositories\MedicineRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class MedicineService implements IService
{

  private $medicineRepository;
  private $auth;

  public function __construct(MedicineRepository $medicineRepository)
  {
    $this->medicineRepository = $medicineRepository;
  }

  public function get(Request $request)
  {
    //auth

    //call repo
    $param = $request->all();
    $medicines = $this->medicineRepository->get($param);
    $medicineResources = MedicineResource::collection($medicines)->response()->getData(true);

    return $medicineResources;
  }

  public function find($id)
  {
    $medicines = ["medicine" => $this->medicineRepository->find($id)];

    return $medicines;
  }

  public function create(Request $request)
  {
    //auth

    //call repo
    $medicine = $request->get("medicine");

    $response = ["medicine" => $this->medicineRepository->create($medicine)];

    return $response;
  }

  public function update($id, Request $request)
  {
    //auth

    //call repo
    $medicine = $request->get("medicine");

    $response = ["medicine" => $this->medicineRepository->update($id, $medicine)];

    return $response;
  }

  public function delete($id)
  {
    //auth

    //call repo
    $this->medicineRepository->delete($id);
  }
}
