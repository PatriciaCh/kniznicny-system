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
		if ($this->validate_user($input_data)) {
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

	public function register_employee() {
		$input_data = json_decode(trim(file_get_contents('php://input')), true);
		if ($this->validate_employee($input_data)) {
			$this->user_model->add_employee($input_data['firstname'],
										   $input_data['lastname'],
										   $input_data['login'],
									   	   $input_data['pass']);
		} else {
			return false;
		}
	}

	public function add_book() {
		$input_data = json_decode(trim(file_get_contents('php://input')), true);
		$this->user_model->add_book($input_data['title'],
									   $input_data['author'],
									   $input_data['year'],
								   	   $input_data['genre']);
	}

	public function login_user() {
		$input_data = json_decode(trim(file_get_contents('php://input')), true);
		$id = $this->user_model->user_authentication($input_data['login'],$input_data['pass']);
		if ($id) {
			$login_type = $this->user_model->login_type($input_data['login']);
			$data = array('login_type' => $login_type, 'id' =>  $id); 
			echo json_encode($data);
		} else {
			return false;
		}
	}

	public function validate_user($input_data) {
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

	public function validate_employee($input_data) {
		if($this->user_model->login_in_db_emp($input_data['login'])) { 
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
		if (strlen($input_data['pass']) < 8) {
			echo "Bad pass";
			return false;
		}
		echo "Registration OK";
		return true;
	}

	public function get_all_employees() {
		echo json_encode($this->user_model->get_all_employees());
	}

	public function delete_employee() {
		$input_data = json_decode(trim(file_get_contents('php://input')), true);
		$this->user_model->delete_employee($input_data['id']);
	}

	public function get_all_readers() {
		echo json_encode($this->user_model->get_all_readers());
	}

	public function delete_reader() {
		$input_data = json_decode(trim(file_get_contents('php://input')), true);
		$this->user_model->delete_reader($input_data['id']);
	}

	public function get_all_books() {
		echo json_encode($this->user_model->get_all_books());
	}

	public function delete_book() {
		$input_data = json_decode(trim(file_get_contents('php://input')), true);
		$this->user_model->delete_book($input_data['id'],$input_data['title'],$input_data['author'],$input_data['year'],$input_data['count']);
	}

	public function search_books() {
		$input_data = json_decode(trim(file_get_contents('php://input')), true);
		echo json_encode($this->user_model->search_books($input_data['title'],$input_data['author'],$input_data['year'],$input_data['genre']));
	}

	public function get_all_reservations() {
		echo json_encode($this->user_model->get_all_reservations());
	}

	public function add_reservation() {
		$input_data = json_decode(trim(file_get_contents('php://input')), true);
		$this->user_model->add_reservation($input_data['reader_id'],
									       $input_data['book_id'],
								   	       $input_data['approved']);
	}

	public function delete_reservation() {
		$input_data = json_decode(trim(file_get_contents('php://input')), true);
		$this->user_model->delete_reservation($input_data['id'], $input_data['book_id']);
	}

	public function approve_reservation() {
		$input_data = json_decode(trim(file_get_contents('php://input')), true);
		$this->user_model->approve_reservation($input_data['id']);
	}

}
