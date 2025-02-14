<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PermitRequestApplication extends Model
{
    /** @use HasFactory<\Database\Factories\PermitRequestApplicationFactory> */
    use HasFactory, SoftDeletes;
}
