/// <reference path="../../typings/tsd.d.ts" />

(function($) {

	"use strict";

	var settings = {
			collection: 'contact',
			webhook: 'https://hooks.zapier.com/hooks/catch/51512/bfqj3f/',
			message: 'Dank voor je contactverzoek.<br>We nemen binnen 24 uur contact met je op.',
			debug: false,
			mailTo: 'info@flyaware.info',
			bcc: 'info@flyaware.info',
			replyTo: 'info@flyaware.info',
			fromName: 'Stichting Fly Aware'
		},
		rules = {},
		dataForms = {};

	// cache DOM
	var $form = $('form#' + settings.collection + 'form'),
		$confirmModal = $('#confirm');

	if ($form.length > 0) {
		if (settings.debug) {
			console.log('contact - render');
		}
		render();
	}

	function render() {
		// clear the dataForms to receive new values
		dataForms = {};

		/**
		 * Function to dynamically build rules for bootstrap validate
		 */
		(function($) {
			$form.find('input').each(function() {
				var $this = $(this),
					name = $this.attr('name'),
					type = $this.attr('type'),
					required = $this.attr('required');
				if (required) {
					if (type === 'email') {
						rules[name] = {
							required: true,
							validEmail: true
						}
					} else {
						rules[name] = 'required';
					}
				}
			});
			$form.find('textarea').each(function() {
				var $this = $(this),
					name = $this.attr('name'),
					required = $this.attr('required');
				if (required) {
					rules[name] = 'required';
				}
			});
			if (settings.debug) {
				console.log('rules', rules);
			}
		})(jQuery);

		$form.validate({
			debug: false,
			rules: rules,
			highlight: function(element) {
				$(element).closest('.form-group').addClass('has-error');
			},
			unhighlight: function(element) {
				$(element).closest('.form-group').removeClass('has-error');
			},
			errorElement: 'span',
			errorClass: 'help-block',
			errorPlacement: function(error, element) {
				if (element.parent('.input-group').length) {
					error.insertAfter(element.parent());
				} else {
					error.insertAfter(element);
				}
			},
			submitHandler: function(element) {
				var $this = $(element);
				var newKey = contactsRef.push().key;

				// collect values
				$this.find('input').each(function(i, e) {
					var $this = $(this),
						type = $this.attr('type'),
						value = $this.val(),
						name = $this.attr('name'),
						checked = $this.is(':checked');
					value = (type === 'checkbox') ? checked : value;
					if (type === 'checkbox') {
						if (checked) {
							dataForms[name] = value;
						}
					} else {
						if (value) {
							dataForms[name] = value;
						}
					}
				});
				$this.find('textarea').each(function(i, e) {
					var $this = $(this);
					if ($this.val().length > 0) {
						var value = $this.val(),
							name = $this.attr('name');
						dataForms[name] = value;
					}
				});
				$this.find('option').each(function(i, e) {
					var $this = $(this);
					if ($this.is(':selected')) {
						var name = $this.closest('select').attr('name'),
							value = $this.val();
						dataForms[name] = value;
					}
				});
				if (settings.debug) {
					console.log('dataForms', dataForms);
				}

				// create the subject of the e-mail message
				let onderwerp = `Contact website: ${dataForms.VOORNAAM} ${dataForms.ACHTERNAAM}`;
				let telefoon = (dataForms.TELEFOON !== undefined) ? dataForms.TELEFOON : '';

				dataForms['berichtOnderwerp'] = onderwerp;
				dataForms['berichtHTML'] = `<table cellpadding="5" cellspacing="5" border="1">
	<tbody>
		<tr>
			<td>naam</td>
			<td>${dataForms.VOORNAAM} ${dataForms.ACHTERNAAM}</td>
		</tr>
		<tr>
			<td>emailadres</td>
			<td>${dataForms.EMAIL}</td>
		</tr>
		<tr>
			<td>telefoon (optioneel)</td>
			<td>${telefoon}</td>
		</tr>
		<tr>
			<td>vraag/opmerking</td>
			<td>${dataForms.OPMERKING}</td>
		</tr>
	</tbody>
</table>`;

				dataForms['mailTo'] = settings.mailTo;

				dataForms['creation'] = Date.now();
				dataForms['id'] = newKey;

				var onComplete = function(error) {
					if (error) {
						var confirmText = 'Oeps!. Er is iets fouts gegaan.';
						$confirmModal
							.find('.modal-body')
							.append($('<h3></h3>', {
								class: 'text-center',
								html: '<i class="glyphicon glyphicon-remove"></i>'
							}))
							.append($('<p></p>', {
								class: 'text-center',
								html: confirmText + '<br>' + error
							}))
							.end()
							.modal();
					} else {

						// clear inputs in form
						clearInputs($this);

						if (settings.debug !== true) {

							let zapier = {};
							zapier['mailTo'] = settings.mailTo;
							// zapier['bcc'] = settings.bcc;
							zapier['email'] = dataForms['EMAIL'];
							zapier['fromName'] = settings.fromName;
							zapier['berichtOnderwerp'] = onderwerp;
							zapier['creation'] = Date.now();
							zapier['berichtHTML'] = dataForms['berichtHTML'];

							// push to Zapier webhook, so e-mail can be send and/or integration can execute
							$.ajax({
								url: settings.webhook,
								type: 'post',
								dataType: 'json',
								data: zapier,
								success: function(data, status, error) {
									contactsRef.child(newKey).update({
										ajax_request_success: data
									});
									if (status !== 'success') {
										alert('something went wrong, please submit again.');
										console.log(data, status, error);
									}
								},
								error: function(request, status, error) {
									contactsRef.child(newKey).update({
										ajax_request_error: request
									});
								}
							});
						}

						var confirmText = '<p>Beste ' + dataForms.VOORNAAM + ' ' + dataForms.ACHTERNAAM + ',</p><p>' + settings.message + '</p>';
						$confirmModal
							.find('.modal-body')
							.append($('<h3></h3>', {
								class: 'text-center',
								html: '<i class="glyphicon glyphicon-ok"></i>'
							}))
							.append($('<p></p>', {
								class: 'text-center',
								html: confirmText
							}))
							.end()
							.modal();
					}
				};

				contactsRef.child(newKey).setWithPriority(dataForms, (0 - Date.now()), onComplete);

			}
		});
	}


})(jQuery);
