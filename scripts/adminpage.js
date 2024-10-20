var dropdown = document.getElementsByClassName("button-profile");
				var i;

				for (i = 0; i < dropdown.length; i++) {
					dropdown[i].addEventListener("click", function () {

						var dropdownContent = this.nextElementSibling;
						if (dropdownContent.style.display === "block") {
							dropdownContent.style.display = "none";
						} else {
							dropdownContent.style.display = "block";
						}
					});
				}


				/* <summary>
				CHARTJS.....	
				</summary>*/

				let staffNum, studentNum, inquiryNum;

				Promise.all([
					fetch('http://localhost:8080/smartqueueweb/JsonStaffListAPI'),
					fetch('http://localhost:8080/smartqueueweb/JsonStudentListAPI')
					// fetch('http://localhost:8080/smartqueueweb/JsonInquiryListAPI')
				])
					.then(responses => {
						responses.forEach(response => {
							if (!response.ok) {
								throw new Error('Network response problem' + response.statusText);
							}
						});
						return Promise.all(responses.map(response => response.json()));
					})
					.then(data => {
						staffNum = data[0].length; // Staff count
						studentNum = data[1].length; // Student count
						inquiryNum = 10; // Inquiry count

						console.log(studentNum, staffNum, inquiryNum); // Use as needed
						myChart(studentNum, staffNum, inquiryNum);
					})
					.catch(error => {
						console.error('There was a problem with the fetch operation:', error);
					});



				// fetch('http://localhost:8080/smartqueueweb/JsonStaffListAPI')
				// 	.then(response => {
				// 		if (!response.ok) {
				// 			throw new Error('Network response was not ok ' + response.statusText);
				// 		}
				// 		return response.json();
				// 	})
				// 	.then(data => {
				// 		let student = 3;
				// 		let staff = data.length; // Get the number of items
				// 		let totalInquiry = 20;
				// 		myChart(student, staff, totalInquiry);
				// 	})
				// 	.catch(error => {
				// 		console.error('There was a problem with the fetch operation:', error);
				// 	});


				let delayed;
				function myChart(studentNum, staffNum, inquiryNum) {
					const ctx = document.querySelector('#myChart');


					new Chart(ctx, {
						type: 'bar',
						data: {
							labels: ['Students', 'Staff', 'Inquiry Today'],
							datasets: [{
								label: 'Total Number',
								data: [studentNum, staffNum, inquiryNum],
								borderWidth: 2
							}]
						},
						options: {
							animation: {
								onComplete: () => {
									delayed = true;
								},
								delay: (context) => {
									let delay = 0;
									if (context.type === 'data' && context.mode === 'default' && !delayed) {
										delay = context.dataIndex * 2000 + context.datasetIndex * 400;
									}
									return delay;
								},
							},
							scales: {
								y: {
									beginAtZero: true
								}
							}
						}
					});
				}


				const ctz = document.querySelector('#myPie');
				let pattern;
				new Chart(ctz, {
					type: 'doughnut',
					data: {
						labels: ['BSIT', 'BEED', 'DEVCOM', 'BSTM', 'BSHM'],
						datasets: [{
							data: [19, 10, 50, 30, 20],
						}],


					},
					options: {
						animation: {
							onComplete: () => {
								delayed = true;
							},
							delay: (context) => {
								let delay = 0;
								if (context.type === 'data' && context.mode === 'default' && !delayed) {
									delay = context.dataIndex * 300 + context.datasetIndex * 200;
								}
								return delay;
							},
						}
					}
				});

				
				// Show Modal
				function showModal(title) {
					document.getElementById('modal-title').textContent = title;
					document.getElementById('modal').style.display = 'flex';
				}

				// Hide Modal
				function hideModal() {
					document.getElementById('modal').style.display = 'none';
				}