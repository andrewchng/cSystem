<?php

class Agency extends Eloquent
{

    protected $table = 'Agency';
    protected $primaryKey = 'agencyID';
    protected $fillable = array('agencyName', 'agencyAddress', 'agencyTel');

    public function user()
    {
        return $this->belongsTo('User');
    }

}