<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;


class User extends Eloquent implements UserInterface, RemindableInterface {

	use UserTrait, RemindableTrait;


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';
    protected $primaryKey = 'id';
    protected $guarded = array('remember_token', 'isDeleted'); // attributes may not be mass assigned
    protected $fillable = array('username', 'email', 'password', 'accountType', 'updated_at', 'created_at', 'agencyID');
	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = array('password', 'remember_token');


    /**
     * Get the password for the user.
     *
     * @return string
     */
    public function getAuthPassword()
    {
        return $this->password;
    }

    public function getRememberToken()
    {
        return $this->remember_token;
    }

    public function setRememberToken($value)
    {
        $this->remember_token = $value;
    }

    public function agency(){
        return $this->hasOne('Agency');
    }

    public function accountType(){
        return $this->hasOne('Accounts');
    }


}
