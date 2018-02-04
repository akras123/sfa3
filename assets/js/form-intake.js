(function ($) {
    "use strict";
    var settings = {
        collection: 'intake',
        webhook: 'https://hooks.zapier.com/hooks/catch/51512/bfqj3f/',
        message: 'Dank voor het invullen van het intakeformulier.<br>We nemen binnen 24 uur contact met je op.',
        debug: false,
        mailTo: 'info@flyaware.info',
        bcc: 'info@flyaware.info',
        replyTo: 'info@flyaware.info',
        fromName: 'Stichting Fly Aware'
    }, rules = {}, dataForms = {};
    var $form = $('form#' + settings.collection + 'form'), $confirmModal = $('#confirm');
    if ($form.length > 0) {
        if (settings.debug) {
            console.log('schade-melden - render');
        }
        render();
        interaction();
    }
    function render() {
        dataForms = {};
        $form.find(".datum").datepicker({
            format: 'dd-mm-yyyy',
            autoclose: true,
            language: 'nl',
            weekStart: 1,
            startView: 1
        });
        (function ($) {
            $form.find('input').each(function () {
                var $this = $(this), name = $this.attr('name'), type = $this.attr('type'), required = $this.attr('required');
                if (required) {
                    if (type === 'email') {
                        rules[name] = {
                            required: true,
                            validEmail: true
                        };
                    }
                    else {
                        rules[name] = 'required';
                    }
                }
            });
            $form.find('textarea').each(function () {
                var $this = $(this), name = $this.attr('name'), required = $this.attr('required');
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
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            errorElement: 'span',
            errorClass: 'help-block',
            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                }
                else {
                    error.insertAfter(element);
                }
            },
            submitHandler: function (element) {
                var $this = $(element);
                var newKey = intakesRef.push().key;
                $this.find('input').each(function (i, e) {
                    var $this = $(this), type = $this.attr('type'), value = $this.val(), name = $this.attr('name'), checked = $this.is(':checked');
                    value = (type === 'checkbox') ? checked : value;
                    if (type === 'checkbox' || type === 'radio') {
                        if (checked) {
                            dataForms[name] = value;
                        }
                    }
                    else {
                        if (value) {
                            dataForms[name] = value;
                        }
                    }
                });
                $this.find('textarea').each(function (i, e) {
                    var $this = $(this);
                    if ($this.val().length > 0) {
                        var value = $this.val(), name = $this.attr('name');
                        dataForms[name] = value;
                    }
                });
                $this.find('option').each(function (i, e) {
                    var $this = $(this);
                    if ($this.is(':selected')) {
                        var name = $this.closest('select').attr('name'), value = $this.val();
                        dataForms[name] = value;
                    }
                });
                if (settings.debug) {
                    console.log('dataForms »»»»', dataForms);
                }
                var trs = '';
                Object.keys(dataForms).forEach(function (key) {
                    trs += '<tr><td>' + key + '</td><td>' + dataForms[key] + '</td></tr>';
                });
                var onderwerp = "Intake website: " + dataForms.VOORNAAM + " " + dataForms.ACHTERNAAM;
                dataForms['berichtOnderwerp'] = onderwerp;
                dataForms['berichtHTML'] = "<table cellpadding=\"5\" cellspacing=\"5\" border=\"1\">\n          <tbody>\n            " + trs + "\n          </tbody>\n        </table>";
                dataForms['mailTo'] = settings.mailTo;
                dataForms['creation'] = Date.now();
                dataForms['id'] = newKey;
                var onComplete = function (error) {
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
                    }
                    else {
                        clearInputs($this);
                        if (settings.debug !== true) {
                            var zapier = {};
                            zapier['mailTo'] = settings.mailTo;
                            zapier['email'] = dataForms['EMAIL'];
                            zapier['fromName'] = settings.fromName;
                            zapier['berichtOnderwerp'] = onderwerp;
                            zapier['creation'] = Date.now();
                            zapier['berichtHTML'] = dataForms['berichtHTML'];
                            $.ajax({
                                url: settings.webhook,
                                type: 'post',
                                dataType: 'json',
                                data: zapier,
                                success: function (data, status, error) {
                                    intakesRef.child(newKey).update({
                                        ajax_request_success: data
                                    });
                                    if (status !== 'success') {
                                        alert('something went wrong, please submit again.');
                                        console.log(data, status, error);
                                    }
                                },
                                error: function (request, status, error) {
                                    intakesRef.child(newKey).update({
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
                intakesRef.child(newKey).setWithPriority(dataForms, (0 - Date.now()), onComplete);
            }
        });
    }
    function interaction() {
        console.log('interaction');
        $form.find('input[name="ROKEN"]').change(function (e) {
            if ($(this).val() === 'ja') {
                $form.find('input[name="ROKEN_JA_HOEVEEL_PER_DAG"]').removeClass('hidden').addClass('fadeInUp');
            }
            else {
                $form.find('input[name="ROKEN_JA_HOEVEEL_PER_DAG"]').removeClass('fadeInUp').addClass('fadeOutRightBig');
                setTimeout(function () {
                    $form.find('input[name="ROKEN_JA_HOEVEEL_PER_DAG"]').addClass('hidden');
                }, 600);
            }
        });
        $form.find('input[name="ALCOHOL_DRINKEN"]').change(function (e) {
            if ($(this).val() === 'ja') {
                $form.find('input[name="ALCOHOL_JA_HOEVEEL_PER_WEEK"]').removeClass('hidden').addClass('fadeInUp');
            }
            else {
                $form.find('input[name="ALCOHOL_JA_HOEVEEL_PER_WEEK"]').removeClass('fadeInUp').addClass('fadeOutRightBig');
                setTimeout(function () {
                    $form.find('input[name="ALCOHOL_JA_HOEVEEL_PER_WEEK"]').addClass('hidden');
                }, 600);
            }
        });
    }
})(jQuery);
