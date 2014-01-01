<% layout('layout') -%>

<div class="row actions">
<a class="btn btn-info btn-sm" href="/${entity.name}">${entity.setdescriptor}</a>
<a class="btn btn-primary btn-sm" href="/${entity.name}/<%= item._id %>/edit">Edit ${entity.descriptor}</a>
<a class="btn btn-danger btn-sm" href="/${entity.name}/<%= item._id %>/remove">Delete ${entity.descriptor}</a>
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

