<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_model extends CI_Model {

	function registration($firstname, $lastname, $address, $contact, $login, $password){
		$data = array('firstname' => $firstname, 
					  'lastname' => $lastname, 
					  'address' => $address, 
					  'contact' => $contact, 
					  'login' => $login,
					  'password' => $password);
		$this->db->insert('readers', $data);
	}

	function login_in_db($login){
		$this->db->where(array('login' => $login));
		$s = $this->db->get('readers')->result_array();
		if(count($s)==0) {
			return False;
		}
		return True;
	}

	function login_type($login){
		$this->db->where(array('login' => $login));
		$s = $this->db->get('readers')->result_array();
		if(count($s)!=0) {
			return 2;
		}
		$this->db->where(array('login' => $login));
		$s = $this->db->get('employees')->result_array();
		if(count($s)!=0) {
			if ($s[0]['login'] == "admin") {
				return 1;
			}
			return 3;
		}
	}

	function user_authentication($login, $password){
		$s = $this->db->get_where('readers', array('login' => $login, 'password' => $password))->result_array();
		if(count($s)==0) {
			return False;
		}
		return True;
	}



}