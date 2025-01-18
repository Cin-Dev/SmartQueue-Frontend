const forgotPasswordButton = document.getElementById("forgotpass");
				const loginButton = document.getElementById("login-button");
				forgotPasswordButton.addEventListener("click", event => {
					$.confirm({
						type: 'blue',
						theme: 'material',
						boxWidth: '30%',
						useBootstrap: false,
						title: 'Request Reset Password',
						content: '' +
							'<form action="" class="formName">' +
							'<div class="form-group">' +
							'<label>Enter Username</label>' +
							'<input type="text" placeholder="Your name" class="username form-control" required />' +
							'<br>' +
							'<label>Enter Email</label>' +
							'<input type="text" placeholder="Your email" class="email form-control" required />' +
							'</div>' +
							'</form>',

						buttons: {
							formSubmit: {
								text: 'Submit',
								btnClass: 'btn-blue',
								action: function () {
									var username = this.$content.find('.username').val();
									var email = this.$content.find('.email').val();
									if (!username || !email) {
										$.alert({
											title: 'Error!',
											type: 'red',
											content: 'Please fill up the necessary form',
											boxWidth: '20%',
											useBootstrap: false,
										});
										return false;
									} else {
										$.confirm({
											title: 'System Responded',
											type: 'blue',
											theme: 'material',
											boxWidth: '30%',
											useBootstrap: false,
											content: function () {
												var self = this;
												return $.ajax({
													url: '/StaffRequestPasswordAPI',
													method: 'post',
													data: {
														username: username,
														email: email
													}
												}).done(function (response) {
													self.setTitle(response.name);
													self.setContentAppend('<br>' + response + '<br><br>You will receive an email once your request has been approved');

												}).fail(function (jqXHR, error) {
													self.setContentAppend('<br>' + jqXHR.responseText);
												});
											}
										});

									}
								}
							},
							cancel: function () {
								//close
							},
						},
						onContentReady: function () {
							// bind to events
							var jc = this;
							this.$content.find('form').on('submit', function (e) {
								// if the user submits the form by pressing enter in the field.
								e.preventDefault();
								jc.$$formSubmit.trigger('click'); // reference the button and click it
							});
						}
					});
				});

				loginButton.addEventListener("click", function () {
					$(".load-wrapper").fadeIn("slow");
				});