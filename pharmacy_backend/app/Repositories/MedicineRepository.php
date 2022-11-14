<?php

namespace App\Repositories;

use App\Models\Medicine;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MedicineRepository implements IRepository
{
  private $medicines;

  public function __construct(Medicine $medicines)
  {
    $this->medicines = $medicines;
  }

  public function get($params)
  {
    $medicines = $this->medicines->where(function ($query) use ($params) {
      if (array_key_exists('category_id', $params) && isset($params['category_id']) && $params['category_id'] !== '0')
        $query->where('category_id', '=', $params['category_id']);

      $query->where(function($query) use ($params) {
        foreach ($params as $key => $value) {
          if ($key !== 'page' && $key !== 'category_id' && isset($value) && $value !== 'null') {
            if($key === 'discontinued') {
              $query->where($key, '=', $value);
              continue;
            }

            $query->orWhere($key, 'LIKE', '%' . $value . '%');
          }
        }
      });
      
    })
      ->paginate(env('ADMIN_MED_PAGE_SIZE'));

    return $medicines;
  }

  public function find($id)
  {
    $medicines = $this->medicines->find($id);

    return $medicines;
  }

  public function create($data)
  {
    $medicines = new Medicine();
    $medicines->fill($data);
    $medicines->save();

    return $medicines;
  }

  public function update($id, $data)
  {
    $medicines = $this->medicines->find($id);
    $medicines->update($data);
    $medicines->save();

    return $medicines;
  }

  public function delete($id)
  {
    $this->medicines->destroy($id);;

    return true;
  }

  public function patchDelete($medicines) {
    DB::transaction(function() use($medicines) {
      foreach($medicines as $m)
        $this->medicines->destroy($m['id']);
      
    });
    return true;
  }

  public function stockCount($lastCount=0) {
    $count = $this->medicines->all()->sum('unit_in_stock');
    $count -= $lastCount;

    return $count;
  }

  public function recentSale($size=10) {
    $medicines = $this->medicines
                      ->join('order_details', 'medicines.id', '=', 'order_details.medicine_id')
                      ->join('orders', 'order_details.order_id', '=', 'orders.id')
                      ->select('medicines.*')
                      ->orderBy('order_date', 'desc')
                      ->take($size)->get();
                      // ->paginate($)
    Log::info('count: '.count($medicines));
    return $medicines;
  }
}
