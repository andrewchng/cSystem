<?php

class Agency extends Eloquent
{

    protected $table = 'Agency';
    protected $primaryKey = 'agencyId';
    protected $fillable = array('agencyName', 'agencyAddress', 'agencyTel', 'isDeleted');
    protected $guarded = array('agencyId');

    public function user()
    {
        return $this->belongsTo('User');
    }

}