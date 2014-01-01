<% layout('layout') -%>

<div class="row actions">
<a class="btn btn-info" href="/${entity.name}">${entity.setdescriptor}</a>
</div>

<div class="row">
    <table class="table-bordered">
<# entity.properties.forEach(function (property) { #>
        <tr>
            <td>${property.descriptor}</td>
            <td><%= item.${property.name} %></td>
        </tr>
<# }); #>    
    </table>
</div>

