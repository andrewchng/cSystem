<?php

class BaseController extends Controller {

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */
	protected function setupLayout()
	{
		if ( ! is_null($this->layout))
		{
			$this->layout = View::make($this->layout);
		}

        if (!Config::get('app.debug')) {
            App::error(function (Exception $exception, $code) {
                $error_response = array(
                    'error' => array(
                        'message' => '(#' . $code . ') ' . $exception->getMessage(),
                        'type' => get_class($exception),
                        'code' => $code
                    )
                );
                return Response::json($error_response, $code)->setCallback(Input::get('callback'));
            });
        }
	}

}
