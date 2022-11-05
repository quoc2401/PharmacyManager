<?php

namespace App\Repositories;

use App\Models\Medicine;
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

    // $medicines = $this->medicines->where(function($query) use($params){
    //   if(isset($params['category_id']))
    //     $query->where('category_id', '=', $params['category_id']);

    // });

    $medicines = $this->medicines->where(function ($query) use ($params) {
      if (array_key_exists('category_id', $params) && isset($params['category_id']) && $params['category_id'] !== '0')
        $query->where('category_id', '=', $params['category_id']);

      $query->where(function($query) use ($params) {
        foreach ($params as $key => $value) {
          if ($key !== 'page' && $key !== 'category_id' && !empty($value))
            $query->orWhere($key, 'LIKE', '%' . $value . '%');
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
    $medicines = $this->medicines->find($id);
    if ($medicines == null)
      return true;
    $medicines->delete();

    return true;
  }
}
