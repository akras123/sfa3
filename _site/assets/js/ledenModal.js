(function ($) {
    $('.element.bestuursleden .blogList > ul > li').each(function (i) {
        var $this = $(this), $postFeaturedImage = $this.find('.postFeaturedImage img'), $imageAnchor = $this.find('.postFeaturedImage a'), $postTitle = $this.find('.postTitle'), $postFunctie = $this.find('.postBody > h3'), $postBodyModal = $this.find('.postBody .modal');
        $imageAnchor
            .attr('href', '#')
            .attr('data-toggle', 'modal')
            .attr('data-target', '#' + i);
        $postTitle.find('a')
            .attr('href', '#')
            .attr('data-toggle', 'modal')
            .attr('data-target', '#' + i);
        var $modal = $('<div></div>', {
            'tabindex': '-1',
            'role': 'dialog',
            'id': i,
            'class': 'modal fade'
        });
        var $modalDialog = $('<div></div>', {
            'class': 'modal-dialog modal-md'
        });
        var $modalContent = $('<div></div>', { 'class': 'modal-content' });
        var $modalHeader = $('<div></div>', {
            'class': 'modal-header'
        });
        var $modalHeaderButton = $('<button></button>', {
            'type': 'button',
            'data-dismiss': 'modal',
            'aria-label': 'Close',
            'class': 'close'
        });
        var $modalHeaderButtonSpan = $('<span></span>', {
            'aria-hidden': 'true',
            'text': 'x'
        });
        var $modalHeaderTitle = $('<h4></h4>', {
            'class': 'modal-title',
            'text': $postTitle.text()
        });
        $modalHeaderButtonSpan.appendTo($modalHeaderButton);
        $modalHeaderButton.appendTo($modalHeader);
        $modalHeaderTitle.appendTo($modalHeader);
        $modalHeader.appendTo($modalContent);
        var $modalBody = $('<div></div>', {
            'class': 'modal-body',
        });
        $postFeaturedImage
            .clone()
            .wrap('<div class="wrapper-image"></div>')
            .appendTo($modalBody);
        $postFunctie
            .clone()
            .appendTo($modalBody);
        $modalBody.append($postBodyModal.html());
        $modalBody.appendTo($modalContent);
        var $modalFooter = $('<div></div>', {
            'class': 'modal-footer'
        });
        var $modalFooterButton = $('<button></button>', {
            'type': 'button',
            'data-dismiss': 'modal',
            'class': 'btn btn-default',
            'text': 'Sluit'
        });
        $modalFooterButton.appendTo($modalFooter);
        $modalFooter.appendTo($modalContent);
        $modalContent.appendTo($modalDialog);
        $modalDialog.appendTo($modal);
        $modal.appendTo($this.parent());
    });
})(jQuery);
