/** @format */

"use strict;";
console.log("Hej from Cleaning Hogwarts Data");

// Main Student Object
const Student = {
	firstName: "",
	lastName: "",
	middleName: null,
	nickName: null,
	gender: "",
	imageSrc: "",
	house: "",
};
// Full Array
const allStudents = [];

// Global Variables
let fetchedData;

// API url
const url = "https://petlatkea.dk/2021/hogwarts/students.json";

// Start Program
window.addEventListener("DOMContentLoaded", start);

function start() {
	fetchJSON();
}

async function fetchJSON() {
	const jsonData = await fetch(url);
	fetchedData = await jsonData.json();
	console.table(fetchedData);

	cleanUpData();
}

function cleanUpData() {
	createStudents();
}

function createStudents() {
	fetchedData.forEach((el) => {
		const student = Object.create(Student);

		//Trimmed data
		let originalName = el.fullname.trim();
		let originalMiddleName = originalName.substring(originalName.indexOf(" "), originalName.lastIndexOf(" ")).trim();
		let house = el.house.trim();
		let gender = el.gender.trim();

		// Setting Object Property Values
		// Firstname: Check if name conatins a space
		if (originalName.includes(" ")) {
			student.firstName = originalName.substring(0, 1).toUpperCase() + originalName.substring(1, originalName.indexOf(" "));
		} else {
			student.firstName = originalName.substring(0, 1).toUpperCase() + originalName.substring(1);
		}
		// Last Name: Check if name conatins a space
		if (originalName.includes(" ")) {
			student.lastName =
				originalName.substring(originalName.lastIndexOf(" ") + 1, originalName.lastIndexOf(" ") + 2).toUpperCase() + originalName.substring(originalName.lastIndexOf(" ") + 2).toLowerCase();
		}
		// Middle Name and Nick Name: Check if it contains ""
		if (!originalName.includes('"')) {
			student.middleName = originalMiddleName.substring(0, 1).toUpperCase() + originalMiddleName.substring(1).toLowerCase();
		}

		// Middle Name and Nick Name: Check if it contains ""
		if (originalName.includes('"')) {
			student.nickName = originalName.substring(originalName.indexOf('"') + 1, originalName.lastIndexOf('"'));
		}

		// Uppercase Gender
		student.gender = gender.substring(0, 1).toUpperCase() + gender.substring(1).toLowerCase();
		// Set Image Source
		student.imageSrc = `./assets/${originalName.substring(0, originalName.indexOf(" ")).toLowerCase()}.png`;
		// Uppercase House
		student.house = house.substring(0, 1).toUpperCase() + house.substring(1).toLowerCase();

		allStudents.push(student);
	});

	console.table(allStudents);
	showStudents();
}

function showStudents() {}
