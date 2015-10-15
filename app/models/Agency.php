<?php

class Agency extends Eloquent
{

    protected $table = 'agency';
    protected $primaryKey = 'agencyID';
    protected $guarded = array('agencyID', 'agencyName', 'agencyAddress', 'agencyTel');

}