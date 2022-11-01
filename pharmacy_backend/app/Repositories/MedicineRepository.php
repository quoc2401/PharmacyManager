<?php

namespace App\Repositories;

use App\Models\Medicine;

class MedicineRepository implements IRepository
{
  private $medicines;

  public function __construct(Medicine $medicines)
  {
    $this->medicines = $medicines;
  }

  public function get($param)
  {

    $medicines = $this->medicines->where(function ($query) use ($param) {
      foreach ($param as $key => $value) {
        if ($key === 'category' && $value !== null)
          $query->orWhere('category_id', '=', $value);
        else if ($key !== 'page')
          $query->orWhere($key, 'LIKE', '%' . $value . '%');
      }
    })
      ->paginate(env('PAGE_SIZE'));

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
