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

	function add_employee($firstname, $lastname, $login, $password){
		$data = array('firstname' => $firstname, 
					  'lastname' => $lastname, 
					  'login' => $login,
					  'password' => $password);
		$this->db->insert('employees', $data);
	}

	function add_book($title, $author, $year, $genre){
		if (!$this->book_in_db($title, $author, $year)) {
			$data = array('title' => $title, 
						  'author' => $author, 
						  'year' => $year,
						  'genre' => $genre,
						  'count' => 1);
			$this->db->insert('books', $data);
		} else {
			$this->db->set('count', 'count+1', false);
			$this->db->where(array('title' => $title, 'author' => $author, 'year' => $year));
			$this->db->update('books');
			
		}
		
	}

	function login_in_db($login){
		$this->db->where(array('login' => $login));
		$s = $this->db->get('readers')->result_array();
		if(count($s)==0) {
			return False;
		}
		return True;
	}

	function login_in_db_emp($login){
		$this->db->where(array('login' => $login));
		$s = $this->db->get('employees')->result_array();
		if(count($s)==0) {
			return False;
		}
		return True;
	}

	function login_type($login){
		$this->db->where(array('login' => $login));
		$s = $this->db->get('readers')->result_array();
		if(count($s)!=0) {
			return 3;
		}
		$this->db->where(array('login' => $login));
		$s = $this->db->get('employees')->result_array();
		if(count($s)!=0) {
			if ($s[0]['login'] == "admin") {
				return 1;
			}
			return 2;
		}
	}

	function user_authentication($login, $password){
		$s = $this->db->get_where('readers', array('login' => $login, 'password' => $password))->result_array();
		if(count($s)==0) {
			$r = $this->db->get_where('employees', array('login' => $login, 'password' => $password))->result_array();
			if(count($r)==0) {
				return 0;
			}
			return $r[0]['id'];
		}
		return $s[0]['id'];
		
	}

	function get_all_employees(){
		$admin = "admin";
		$this->db->where(array('login !='=> $admin));
		return $this->db->get('employees')->result_array();
	}

	function delete_employee($id){
		$data = array('id' => $id);
		$this->db->delete('employees', $data);
	}

	function get_all_readers(){
		return $this->db->get('readers')->result_array();
	}

	function delete_reader($id){
		$data = array('id' => $id);
		$this->db->delete('readers', $data);
	}

	function get_all_books(){
		return $this->db->get('books')->result_array();
	}

	function delete_book($id, $title, $author, $year, $count){
		if ($count > 1) {
			$this->db->set('count', 'count-1', false);
			$this->db->where(array('title' => $title, 'author' => $author, 'year' => $year));
			$this->db->update('books');
		} else {
			$data = array('id' => $id);
			$this->db->delete('books', $data);
		}
	}

	function book_in_db($title, $author, $year){
		$this->db->where(array('title' => $title, 'author' => $author, 'year' => $year));
		$s = $this->db->get('books')->result_array();
		if(count($s)==0) {
			return False;
		}
		return True;
	}

	function search_books($title, $author, $year, $genre) {
		$this->db->like('title', $title);
		$this->db->like('author', $author);
		$this->db->like('year', $year);
		$this->db->like('genre', $genre);
		return $this->db->get('books')->result_array();
	}

	function get_all_reservations(){
		$this->db->select('readers.id as reader, readers.firstname, readers.lastname, books.id as book, books.title, books.author, r.date_of_booking, r.approved, r.id as reservation');
		$this->db->from('reservations as r');
		$this->db->join('readers', 'readers.id  = r.reader_id');
		$this->db->join('books', 'books.id = r.book_id');
		return $this->db->get()->result_array();
	}

	function add_reservation($reader_id, $book_id, $approved) {
			$data = array('reader_id' => $reader_id, 
						  'book_id' => $book_id, 
						  'approved' => $approved);
			$this->db->insert('reservations', $data);

			$this->db->set('count', 'count-1', false);
			$this->db->where(array('id' => $book_id));
			$this->db->update('books');
	}

	function delete_reservation($id, $book_id) {
		$this->db->set('count', 'count+1', false);
		$this->db->where(array('id' => $book_id));
		$this->db->update('books');

		$data = array('id' => $id);
		$this->db->delete('reservations', $data);
	}

	function approve_reservation($id) {
		$this->db->set('approved', true, false);
		$this->db->where(array('id' => $id));
		$this->db->update('reservations');
	}
}