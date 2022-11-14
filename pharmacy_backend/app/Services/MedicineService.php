<?php

namespace App\Services;

use App\Http\Resources\MedicineResource;
use App\Repositories\MedicineRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
    $data = $request->all();
    
    if($request->file('image_file')->isValid()) {
        //get image and random name
        $filename = $data['image_file']->getClientOriginalName();
        $ext = pathinfo($filename, PATHINFO_EXTENSION);
        $name = substr(str_shuffle(str_repeat('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', mt_rand(1,50))), 1, 50);
        $filename = $name.".".$ext;

        $data['image_file']->move("images/", $filename);
        $data['image'] = "http://$_SERVER[HTTP_HOST]/"."images/".$filename;
    }
    
    $response = $this->medicineRepository->create($data);

    //delete if fail
    if(!$response)
      unlink(public_path()."\\images\\".$filename);

    return $response;
  }

  public function update($id, Request $request)
  {
    $data = $request->all();
    $medicine = $this->medicineRepository->find($id);
    $tempUrl = $medicine->image;
    $hasImage = false;

    if($request->hasFile('image_file')) {
      $hasImage = true;
      if($request->file('image_file')->isValid()) {
        //get image and random name
          $filename = $data['image_file']->getClientOriginalName();
          $ext = pathinfo($filename, PATHINFO_EXTENSION);
          $name = substr(str_shuffle(str_repeat('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', mt_rand(1,50))), 1, 50);
          $filename = $name.".".$ext;

          $data['image_file']->move("images/", $filename);
          $data['image'] = "http://$_SERVER[HTTP_HOST]/images/".$filename;
      }
    }

    

    $response = $this->medicineRepository->update($id, $data);

    //delete if fail
    if(!$response) {
      unlink(public_path()."\\images\\".$filename);
      $response = ["status" => 500, "message" => "fail to save to storage"]; 
    }
    //try delete old image
    else {
      try {
        if($hasImage)
          unlink(public_path().str_replace("http://$_SERVER[HTTP_HOST]", "",$tempUrl));
      } catch (\Throwable $th) {
        Log::error($th->getMessage());
      }
      
    }

    return $response;
  }

  public function delete($id)
  {
    $medicine = $this->medicineRepository->find($id);
    
    if($this->medicineRepository->delete($id)) {
      try {
        unlink(public_path().str_replace("http://$_SERVER[HTTP_HOST]", "",$medicine['image']));
      } catch (\Throwable $th) {
        Log::error($th->getMessage());
      }
    }
  }

  public function patchDelete(Request $request)
  {
    $medicines = $request->all();

    if($this->medicineRepository->patchDelete($medicines)) {
      foreach($medicines as $m) {
        try {
          unlink(public_path().str_replace("http://$_SERVER[HTTP_HOST]", "", $m['image']));
        } catch (\Throwable $th) {
          Log::error($th->getMessage());
        }
      }
    }
  }

  public function stockCount(Request $request) {
    $res = [
      'total' => $this->medicineRepository->stockCount(),
      'new' => $this->medicineRepository->stockCount($request->get('last_count'))
    ];

    return $res;
  }

  public function recentSale() {
    return $this->medicineRepository->recentSale();
  }
}
