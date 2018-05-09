<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

	function __construct(){
		parent::__construct();
		$this->load->model('user_model');
	}

	public function index() {
		$this->load->view('welcome_message');
	}

	public function register_user() {
		$input_data = json_decode(trim(file_get_contents('php://input')), true);
		if ($this->validate($input_data)) {
			$this->user_model->registration($input_data['firstname'],
										   $input_data['lastname'],
										   $input_data['address'],
										   $input_data['contact'],
										   $input_data['login'],
									   	   $input_data['pass']);
		} else {
			return false;
		}
	}

	public function login_user() {
		$input_data = json_decode(trim(file_get_contents('php://input')), true);
		if($this->user_model->user_authentication($input_data['login'],$input_data['pass'])){
			$login_type = $this->user_model->login_type($input_data['login']);
			echo $login_type;
		} else {
			return false;
		}
	}

	public function validate($input_data) {
		if($this->user_model->login_in_db($input_data['login'])) { 
			echo "Login exist";
			return false;
		}
		if (!ctype_alpha($input_data['firstname']) || strlen($input_data['firstname']) < 3) {
			echo "Bad firstname";
			return false;
		}
		if (!ctype_alpha($input_data['lastname']) || strlen($input_data['lastname']) < 3) {
			echo "Bad lastname";
			return false;
		}
		if (!ctype_alnum(str_replace(' ', '', $input_data['address']))) {
			echo "Bad address";
			return false;
		}
		if (!ctype_digit($input_data['contact'])) {
			echo "Bad contact";
			return false;
		}
		if (strlen($input_data['pass']) < 8) {
			echo "Bad pass";
			return false;
		}
		if ($input_data['pass'] != $input_data['confPass']) {
			echo "Bad pass and confPass";
			return false;
		}
		echo "Registration OK";
		return true;

	}

}
