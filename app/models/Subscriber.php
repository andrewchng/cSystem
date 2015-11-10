<?php
/**
 * Created by PhpStorm.
 * User: Ernie
 * Date: 10/11/15
 * Time: 4:53 PM
 */


class Subscriber extends Eloquent
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'Subscribers';
    protected $primaryKey = 'subscriberId';
    protected $guarded = array();
    protected $fillable = array('subscriberName', 'subscriberEmail', 'created_at');

    public function setUpdatedAtAttribute($value)
    {
        // to Disable updated_at
    }


}