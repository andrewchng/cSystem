<?php


class Accounts extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'AccountType';
    protected $primaryKey = 'accountTypeId';

    public function user()
    {
        return $this->belongsTo('User');
    }

}