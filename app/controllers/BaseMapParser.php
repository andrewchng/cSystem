<?php
abstract class BaseMapParser extends BaseController {
	abstract protected function getLocalData($queryParam = []);
	abstract protected function getExternalData($queryParam = []);
}
?>