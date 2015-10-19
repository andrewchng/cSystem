<?php

class Agency extends Eloquent
{

    protected $table = 'Agency';
    protected $primaryKey = 'agencyID';
    protected $fillable = array('agencyName', 'agencyAddress', 'agencyTel');

}