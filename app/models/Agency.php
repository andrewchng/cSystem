<?php

class Agency extends Eloquent
{

    protected $table = 'Agency';
    protected $primaryKey = 'agencyID';
    protected $guarded = array('agencyID', 'agencyName', 'agencyAddress', 'agencyTel');

}