// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function AddItem(btn) {

    var table = document.getElementById('purchaseProducts');
    var rows = table.getElementsByTagName('tr');
    var rowOuterHtml = rows[rows.length - 1].outerHTML;

    var lastrowIdx = rows.length - 2;

    var nextrowIdx = eval(lastrowIdx) + 1;

    rowOuterHtml = rowOuterHtml.replaceAll('_' + lastrowIdx + '_', '_' + nextrowIdx + '_');
    rowOuterHtml = rowOuterHtml.replaceAll('[' + lastrowIdx + ']', '[' + nextrowIdx + ']');
    rowOuterHtml = rowOuterHtml.replaceAll('-' + lastrowIdx, '-' + nextrowIdx);

    var newRow = table.insertRow();
    newRow.innerHTML = rowOuterHtml;

    var x = document.getElementsByTagName("INPUT");

    for (var cnt = 0; cnt < x.length; cnt++) {
        if (x[cnt].type == "text" && x[cnt].id.indexOf('_' + nextrowIdx + '_') > 0) {
            x[cnt].value = '';
        }
        else if (x[cnt].type == "number" && x[cnt].id.indexOf('_' + nextrowIdx + '_') > 0)
            x[cnt].value = 0;
    }


    var objDiv = document.getElementById("CsDiv");
    objDiv.scrollTop = objDiv.scrollHeight - 150;

    RebinValidator();

}

function DeleteItem(btn) {

    var table = document.getElementById('purchaseProducts');
    var rows = table.getElementsByTagName('tr');

    var btnIdx = btn.id.replaceAll('btnremove-', '');
    var idOfQuantity = btnIdx + "__Quantity";
    var idOfAmount = btnIdx + "__Amount";
    var txtQuantity = document.querySelector("[id$='" + idOfQuantity + "']");
    var txtAmount = document.querySelector("[id$='" + idOfAmount + "']");

    txtQuantity.value = 0;
    txtAmount.value = 0;


    var idOfIsDeleted = btnIdx + "__IsDeleted";
    var txtIsDeleted = document.querySelector("[id$='" + idOfIsDeleted + "']");
    txtIsDeleted.value = "true";

    $(btn).closest('tr').hide();

    CalcTotals();
}

function RebinValidator() {
    var $form = $("#PurchaseDetails");
    $form.unbind();
    $form.data("validator", null);
    $.validator.unobtrusive.parse($form);
}

function CalcTotals() {
    var x = document.getElementsByClassName('Quantity');

    var totalQty = 0;
    var amount = 0;
    var totalAmount = 0;

    var discountPercent = (document.querySelector('.DiscountPercent').value);
    var vatPercent = (document.querySelector('.VatPercent').value);

    for (var i = 0; i < x.length; i++) {

        var idofIsDeleted = i + "__IsDeleted";
        var idofPurchasePrice = i + "__PurchasePrice";
        var idofAmount = i + "__Amount";

        var hidIsDelId = document.querySelector("[id$='" + idofIsDeleted + "']").id;
        var purchasePriceTxtId = document.querySelector("[id$='" + idofPurchasePrice + "']").id;
        var amountTxtId = document.querySelector("[id$='" + idofAmount + "']").id;

        if (document.getElementById(hidIsDelId).value != "true") {
            totalQty = totalQty + parseFloat(x[i].value);

            var txtAmount = document.getElementById(amountTxtId);
            var txtPurchasePrice = document.getElementById(purchasePriceTxtId);

            txtAmount.value = parseFloat(x[i].value) * txtPurchasePrice.value;
            totalAmount = parseFloat(totalAmount) + parseFloat(txtAmount.value);

            var discountValue = (((totalAmount * discountPercent) / 100));
            var vatValue = (((totalAmount * vatPercent) / 100));
        }
    }

    document.getElementById('DiscountAmount').value = discountValue.toFixed(2);
    document.getElementById('VatAmount').value = vatValue.toFixed(2);

    //document.getElementById('txtQtyTotal').value = totalQty;
    document.getElementById('TotalAmount').value = ((totalAmount - discountValue) + vatValue).toFixed(2);

    return;
}

document.addEventListener('change', function (e) {
    if (e.target.classList.contains('Quantity')
        || e.target.classList.contains('PurchasePrice')
        || e.target.classList.contains('DiscountPercent')
        || e.target.classList.contains('VatPercent')
    ) {
        CalcTotals();
    }
}, false);
